"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/chat/")
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Chat History
      </h1>

      <div className="space-y-4">
        {chats.map((chat: any) => (
          <div
            key={chat.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <p>
              <strong>You:</strong> {chat.user_message}
            </p>

            <p className="mt-2">
              <strong>BloomHer AI:</strong> {chat.ai_response}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}