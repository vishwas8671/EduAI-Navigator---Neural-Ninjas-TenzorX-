import OpenAI from "openai";
import { fallbackMentor } from "./fallbackAI";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function askAI(question: string) {

  try {

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful advisor guiding students about universities and education loans."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log("OpenAI failed, using fallback AI");

    return fallbackMentor(question);
  }
}