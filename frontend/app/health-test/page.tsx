"use client";

import { useState } from "react";

export default function HealthTest() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const [irregularPeriods, setIrregularPeriods] = useState(false);
  const [acne, setAcne] = useState(false);
  const [hairLoss, setHairLoss] = useState(false);
  const [weightGain, setWeightGain] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/health-test",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          cycle_length: Number(cycleLength),

          irregular_periods: irregularPeriods,
          acne: acne,
          hair_loss: hairLoss,
          weight_gain: weightGain,
          fatigue: fatigue,
        }),
      }
    );

    const data = await response.json();

    setResult(data);
    setLoading(false);

  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          🩺 Health Assessment
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Cycle Length (days)"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="border p-3 rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Symptoms
        </h2>

        <div className="space-y-3">
          <label className="block">
            <input
              type="checkbox"
              checked={irregularPeriods}
              onChange={(e) => setIrregularPeriods(e.target.checked)}
            />
            {" "}Irregular Periods
          </label>

          <label className="block">
            <input
              type="checkbox"
              checked={acne}
              onChange={(e) => setAcne(e.target.checked)}
            />
            {" "}Acne
          </label>

          <label className="block">
            <input
              type="checkbox"
              checked={hairLoss}
              onChange={(e) => setHairLoss(e.target.checked)}
            />
            {" "}Hair Loss
          </label>

          <label className="block">
            <input
              type="checkbox"
              checked={weightGain}
              onChange={(e) => setWeightGain(e.target.checked)}
            />
            {" "}Weight Gain
          </label>

          <label className="block">
            <input
              type="checkbox"
              checked={fatigue}
              onChange={(e) => setFatigue(e.target.checked)}
            />
            {" "}Fatigue
          </label>
        </div>

       <button
  onClick={handleAnalyze}
  className="mt-8 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
>
  {loading ? "Analyzing..." : "Analyze My Health"}
</button>
{result && (
  <div className="mt-8 bg-purple-50 border rounded-xl p-6">
    <h2 className="text-2xl font-bold text-purple-700 mb-4">
      Prediction Results
    </h2>

    <p className="text-lg mb-2">
      🩺 PCOS Risk: {result.pcos_risk}%
    </p>

    <p className="text-lg">
      🦋 Thyroid Risk: {result.thyroid_risk}%
    </p>
  </div>
)}
      </div>
    </main>
  );
}