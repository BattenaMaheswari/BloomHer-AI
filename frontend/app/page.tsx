import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-purple-700">
            🌸 BloomHer AI
          </h1>

          <div className="flex flex-wrap gap-5 text-gray-700 font-medium">

            <Link href="/" className="hover:text-purple-700">Home</Link>

            <Link href="/profile" className="hover:text-purple-700">
              Profile
            </Link>

            <Link href="/health-test" className="hover:text-purple-700">
              Health Test
            </Link>

            <Link href="/pcos" className="hover:text-purple-700">
              PCOS
            </Link>

            <Link href="/period" className="hover:text-purple-700">
              Period
            </Link>

            <Link href="/water" className="hover:text-purple-700">
              Water
            </Link>

            <Link href="/ai-chat" className="hover:text-purple-700">
              AI Chat
            </Link>

            <Link href="/analytics" className="hover:text-purple-700">
              Analytics
            </Link>

            <Link href="/history" className="hover:text-purple-700">
              History
            </Link>

          </div>

        </div>

      </nav>

      {/* ================= HERO SECTION ================= */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <div>

            <h3 className="text-5xl lg:text-6xl font-bold text-purple-800 leading-tight mb-6">

              Your Personal Women's Health Companion

            </h3>

            <p className="text-xl text-gray-600 mb-8">

              BloomHer AI helps women monitor menstrual cycles,
              predict PCOS risk using Machine Learning,
              receive personalized health recommendations,
              track daily water intake,
              and chat with AI for instant women's health guidance.

            </p>

            <div className="flex flex-wrap gap-4">

              <Link href="/profile">

                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">

                  My Profile

                </button>

              </Link>

              <Link href="/pcos">

                <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition">

                  PCOS Prediction

                </button>

              </Link>

              <Link href="/ai-chat">

                <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition">

                  Talk To AI

                </button>

              </Link>

            </div>

          </div>

          {/* Right Side Image */}

          <div className="flex justify-center">

            <Image
              src="/images/bloomher.jpg"
              alt="BloomHer AI"
              width={550}
              height={550}
              priority
              className="rounded-3xl shadow-2xl object-cover hover:scale-105 transition duration-500"
            />

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-8 pb-20">

        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">

          Explore BloomHer AI

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <Link href="/health-test">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                🩺 Health Test
              </h3>
              <p>
                Analyze symptoms and receive personalized health insights.
              </p>
            </div>
          </Link>

          <Link href="/pcos">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                ❤️ PCOS Prediction
              </h3>
              <p>
                Machine Learning powered PCOS risk prediction.
              </p>
            </div>
          </Link>

          <Link href="/period">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                📅 Period Tracker
              </h3>
              <p>
                Track menstrual cycles and predict upcoming periods.
              </p>
            </div>
          </Link>

          <Link href="/water">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                💧 Water Tracker
              </h3>
              <p>
                Record your daily water intake and hydration.
              </p>
            </div>
          </Link>

          <Link href="/ai-chat">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                🤖 AI Chat
              </h3>
              <p>
                Chat with BloomHer AI about PCOS, thyroid and wellness.
              </p>
            </div>
          </Link>

          <Link href="/analytics">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                📊 Analytics
              </h3>
              <p>
                Visualize your health trends and progress.
              </p>
            </div>
          </Link>

          <Link href="/history">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                🕒 History
              </h3>
              <p>
                View previous AI chats and prediction history.
              </p>
            </div>
          </Link>

          <Link href="/profile">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">
                👤 Profile
              </h3>
              <p>
                Manage your personal health profile.
              </p>
            </div>
          </Link>

        </div>

      </section>

    </main>
  );
}