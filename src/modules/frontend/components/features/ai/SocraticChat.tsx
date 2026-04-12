'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

interface SocraticChatProps {
  submissionId: string;
}

export default function SocraticChat({ submissionId }: SocraticChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
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
    <div className="flex flex-col h-[560px] w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-100">
      {/* Header */}
      <div className="bg-[#4f46e5] text-white p-4 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
          🤖
        </div>
        <div>
          <div className="font-bold leading-none">AI Tutor</div>
          <div className="text-xs text-indigo-200 mt-0.5">
            {isLoading ? 'Thinking...' : 'Online'}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2 text-slate-400">
            <span className="text-4xl">🌟</span>
            <p className="font-medium">Hi! Let&apos;s review your work together.</p>
            <p className="text-sm">Ask me anything about your assignment!</p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#4f46e5] text-white rounded-br-none shadow-md'
                  : 'bg-white text-slate-800 border border-indigo-100 rounded-bl-none shadow-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-sm mr-2 flex-shrink-0">
              🤖
            </div>
            <div className="bg-white border border-indigo-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex space-x-1 items-center">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-indigo-100 flex items-center space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          disabled={isLoading}
          className="flex-1 border-2 border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#4f46e5] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#4f46e5] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
