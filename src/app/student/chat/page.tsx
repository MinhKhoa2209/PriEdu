"use client";

import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("student.chat");
  
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const { messages, sendMessage, status: chatStatus } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [localInput, setLocalInput] = useState("");
  const isLoading = chatStatus === "streaming" || chatStatus === "submitted";

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    sendMessage({ text: localInput });
    setLocalInput("");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 md:-m-8">
      {/* Learning Path - Secondary Sidebar */}
      <aside className="hidden xl:flex flex-col w-80 bg-surface-container-low p-6 space-y-8 border-r border-outline-variant/10 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface font-headline">{t('chapter', { number: 3 })}</h3>
              <p className="text-xs text-on-surface-variant font-medium">{t('exploreUniverse')}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-primary/10">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-sm font-semibold text-on-surface">{t('moonLesson')}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container rounded-xl shadow-md scale-105 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              <span className="text-sm font-bold">{t('planetsLesson')}</span>
            </div>
            <div className="flex items-center gap-3 p-3 opacity-60 grayscale">
              <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              <span className="text-sm font-medium text-on-surface-variant">{t('starsLesson')}</span>
            </div>
            <div className="flex items-center gap-3 p-3 opacity-40 grayscale">
              <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              <span className="text-sm font-medium text-on-surface-variant">{t('interstellarLesson')}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-outline-variant/20">
          <div className="bg-secondary-container p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-on-secondary-container uppercase tracking-wider font-headline">{t('weeklyProgress')}</span>
              <span className="text-xs font-bold text-on-secondary-container font-headline">85%</span>
            </div>
            <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-surface relative overflow-hidden">
        {/* Header */}
        <div className="px-8 py-4 flex items-center justify-between border-b border-outline-variant/5 bg-surface/50 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCUxOtR8Iqo1AkMZovXg8E3TNjVmf4JJARJq08tE69Jy3NOPM6SuN_TiT246vwP8sx2nhXmx6MVfQIGgscY4-GdhxG_xfGeLyyMyYBvoKIK_PkgQ_IQovD1Vu2YDjdc4Zwa0bjJAn-0AnmmnOArUybiCAVAoUWWAkhDrJrZ6jizikDadRl_uGWqwoBc5vmc4Ust_H69amUO6p-N8_bVkXxiEZ51FR0Xx2Wp9phmt34whnnbWAEudqDm7im1DKV4DjbWMeYApQIdCdl" 
                  alt="Robot Mascot" 
                  width={40} height={40}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="font-bold text-on-surface text-lg leading-tight font-headline">{t('title')}</h1>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">{t('status')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-surface-container-low text-primary text-sm font-bold rounded-full hover:bg-primary/5 transition-all outline-none">
              {t('resources')}
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar pb-32">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant/60 space-y-4">
              <span className="material-symbols-outlined text-6xl opacity-50">smart_toy</span>
              <p className="font-medium text-lg">{t('emptyState')}</p>
            </div>
          ) : (
            messages.map(m => {
              const textContent = m.parts
                .filter(p => p.type === 'text')
                .map(p => p.type === 'text' ? p.text : '')
                .join('');
              
              return m.role === 'user' ? (
                /* User Bubble */
                <div key={m.id} className="flex gap-4 max-w-3xl ml-auto flex-row-reverse animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">person</span>
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="bg-secondary-container p-6 rounded-2xl rounded-tr-none shadow-sm">
                      <p className="text-on-secondary-container leading-relaxed text-lg font-medium whitespace-pre-wrap">
                        {textContent}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase mr-2">{t('youngExplorer')}</span>
                  </div>
                </div>
              ) : (
                /* AI Bubble */
                <div key={m.id} className="flex gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                  </div>
                  <div className="space-y-2">
                    <div className="socratic-glass p-6 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="text-on-surface leading-relaxed text-lg font-medium whitespace-pre-wrap">
                        {textContent}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase ml-2">{t('aiTutorName')}</span>
                  </div>
                </div>
              );
            })
          )}
          {isLoading && (
            <div className="flex gap-4 max-w-3xl animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">smart_toy</span>
              </div>
              <div className="socratic-glass px-6 py-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Block */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-surface via-surface/80 to-transparent">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
            <div className="absolute -top-10 left-0 right-0 flex justify-center opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{t('listening')}</div>
            </div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-[0_20px_50px_rgba(53,37,205,0.1)] border border-outline-variant/20 p-2 focus-within:border-primary/40 transition-all">
               <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors outline-none cursor-pointer">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg py-4 px-2 placeholder:text-on-surface-variant/40 font-headline font-medium outline-none" 
                placeholder={t('placeholder')}
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex items-center gap-2 pr-2">
                <button type="button" className="p-3 text-on-surface-variant hover:text-primary transition-colors outline-none cursor-pointer">
                  <span className="material-symbols-outlined">mic</span>
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading || !localInput.trim()}
                  className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-[0_4px_0_rgb(51,35,204)] active:shadow-none active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-[2px]"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </div>
            </div>
            <p className="text-center mt-3 text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-widest">
              {t('disclaimer')}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
