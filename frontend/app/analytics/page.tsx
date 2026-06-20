"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function AnalyticsPage() {


  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [pcos, setPcos] = useState<any[]>([]);
  const [water, setWater] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  useEffect(() => {


    const loadAnalytics = async () => {


      try {


        const pcosRes = await fetch(
          `${API_URL}/pcos/history`
        );


        const waterRes = await fetch(
          `${API_URL}/water/`
        );



        if (!pcosRes.ok || !waterRes.ok) {

          throw new Error("API Error");

        }



        const pcosData = await pcosRes.json();

        const waterData = await waterRes.json();



        setPcos(pcosData);

        setWater(waterData);



      } catch (err) {


        setError(
          "Unable to load analytics"
        );


      } finally {


        setLoading(false);


      }


    };



    loadAnalytics();


  }, [API_URL]);





  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-purple-700">

        Loading Analytics 📊

      </div>

    );

  }




  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center text-red-500">

        {error}

      </div>

    );

  }





  const chartData = [

    {
      name: "High Risk",

      count: pcos.filter(
        item => item.risk === "High Risk"
      ).length

    },


    {
      name: "Low Risk",

      count: pcos.filter(
        item => item.risk === "Low Risk"
      ).length

    }

  ];





  return (

    <main className="min-h-screen bg-pink-50 p-8">



      <h1 className="text-3xl font-bold text-purple-700">

        📊 BloomHer Analytics

      </h1>





      <div className="grid md:grid-cols-3 gap-6 mt-8">



        <div className="bg-white p-6 rounded-xl shadow">

          <h2>
            PCOS Predictions
          </h2>


          <p className="text-3xl font-bold">

            {pcos.length}

          </p>


        </div>





        <div className="bg-white p-6 rounded-xl shadow">

          <h2>
            Water Records
          </h2>


          <p className="text-3xl font-bold">

            {water.length}

          </p>


        </div>





        <div className="bg-white p-6 rounded-xl shadow">


          <h2>
            Latest Risk
          </h2>



          <p className="text-xl font-bold">

            {
              pcos.length
              ? pcos[pcos.length - 1].risk
              : "No Data"
            }

          </p>


        </div>



      </div>





      <div className="bg-white mt-10 p-6 rounded-xl shadow">


        <h2 className="text-xl font-bold mb-4">

          🩺 PCOS Risk Overview

        </h2>





        <ResponsiveContainer width="100%" height={300}>


          <BarChart data={chartData}>


            <XAxis dataKey="name"/>


            <YAxis/>


            <Tooltip/>


            <Bar dataKey="count"/>


          </BarChart>



        </ResponsiveContainer>


      </div>




    </main>

  );

}