import { useState } from "react";
import { askAI } from "@/lib/ai";

export default function AIMentor() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const handleAsk = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question
    };

    setMessages([...messages, userMessage]);
    setQuestion("");

    try {

      const aiReply = await askAI(question);

      const aiMessage = {
        role: "assistant",
        content: aiReply || "Sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {

      const errorMessage = {
        role: "assistant",
        content: "Error connecting to AI service."
      };

      setMessages(prev => [...prev, errorMessage]);
    }

  };

  return (

    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        AI Mentor
      </h1>

      <div className="bg-white shadow rounded-lg p-4 h-[400px] overflow-y-auto mb-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`mb-3 ${
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >

            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>

          </div>

        ))}

      </div>

      <div className="flex gap-2">

        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Ask about universities, admissions, or education loans..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleAsk}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Ask
        </button>

      </div>

    </div>

  );
}