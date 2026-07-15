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

        <input
          className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-3 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Glasses Drank Today"
          value={glasses}
          onChange={(e) => setGlasses(e.target.value)}
        />

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
          <div className="mt-6 bg-blue-100 p-5 rounded-xl">

            <h2 className="text-xl font-bold text-blue-700">
              Saved Successfully
            </h2>

            <p className="mt-3">
              Water Intake: <strong>{result.glasses}</strong> Glasses
            </p>

          </div>
        )}

      </div>

    </main>
  );
}