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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-8 flex flex-col items-center">

          <Image
            src="/images/womenprofile.jpg"
            alt="Profile"
            width={170}
            height={170}
            priority
            className="rounded-full border-4 border-white shadow-xl object-cover"
          />

          <h1 className="text-3xl font-bold text-white mt-5">
            My Profile
          </h1>

          <p className="text-pink-100 mt-2 text-center px-6">
            Manage your personal health information and wellness goals.
          </p>

        </div>

        <div className="p-8">

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
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
            >
              {loading ? "Saving Profile..." : "Save Profile"}
            </button>

          </form>

          {/* Success / Error Message */}

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium ${
                message.toLowerCase().includes("success")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Health Tips */}

          <div className="mt-8 bg-pink-50 rounded-2xl p-6 border border-pink-200">

            <h2 className="text-2xl font-bold text-purple-700 mb-5">
              🌸 Healthy Lifestyle Tips
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white rounded-xl p-4 shadow">
                💧 Drink 2–3 liters of water every day.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                🥗 Eat a balanced diet rich in fruits and vegetables.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                🚶 Exercise for at least 30 minutes daily.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                😴 Get 7–8 hours of quality sleep every night.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                📅 Track your menstrual cycle regularly.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                ❤️ Schedule regular health checkups.
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}