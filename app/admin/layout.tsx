import React from "react";
import { getAdminSession } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Admin Portal | E-CELL JMI",
  description: "Executive Management Portal for E-Cell Jamia Millia Islamia",
};

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="relative min-h-screen bg-[#070606] text-zinc-100 selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      {/* Background ambient sunset glow matching website theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-orange-600/10 via-amber-500/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-to-t from-orange-950/20 via-black to-transparent blur-[100px]" />
      </div>

      <AdminNav
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
