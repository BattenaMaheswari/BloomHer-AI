"use client";

import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          goal,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

    } catch (error) {
      console.error(error);
      setMessage("Error saving profile");
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          👤 Profile Setup
        </h1>

        <div className="space-y-4">

          <input
            className="border p-3 w-full rounded-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full rounded-lg"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full rounded-lg"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full rounded-lg"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <input
            className="border p-3 w-full rounded-lg"
            placeholder="Goal (e.g., Healthy Lifestyle)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Save Profile
          </button>

          {message && (
            <p className="text-green-600 font-semibold mt-4">
              {message}
            </p>
          )}

        </div>
      </div>

    </main>
  );
}