"use client";

import { useEffect, useState } from "react";

export default function PCOSHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pcos/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        📊 PCOS Prediction History
      </h1>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Risk</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.risk}</td>
                <td className="p-3">{item.confidence}%</td>
                <td className="p-3">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}