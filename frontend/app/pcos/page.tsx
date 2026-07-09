"use client";

import { useState } from "react";

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

    // Remove previous prediction while entering new details
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

      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Prediction failed."
        );
      }

      setResult(data);

    } catch (err: any) {
      console.error(err);

      setError(
        err.message ||
          "Unable to connect to BloomHer server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          🩺 PCOS Prediction
        </h1>

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
              placeholder={field
                .replaceAll("_", " ")
                .toUpperCase()}
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 disabled:bg-gray-400 transition"
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

          <div className="mt-6 bg-purple-50 rounded-xl p-5 shadow">

            <h2 className="text-xl font-bold text-purple-700">
              Prediction Result
            </h2>

            <p className="mt-3">
              <strong>Risk:</strong>{" "}
              {result.risk || result.prediction}
            </p>

            {result.confidence !== undefined && (
              <p>
                <strong>Confidence:</strong>{" "}
                {result.confidence}%
              </p>
            )}

            {result.message && (
              <p className="mt-3">
                {result.message}
              </p>
            )}

            <button
              onClick={resetForm}
              className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Predict Another User
            </button>

          </div>

        )}

      </div>

    </main>
  );
}