"use client";

import { useState } from "react";
import Image from "next/image";

export default function PeriodPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [userName, setUserName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
          start_date: startDate,
          end_date: endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || "Unable to save period details."
        );
      }

      setResult(data);

      setUserName("");
      setStartDate("");
      setEndDate("");

    } catch (err: any) {
      setError(
        err.message || "Unable to connect to BloomHer server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 px-4 py-8">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">

        {/* Header */}

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/periodtracker.jpeg"
            alt="Period Tracker"
            width={180}
            height={180}
            priority
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-pink-400 shadow-lg object-cover"
          />

          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-pink-700 text-center">
            Period Tracker
          </h1>

          <p className="mt-3 text-center text-gray-600 text-sm sm:text-base leading-6 px-2">
            Keep tracking your menstrual cycle regularly to better understand
            your cycle pattern and predict upcoming periods.
          </p>

        </div>
                {/* Form */}

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              User Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Period Details"}
          </button>

        </div>
                {/* Error Message */}

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Success Result */}

        {result && (
          <div className="mt-8 rounded-2xl border border-pink-200 p-6">

            <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
              Period Saved Successfully
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-medium text-gray-700">
                  Start Date
                </span>

                <span className="font-semibold text-pink-600">
                  {result.start_date}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  End Date
                </span>

                <span className="font-semibold text-pink-600">
                  {result.end_date}
                </span>
              </div>

            </div>

            <button
              onClick={() => {
                setResult(null);
                setError("");
              }}
              className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Track Another Cycle
            </button>

          </div>
        )}

      </div>

    </main>
  );
}