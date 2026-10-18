"use client";

import React from "react";
import { useThemeMode } from "@/components/shared/ThemeModeContext";
import { Sidebar } from "@/components/shared/Sidebar";
import { MobileNav } from "@/components/shared/MobileNav";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const { themeMode } = useThemeMode();

    const bgClasses = {
        "light-mode": "bg-white text-zinc-900",
        "dark-mode": "bg-[#09090b] text-zinc-100",
        "theme-zap": "bg-[#c2410c] text-orange-50",
        "theme-blue": "bg-[#0369a1] text-sky-50",
        "theme-love": "bg-[#be123c] text-rose-50",
    }[themeMode] || "bg-[#09090b] text-zinc-100";

    return (
        <div className={`flex min-h-screen w-full relative transition-colors duration-300 ${bgClasses}`}>
            <Sidebar />
            <main className="flex-1 p-6 lg:p-12 overflow-x-hidden pb-24 md:pb-12 relative">
                {children}
            </main>
            <MobileNav />
        </div>
    );
}