'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function SocraticChat({ submissionId }: { submissionId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      submissionId,
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-100">
      {/* Header */}
      <div className="bg-[#4f46e5] text-white p-4 font-bold text-center text-lg">
        AI Tutor
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-10">
            Hi! Let's review your work together.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                m.role === 'user'
                  ? 'bg-[#4f46e5] text-white rounded-br-none shadow-md'
                  : 'bg-white text-slate-800 border border-indigo-100 rounded-bl-none shadow-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-indigo-100 flex items-center space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          className="flex-1 border-2 border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:border-[#4f46e5] transition-colors"
        />
        <button
          type="submit"
          className="bg-[#4f46e5] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
