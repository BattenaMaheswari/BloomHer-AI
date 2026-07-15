"use client";

import { useState } from "react";
import Image from "next/image";

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

      // Clear form
      setFormData({
        name: "",
        age: "",
        height: "",
        weight: "",
        goal: "",
      });

    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white p-6">

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Profile Image */}

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={180}
            height={180}
            priority
            className="rounded-full border-4 border-pink-400 shadow-lg object-cover"
          />

          <h1 className="text-3xl font-bold text-purple-700 mt-5">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Manage your personal health information
          </p>

        </div>

        <form
          onSubmit={saveProfile}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            name="goal"
            placeholder="Goal (Weight Loss / Healthy Lifestyle)"
            value={formData.goal}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 transition disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>

        {message && (

          <div className="mt-6 p-4 rounded-xl bg-purple-100 text-purple-700 text-center font-medium">

            {message}

          </div>

        )}

      </div>

    </main>
  );
}