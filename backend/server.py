from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import json
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Google Sheets config
WAITLIST_SHEET_ID = "1-ymXhT6yLTuL5LCpZ8LyYvVK5YbvrcEYnzokM600NC4"
SHOOTER_SHEET_ID = "10UjXtPJXmI5VORLbgUCi4wm7Rcc8RaLRFxmA91GSRoo"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def get_gspread_client():
    try:
        import gspread
        from google.oauth2.service_account import Credentials

        creds_path = os.path.join(ROOT_DIR, 'google_credentials.json')
        creds_json = os.environ.get('GOOGLE_CREDENTIALS_JSON')

        if os.path.exists(creds_path):
            creds = Credentials.from_service_account_file(
                creds_path,
                scopes=['https://www.googleapis.com/auth/spreadsheets']
            )
            return gspread.authorize(creds)
        elif creds_json:
            creds_dict = json.loads(creds_json)
            creds = Credentials.from_service_account_info(
                creds_dict,
                scopes=['https://www.googleapis.com/auth/spreadsheets']
            )
            return gspread.authorize(creds)
        else:
            logger.info("No Google credentials found, sheet sync disabled")
            return None
    except Exception as e:
        logger.error(f"Failed to init gspread: {e}")
        return None


async def append_to_sheet(sheet_id: str, values: list):
    gc = get_gspread_client()
    if not gc:
        return
    try:
        def _append():
            sheet = gc.open_by_key(sheet_id).sheet1
            sheet.append_row(values, value_input_option='USER_ENTERED')
        await asyncio.to_thread(_append)
        logger.info(f"Appended row to sheet {sheet_id}")
    except Exception as e:
        logger.error(f"Failed to append to sheet {sheet_id}: {e}")


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    city: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


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
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ShooterApplicationCreate(BaseModel):
    name: str
    email: str
    phone: str
    portfolio_link: str
    experience_years: str


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

    # Append to Google Sheet
    asyncio.create_task(append_to_sheet(
        WAITLIST_SHEET_ID,
        [entry.name, entry.email, entry.city, entry.timestamp.strftime("%Y-%m-%d %H:%M:%S UTC")]
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

    # Append to Google Sheet
    asyncio.create_task(append_to_sheet(
        SHOOTER_SHEET_ID,
        [application.name, application.email, application.phone,
         application.portfolio_link, application.experience_years,
         application.timestamp.strftime("%Y-%m-%d %H:%M:%S UTC")]
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
