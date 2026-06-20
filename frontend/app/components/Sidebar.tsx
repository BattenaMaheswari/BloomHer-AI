import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-purple-700 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        🌸 BloomHer AI
      </h1>

      <nav className="space-y-4">

        <Link
          href="/dashboard"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/health-test"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          🩺 Health Test
        </Link>

        <Link
          href="/profile"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          👤 Profile
        </Link>

        <Link
          href="/diet"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          🥗 Diet Plan
        </Link>

        <Link
          href="/ai-chat"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          🤖 AI Chat
        </Link>

        <Link
          href="/yoga"
          className="block p-3 rounded-lg hover:bg-purple-600"
        >
          🧘 Yoga Guide
        </Link>

      </nav>
    </aside>
  );
}