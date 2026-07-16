"use client";

import { useState } from "react";
import Image from "next/image";

interface PCOSFormData {
  user_name: string;
  age: string;
  bmi: string;
  cycle_length: string;
  lh: string;
  fsh: string;
  amh: string;
  weight_gain: string;
  hair_growth: string;
}

interface PCOSResult {
  risk?: string;
  confidence?: number;
  prediction?: string;
  message?: string;
}

export default function PCOSPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const initialForm: PCOSFormData = {
    user_name: "",
    age: "",
    bmi: "",
    cycle_length: "",
    lh: "",
    fsh: "",
    amh: "",
    weight_gain: "",
    hair_growth: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState<PCOSResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setResult(null);
    setError("");
  }

  function resetForm() {
    setFormData(initialForm);
    setResult(null);
    setError("");
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setResult(null);

      if (!API_URL) {
        throw new Error("API URL is missing.");
      }

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

      if (!response.ok) {
        throw new Error(
          data.detail || "Prediction failed."
        );
      }

      setResult(data);

    } catch (err: any) {
      setError(
        err.message ||
        "Unable to connect to BloomHer server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 px-4 py-8">

<div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">

        {/* Image */}

        <div className="flex flex-col items-center mb-8">

        <Image
  src="/images/pcosprediction.jpg"
  alt="PCOS Prediction"
  width={180}
  height={180}
  priority
  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-pink-400 shadow-lg object-cover"
/>

          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-purple-700 text-center">
            PCOS Prediction
          </h1>

          <p className="text-gray-600 mt-2 text-center text-sm sm:text-base px-2">
            Predict your PCOS risk overhere
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {Object.keys(formData).map((field) => (

            <input
              key={field}
              name={field}
              value={
                formData[field as keyof PCOSFormData]
              }
              onChange={handleChange}
              placeholder={
                field.replaceAll("_", " ").toUpperCase()
              }
              className="w-full border border-gray-300 p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

        </form>

        {error && (

          <div className="mt-5 bg-red-100 text-red-600 p-4 rounded-xl">

            {error}

          </div>

        )}

        {result && (

          <div className="mt-6 rounded-2xl border border-purple-200 p-5">

            <h2 className="text-xl font-bold text-purple-700">
              Prediction Result
            </h2>

            <p className="mt-3">
              <strong>Risk:</strong> {result.risk || result.prediction}
            </p>

            {result.confidence !== undefined && (

              <p>
                <strong>Confidence:</strong> {result.confidence}%
              </p>

            )}

            {result.message && (

              <p className="mt-3">
                {result.message}
              </p>

            )}

            <button
              onClick={resetForm}
              className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Predict Another User
            </button>

          </div>

        )}

      </div>

    </main>
  );
}