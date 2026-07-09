import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-md">

        <h1 className="text-3xl font-bold text-purple-700">
          🌸 BloomHer AI
        </h1>

        <div className="flex flex-wrap gap-5 text-gray-700 font-medium">

          <Link href="/" className="hover:text-purple-700">
            Home
          </Link>

          <Link href="/profile" className="hover:text-purple-700">
            Profile
          </Link>

          <Link href="/health-test" className="hover:text-purple-700">
            Health Test
          </Link>

          <Link href="/pcos" className="hover:text-purple-700">
            PCOS Prediction
          </Link>

          <Link href="/ai-chat" className="hover:text-purple-700">
            AI Chat
          </Link>

          <Link href="/period" className="hover:text-purple-700">
            Period Tracker
          </Link>

          <Link href="/water" className="hover:text-purple-700">
            Water Tracker
          </Link>

          <Link href="/analytics" className="hover:text-purple-700">
            Analytics
          </Link>

          <Link href="/history" className="hover:text-purple-700">
            History
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h2 className="text-6xl font-bold text-purple-800 mb-6">
          Your Personal Women's Health Companion
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mb-10">
          BloomHer AI helps you monitor your menstrual health, predict PCOS
          risk, track water intake, manage periods, receive personalized
          wellness recommendations, and chat with AI for health guidance.
        </p>

        <div className="flex flex-wrap justify-center gap-4">

          <Link href="/profile">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition">
              My Profile
            </button>
          </Link>

          <Link href="/pcos">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition">
              PCOS Prediction
            </button>
          </Link>

          <Link href="/ai-chat">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition">
              Talk to AI
            </button>
          </Link>

        </div>

      </section>

      {/* Features Section */}
      <section className="mt-28 px-8 pb-16">

        <h3 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Explore BloomHer AI
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link href="/health-test">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                🩺 Health Test
              </h4>

              <p>
                Analyze your symptoms and receive health insights.
              </p>

            </div>
          </Link>

          <Link href="/pcos">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                🌸 PCOS Prediction
              </h4>

              <p>
                Predict your PCOS risk using machine learning.
              </p>

            </div>
          </Link>

          <Link href="/period">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                📅 Period Tracker
              </h4>

              <p>
                Track menstrual cycles and monitor your health.
              </p>

            </div>
          </Link>

          <Link href="/water">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                💧 Water Tracker
              </h4>

              <p>
                Record your daily water intake and stay hydrated.
              </p>

            </div>
          </Link>

          <Link href="/ai-chat">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                🤖 AI Health Chat
              </h4>

              <p>
                Chat with BloomHer AI about PCOS, thyroid, periods, and wellness.
              </p>

            </div>
          </Link>

          <Link href="/analytics">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                📊 Analytics
              </h4>

              <p>
                View your health trends and progress over time.
              </p>

            </div>
          </Link>

          <Link href="/history">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                📜 History
              </h4>

              <p>
                Review your previous AI chats and PCOS predictions.
              </p>

            </div>
          </Link>

          <Link href="/profile">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer">

              <h4 className="text-xl font-bold mb-3">
                👤 My Profile
              </h4>

              <p>
                Manage your personal information and health goals.
              </p>

            </div>
          </Link>

        </div>

      </section>

    </main>
  );
}