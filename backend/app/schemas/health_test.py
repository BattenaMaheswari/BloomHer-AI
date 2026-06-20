from pydantic import BaseModel

class HealthTestRequest(BaseModel):
    age: int
    height: float
    weight: float
    cycle_length: int

    irregular_periods: bool
    acne: bool
    hair_loss: bool
    weight_gain: bool
    fatigue: bool