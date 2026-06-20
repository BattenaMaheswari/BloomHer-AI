from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.pcos import PCOSPredictRequest
from app.services.pcos_service import predict_pcos_risk
from app.database.database import get_db
from app.database.models import PCOSPrediction

router = APIRouter(
    prefix="/pcos",
    tags=["PCOS ML"]
)


@router.post("/predict")
def predict(
    data: PCOSPredictRequest,
    db: Session = Depends(get_db)
):
    return predict_pcos_risk(data, db)


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(PCOSPrediction).all()


@router.get("/history/{user_name}")
def get_user_history(
    user_name: str,
    db: Session = Depends(get_db)
):
    return (
        db.query(PCOSPrediction)
        .filter(PCOSPrediction.user_name == user_name)
        .all()
    )