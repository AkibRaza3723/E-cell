import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070606] text-white selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  ); 
}
