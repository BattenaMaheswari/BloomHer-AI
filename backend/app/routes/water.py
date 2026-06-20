from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import WaterIntake
from app.schemas.water import WaterCreate

router = APIRouter(
    prefix="/water",
    tags=["Water Tracker"]
)


@router.post("/")
def save_water(data: WaterCreate, db: Session = Depends(get_db)):

    water = WaterIntake(
        user_name=data.user_name,
        glasses=data.glasses
    )

    db.add(water)
    db.commit()
    db.refresh(water)

    return {
        "message": "Water intake saved",
        "glasses": water.glasses
    }


@router.get("/")
def get_water_logs(db: Session = Depends(get_db)):

    logs = db.query(WaterIntake).all()

    return [
        {
            "id": log.id,
            "user_name": log.user_name,
            "glasses": log.glasses,
            "created_at": log.created_at
        }
        for log in logs
    ]