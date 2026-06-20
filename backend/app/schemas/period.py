from pydantic import BaseModel

class PeriodCreate(BaseModel):
    user_name: str
    last_period_date: str
    cycle_length: int