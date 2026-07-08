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
# SEND MESSAGE
# =========================

@router.post("")
def send_chat(
    req: ChatCreate,
    db: Session = Depends(get_db)
):

    try:

        # Get AI reply
        ai_reply = get_ai_response(req.message)


        # Save in database
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

        return {
            "error": str(e)
        }



# =========================
# CHAT HISTORY
# =========================

@router.get("")
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