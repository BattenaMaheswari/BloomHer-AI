from pydantic import BaseModel

class WaterCreate(BaseModel):
    user_name: str
    glasses: int