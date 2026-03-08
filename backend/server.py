from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import requests as http_requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
import uuid
from datetime import datetime, timezone, timedelta

EST = timezone(timedelta(hours=-5))

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Airtable config
AIRTABLE_WAITLIST_PAT = os.environ.get('AIRTABLE_WAITLIST_PAT')
AIRTABLE_WAITLIST_BASE = os.environ.get('AIRTABLE_WAITLIST_BASE')
AIRTABLE_WAITLIST_TABLE = os.environ.get('AIRTABLE_WAITLIST_TABLE')
AIRTABLE_SHOOTER_PAT = os.environ.get('AIRTABLE_SHOOTER_PAT')
AIRTABLE_SHOOTER_BASE = os.environ.get('AIRTABLE_SHOOTER_BASE')
AIRTABLE_SHOOTER_TABLE = os.environ.get('AIRTABLE_SHOOTER_TABLE')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def append_to_airtable(pat: str, base_id: str, table_id: str, fields: dict):
    if not pat or not base_id or not table_id:
        logger.info("Airtable credentials missing, skipping sync")
        return
    try:
        url = f"https://api.airtable.com/v0/{base_id}/{table_id}"
        headers = {
            "Authorization": f"Bearer {pat}",
            "Content-Type": "application/json"
        }
        data = {
            "records": [{"fields": fields}],
            "typecast": True
        }
        resp = await asyncio.to_thread(
            http_requests.post, url, json=data, headers=headers, timeout=10
        )
        if resp.status_code == 200:
            logger.info(f"Airtable record created in {base_id}/{table_id}")
        else:
            logger.error(f"Airtable error ({resp.status_code}): {resp.text}")
    except Exception as e:
        logger.error(f"Failed to sync to Airtable: {e}")


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    city: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(EST))


class WaitlistCreate(BaseModel):
    name: str
    email: str
    city: str


class ShooterApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    portfolio_link: str
    experience_years: str
    city: str
    device_type: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(EST))


class ShooterApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str
    portfolio_link: str
    experience_years: str
    city: str
    device_type: str


class WaitlistCount(BaseModel):
    count: int


@api_router.get("/")
async def root():
    return {"message": "Onspotly API"}


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def create_waitlist_entry(entry_input: WaitlistCreate):
    entry = WaitlistEntry(**entry_input.model_dump())
    doc = entry.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.waitlist.insert_one(doc)

    # Sync to Airtable
    asyncio.create_task(append_to_airtable(
        AIRTABLE_WAITLIST_PAT,
        AIRTABLE_WAITLIST_BASE,
        AIRTABLE_WAITLIST_TABLE,
        {
            "Name": entry.name,
            "Email": entry.email,
            "City": entry.city,
        }
    ))

    return entry


@api_router.get("/waitlist/count", response_model=WaitlistCount)
async def get_waitlist_count():
    count = await db.waitlist.count_documents({})
    return WaitlistCount(count=count)


@api_router.post("/shooter-apply", response_model=ShooterApplication)
async def create_shooter_application(app_input: ShooterApplicationCreate):
    application = ShooterApplication(**app_input.model_dump())
    doc = application.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.shooter_applications.insert_one(doc)

    # Sync to Airtable
    asyncio.create_task(append_to_airtable(
        AIRTABLE_SHOOTER_PAT,
        AIRTABLE_SHOOTER_BASE,
        AIRTABLE_SHOOTER_TABLE,
        {
            "Name": application.name,
            "Email": application.email,
            "Phone Number": application.phone,
            "Portfolio Link (Website / Instagram / YouTube / TikTok)": application.portfolio_link,
            "Years of Experience in iPhone Videography": application.experience_years,
            "City": application.city,
            "Device Type": application.device_type,
        }
    ))

    return application


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
