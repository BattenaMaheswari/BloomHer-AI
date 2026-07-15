"use client";

import { useState } from "react";
import Image from "next/image";
<div className="flex flex-col items-center mb-8">

  <Image
    src="/images/profile.jpg"
    alt="Profile"
    width={180}
    height={180}
    className="rounded-full border-4 border-pink-400 shadow-lg object-cover"
  />

  <h2 className="mt-4 text-2xl font-bold text-purple-700">
    My Profile
  </h2>

  <p className="text-gray-500">
    Manage your personal health information
  </p>

</div>

export default function ProfilePage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  }

  async function saveProfile(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/profile/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            age: Number(formData.age),
            height: Number(formData.height),
            weight: Number(formData.weight),
            goal: formData.goal,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || "Unable to save profile."
        );
      }

      setMessage("✅ Profile saved successfully!");

    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          👤 My Profile
        </h1>

        <form
          onSubmit={saveProfile}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="goal"
            placeholder="Goal (Weight Loss / Healthy Lifestyle)"
            value={formData.goal}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>

        {message && (
          <div className="mt-5 bg-purple-100 text-purple-700 p-4 rounded-xl">
            {message}
          </div>
        )}

      </div>

    </main>
  );
}