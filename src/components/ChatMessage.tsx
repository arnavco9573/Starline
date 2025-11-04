// src/components/ChatMessage.tsx
import React from "react";

interface Props {
  role: "user" | "bot";
  text: string;
}

const ChatMessage: React.FC<Props> = ({ role, text }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-green-100 text-gray-900 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
