from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.models import Base

# ---------------- ROUTES ----------------
from app.routes.health_test import router as health_router
from app.routes.profile import router as profile_router
from app.routes.chat import router as chat_router
from app.routes.analytics import router as analytics_router
from app.routes.period import router as period_router
from app.routes.water import router as water_router
from app.routes.period_risk import router as period_risk_router
from app.routes.period_risk_ml import router as period_risk_ml_router
from app.routes.pcos import router as pcos_router
from app.database.init_db import init_db

init_db()

# ---------------- APP ----------------
app = FastAPI(
    title="BloomHer AI",
    version="1.0.0"
)

# ---------------- DB ----------------
Base.metadata.create_all(bind=engine)

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTER REGISTRATION ----------------
app.include_router(health_router)
app.include_router(profile_router)
app.include_router(chat_router)
app.include_router(analytics_router)
app.include_router(period_router)
app.include_router(water_router)
app.include_router(period_risk_router)
app.include_router(period_risk_ml_router)
app.include_router(pcos_router)

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {
        "message": "BloomHer AI Backend Running 🚀"
    }