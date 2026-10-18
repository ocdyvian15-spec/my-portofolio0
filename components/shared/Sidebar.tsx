"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageContext";
import { useThemeMode } from "@/components/shared/ThemeModeContext";
import {
    Home, User, Briefcase, Moon, Sun, Zap, Heart, ArrowRight,
    VolumeX, Volume2, Award, History, FileText, Menu, X
} from "lucide-react";

const translations = {
    ID: {
        status: "Americano Coffee Lover",
        downloadCv: "Download CV",
        cvPath: "/CV_Ocdyvian Alfin 4124600085.pdf", // File CV Bahasa Indonesia
        nav: [
            { name: "Beranda", path: "/", icon: Home },
            { name: "Tentang", path: "/tentang", icon: User },
            { name: "Pengalaman", path: "/pengalaman", icon: History },
            { name: "Proyek", path: "/proyek", icon: Briefcase },
            { name: "Sertifikat", path: "/sertifikat", icon: Award },
        ],
    },
    US: {
        status: "Building Cool Stuff",
        downloadCv: "Download CV",
        cvPath: "/CV_Ocdyvian Alfin 4124600085.pdf", // File CV Bahasa Inggris
        nav: [
            { name: "Home", path: "/", icon: Home },
            { name: "About", path: "/tentang", icon: User },
            { name: "Experience", path: "/pengalaman", icon: History },
            { name: "Projects", path: "/proyek", icon: Briefcase },
            { name: "Certificates", path: "/sertifikat", icon: Award },
        ],
    },
};

export function Sidebar() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { language, setLanguage } = useLanguage();
    const { themeMode, setThemeMode } = useThemeMode();
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleAudio = () => setIsMuted(!isMuted);
    const currentNavItems = translations[language].nav;

    return (
        <>
            {/* =========================================
                TOMBOL HAMBURGER (Kiri Atas)
                ========================================= */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-4 left-4 z-[40] p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-md lg:hidden text-zinc-800 dark:text-zinc-200 transition-opacity ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Open Menu"
            >
                <Menu size={22} />
            </button>

            {/* =========================================
                OVERLAY GELAP
                ========================================= */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* =========================================
                SIDEBAR UTAMA
                ========================================= */}
            <aside
                className={`
                    w-[280px] h-[100dvh] border-r border-zinc-200/40 dark:border-white/5 text-zinc-600 dark:text-zinc-300 p-5 pb-24 flex flex-col overflow-y-auto custom-scrollbar
                    fixed inset-y-0 left-0 z-50 bg-white dark:bg-zinc-950 lg:bg-transparent lg:sticky lg:top-0
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* TOMBOL CLOSE (X) DI DALAM SIDEBAR */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors lg:hidden"
                    aria-label="Close Menu"
                >
                    <X size={20} />
                </button>

                {/* Profil */}
                <div className="flex flex-col items-center text-center mt-8 mb-6">
                    <div className="w-[90px] h-[90px] rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 overflow-hidden relative shadow-lg">
                        <Image src="/foto formal.jpg" alt="Foto Profil Arif" fill className="object-cover" sizes="(max-width: 90px) 100vw, 90px" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-4">
                        <h2 className="font-bold text-[19px] tracking-wide">Ocdyvian Alfin R</h2>
                    </div>
                    <div className="mt-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] text-xs font-bold tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
                        {translations[language].status}
                    </div>
                </div>

                {/* Kontrol Toggle & Tema */}
                <div className="flex flex-col gap-3 mb-6 px-1">
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/10 dark:border-white/5 shadow-inner">
                            <button onClick={() => setLanguage("US")} className={`text-[11px] font-bold px-4 py-2 rounded-full transition-all ${language === "US" ? "bg-[#FFD700] text-black shadow-sm" : "opacity-60 hover:opacity-100"}`}>US</button>
                            <button onClick={() => setLanguage("ID")} className={`text-[11px] font-bold px-4 py-2 rounded-full transition-all ${language === "ID" ? "bg-[#FFD700] text-black shadow-sm" : "opacity-60 hover:opacity-100"}`}>ID</button>
                        </div>
                        <button onClick={toggleAudio} className="p-2.5 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/5 opacity-70 hover:opacity-100 transition-colors shadow-inner">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-[#FFD700]" />}
                        </button>
                    </div>

                    {mounted && (
                        <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center justify-between flex-1 bg-black/5 dark:bg-white/5 rounded-full px-4 py-2.5 border border-black/10 dark:border-white/5 shadow-inner">
                                <Sun size={15} onClick={() => setThemeMode("light-mode")} className={`cursor-pointer transition-all duration-200 ${themeMode === 'light-mode' ? 'text-amber-500 font-bold scale-125 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] opacity-100' : 'opacity-40 hover:opacity-100'}`} />
                                <Moon size={15} onClick={() => setThemeMode("dark-mode")} className={`cursor-pointer transition-all duration-200 ${themeMode === 'dark-mode' ? 'text-white font-bold scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100' : 'opacity-40 hover:opacity-100'}`} />
                                <Zap size={15} onClick={() => setThemeMode("theme-zap")} className={`cursor-pointer transition-all duration-200 ${themeMode === 'theme-zap' ? 'text-orange-400 font-bold scale-125 drop-shadow-[0_0_8px_rgba(251,146,60,0.9)] opacity-100' : 'opacity-40 hover:opacity-100'}`} />
                                <Moon size={14} onClick={() => setThemeMode("theme-blue")} className={`cursor-pointer transition-all duration-200 transform -scale-x-100 ${themeMode === 'theme-blue' ? 'text-sky-400 font-bold scale-125 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] opacity-100' : 'opacity-40 hover:opacity-100'}`} />
                                <Heart size={15} onClick={() => setThemeMode("theme-love")} className={`cursor-pointer transition-all duration-200 ${themeMode === 'theme-love' ? 'text-rose-400 fill-rose-400 font-bold scale-125 drop-shadow-[0_0_8px_rgba(251,113,133,0.9)] opacity-100' : 'opacity-40 hover:opacity-100'}`} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full h-[1px] bg-black/10 dark:bg-white/5 mb-4"></div>

                {/* Navigasi */}
                <nav className="flex flex-col gap-1">
                    {currentNavItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-black/5 dark:bg-white/10 font-semibold shadow-sm" : "opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"}`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <Icon size={18} />
                                    <span className="text-[15px]">{item.name}</span>
                                </div>
                                {isActive && <ArrowRight size={16} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Tombol Download CV */}
                <div className="mt-auto pt-6 px-1">
                    <a
                        href={translations[language].cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[14px] font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 shadow-sm"
                    >
                        <FileText size={17} className="text-[#FFD700]" />
                        <span>{translations[language].downloadCv}</span>
                    </a>
                </div>

            </aside>
        </>
    );
}