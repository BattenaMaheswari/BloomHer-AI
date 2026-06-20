from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database.database import get_db
from app.database.models import Period
from app.schemas.period import PeriodCreate

router = APIRouter(
    prefix="/period",
    tags=["Period Tracker"]
)

@router.post("/")
def save_period(period: PeriodCreate, db: Session = Depends(get_db)):

    new_period = Period(
        user_name=period.user_name,
        last_period_date=period.last_period_date,
        cycle_length=period.cycle_length
    )

    db.add(new_period)
    db.commit()
    db.refresh(new_period)

    last_date = datetime.strptime(
        period.last_period_date,
        "%Y-%m-%d"
    )

    next_period = last_date + timedelta(
        days=period.cycle_length
    )

    return {
        "message": "Period data saved",
        "id": new_period.id,
        "next_period_date": next_period.strftime("%Y-%m-%d")
    }


@router.get("/")
def get_periods(db: Session = Depends(get_db)):
    return db.query(Period).all()