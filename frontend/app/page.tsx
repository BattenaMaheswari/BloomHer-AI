import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">

        <h1 className="text-3xl font-bold text-purple-700">
          🌸 BloomHer AI
        </h1>


        <div className="flex gap-6 text-gray-700 font-medium">

          <Link href="/">
            Home
          </Link>

          <Link href="/pcos">
            Health Test
          </Link>

          <Link href="/ai-chat">
            AI Chat
          </Link>

          <Link href="/diet">
            Diet
          </Link>

          <Link href="/yoga">
            Yoga
          </Link>

        </div>

      </nav>



      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-4">


        <h2 className="text-6xl font-bold text-purple-800 mb-6">
          Your Personal Women's Health Companion
        </h2>


        <p className="text-xl text-gray-600 max-w-3xl mb-8">

          Track menstrual cycles, assess PCOS & thyroid risks,
          receive personalized diet plans, yoga guidance,
          and chat with AI for health insights.

        </p>



        <div className="flex gap-4">


          <Link href="/pcos">

            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition">

              Start Health Test

            </button>

          </Link>



          <Link href="/ai-chat">

            <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition">

              Talk To AI

            </button>

          </Link>


        </div>


      </section>




      {/* Features Section */}
      <section className="mt-32 px-8">


        <h3 className="text-4xl font-bold text-center text-purple-800 mb-12">

          Why Choose BloomHer AI?

        </h3>



        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">



          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h4 className="text-xl font-bold mb-3">
              🩺 PCOS Detection
            </h4>

            <p>
              Early risk assessment based on symptoms and health patterns.
            </p>

          </div>




          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h4 className="text-xl font-bold mb-3">
              📅 Period Tracking
            </h4>

            <p>
              Monitor cycles and predict upcoming periods accurately.
            </p>

          </div>





          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h4 className="text-xl font-bold mb-3">
              🤖 AI Chat
            </h4>

            <p>
              Ask questions about menstrual health, PCOS, thyroid, and wellness.
            </p>

          </div>





          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h4 className="text-xl font-bold mb-3">
              🥗 Diet & Yoga
            </h4>

            <p>
              Receive personalized wellness recommendations.
            </p>

          </div>



        </div>


      </section>


    </main>
  );
}