"use client";

import { useState } from "react";
import Image from "next/image";

export default function HealthTest() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
        throw new Error(
          data.detail || "Unable to analyze your health."
        );
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/womenhealth assesment.jpg"
            alt="Health Assessment"
            width={170}
            height={170}
            priority
            className="rounded-full border-4 border-pink-300 shadow-lg object-cover"
          />

          <h1 className="mt-5 text-3xl font-bold text-purple-700">
            Health Assessment
          </h1>

          <p className="text-gray-600 mt-2 text-center">
            Enter your health details to receive an AI-powered health assessment.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Height (cm)
            </label>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
                    <div>
            <label className="block mb-2 font-medium text-gray-700">
              Weight (kg)
            </label>

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Cycle Length (days)
            </label>

            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="Enter cycle length"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

        </div>

        <div className="mt-8">

  <h2 className="text-2xl font-bold text-purple-700 mb-5">
    Symptoms
  </h2>

  <div className="space-y-4">

    <label className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
      <input
        type="checkbox"
        checked={irregularPeriods}
        onChange={(e) => setIrregularPeriods(e.target.checked)}
        className="w-5 h-5 accent-pink-600"
      />
      Irregular Periods
    </label>

    <label className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
      <input
        type="checkbox"
        checked={acne}
        onChange={(e) => setAcne(e.target.checked)}
        className="w-5 h-5 accent-pink-600"
      />
      Acne
    </label>

    <label className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
      <input
        type="checkbox"
        checked={hairLoss}
        onChange={(e) => setHairLoss(e.target.checked)}
        className="w-5 h-5 accent-pink-600"
      />
      Hair Loss
    </label>

    <label className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
      <input
        type="checkbox"
        checked={weightGain}
        onChange={(e) => setWeightGain(e.target.checked)}
        className="w-5 h-5 accent-pink-600"
      />
      Weight Gain
    </label>

    <label className="flex items-center gap-3 text-gray-700 text-lg cursor-pointer">
      <input
        type="checkbox"
        checked={fatigue}
        onChange={(e) => setFatigue(e.target.checked)}
        className="w-5 h-5 accent-pink-600"
      />
      Fatigue
    </label>

  </div>

</div>
                  <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Analyze My Health"}
        </button>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 text-center">
            {error}
          </div>
        )}

        {result && (

          <div className="mt-8 rounded-2xl border border-purple-200 p-6">

            <h2 className="text-2xl font-bold text-purple-700 mb-5">
              Prediction Results
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-700">
                  PCOS Risk
                </span>

                <span className="font-bold text-pink-600">
                  {result.pcos_risk}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-700">
                  Thyroid Risk
                </span>

                <span className="font-bold text-purple-600">
                  {result.thyroid_risk}%
                </span>
              </div>

            </div>

            <button
              onClick={resetForm}
              className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Analyze Another User
            </button>

          </div>

        )}

      </div>
     

    </main>
  );
}