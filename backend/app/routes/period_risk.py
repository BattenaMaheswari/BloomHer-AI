from fastapi import APIRouter
from app.schemas.period_risk import PeriodRiskRequest
from app.services.period_risk_service import predict_period_risk

router = APIRouter(
    prefix="/period-risk",
    tags=["Period Risk ML"]
)

@router.post("/ml")
def predict(data: PeriodRiskRequest):
    return predict_period_risk(data)