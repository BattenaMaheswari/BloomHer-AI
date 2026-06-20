from pydantic import BaseModel

class ChatCreate(BaseModel):
    message: str
    pcos_risk: str | None = None