"use client";

import { useState, useEffect } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load previous chats
  async function loadHistory() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/`
      );

      const data = await res.json();

      console.log("History:", data);

      setMessages(data.history || []);
    } catch (error) {
      console.error("History Error:", error);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

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
        alert(data.detail || "Something went wrong.");
        return;
      }

      // Reload chat history
      await loadHistory();

      // Clear input
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Unable to connect to BloomHer server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">

      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        🤖 BloomHer AI Chat
      </h1>

      {/* Input */}

      <div className="flex gap-3">

        <input
          className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Ask about PCOS, periods, diet..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-pink-500 text-white px-6 rounded-xl hover:bg-pink-600 disabled:bg-gray-400"
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

      {/* Chat History */}

      <div className="mt-8 space-y-6">

        {messages.length === 0 ? (

          <div className="bg-white p-5 rounded-xl shadow text-gray-500">
            Start chatting with BloomHer AI 🌸
          </div>

        ) : (

          messages.map((chat: any) => (

            <div key={chat.id}>

              {/* User */}

              <div className="flex justify-end">

                <div className="bg-pink-500 text-white px-4 py-3 rounded-2xl max-w-xl shadow">
                  {chat.message}
                </div>

              </div>

              {/* AI */}

              <div className="flex justify-start mt-3">

                <div className="bg-white px-4 py-3 rounded-2xl shadow max-w-xl whitespace-pre-wrap">
                  {chat.response}
                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}