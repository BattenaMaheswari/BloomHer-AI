from pydantic import BaseModel


class PCOSPredictRequest(BaseModel):
    user_name: str

    age: float
    bmi: float
    cycle_length: float
    lh: float
    fsh: float
    amh: float
    weight_gain: int
    hair_growth: int