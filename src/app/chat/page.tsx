"use client";

import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  console.log(messages);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">چت‌بات هوش مصنوعی</h1>
      <div className="space-y-2 mb-4">
        {messages.map((m) => (
          <div key={m.id} className="p-2 rounded bg-gray-100">
            <strong>{m.role === "user" ? "شما" : "هوش مصنوعی"}:</strong>{" "}
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="پیام خود را وارد کنید…"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          ارسال
        </button>
      </form>
    </div>
  );
}
