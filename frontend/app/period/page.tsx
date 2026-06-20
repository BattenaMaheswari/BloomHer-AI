"use client";

import { useState } from "react";


export default function PeriodPage() {


  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [userName, setUserName] = useState("");

  const [lastPeriodDate, setLastPeriodDate] = useState("");

  const [cycleLength, setCycleLength] = useState("");

  const [result, setResult] = useState<any>(null);

  const [error, setError] = useState("");




  const handleSubmit = async () => {


    try {


      const res = await fetch(
        `${API_URL}/period/`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            user_name: userName,

            last_period_date: lastPeriodDate,

            cycle_length: Number(cycleLength),

          }),

        }
      );



      const data = await res.json();


      setResult(data);



    } catch (err) {


      setError(
        "Unable to connect to BloomHer server"
      );


    }


  };




  return (

    <main className="min-h-screen bg-pink-50 p-8">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">


        <h1 className="text-3xl font-bold text-pink-600 mb-6">

          🌸 Period Tracker

        </h1>




        <input

          className="border p-3 rounded-lg mb-4 w-full"

          placeholder="User Name"

          value={userName}

          onChange={(e)=>setUserName(e.target.value)}

        />




        <input

          type="date"

          className="border p-3 rounded-lg mb-4 w-full"

          value={lastPeriodDate}

          onChange={(e)=>setLastPeriodDate(e.target.value)}

        />




        <input

          type="number"

          className="border p-3 rounded-lg mb-4 w-full"

          placeholder="Cycle Length"

          value={cycleLength}

          onChange={(e)=>setCycleLength(e.target.value)}

        />




        <button

          onClick={handleSubmit}

          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg"

        >

          Save Period

        </button>




        {error && (

          <p className="text-red-500 mt-4">

            {error}

          </p>

        )}






        {result && (

          <div className="mt-6 bg-pink-100 p-4 rounded-xl">


            <h2 className="font-bold text-pink-700">

              Next Period Date

            </h2>



            <p className="text-xl mt-2">

              {result.next_period_date}

            </p>


          </div>

        )}



      </div>


    </main>

  );

}