from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


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
    return application


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
