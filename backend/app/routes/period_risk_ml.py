from fastapi import APIRouter
from app.schemas.period_risk_ml import PeriodRiskMLRequest
from app.services.pcos_service import predict_pcos_risk

router = APIRouter(
    prefix="/period-risk",
    tags=["Period Risk ML"]
)

@router.post("/ml")
def period_risk_ml(data: PeriodRiskMLRequest):

    result = predict_pcos_risk(data.dict())

    return {
        "risk": result
    }