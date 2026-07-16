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

      const res = await fetch(`${API_URL}/profile/`, {
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
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.detail || "Unable to save profile."
        );
      }

      setMessage("Profile saved successfully.");

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
    <main className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Profile Header */}

        <div className="flex flex-col items-center mb-8">

          <Image
            src="/images/womenprofile.jpg"
            alt="Profile"
            width={160}
            height={160}
            priority
            className="rounded-full border-4 border-pink-300 shadow-lg object-cover"
          />

          <h1 className="mt-5 text-3xl font-bold text-purple-700">
            My Profile
          </h1>

        </div>

        <form
          onSubmit={saveProfile}
          className="space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Height (cm)
              </label>

              <input
                type="number"
                name="height"
                placeholder="Enter your height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

          </div>

          <div>

            <label className="block text-gray-700 font-medium mb-2">
              Health Goal
            </label>

            <input
              type="text"
              name="goal"
              placeholder="Weight Loss / Healthy Lifestyle"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

          </div>
                    <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400"
          >
            {loading ? "Saving Profile..." : "Save Profile"}
          </button>

        </form>

        {message && (
          <div
            className={`mt-5 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-8">

          <h2 className="text-xl font-bold text-purple-700 mb-3">
            Healthy Lifestyle Tips
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Drink 2–3 liters of water every day to stay hydrated.</li>
            <li>Eat a balanced diet rich in fruits, vegetables, whole grains, and protein.</li>
            <li>Exercise for at least 30 minutes daily to improve physical and mental health.</li>
            <li>Sleep for 7–8 hours every night for better recovery.</li>
            <li>Track your menstrual cycle regularly.</li>
            <li>Schedule regular health checkups for early detection and prevention.</li>
          </ul>

        </div>

      </div>

    </main>
  );
}