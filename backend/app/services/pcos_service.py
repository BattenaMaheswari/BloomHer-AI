import os
import joblib
import numpy as np

from app.database.models import PCOSPrediction


# Get correct path for Render + local
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "pcos_model.pkl"
)


model = joblib.load(MODEL_PATH)



def predict_pcos_risk(data, db):

    try:

        features = np.array([[
            data.age,
            data.bmi,
            data.cycle_length,
            data.lh,
            data.fsh,
            data.amh,
            data.weight_gain,
            data.hair_growth
        ]])


        prediction = model.predict(features)[0]

        probability = model.predict_proba(features)[0]


        confidence = round(
            float(max(probability)) * 100,
            2
        )


        risk = (
            "High Risk"
            if prediction == 1
            else "Low Risk"
        )


        new_prediction = PCOSPrediction(
            risk=risk,
            confidence=confidence
        )


        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)


        return {
            "risk": risk,
            "confidence": confidence
        }



    except Exception as e:

        return {
            "error": str(e)
        }