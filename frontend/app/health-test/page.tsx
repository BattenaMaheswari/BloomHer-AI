"use client";

import { useState } from "react";
import Image from "next/image";

export default function HealthTest() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const resetForm = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setCycleLength("");

    setIrregularPeriods(false);
    setAcne(false);
    setHairLoss(false);
    setWeightGain(false);
    setFatigue(false);

    setResult(null);
    setError("");
  };

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const [irregularPeriods, setIrregularPeriods] = useState(false);
  const [acne, setAcne] = useState(false);
  const [hairLoss, setHairLoss] = useState(false);
  const [weightGain, setWeightGain] = useState(false);
  const [fatigue, setFatigue] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setResult(null);
      setError("");

      const response = await fetch(`${API_URL}/health-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          cycle_length: Number(cycleLength),
          irregular_periods: irregularPeriods,
          acne,
          hair_loss: hairLoss,
          weight_gain: weightGain,
          fatigue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to analyze health.");
      }

      setResult(data);
    } catch (err: any) {
      setError(
        err.message || "Unable to connect to BloomHer server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 px-4 py-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8">

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/womenhealth assesment.jpg"
            alt="Health Assessment"
            width={180}
            height={180}
            className="rounded-full border-4 border-purple-300 shadow-lg object-cover"
          />

          <h1 className="mt-4 text-3xl font-bold text-purple-700">
            Health Assessment
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Analyze your health symptoms using AI.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <input
            type="number"
            placeholder="Cycle Length (days)"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          />

        </div>

        <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">
          Symptoms
        </h2>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={irregularPeriods}
              onChange={(e) =>
                setIrregularPeriods(e.target.checked)
              }
            />
            Irregular Periods
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={acne}
              onChange={(e) => setAcne(e.target.checked)}
            />
            Acne
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hairLoss}
              onChange={(e) => setHairLoss(e.target.checked)}
            />
            Hair Loss
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={weightGain}
              onChange={(e) => setWeightGain(e.target.checked)}
            />
            Weight Gain
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={fatigue}
              onChange={(e) => setFatigue(e.target.checked)}
            />
            Fatigue
          </label>

        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-8 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Analyzing..." : "Analyze My Health"}
        </button>

        {error && (
          <div className="mt-6 bg-red-100 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {result && (

          <div className="mt-8 bg-purple-50 rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold text-purple-700 mb-5">
              Prediction Results
            </h2>

            <div className="space-y-3">

              <p className="text-lg">
                <strong>PCOS Risk:</strong> {result.pcos_risk}%
              </p>

              <p className="text-lg">
                <strong>Thyroid Risk:</strong> {result.thyroid_risk}%
              </p>

            </div>

            <button
              onClick={resetForm}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Analyze Another User
            </button>

          </div>

        )}

      </div>

    </main>
  );
}