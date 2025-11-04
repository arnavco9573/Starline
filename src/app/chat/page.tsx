"use client";

import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../../services/chatservice";
import { Paperclip, Send, Mic } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";

const questions = [
  "What is the purpose of this project?",
  "Where is the location of the construction site?",
  "Are there specific building codes or climate considerations to account for?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Got it! Let's go step-by-step. Answer these one by one 👇" },
    { role: "bot", text: questions[0] },
  ]);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);

    const updatedAnswers = [...answers, userInput];
    setAnswers(updatedAnswers);
    setUserInput("");

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: questions[nextIndex] }]);
        setCurrentQuestionIndex(nextIndex);
      }, 600);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Thanks! Gathering your data..." },
      ]);

      try {
        const payload = { answers: updatedAnswers };
        const apiResponse = await sendChatMessage(JSON.stringify(payload));
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: apiResponse?.response || "No response from server." },
        ]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Something went wrong while contacting the server." },
        ]);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 text-gray-800 px-4 py-10">
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {/* <img src="/const.png" alt="logo" className="w-20 h-20 drop-shadow-2xl " /> */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900" >
            Building Code Compliance 
          </h1>
          <h1 className="text-4xl font-extrabold text-gray-900" style={{fontWeight:"2000"}}>Chatbot</h1>
          </div>
        </div>
        
      </div>

      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-3xl h-[70vh]   p-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} text={m.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center border border-gray-300 rounded-md bg-white px-4 py-2 shadow-sm">
          <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your answer here..."
            className="flex-1 px-3 py-5 text-gray-700 focus:outline-none"
          />
          {/* <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 mr-3" /> */}
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 flex items-center justify-center transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
