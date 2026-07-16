"use client";

import { useState } from "react";
import Image from "next/image";

export default function WaterPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [userName, setUserName] = useState("");
  const [glasses, setGlasses] = useState("");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch(`${API_URL}/water/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          glasses: Number(glasses),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || "Unable to save water intake."
        );
      }

      setResult(data);

      // Clear form
      setUserName("");
      setGlasses("");

    } catch (err: any) {
      setError(
        err.message || "Unable to connect to BloomHer server"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Water Image */}

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/waterintake.webp"
            alt="Water Tracker"
            width={180}
            height={180}
            priority
            className="rounded-full border-4 border-blue-400 shadow-lg object-cover"
          />

          <h1 className="text-3xl font-bold text-blue-700 mt-5">
            Water Tracker
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Track your daily water intake
          </p>

        </div>

    <div className="mb-4">
  <label className="block mb-2 font-medium text-gray-700">
    User Name
  </label>

  <input
    type="text"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
    placeholder="Enter your name"
    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

<div className="mb-5">
  <label className="block mb-2 font-medium text-gray-700">
    Water Intake (Glasses)
  </label>

  <input
    type="number"
    value={glasses}
    onChange={(e) => setGlasses(e.target.value)}
    placeholder="Example: 8"
    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Water Intake"}
        </button>

        {error && (
          <div className="mt-5 bg-red-100 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {result && (
  <div className="mt-6 border border-blue-200 rounded-2xl p-6">

    <h2 className="text-xl font-bold text-blue-700 mb-4">
      Water Intake Summary
    </h2>

    <div className="flex justify-between border-b pb-3">
      <span className="font-medium text-gray-700">
        Water Intake
      </span>

      <span className="font-bold text-blue-600">
        {result.glasses} Glasses
      </span>
    </div>

    {Number(result.glasses) < 8 ? (
      <div className="mt-4">
        <h3 className="font-semibold text-blue-700">
          Recommendation
        </h3>

        <p className="text-gray-700 leading-7 mt-2">
          Your water intake is below the recommended level. Try to drink approximately
          <strong> 2 to 2.5 liters of water per day</strong> (about 8–10 glasses)
          to stay hydrated and support your overall health.
        </p>
      </div>
    ) : (
      <div className="mt-4">
        <h3 className="font-semibold text-green-700">
          Great Job!
        </h3>

        <p className="text-gray-700 leading-7 mt-2">
          You're maintaining a healthy level of hydration. Continue drinking
          enough water throughout the day to support your body's daily needs.
        </p>
      </div>
    )}

  </div>
)}
</div>

    </main>
    
  );
}