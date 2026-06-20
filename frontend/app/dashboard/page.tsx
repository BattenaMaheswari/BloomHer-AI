"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [period, setPeriod] = useState<any>(null);
  const [water, setWater] = useState<any>(null);
  const [pcos, setPcos] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const profileRes = await fetch(
          `${API_URL}/profile/`
        );

        const periodRes = await fetch(
          `${API_URL}/period/`
        );

        const waterRes = await fetch(
          `${API_URL}/water/`
        );

        const pcosRes = await fetch(
          `${API_URL}/pcos/history`
        );


        if (
          !profileRes.ok ||
          !periodRes.ok ||
          !waterRes.ok ||
          !pcosRes.ok
        ) {
          throw new Error("Backend error");
        }


        const profileData = await profileRes.json();
        const periodData = await periodRes.json();
        const waterData = await waterRes.json();
        const pcosData = await pcosRes.json();



        if (profileData.length > 0) {
          setUser(profileData[profileData.length - 1]);
        }


        if (periodData.length > 0) {
          setPeriod(periodData[periodData.length - 1]);
        }


        if (waterData.length > 0) {
          setWater(waterData[waterData.length - 1]);
        }


        if (pcosData.length > 0) {
          setPcos(pcosData[pcosData.length - 1]);
        }


      } catch (error) {

        setError(
          "Unable to connect to BloomHer server"
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, [API_URL]);



  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 text-xl">
        Loading BloomHer AI 🌸
      </div>
    );

  }



  if (error) {

    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );

  }



  return (

    <main className="min-h-screen bg-pink-50 p-8">


      <h1 className="text-4xl font-bold text-purple-700">
        🌸 Hi {user?.name || "User"}
      </h1>


      <p className="text-gray-600 mt-2">
        Welcome back to BloomHer AI
      </p>



      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">


        <div className="bg-white p-6 rounded-xl shadow">
          <h2>👤 Age</h2>
          <p className="text-2xl font-bold">
            {user?.age || "-"}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2>⚖️ Weight</h2>
          <p className="text-2xl font-bold">
            {user?.weight || "-"}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2>📏 Height</h2>
          <p className="text-2xl font-bold">
            {user?.height || "-"}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2>🎯 Goal</h2>
          <p className="text-2xl font-bold">
            {user?.goal || "-"}
          </p>
        </div>


        <div className="bg-pink-100 p-6 rounded-xl shadow">
          <h2>🌸 Last Period</h2>
          <p className="text-xl font-bold">
            {period?.last_period_date || "-"}
          </p>
        </div>


        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2>💧 Water Intake</h2>
          <p className="text-xl font-bold">
            {water?.glasses || 0} Glasses
          </p>
        </div>


        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2>🩺 PCOS Risk</h2>
          <p className="text-xl font-bold">
            {pcos?.risk || "No Data"}
          </p>
        </div>


        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2>📊 Confidence</h2>
          <p className="text-xl font-bold">
            {pcos?.confidence || 0}%
          </p>
        </div>


      </div>


    </main>

  );

}