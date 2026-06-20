"use client";

import { useState } from "react";


export default function ChatPage() {


  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const [message, setMessage] = useState("");

  const [chat, setChat] = useState<
    { role: string; text: string }[]
  >([]);



  const sendMessage = async () => {


    if (!message.trim()) return;


    const userMsg = message;


    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: userMsg,
      },
    ]);


    setMessage("");



    try {


      const res = await fetch(
        `${API_URL}/chat/`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            message: userMsg,

          }),

        }
      );



      const data = await res.json();



      setChat((prev) => [

        ...prev,

        {
          role: "ai",
          text: data.reply || "No response",
        },

      ]);



    } catch (error) {


      setChat((prev) => [

        ...prev,

        {
          role: "ai",
          text: "Unable to connect to BloomHer AI",
        },

      ]);


    }

  };



  return (

    <main className="min-h-screen bg-pink-50 p-6 flex flex-col">


      <h1 className="text-3xl font-bold text-purple-700 mb-4">

        💬 BloomHer AI Chat

      </h1>




      <div className="flex-1 bg-white rounded-xl p-4 overflow-y-auto shadow">


        {chat.map((c, i) => (


          <div

            key={i}

            className={`mb-3 flex ${
              c.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}

          >


            <div

              className={`px-4 py-2 rounded-xl max-w-[70%] whitespace-pre-wrap ${
                c.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-black"
              }`}

            >

              {c.text}

            </div>


          </div>


        ))}


      </div>




      <div className="mt-4 flex gap-2">


        <input

          className="flex-1 border p-3 rounded-lg"

          placeholder="Type your symptoms..."

          value={message}

          onChange={(e)=>setMessage(e.target.value)}

        />



        <button

          onClick={sendMessage}

          className="bg-purple-600 text-white px-6 py-3 rounded-lg"

        >

          Send

        </button>


      </div>



    </main>

  );

}