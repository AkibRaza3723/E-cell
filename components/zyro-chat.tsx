"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Plus,
  ArrowUp,
  Target,
  TrendingUp,
  Lightbulb,
  ShieldAlert,
  Rocket,
  Compass,
  ArrowUpRight,
  MessageSquare,
  AlertCircle,
  Cpu,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  {
    icon: Target,
    title: "Pitch Deck Teardown",
    subtitle: "30-second elevator pitch audit",
    prompt:
      "Critique my 30-second elevator pitch. What are the 3 biggest red flags early-stage venture investors look for in student startups, and how do I fix them?",
  },
  {
    icon: TrendingUp,
    title: "TAM / SAM / SOM Sizing",
    subtitle: "Bottom-up market calculation",
    prompt:
      "Walk me through a bottom-up market sizing (TAM, SAM, SOM) calculation for a B2B SaaS startup in India. Show realistic conversion metrics and formula steps.",
  },
  {
    icon: Lightbulb,
    title: "Lean Business Canvas",
    subtitle: "Revenue models & value prop",
    prompt:
      "Build a complete Lean Business Model Canvas for an AI workflow tool targeting freelancers and agency owners. Detail the customer segments, revenue streams, and unfair advantage.",
  },
  {
    icon: ShieldAlert,
    title: "Tough VC Simulation",
    subtitle: "Defensibility & moat stress-test",
    prompt:
      "Act as a skeptical venture capital partner evaluating our seed round. Ask me 4 tough questions probing our defensibility, customer acquisition cost, and churn risks.",
  },
];

export function ZyroChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelInfo, setModelInfo] = useState<string>("Claude 3.5 Sonnet");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch configured model name on load
  useEffect(() => {
    fetch("/api/zyro/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data.model) {
          const name = data.model.includes("claude-3-5")
            ? "Claude 3.5 Sonnet"
            : data.model.includes("claude-3-haiku")
            ? "Claude 3 Haiku"
            : data.model.includes("llama3")
            ? "Llama 3 70B"
            : data.model;
          setModelInfo(name);
        }
      })
      .catch(() => {});
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Dynamic textarea auto-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        220
      )}px`;
    }
  }, [input]);

  const handleSend = async (overridePrompt?: string) => {
    const textToSend = (overridePrompt || input).trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/zyro/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.success && data.text) {
        const assistantMsg: Message = {
          id: `zyro-${Date.now()}`,
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || "Failed to generate AI response.");
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `**Advisory Service Notice:** ${
          err?.message || "Service temporarily unavailable. Please try again in a moment."
        }`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  // Helper parser for markdown formatting
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Main headers
      if (line.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-lg sm:text-xl font-heading font-black text-white mt-6 mb-3 tracking-tight border-b border-white/10 pb-1.5"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-base sm:text-lg font-heading font-bold text-amber-200 mt-4 mb-2 tracking-tight"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h4
            key={idx}
            className="text-xs sm:text-sm font-heading font-bold text-orange-400 mt-3 mb-1 uppercase tracking-wider"
          >
            {line.replace("#### ", "")}
          </h4>
        );
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="p-3.5 my-2.5 rounded-xl bg-orange-500/[0.08] border-l-2 border-orange-500 text-xs sm:text-sm text-orange-200/90 italic font-sans"
          >
            {parseInlineMarkdown(line.replace("> ", ""))}
          </blockquote>
        );
      }

      // Unordered list items
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200/90 my-1.5 pl-2 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
            <span className="flex-1">{parseInlineMarkdown(line.substring(2))}</span>
          </div>
        );
      }

      // Numbered list items
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        return (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200/90 my-1.5 pl-2 leading-relaxed">
            <span className="font-mono text-xs font-bold text-amber-400 shrink-0 mt-0.5">
              {numberedMatch[1]}.
            </span>
            <span className="flex-1">{parseInlineMarkdown(numberedMatch[2])}</span>
          </div>
        );
      }

      // Empty line / paragraph break
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Normal paragraph text
      return (
        <p key={idx} className="text-xs sm:text-sm text-zinc-200/90 leading-relaxed my-1 font-sans">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-amber-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-orange-300 font-mono text-[11px]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full flex flex-col flex-1 min-h-[calc(100vh-140px)]">
      
      {/* Top Floating App Bar (ChatGPT / Claude style) */}
      <div className="sticky top-20 z-20 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/[0.06] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)] shrink-0">
            <Sparkles className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-sm text-white tracking-tight">
              Zyro
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-zinc-900 border border-white/10 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{modelInfo}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-xs text-zinc-200 hover:text-white transition-all cursor-pointer font-medium shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Chat</span>
            </button>
          )}

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors"
          >
            <span>Incubation Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col justify-between">
        
        {/* State A: Empty Chat Welcome Hero (Clean Claude/ChatGPT style) */}
        {messages.length === 0 ? (
          <div className="my-auto py-10 flex flex-col items-center text-center select-none">
            
            {/* Center Sleek AI Mark */}
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-orange-400 shadow-[0_0_35px_rgba(249,115,22,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] mb-6 animate-in zoom-in-95 duration-500">
              <Sparkles className="w-8 h-8 text-orange-400" />
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 tracking-tight leading-tight uppercase">
              What are you building today?
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
              Zyro is your venture architect — trained on pitch teardowns, TAM/SAM/SOM calculations, business models, and investor due diligence.
            </p>

            {/* Quick Action Category Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-2xl">
              {[
                { label: "Elevator Pitch", prompt: "Help me refine my 30-second elevator pitch for a student-led venture." },
                { label: "TAM / SAM / SOM", prompt: "Explain how to calculate TAM, SAM, and SOM for an Indian B2B tech startup." },
                { label: "Unit Economics", prompt: "What formulas should I use to calculate CAC, LTV, and payback period?" },
                { label: "VC Red Flags", prompt: "What are the most common red flags seed venture funds find in pitch decks?" },
                { label: "GTM Strategy", prompt: "Outline a 90-day zero-dollar Go-To-Market strategy for an early-stage SaaS." }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.prompt)}
                  className="px-3 py-1 rounded-full text-xs font-sans text-zinc-300 bg-zinc-900/70 hover:bg-zinc-800 border border-white/10 hover:border-orange-500/40 hover:text-white transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* 4 Professional Prompt Starter Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mt-8 text-left">
              {STARTER_PROMPTS.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(card.prompt)}
                    className="group p-4 sm:p-5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-white/[0.08] hover:border-orange-500/35 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200 shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-sm text-white group-hover:text-amber-200 transition-colors">
                        {card.title}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 line-clamp-2 leading-relaxed font-sans">
                      {card.prompt}
                    </p>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          /* State B: Active Conversational Stream */
          <div className="space-y-8 pb-32">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <article
                  key={msg.id}
                  className={`flex items-start gap-4 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-md ${
                      isUser
                        ? "bg-zinc-800 text-zinc-200 border border-white/15"
                        : "bg-gradient-to-b from-zinc-800 to-zinc-900 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Content Container */}
                  <div
                    className={`flex-1 min-w-0 ${
                      isUser
                        ? "max-w-[85%] sm:max-w-[75%]"
                        : "max-w-full"
                    }`}
                  >
                    {isUser ? (
                      <div className="ml-auto inline-block p-4 sm:p-5 rounded-2xl bg-zinc-800/90 border border-white/10 text-white shadow-md text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="p-5 sm:p-7 rounded-2xl bg-zinc-900/35 border border-white/[0.06] backdrop-blur-xl shadow-lg">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                          <span className="font-heading font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                            <span>Zyro Advisory</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {msg.timestamp}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {renderFormattedContent(msg.content)}
                        </div>

                        {/* Message Action Bar (Copy / Feedback) */}
                        <div className="flex items-center gap-2 pt-3 mt-4 border-t border-white/[0.06] text-zinc-400">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 text-[11px]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}

            {/* Typing / Reasoning State */}
            {loading && (
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.15)] animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-xl flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" />
                  <span className="ml-2 text-zinc-300">
                    Zyro is analyzing your startup architecture...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      {/* Floating Bottom Input Dock (Claude & ChatGPT signature pinned bar) */}
      <div className="sticky bottom-0 z-30 w-full pb-6 pt-2 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent">
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#121215]/95 border border-white/[0.12] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.06)] focus-within:border-orange-500/60 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Zyro anything (e.g. 'Critique our B2B SaaS pitch', 'How do we calculate CAC/LTV?')..."
              className="w-full bg-transparent px-5 pt-4 pb-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none resize-none font-sans leading-relaxed"
            />

            <div className="absolute bottom-3 left-4 right-3 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-mono text-zinc-500 pointer-events-auto hidden sm:inline">
                Shift + Enter for new line &bull; Enter to send
              </span>
              <span className="text-[11px] font-mono text-zinc-500 pointer-events-auto sm:hidden">
                Zyro AI
              </span>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="pointer-events-auto w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 text-center mt-2 font-sans">
            Zyro utilizes venture frameworks powered by Amazon Bedrock. Confirm critical legal and fundraising decisions with E-Cell mentors.
          </p>
        </div>
      </div>

    </div>
  );
}
