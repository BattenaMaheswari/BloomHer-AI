from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import User, Chat

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/")
def get_analytics(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_chats = db.query(Chat).count()

    return {
        "total_users": total_users,
        "total_chats": total_chats
    }