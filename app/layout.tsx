import type { Metadata } from "next";
import { Nunito_Sans, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E-CELL | Igniting Future Founders & High-Growth Startups",
  description:
    "The premier Entrepreneurship Cell. Empowering visionary founders, incubating disruptive ideas, and bridging the gap between student innovation and world-scale ventures.",
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
      </body>
    </html>
  );
}



