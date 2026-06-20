from pydantic import BaseModel

class PeriodRiskMLRequest(BaseModel):
    age: int
    bmi: float
    cycle_length: int
    weight: float
    height: float
    fsh: float
    lh: float
    hb: float
    prolactin: float
    amh: float