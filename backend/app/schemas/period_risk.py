from pydantic import BaseModel


class PeriodRiskRequest(BaseModel):
    age: float
    bmi: float
    cycle_length: float
    weight: float
    height: float
    fsh: float
    lh: float
    hb: float
    prolactin: float
    amh: float