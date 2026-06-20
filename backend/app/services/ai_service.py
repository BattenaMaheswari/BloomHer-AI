import os

from groq import Groq
from dotenv import load_dotenv


# Load environment variables
load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



def get_ai_response(message: str):

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[

                {
                    "role": "system",

                    "content": (
                        "You are BloomHer AI, a women's health assistant "
                        "specialized in PCOS, thyroid, menstrual health, "
                        "diet and wellness.\n\n"

                        "Always reply in this format:\n\n"

                        "Condition:\n"
                        "Diet Plan:\n"
                        "Yoga Plan:\n"
                        "Advice:\n\n"

                        "Keep answers simple, safe, supportive and "
                        "non-alarming."
                    )

                },


                {
                    "role": "user",

                    "content": message
                }

            ],


            temperature=0.6

        )


        return response.choices[0].message.content



    except Exception as e:


        return f"AI Error: {str(e)}"