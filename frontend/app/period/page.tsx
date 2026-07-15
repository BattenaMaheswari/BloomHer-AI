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

      // Clear form
      setUserName("");
      setStartDate("");
      setEndDate("");

    } catch (err: any) {
      setError(
        err.message || "Unable to connect to BloomHer server"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/periodtracker.jpeg"
            alt="Period Tracker"
            width={180}
            height={180}
            priority
            className="rounded-full border-4 border-pink-400 shadow-lg object-cover"
          />

          <h1 className="text-3xl font-bold text-pink-700 mt-5">
            Period Tracker
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Track your menstrual cycle
          </p>

        </div>

        <input
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className="font-medium text-gray-600">
          Start Date
        </label>

        <input
          type="date"
          className="w-full border p-3 rounded-xl mb-4 mt-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="font-medium text-gray-600">
          End Date
        </label>

        <input
          type="date"
          className="w-full border p-3 rounded-xl mb-5 mt-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Period Details"}
        </button>

        {error && (
          <div className="mt-5 bg-red-100 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-pink-100 p-5 rounded-xl">

            <h2 className="text-xl font-bold text-pink-700">
              Saved Successfully
            </h2>

            <p className="mt-3">
              Start Date: <strong>{result.start_date}</strong>
            </p>

            <p>
              End Date: <strong>{result.end_date}</strong>
            </p>

          </div>
        )}

      </div>

    </main>
  );
}