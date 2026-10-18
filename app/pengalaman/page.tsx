"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Context Bahasa
import {
    Briefcase,
    Calendar,
    MapPin,
    Building2,
    Users
} from "lucide-react";

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    tags: string[];
    category: string;
    icon: React.ReactNode;
    image: string;
}

const tagColors: Record<string, string> = {
    "CAD": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "SolidWorks": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Autodesk Inventor": "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    "CNC": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    "Manufaktur": "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "ROS": "bg-green-500/15 text-green-700 dark:text-green-400",
    "Mekanik": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    "Underwater Robotics": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
};

const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-secondary text-secondary-foreground";
};

// Kamus Terjemahan Halaman Pengalaman
const translations = {
    ID: {
        title: "Pengalaman & Jejak Karir",
        subtitle: "Riwayat perjalanan profesional dan kontribusi di Divisi Mekanik Tim Robot PENS (ERSOW & EMOVER).",
        categories: ["Semua", "Tim Robot", "Organisasi"],
        emptyText: "Belum ada data di kategori ini.",
        experiences: [
            {
                id: "tim-emover-2026",
                title: "Anggota Divisi Mekanik | Tim EMOVER",
                company: "Tim Robot PENS · Kontrak",
                location: "Surabaya, Jawa Timur · Di lokasi",
                period: "Jan 2026 - Sekarang (Aktif)",
                description: [
                    "Merancang dan mengembangkan sistem mekanik untuk robot bawah air (Underwater Robot) dalam tim EMOVER.",
                    "Melakukan pemodelan 3D, simulasi, serta analisis ketahanan struktur rangka bawah air menggunakan perangkat lunak CAD.",
                    "Mengintegrasikan komponen mekanik dengan sistem aktuator dan sensor kedap air."
                ]
            },
            {
                id: "tim-ersow-2024-2025",
                title: "Anggota Divisi Mekanik | Tim ERSOW",
                company: "Tim Robot PENS · Kontrak",
                location: "Surabaya, Jawa Timur · Di lokasi",
                period: "2024 - 2025 (1 Tahun)",
                description: [
                    "Bertanggung jawab atas perancangan, desain, dan fabrikasi chassis serta sistem penggerak (drive system) untuk robot sepak bola beroda (Wheeled Soccer Robot).",
                    "Mengoperasikan mesin perkakas dan proses manufaktur seperti CNC milling, bubut, serta teknik pengelasan untuk komponen presisi tinggi.",
                    "Melakukan pengujian lapangan dan optimalisasi performa mekanik robot untuk menghadapi kompetisi."
                ]
            }
        ]
    },
    US: {
        title: "Experience & Career Path",
        subtitle: "Professional journey and contributions in the Mechanical Division of PENS Robot Team (ERSOW & EMOVER).",
        categories: ["All", "Robot Team", "Organization"],
        emptyText: "No data found in this category.",
        experiences: [
            {
                id: "tim-emover-2026",
                title: "Mechanical Division Member | EMOVER Team",
                company: "PENS Robot Team · Contract",
                location: "Surabaya, East Java · On-site",
                period: "Jan 2026 - Present (Active)",
                description: [
                    "Designed and developed mechanical systems for underwater robots within the EMOVER team.",
                    "Performed 3D modeling, simulation, and structural integrity analysis for underwater frames using CAD software.",
                    "Integrated mechanical assemblies with waterproof actuators and sensor systems."
                ]
            },
            {
                id: "tim-ersow-2024-2025",
                title: "Mechanical Division Member | ERSOW Team",
                company: "PENS Robot Team · Contract",
                location: "Surabaya, East Java · On-site",
                period: "2024 - 2025 (1 Year)",
                description: [
                    "Responsible for designing, modeling, and fabricating chassis and drive systems for wheeled soccer robots.",
                    "Operated machining tools and manufacturing processes such as CNC milling, turning, and welding for high-precision components.",
                    "Conducted field testing and mechanical performance optimization for robot competitions."
                ]
            }
        ]
    }
};

const baseExperiences: Omit<Experience, 'title' | 'company' | 'location' | 'period' | 'description'>[] = [
    {
        id: "tim-emover-2026",
        tags: ["Mekanik", "Underwater Robotics", "CNC 3AXIS" , "Autodesk Inventor"],
        category: "Tim Robot",
        icon: <Briefcase size={18} />,
        image: "/assets/images/krbai/gambar1EMOSVER.png"
    },
    {
        id: "tim-ersow-2024-2025",
        tags: ["Mekanik", "CNC 3AXIS", "Manufaktur", "Autodesk Inventor", ],
        category: "Tim Robot",
        icon: <Users size={18} />,
        image: "/assets/images/krbai/gambar1ERSOW.jpg" // Silakan ganti path gambar sesuai aset Anda
    }
];

export default function PengalamanPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const { language } = useLanguage();

    const t = translations[language] || translations.ID;

    const experiencesData: Experience[] = baseExperiences.map(be => {
        const translated = t.experiences.find(e => e.id === be.id);
        return {
            ...be,
            title: translated ? translated.title : "No Title",
            company: translated ? translated.company : "Unknown Company",
            location: translated ? translated.location : "Location",
            period: translated ? translated.period : "Period",
            description: translated ? translated.description : [],
        };
    });

    const filteredExperiences = experiencesData.filter(exp => {
        if (activeFilter === "Semua" || activeFilter === "All") return true;
        if (language === "US") {
            const categoryMap: Record<string, string> = {
                "Robot Team": "Tim Robot",
                "Organization": "Organisasi"
            };
            return exp.category === categoryMap[activeFilter];
        }
        return exp.category === activeFilter;
    });

    useGSAP(() => {
        gsap.from(".header-anim", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
    }, { scope: container });

    useGSAP(() => {
        if (filteredExperiences.length > 0) {
            gsap.fromTo(".exp-card",
                { y: 30, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.1)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeFilter, language] });

    return (
        <div ref={container} className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground">
                    {t.title}
                </h1>
                <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-12 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {t.categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out active:scale-95 select-none ${activeFilter === category ? "bg-foreground text-background shadow-md scale-105" : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div key={activeFilter + language} className="relative border-l-2 border-border/60 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-10 min-h-[300px]">
                {filteredExperiences.length > 0 ? (
                    filteredExperiences.map((exp) => (
                        <div key={exp.id} className="exp-card relative group">
                            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md group-hover:scale-125 group-hover:bg-primary transition-all duration-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
                            </div>

                            <div className="max-w-2xl bg-card border border-border/60 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-foreground/30 transition-all duration-300">

                                <div className="mb-5 relative w-full h-[200px] sm:h-[230px] flex items-center justify-center rounded-2xl bg-zinc-900/50 border border-border/40 overflow-hidden">
                                    <Image
                                        src={exp.image}
                                        alt={exp.company}
                                        fill
                                        className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 672px"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                                            {exp.icon}
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary">{exp.category}</span>
                                            <h3 className="text-xl font-bold text-foreground mt-0.5">{exp.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground bg-secondary/40 px-3.5 py-1.5 rounded-xl w-fit">
                                        <span className="flex items-center gap-1.5"><Calendar size={13} />{exp.period}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5"><MapPin size={13} />{exp.location}</span>
                                    </div>
                                </div>

                                <h4 className="text-base font-bold text-foreground/80 mb-4 flex items-center gap-2">
                                    <Building2 size={16} className="text-muted-foreground" />
                                    {exp.company}
                                </h4>

                                <ul className="space-y-2 mb-6 text-sm text-muted-foreground leading-relaxed">
                                    {exp.description.map((item, index) => (
                                        <span key={index} className="flex items-start gap-2.5">
                                            <span className="text-primary font-bold mt-1">▹</span>
                                            <span>{item}</span>
                                        </span>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg ${getTagColor(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border max-w-2xl">
                        <p className="font-medium text-lg">{t.emptyText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}