"use client";

import { useState } from "react";

export default function PCOSPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [formData, setFormData] = useState({
    user_name: "",
    age: "",
    bmi: "",
    cycle_length: "",
    lh: "",
    fsh: "",
    amh: "",
    weight_gain: "",
    hair_growth: "",
  });


  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");



  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      const response = await fetch(
        `${API_URL}/pcos/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            user_name: formData.user_name,

            age: Number(formData.age),

            bmi: Number(formData.bmi),

            cycle_length: Number(formData.cycle_length),

            lh: Number(formData.lh),

            fsh: Number(formData.fsh),

            amh: Number(formData.amh),

            weight_gain: Number(formData.weight_gain),

            hair_growth: Number(formData.hair_growth),

          }),

        }
      );


      const data = await response.json();

      setResult(data);


    } catch (err) {

      setError(
        "Unable to connect to BloomHer server"
      );

    }

  };



  return (

    <main className="min-h-screen bg-pink-50 p-6">


      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🩺 PCOS Prediction
      </h1>



      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md"
      >


        {Object.keys(formData).map((field) => (

          <input

            key={field}

            name={field}

            placeholder={field.replace("_"," ")}

            value={(formData as any)[field]}

            onChange={handleChange}

            className="border p-2 rounded"

          />

        ))}



        <button

          type="submit"

          className="bg-pink-500 text-white p-2 rounded"

        >

          Predict

        </button>


      </form>



      {error && (

        <p className="text-red-500 mt-4">
          {error}
        </p>

      )}



      {result && (

        <div className="mt-6 bg-white shadow p-5 rounded-xl">


          <h2 className="text-xl font-bold">
            Result
          </h2>


          <p>
            Risk: {result.risk}
          </p>


          <p>
            Confidence: {result.confidence}%
          </p>


        </div>

      )}
    </main>
  );
}