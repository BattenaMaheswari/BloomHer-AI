import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-white shadow-md">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col lg:flex-row justify-between items-center">

          <h1 className="text-3xl font-bold text-purple-700">
            BloomHer AI
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-4 lg:mt-0 text-gray-700 font-medium text-sm lg:text-base">

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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-800 leading-tight mb-6">

              Your Personal Women's Health Companion

            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8">

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

          {/* Right Side */}

          <div className="flex justify-center">

            <Image
              src="/images/bloomher.jpg"
              alt="BloomHer AI"
              width={420}
              height={420}
              priority
              className="rounded-3xl shadow-2xl object-cover"
            />

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">

        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">

          Explore BloomHer AI

        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Health Test */}
          <Link href="/health-test">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/health.jpg"
                alt="Health Test"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  Health Test
                </h3>
                <p className="mt-2 text-gray-600">
                  Analyze your symptoms and receive personalized health insights.
                </p>
              </div>
            </div>
          </Link>

          {/* PCOS Prediction */}
          <Link href="/pcos">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/pcos.jpg"
                alt="PCOS Prediction"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  PCOS Prediction
                </h3>
                <p className="mt-2 text-gray-600">
                  Predict PCOS risk using machine learning.
                </p>
              </div>
            </div>
          </Link>

          {/* Period Tracker */}
          <Link href="/period">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/period.jpg"
                alt="Period Tracker"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  Period Tracker
                </h3>
                <p className="mt-2 text-gray-600">
                  Track menstrual cycles and predict upcoming periods.
                </p>
              </div>
            </div>
          </Link>

          {/* Water Tracker */}
          <Link href="/water">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/water.jpg"
                alt="Water Tracker"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  Water Tracker
                </h3>
                <p className="mt-2 text-gray-600">
                  Record your daily water intake and stay hydrated.
                </p>
              </div>
            </div>
          </Link>

          {/* AI Chat */}
          <Link href="/ai-chat">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/chat.jpg"
                alt="AI Chat"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  AI Chat
                </h3>
                <p className="mt-2 text-gray-600">
                  Get instant guidance on women's health from AI.
                </p>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/analytics">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/analytics.jpg"
                alt="Analytics"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  Visualize your health trends and progress.
                </p>
              </div>
            </div>
          </Link>

          {/* History */}
          <Link href="/history">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/history.jpg"
                alt="History"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  History
                </h3>
                <p className="mt-2 text-gray-600">
                  Review previous predictions and health records.
                </p>
              </div>
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                width={400}
                height={220}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-purple-700">
                  My Profile
                </h3>
                <p className="mt-2 text-gray-600">
                  Manage your personal health information and goals.
                </p>
              </div>
            </div>
          </Link>

        </div>

      </section>

    </main>
  );
}