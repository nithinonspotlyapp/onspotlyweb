from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = 'hello@onspotlyapp.com'

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


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


async def send_notification_email(subject: str, html_content: str):
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not set, skipping email notification")
        return
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": subject,
            "html": html_content,
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent: {result}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")


@api_router.get("/")
async def root():
    return {"message": "Onspotly API"}


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def create_waitlist_entry(entry_input: WaitlistCreate):
    entry = WaitlistEntry(**entry_input.model_dump())
    doc = entry.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.waitlist.insert_one(doc)

    count = await db.waitlist.count_documents({})
    asyncio.create_task(send_notification_email(
        subject=f"New Waitlist Signup #{count} - {entry.name}",
        html_content=f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 32px; border-radius: 16px;">
            <h2 style="color: #A78BFA; margin-bottom: 24px;">New Waitlist Signup</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{entry.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Email</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{entry.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">City</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{entry.city}</td></tr>
            </table>
            <p style="color: #52525b; font-size: 12px; margin-top: 24px;">Total waitlist: {count} people</p>
        </div>
        """
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

    asyncio.create_task(send_notification_email(
        subject=f"New Shooter Application - {application.name}",
        html_content=f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 32px; border-radius: 16px;">
            <h2 style="color: #F472B6; margin-bottom: 24px;">New Shooter Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{application.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Email</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{application.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Phone</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{application.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Portfolio</td><td style="padding: 8px 0; color: #fff; font-weight: 600;"><a href="{application.portfolio_link}" style="color: #A78BFA;">{application.portfolio_link}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Experience</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">{application.experience_years} years</td></tr>
            </table>
        </div>
        """
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
