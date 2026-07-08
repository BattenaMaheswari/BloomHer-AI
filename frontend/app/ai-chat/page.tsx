"use client";

import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            pcos_risk: null,
          }),
        }
      );

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);

      if (!res.ok) {
        setResponse(data.detail || "Something went wrong.");
        return;
      }

      // Support both backend response formats
      setResponse(
        data.response ||
        data.reply ||
        "No response received from BloomHer AI."
      );

    } catch (error) {
      console.error("Fetch Error:", error);
      setResponse("Unable to connect to BloomHer server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">

      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        🤖 BloomHer AI Chat
      </h1>

      <input
        className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Ask about PCOS, periods, diet..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 disabled:bg-gray-400"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      <div className="mt-6 bg-white p-5 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-2">
          AI Response
        </h2>

        <p className="text-gray-700 whitespace-pre-wrap break-words">
          {response || "Ask me anything about PCOS, periods, diet, thyroid, or women's health."}
        </p>

      </div>

    </div>
  );
}