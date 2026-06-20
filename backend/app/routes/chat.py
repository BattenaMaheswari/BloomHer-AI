from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import Chat
from app.schemas.chat import ChatCreate

from app.services.ai_service import get_ai_response


router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


# =========================
# SEND MESSAGE TO AI
# =========================

@router.post("/")
def chat(
    req: ChatCreate,
    db: Session = Depends(get_db)
):

    # AI response
    reply = get_ai_response(
        req.message
    )


    # Save chat history
    new_chat = Chat(
        user_message=req.message,
        ai_response=reply
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)


    return {
        "reply": reply
    }



# =========================
# GET CHAT HISTORY
# =========================

@router.get("/")
def get_chats(
    db: Session = Depends(get_db)
):

    chats = (
        db.query(Chat)
        .order_by(Chat.id.desc())
        .all()
    )


    return [
        {
            "id": chat.id,
            "user_message": chat.user_message,
            "ai_response": chat.ai_response,
            "created_at": chat.created_at
        }
        for chat in chats
    ]