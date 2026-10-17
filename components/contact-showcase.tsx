"use client";

import React, { useState } from "react";
import { Copy, Check, ExternalLink, Mail, Clock, Building2, ShieldCheck } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/icons";

interface ContactRow {
  category: string;
  items: {
    name: string;
    emailOrHandle: string;
    href: string;
    type: "email" | "link";
    icon?: React.ReactNode;
  }[];
}

export function ContactShowcase() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const contactData: ContactRow[] = [
    {
      category: "SOCIETY EMAIL:",
      items: [
        {
          name: "E-Cell Central Secretariat",
          emailOrHandle: "contact@ecelljmi.com",
          href: "mailto:contact@ecelljmi.com",
          type: "email",
        },
      ],
    },
    {
      category: "HR EMAIL:",
      items: [
        {
          name: "Human Resources & Talent Relations",
          emailOrHandle: "hr@ecelljmi.com",
          href: "mailto:hr@ecelljmi.com",
          type: "email",
        },
      ],
    },
    {
      category: "TECHNICAL EMAIL:",
      items: [
        {
          name: "Technical Operations & Dev Team",
          emailOrHandle: "tech@ecelljmi.com",
          href: "mailto:tech@ecelljmi.com",
          type: "email",
        },
      ],
    },
    {
      category: "WEBSITE & SOCIAL MEDIA:",
      items: [
        {
          name: "LinkedIn Community",
          emailOrHandle: "linkedin.com/company/ecell-jmi",
          href: "https://linkedin.com/company/ecell-jmi",
          type: "link",
          icon: <LinkedInIcon className="w-4 h-4 text-white/80 shrink-0" />,
        },
        {
          name: "Instagram Official",
          emailOrHandle: "@ecell_jmi",
          href: "https://instagram.com/ecell_jmi",
          type: "link",
          icon: <InstagramIcon className="w-4 h-4 text-white/80 shrink-0" />,
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      
      {/* Upper Section: Direct on the page */}
      <div className="mb-14 sm:mb-20">
        <p className="font-serif italic text-white/95 text-xl sm:text-3xl md:text-4xl font-normal leading-snug drop-shadow-sm mb-3">
          Questions? Concerns?<br />
          We want to hear from you!
        </p>

        <h1 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-[0.92] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          Contact Us
        </h1>
      </div>

      {/* Main Content Section: Direct on the page (no enclosing card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-6 sm:pt-10 border-t border-white/20">
        
        {/* Left Column: Descriptive text matching reference layout */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/95 font-normal leading-snug">
            Feel free to email one of the E-Cell team members listed
          </h2>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans max-w-md">
            Whether you are a student founder seeking incubation, an organization proposing a strategic partnership,
            or looking to join our upcoming cohort, our dedicated desks are here to assist.
          </p>

          {/* Minimal operational details */}
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/75">
            
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-orange-300 shrink-0" />
              <span>Expected response time: within 24 to 48 hours</span>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-orange-300 shrink-0 mt-0.5" />
              <span>Centre for Innovation & Entrepreneurship (CIE), JMI, New Delhi - 110025</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean minimal horizontal directory rows */}
        <div className="lg:col-span-7">
          <div className="divide-y divide-white/20 border-b border-white/20">
            {contactData.map((row) => (
              <div
                key={row.category}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline transition-colors hover:bg-white/[0.02] px-2 rounded-lg"
              >
                {/* Category label on left */}
                <div className="sm:col-span-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                  {row.category}
                </div>

                {/* Values on right */}
                <div className="sm:col-span-7 space-y-4">
                  {row.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm sm:text-base font-semibold text-white font-sans">
                        {item.name}
                      </span>

                      <div className="flex items-center justify-between gap-3 mt-1">
                        <a
                          href={item.href}
                          target={item.type === "link" ? "_blank" : undefined}
                          rel={item.type === "link" ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-amber-200 hover:text-white underline underline-offset-4 decoration-amber-300/60 hover:decoration-white transition-colors group/link"
                        >
                          {item.icon && <span>{item.icon}</span>}
                          <span>{item.emailOrHandle}</span>
                          {item.type === "link" ? (
                            <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover/link:text-white transition-colors" />
                          ) : (
                            <Mail className="w-3.5 h-3.5 text-white/50 group-hover/link:text-white transition-colors" />
                          )}
                        </a>

                        {/* Quick Copy Button */}
                        <button
                          onClick={() => handleCopy(item.emailOrHandle, `${row.category}-${idx}`)}
                          className="p-1.5 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors relative"
                          title="Copy to clipboard"
                          aria-label={`Copy ${item.emailOrHandle}`}
                        >
                          {copiedKey === `${row.category}-${idx}` ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                              <Check className="w-3 h-3" />
                              <span>Copied</span>
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
