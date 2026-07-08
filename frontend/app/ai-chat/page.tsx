"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id?: number;
  message: string;
  response: string;
}

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // Load previous chats
  async function loadHistory() {
    try {
      const res = await fetch(`${API_URL}/chat/`);

      if (!res.ok) {
        throw new Error("Failed to load history");
      }

      const data = await res.json();

      setMessages(data.history || []);

    } catch (error) {
      console.error("History Error:", error);
      setError("Unable to load chat history.");
    }
  }


  useEffect(() => {
    loadHistory();
  }, []);



  // Send Message
  async function sendMessage() {

    if (!message.trim()) return;


    const userMessage = message;

    setMessage("");
    setError("");


    // Temporary user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: userMessage,
        response: "Thinking...",
      },
    ]);


    try {

      setLoading(true);


      const res = await fetch(
        `${API_URL}/chat/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
            pcos_risk: null,
          }),
        }
      );


      const data = await res.json();


      if (!res.ok) {
        throw new Error(
          data.detail || "Something went wrong"
        );
      }


      // Reload actual database history
      await loadHistory();


    } catch (error:any) {

      console.error(error);

      setError(
        error.message ||
        "Unable to connect to BloomHer AI server."
      );


      // Remove temporary message
      setMessages((prev)=>prev.slice(0,-1));


    } finally {

      setLoading(false);

    }

  }



  // Enter key support
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if(e.key === "Enter" && !loading){
      sendMessage();
    }

  }



  return (

    <div className="
      min-h-screen 
      bg-gradient-to-br 
      from-pink-50 
      to-purple-50 
      p-4 
      sm:p-8
    ">


      <div className="
        max-w-4xl 
        mx-auto
      ">


        <h1 className="
          text-3xl 
          sm:text-4xl 
          font-bold 
          text-purple-700 
          mb-6
        ">
          🤖 BloomHer AI Chat
        </h1>



        {/* Error */}

        {
          error && (

            <div className="
              bg-red-100
              text-red-600
              p-3
              rounded-xl
              mb-4
            ">
              {error}
            </div>

          )
        }



        {/* Chat Box */}

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-4
          h-[65vh]
          overflow-y-auto
          space-y-5
        ">


          {
            messages.length === 0 ? (

              <div className="
                text-gray-500
                text-center
                mt-20
              ">
                🌸 Start chatting with BloomHer AI
              </div>


            ) : (

              messages.map((chat,index)=>(


                <div key={chat.id || index}>


                  {/* User */}

                  <div className="
                    flex
                    justify-end
                  ">

                    <div className="
                      bg-pink-500
                      text-white
                      px-4
                      py-3
                      rounded-2xl
                      max-w-[80%]
                    ">

                      {chat.message}

                    </div>

                  </div>




                  {/* AI */}

                  <div className="
                    flex
                    justify-start
                    mt-3
                  ">

                    <div className="
                      bg-purple-100
                      text-gray-800
                      px-4
                      py-3
                      rounded-2xl
                      max-w-[80%]
                      whitespace-pre-wrap
                    ">

                      {chat.response}

                    </div>


                  </div>


                </div>


              ))

            )
          }


          <div ref={chatEndRef}/>


        </div>




        {/* Input */}

        <div className="
          flex
          gap-3
          mt-5
        ">


          <input

            className="
              flex-1
              border
              border-pink-300
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-pink-400
            "

            placeholder="
              Ask about PCOS, periods, diet...
            "

            value={message}

            onChange={(e)=>
              setMessage(e.target.value)
            }

            onKeyDown={handleKeyDown}

          />



          <button

            onClick={sendMessage}

            disabled={loading}

            className="
              bg-pink-500
              text-white
              px-5
              rounded-xl
              hover:bg-pink-600
              disabled:bg-gray-400
            "

          >

            {
              loading 
              ? "..."
              : "Send"
            }


          </button>


        </div>


      </div>


    </div>

  );

}