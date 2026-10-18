"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Context Bahasa
import {
    GraduationCap,
    BookOpen,
    Compass,
    Code2,
    Cpu,
    Bot,
    Sparkles,
    Terminal,
    MapPin
} from "lucide-react";

// Kamus Terjemahan untuk Halaman Tentang
const translations = {
    ID: {
        getToIntro: "Kenali Saya Lebih Dekat",
        title: "Tentang Saya",
        description: "Saya adalah mahasiswa Teknik Mekatronika yang berfokus pada perancangan mekanik, rekayasa manufaktur, dan pengembangan sistem robotika. Saya percaya bahwa inovasi teknologi yang baik lahir dari perpaduan desain yang presisi, pemahaman sistem yang kuat, serta proses pengujian dan pengembangan prototipe secara berkelanjutan. Dengan mengintegrasikan teknologi CAD, permesinan CNC, sistem tertanam, dan otomasi, saya berupaya menciptakan solusi teknik yang efisien, adaptif, dan aplikatif.",
        location: "Surabaya, Jawa Timur, Indonesia",
        education: "D4 Teknik Mekatronika - PENS",

        // Filosofi
        philosophyTitle: "Filosofi Rekayasa",
        quote: "\"Desain yang baik bukan sekadar tentang bagaimana sesuatu dibuat, tetapi bagaimana sesuatu bekerja untuk menyelesaikan masalah.\"",
        philosophyDesc: "Pendekatan saya dalam rekayasa menggabungkan desain mekanik yang presisi, proses manufaktur yang efisien, serta integrasi sistem elektronik dan kendali. Melalui eksperimen, pengujian prototipe, dan pengembangan iteratif",

        // Core Stack
        coreStackTitle: "Core Stack",
        coreStackDesc: "Fondasi rekayasa yang saya gunakan untuk mengubah ide menjadi produk nyata melalui desain mekanik, manufaktur presisi, sistem tertanam, dan otomasi cerdas.",

        // Highlights (Hanya Robotika)
        roboticsLabel: "Riset Robotika",
        emosverTitle: "Tim Robotika EMOSVER (Divisi Mekanik)",
        emosverDesc: "Sebagai anggota Divisi Mekanik Tim Robot PENS, saya berkontribusi dalam perancangan dan pengembangan mekanik robot bawah air (AUV/ROV) EMOSVER yang dipersiapkan untuk kompetisi internasional TEKNOFEST Turkey. Fokus saya pada perancangan sasis, perakitan komponen, dan pemilihan material yang andal — mulai dari pemodelan 3D di Autodesk Inventor hingga proses fabrikasi presisi (CNC milling & 3D printing) agar menghasilkan robot yang ringan, kuat, dan stabil di arena lomba.",
        emosverTag1: "⚙️ Perancangan Mekanik & Sasis",
        emosverTag2: "🌊 Persiapan TEKNOFEST Turkey",
        ersowTitle: "Tim Robotika ERSOW (Divisi Mekanik)",
        ersowDesc: "Bersama Tim ERSOW, saya merancang dan memfabrikasi chassis serta drive system robot sepak bola beroda. Perancangan dimulai dari pemodelan 3D di Autodesk Inventor, dilanjutkan proses manufaktur presisi seperti CNC milling dan 3D printing, hingga perakitan akhir robot yang siap bertanding di kompetisi robot nasional.",
        ersowTag1: "⚙️ Chassis & Drive System",
        ersowTag2: "🏁 Kompetisi Robot Nasional"
    },
    US: {
        getToIntro: "Get To Know Me",
        title: "About Me",
        description: "I am a mechatronics engineering student focusing on mechanical design, manufacturing engineering, and robotics systems development. I believe good technological innovation stems from a blend of precise design, strong system understanding, and continuous prototyping and testing processes.",
        location: "Surabaya, East Java, Indonesia",
        education: "D4 Mechatronics Engineering - PENS",

        // Philosophy
        philosophyTitle: "Engineering Philosophy",
        quote: "\"Good design is not just about how something is made, but how it works to solve problems.\"",
        philosophyDesc: "My approach to engineering combines precise mechanical design, efficient manufacturing processes, and the integration of electronic and control systems through experimentation and iterative prototyping.",

        // Core Stack
        coreStackTitle: "Core Stack",
        coreStackDesc: "The engineering foundation I use to turn ideas into real products through mechanical design, precision manufacturing, embedded systems, and smart automation.",

        // Highlights (Robotics Only)
        roboticsLabel: "Robotics Research",
        emosverTitle: "EMOSVER Robotics Team (Mechanical Division)",
        emosverDesc: "As a member of the Mechanical Division of the PENS Robot Team, I contribute to the mechanical design and development of the EMOSVER unmanned underwater vehicle (AUV/ROV) prepared for the international TEKNOFEST Turkey competition. My focus is on chassis design, component assembly, and reliable material selection — starting from 3D modeling in Autodesk Inventor through precision fabrication processes (CNC milling & 3D printing) to produce a lightweight, strong, and stable competition robot.",
        emosverTag1: "⚙️ Mechanical & Chassis Design",
        emosverTag2: "🌊 TEKNOFEST Turkey Prep",
        ersowTitle: "ERSOW Robotics Team (Mechanical Division)",
        ersowDesc: "With the ERSOW team, I design and fabricate the chassis and drive system of a wheeled soccer robot. The process starts with 3D modeling in Autodesk Inventor, followed by precision manufacturing such as CNC milling and 3D printing, up to the final assembly of a robot ready to compete in national robotics competitions.",
        ersowTag1: "⚙️ Chassis & Drive System",
        ersowTag2: "🏁 National Robotics Competition"
    }
};

export default function AboutPage() {
    const container = useRef<HTMLDivElement>(null);
    const { language } = useLanguage(); // Mengambil status bahasa aktif (ID / US)
    const t = translations[language] || translations.ID;

    useGSAP(() => {
        const tl = gsap.timeline();

        // Animasi Header
        tl.from(".about-header", {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        // Animasi Kartu secara bertahap (Stagger)
        tl.from(".about-card", {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.1)",
            clearProps: "all"
        }, "-=0.4");
    }, { scope: container, dependencies: [language] });

    return (
        <div ref={container} className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-24 text-foreground">

            {/* ══════════════════════════════════════
                1. HEADER & INTRO
            ══════════════════════════════════════ */}
            <div className="about-header mb-14 border-b border-white/10 pb-10">
                <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-wider mb-3">
                    <Sparkles size={16} />
                    <span>{t.getToIntro}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {t.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light max-w-3xl">
                    {t.description}
                </p>

                {/* Status Badge Ringkas */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 text-xs font-medium text-zinc-400">
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
                        <MapPin size={14} className="text-primary" />
                        <span>{t.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
                        <GraduationCap size={14} className="text-blue-400" />
                        <span>{t.education}</span>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                2. FILOSOFI & FOCUS (BENTO GRID - FULL WIDTH)
            ══════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                {/* Kartu Filosofi - Memakan 2 Kolom */}
                <div className="about-card md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 shadow-lg">
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                    <div className="flex items-center gap-3 text-primary mb-4">
                        <Terminal size={22} />
                        <h2 className="text-lg font-bold tracking-wide uppercase font-mono">{t.philosophyTitle}</h2>
                    </div>
                    <blockquote className="text-xl sm:text-2xl font-medium text-zinc-100 leading-snug mb-4">
                        {t.quote}
                    </blockquote>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.philosophyDesc}
                    </p>
                </div>

                {/* Kartu Ekosistem Utama - Memakan 1 Kolom */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                    <div>
                        <div className="flex items-center gap-3 text-blue-400 mb-4">
                            <Code2 size={22} />
                            <h2 className="text-lg font-bold tracking-wide uppercase font-mono">{t.coreStackTitle}</h2>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            {t.coreStackDesc}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Autodesk Inventor", "SolidWorks", "ROS 2 Humble", "C++ / Python", "Arduino IDE", "PlatformIO", "CNC Machining"].map((tech, i) => (
                            <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            {/* ══════════════════════════════════════
                3. HIGHLIGHT RISET (GRID 2 KARTU ROBOTIKA)
            ══════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Kartu Robotika EMOSVER */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 relative group hover:border-emerald-500/50 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Cpu size={24} />
                            </div>
                            <span className="text-xs font-bold font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                {t.roboticsLabel}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-emerald-400 transition-colors">
                            {t.emosverTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t.emosverDesc}
                        </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-400">
                        <span>{t.emosverTag1}</span>
                        <span>{t.emosverTag2}</span>
                    </div>
                </div>

                {/* Kartu Robotika ERSOW */}
                <div className="about-card p-8 rounded-3xl bg-zinc-900/40 border border-white/10 relative group hover:border-sky-500/50 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                <Bot size={24} />
                            </div>
                            <span className="text-xs font-bold font-mono uppercase px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                                {t.roboticsLabel}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-sky-400 transition-colors">
                            {t.ersowTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t.ersowDesc}
                        </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-400">
                        <span>{t.ersowTag1}</span>
                        <span>{t.ersowTag2}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}