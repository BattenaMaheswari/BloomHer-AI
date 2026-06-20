import os
import joblib
import numpy as np

MODEL_PATH = "ml/period_risk_model.pkl"

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    model = None

def predict_period_risk(data):

    features = np.array([[
        data.age,
        data.bmi,
        data.cycle_length,
        data.weight,
        data.height,
        data.fsh,
        data.lh,
        data.hb,
        data.prolactin,
        data.amh
    ]])

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    confidence = round(max(probability) * 100, 2)

    risk = "High Risk" if prediction == 1 else "Low Risk"

    return {
        "risk": risk,
        "confidence": confidence
    }