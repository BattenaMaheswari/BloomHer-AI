import os
import joblib
import numpy as np

from fastapi import HTTPException

from app.database.models import PCOSPrediction



# Model path

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



# Check model exists

if not os.path.exists(MODEL_PATH):

    raise FileNotFoundError(
        f"PCOS model not found: {MODEL_PATH}"
    )



# Load ML model

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


        prediction = model.predict(
            features
        )[0]



        probability = model.predict_proba(
            features
        )[0]



        confidence = round(
            float(max(probability)) * 100,
            2
        )



        risk = (

            "High Risk"

            if prediction == 1

            else "Low Risk"

        )



        # Save prediction

        new_prediction = PCOSPrediction(

            user_name=data.user_name,

            risk=risk,

            confidence=confidence

        )


        db.add(new_prediction)

        db.commit()

        db.refresh(new_prediction)



        return {

            "risk": risk,

            "confidence": confidence,

            "message":
            "PCOS prediction completed successfully."

        }



    except Exception as e:


        db.rollback()


        print(
            "PCOS Prediction Error:",
            str(e)
        )


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )