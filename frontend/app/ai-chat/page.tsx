"use client";

import { useState } from "react";

export default function AIChat() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message
        }),
      }
    );

    const data = await res.json();

    setResponse(data.response);
  }


  return (
    <div className="min-h-screen bg-pink-50 p-8">

      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        🤖 BloomHer AI Chat
      </h1>


      <input
        className="border p-3 rounded-lg w-full"
        placeholder="Ask about PCOS, periods, diet..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />


      <button
        onClick={sendMessage}
        className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-xl"
      >
        Send
      </button>


      <div className="mt-6 bg-white p-5 rounded-xl">
        {response}
      </div>


    </div>
  );
}