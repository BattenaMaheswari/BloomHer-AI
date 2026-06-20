"use client";

import { useState } from "react";


export default function WaterPage() {


  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [userName, setUserName] = useState("");

  const [glasses, setGlasses] = useState("");

  const [result, setResult] = useState<any>(null);

  const [error, setError] = useState("");




  const handleSubmit = async () => {


    try {


      const res = await fetch(
        `${API_URL}/water/`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            user_name: userName,

            glasses: Number(glasses),

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

    <main className="min-h-screen bg-blue-50 p-8">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">


        <h1 className="text-3xl font-bold text-blue-600 mb-6">

          💧 Water Tracker

        </h1>




        <input

          className="border p-3 rounded-lg mb-4 w-full"

          placeholder="User Name"

          value={userName}

          onChange={(e)=>setUserName(e.target.value)}

        />




        <input

          type="number"

          className="border p-3 rounded-lg mb-4 w-full"

          placeholder="Glasses Drank Today"

          value={glasses}

          onChange={(e)=>setGlasses(e.target.value)}

        />




        <button

          onClick={handleSubmit}

          className="w-full bg-blue-500 text-white py-3 rounded-lg"

        >

          Save Water Intake

        </button>





        {error && (

          <p className="text-red-500 mt-4">

            {error}

          </p>

        )}






        {result && (

          <div className="mt-6 bg-blue-100 p-4 rounded-xl">


            <h2 className="font-bold text-blue-700">

              Saved Successfully

            </h2>



            <p className="mt-2">

              Glasses: {result.glasses}

            </p>


          </div>

        )}



      </div>


    </main>

  );

}