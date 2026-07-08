from fastapi import APIRouter, Depends, HTTPException
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
# SEND MESSAGE
# =========================
@router.post("/")
def send_chat(
    req: ChatCreate,
    db: Session = Depends(get_db)
):
    try:
        # Get AI response
        ai_reply = get_ai_response(req.message)

        # Save chat in database
        chat = Chat(
            user_message=req.message,
            ai_response=ai_reply
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)

        return {
            "response": ai_reply
        }

    except Exception as e:
        db.rollback()
        print("Database Error:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save chat: {str(e)}"
        )


# =========================
# CHAT HISTORY
# =========================
@router.get("/")
def chat_history(
    db: Session = Depends(get_db)
):
    chats = (
        db.query(Chat)
        .order_by(Chat.id.desc())
        .all()
    )

    return {
        "history": [
            {
                "id": chat.id,
                "message": chat.user_message,
                "response": chat.ai_response,
                "time": chat.created_at
            }
            for chat in chats
        ]
    }


# =========================
# CLEAR CHAT HISTORY
# =========================
@router.delete("/")
def clear_chat(
    db: Session = Depends(get_db)
):
    try:
        db.query(Chat).delete()
        db.commit()

        return {
            "message": "Chat history cleared successfully."
        }

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to clear chat history: {str(e)}"
        )