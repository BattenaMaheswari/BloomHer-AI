from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import User
from app.schemas.profile import ProfileCreate

router = APIRouter(prefix="/profile", tags=["Profile"])


# ✅ POST - Save profile
@router.post("/")
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):

    new_user = User(
        name=profile.name,
        age=profile.age,
        height=profile.height,
        weight=profile.weight,
        goal=profile.goal
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Profile saved successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name
        }
    }


# ✅ GET - Fetch profiles
@router.get("/")
def get_profiles(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return [
        {
            "id": u.id,
            "name": u.name,
            "age": u.age,
            "height": u.height,
            "weight": u.weight,
            "goal": u.goal
        }
        for u in users
    ]