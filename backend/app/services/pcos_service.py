import joblib
import numpy as np

from app.database.models import PCOSPrediction

model = joblib.load("ml/pcos_model.pkl")


def predict_pcos_risk(data, db):

    try:
        # input features
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

        # prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]

        confidence = round(float(max(probability)) * 100, 2)

        risk = "High Risk" if prediction == 1 else "Low Risk"

        # save DB
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