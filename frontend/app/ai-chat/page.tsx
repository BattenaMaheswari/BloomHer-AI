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


  // Auto scroll to latest message
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);



  // Load Chat History
  async function loadHistory() {

    try {

      const res = await fetch(
        `${API_URL}/chat/`
      );


      if (!res.ok) {
        throw new Error(
          "Failed to load history"
        );
      }


      const data = await res.json();

      setMessages(
        data.history || []
      );


    } catch (error) {

      console.error(
        "History Error:",
        error
      );

      setError(
        "Unable to load chat history."
      );

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



    // Show temporary message
    setMessages((prev)=>[
      ...prev,
      {
        id: Date.now(),
        message:userMessage,
        response:"Thinking..."
      }
    ]);



    try {

      setLoading(true);



      const res = await fetch(
        `${API_URL}/chat/`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            message:userMessage,

            pcos_risk:null

          })

        }
      );



      const data = await res.json();



      if(!res.ok){

        throw new Error(
          data.detail ||
          "Something went wrong"
        );

      }



      // Refresh database history
      await loadHistory();



    } catch(error:any){


      console.error(error);


      setError(
        error.message ||
        "Unable to connect to BloomHer server."
      );


      // Remove temporary message
      setMessages((prev)=>
        prev.slice(0,-1)
      );


    } finally {

      setLoading(false);

    }

  }





  // Clear Chat History
  async function clearChat(){

    const confirmDelete =
      window.confirm(
        "Are you sure you want to clear all chat history?"
      );


    if(!confirmDelete)
      return;



    try {

      setLoading(true);
      setError("");



      const res = await fetch(
        `${API_URL}/chat/`,
        {
          method:"DELETE",
        }
      );



      const data = await res.json();



      if(!res.ok){

        throw new Error(
          data.detail ||
          "Failed to clear chat"
        );

      }



      // Clear UI messages

      setMessages([]);



    } catch(error:any){


      console.error(error);


      setError(
        error.message ||
        "Unable to clear chat history."
      );


    } finally {

      setLoading(false);

    }

  }





  // Enter key support
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ){

    if(
      e.key==="Enter" &&
      !loading
    ){

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



        {/* Header */}

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">


          <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-purple-700
          ">

            🤖 BloomHer AI Chat

          </h1>




          <button

            onClick={clearChat}

            disabled={
              loading ||
              messages.length===0
            }

            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-xl
              hover:bg-red-600
              disabled:bg-gray-400
            "

          >

            🗑️ Clear

          </button>


        </div>





        {/* Error Message */}

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





        {/* Chat Area */}

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
            messages.length===0 ? (

              <div className="
                text-gray-500
                text-center
                mt-20
              ">

                🌸 Start chatting with BloomHer AI

              </div>


            ) : (


              messages.map((chat,index)=>(


                <div
                  key={
                    chat.id || index
                  }
                >


                  {/* User Message */}

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





                  {/* AI Response */}

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





        {/* Input Section */}

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
              px-6
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