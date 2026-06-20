from fastapi import APIRouter
from app.schemas.health_test import HealthTestRequest

router = APIRouter()

@router.post("/health-test")
def analyze_health(data: HealthTestRequest):

    return {
        "message": "Health Assessment Received",
        "pcos_risk": 78,
        "thyroid_risk": 22
    }