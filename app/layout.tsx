import type { Metadata } from "next";
import { Nunito_Sans, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ZyroFloatingWidget } from "@/components/zyro-floating-widget";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecelljmi.vercel.app"),
  title: "E-CELL JMI | Igniting Future Founders & High-Growth Startups",
  description:
    "The premier Entrepreneurship Cell at Jamia Millia Islamia. Empowering visionary founders, incubating disruptive ideas, and bridging the gap between student innovation and world-scale ventures.",
  openGraph: {
    title: "E-CELL JMI | Igniting Future Founders & High-Growth Startups",
    description:
      "The premier Entrepreneurship Cell at Jamia Millia Islamia. Empowering visionary founders, incubating disruptive ideas, and bridging the gap between student innovation and world-scale ventures.",
    url: "https://ecelljmi.vercel.app",
    siteName: "E-CELL JMI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/graphQL.png",
        secureUrl: "https://ecelljmi.vercel.app/graphQL.png",
        width: 1200,
        height: 675,
        type: "image/png",
        alt: "E-CELL JMI - Venture Reality Beyond Limits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-CELL JMI | Igniting Future Founders & High-Growth Startups",
    description:
      "The premier Entrepreneurship Cell at Jamia Millia Islamia. Empowering visionary founders, incubating disruptive ideas, and bridging the gap between student innovation and world-scale ventures.",
    images: ["/graphQL.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/images/ecelllogo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "dark",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        montserratHeading.variable,
        playfairDisplay.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-[#070606] text-zinc-100 selection:bg-orange-500 selection:text-white overflow-x-hidden">
        {children}
        <ZyroFloatingWidget />
      </body>
    </html>
  );
}



