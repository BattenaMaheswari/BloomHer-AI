"use client";

import { useState } from "react";
import Image from "next/image";

export default function PeriodPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [userName, setUserName] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch(`${API_URL}/period/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          last_period_date: lastPeriodDate,
          cycle_length: Number(cycleLength),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Unable to save period details.");
      }

      setResult(data);

      setUserName("");
      setLastPeriodDate("");
      setCycleLength("");

    } catch (err: any) {
      setError(err.message || "Unable to connect to BloomHer server.");
    } finally {
      setLoading(false);
    }
  }

  function resetPrediction() {
    setResult(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 px-4 py-8">

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/periodtracker.jpeg"
            alt="Period Tracker"
            width={170}
            height={170}
            priority
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-pink-400 shadow-lg object-cover"
          />

          <h1 className="mt-5 text-3xl font-bold text-pink-700">
            Period Tracker
          </h1>

          <p className="text-center text-gray-600 mt-2">
            Keep tracking your menstrual cycle regularly to better understand
            your cycle and predict your next period.
          </p>

        </div>

        <div className="space-y-5">

          <div>
  <label className="block mb-2 font-medium text-gray-700">
    User Name
  </label>

  <input
    type="text"
    placeholder="Enter your name"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
  />
</div>

<div>
  <label className="block mb-2 font-medium text-gray-700">
    Last Period Date
  </label>

  <input
    type="date"
    value={lastPeriodDate}
    onChange={(e) => setLastPeriodDate(e.target.value)}
    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
  />
</div>

<div>
  <label className="block mb-2 font-medium text-gray-700">
    Cycle Length (Days)
  </label>

  <input
    type="number"
    placeholder="Example: 28"
    value={cycleLength}
    onChange={(e) => setCycleLength(e.target.value)}
    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
  />
</div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400"
          >
            {loading ? "Predicting..." : "Predict Next Period"}
          </button>

        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 border border-pink-200 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
              Prediction Result
            </h2>

            <div className="flex justify-between items-center border-b pb-3">

              <span className="font-medium text-gray-700">
                Next Period Date
              </span>

              <span className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none">
                {result.next_period_date}
              </span>

            </div>

            <button
              onClick={resetPrediction}
              className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Predict Another Cycle
            </button>

          </div>
        )}

      </div>

    </main>
  );
}