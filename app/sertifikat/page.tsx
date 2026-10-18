"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLanguage } from "@/components/shared/LanguageContext"; // <- Import Language Context
import {
    Award,
    ExternalLink,
    Calendar,
    Trophy,
    CheckCircle,
    FileText
} from "lucide-react";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: string;
    image: string;
    credentialUrl?: string;
    tags: string[];
}

const tagColors: Record<string, string> = {
    "Robotics": "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    "Flutter": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
    "UI/UX": "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    "Web Dev": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
    "Kompetisi": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    "Webinar": "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    "Kepanitiaan": "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    "AI": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
};

const getTagColor = (tag: string) => {
    return tagColors[tag] || "bg-secondary text-secondary-foreground";
};

// Kamus Terjemahan Halaman Sertifikat
const translations = {
    ID: {
        title: "Sertifikat & Penghargaan",
        subtitle: "Kumpulan bukti pencapaian, validasi keahlian teknis, serta keikutsertaan dalam berbagai kompetisi dan kepanitiaan profesional.",
        categories: ["Semua", "Kompetensi", "Webinar", "Kepanitiaan"],
        btnView: "Lihat Bukti",
        emptyTitle: "Belum ada sertifikat di kategori ini.",
        emptySubtitle: "Coba pilih kategori filter yang lain di atas.",
        pdfLabel: "Dokumen PDF",
        certificates: [
            { id: "cert-icast-2026", title: "Sertifikat ICAST-ES 2026 (No. ICAST-ES-2026-076)", issuer: "Panitia ICAST-ES 2026" },
            { id: "cert-teknofest-2026", title: "Sertifikat TEKNOFEST 2026", issuer: "TEKNOFEST" },
            { id: "cert-hki-filamen", title: "Sertifikat HKI Filamen Extruder", issuer: "HKI / Kemenkumham" },
            { id: "cert-prestasi-r", title: "Sertifikat Kompetensi - Ocdyvian Alfin R", issuer: "Penyelenggara Kompetisi" },
            { id: "cert-lkmm-pratda", title: "Sertifikat LKMM Pratda (Pratama Dasar)", issuer: "Kemendikbudristek / PENS" },
            { id: "cert-lkmm-td", title: "Sertifikat LKMM TD (Tingkat Dasar)", issuer: "Kemendikbudristek / PENS" },
            { id: "cert-kepanitiaan-30", title: "Sertifikat Kepanitiaan No. 30", issuer: "Panitia Kegiatan" },
        ]
    },
    US: {
        title: "Certificates & Awards",
        subtitle: "A collection of proofs of achievement, technical skill validations, and participation in various competitions and professional committees.",
        categories: ["All", "Competency", "Webinar", "Committee"],
        btnView: "View Proof",
        emptyTitle: "No certificates found in this category.",
        emptySubtitle: "Try selecting another filter category above.",
        pdfLabel: "PDF Document",
        certificates: [
            { id: "cert-icast-2026", title: "ICAST-ES 2026 Certificate (No. ICAST-ES-2026-076)", issuer: "ICAST-ES 2026 Committee" },
            { id: "cert-teknofest-2026", title: "TEKNOFEST 2026 Certificate", issuer: "TEKNOFEST" },
            { id: "cert-hki-filamen", title: "HKI Extruder Filament Certificate", issuer: "HKI / Ministry of Law and Human Rights" },
            { id: "cert-prestasi-r", title: "Competency Certificate - Ocdyvian Alfin R", issuer: "Competition Organizer" },
            { id: "cert-lkmm-pratda", title: "LKMM Pratda Certificate (Basic Level)", issuer: "Ministry of Education / PENS" },
            { id: "cert-lkmm-td", title: "LKMM TD Certificate (Basic Level)", issuer: "Ministry of Education / PENS" },
            { id: "cert-kepanitiaan-30", title: "Committee Certificate No. 30", issuer: "Event Committee" },
        ]
    }
};

// Data Dasar Sertifikat (File dari folder /public/sertif)
const baseCertificates: Omit<Certificate, 'title' | 'issuer'>[] = [
    {
        id: "cert-icast-2026",
        date: "2026",
        category: "Kompetensi",
        image: "/sertif/kompetensi/icast-es-2026-076.png",
        credentialUrl: "/sertif/kompetensi/icast-es-2026-076.png",
        tags: ["Kompetensi"]
    },
    {
        id: "cert-teknofest-2026",
        date: "2026",
        category: "Kompetensi",
        image: "/sertif/kompetensi/sertif-teknofest-2026.png",
        credentialUrl: "/sertif/kompetensi/sertif-teknofest-2026.pdf",
        tags: ["Kompetensi"]
    },
    {
        id: "cert-hki-filamen",
        date: "2026",
        category: "Kompetensi",
        image: "/sertif/kompetensi/sertifikat-hki-filamen-extruder.png",
        credentialUrl: "/sertif/kompetensi/sertifikat-hki-filamen-extruder.pdf",
        tags: ["Kompetensi"]
    },
    {
        id: "cert-prestasi-r",
        date: "2026",
        category: "Kompetensi",
        image: "/sertif/kompetensi/ocdyvian-alfin-r.png",
        credentialUrl: "/sertif/kompetensi/ocdyvian-alfin-r.png",
        tags: ["Kompetensi"]
    },
    {
        id: "cert-lkmm-pratda",
        date: "2026",
        category: "Webinar",
        image: "/sertif/webinar/lkmm-pratda.png",
        credentialUrl: "/sertif/webinar/lkmm-pratda.pdf",
        tags: ["Webinar"]
    },
    {
        id: "cert-lkmm-td",
        date: "2026",
        category: "Webinar",
        image: "/sertif/webinar/lkmm-td.png",
        credentialUrl: "/sertif/webinar/lkmm-td.pdf",
        tags: ["Webinar"]
    },
    {
        id: "cert-kepanitiaan-30",
        date: "2026",
        category: "Kepanitiaan",
        image: "/sertif/kepanitiaan/kepanitiaan-30.png",
        credentialUrl: "/sertif/kepanitiaan/kepanitiaan-30.png",
        tags: ["Kepanitiaan"]
    },
];

export default function SertifikatPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const { language } = useLanguage(); // Mengambil bahasa aktif (ID / US)

    const t = translations[language] || translations.ID;

    // Menggabungkan data dasar sertifikat dengan terjemahan bahasa aktif
    const certificatesData: Certificate[] = baseCertificates.map(bc => {
        const translated = t.certificates.find(c => c.id === bc.id);
        return {
            ...bc,
            title: translated ? translated.title : "No Title",
            issuer: translated ? translated.issuer : "Unknown Issuer",
        };
    });

    const filteredCertificates = certificatesData.filter(cert => {
        if (activeFilter === "Semua" || activeFilter === "All") return true;
        // Mapping kategori filter jika bahasa Inggris
        if (language === "US") {
            const categoryMap: Record<string, string> = {
                "Competency": "Kompetensi",
                "Webinar": "Webinar",
                "Committee": "Kepanitiaan"
            };
            return cert.category === categoryMap[activeFilter];
        }
        return cert.category === activeFilter;
    });

    useGSAP(() => {
        gsap.from(".header-anim", {
            y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
        });
    }, { scope: container });

    useGSAP(() => {
        if (filteredCertificates.length > 0) {
            gsap.fromTo(".cert-card",
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeFilter, language] });

    return (
        <div ref={container} className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground flex items-center gap-3">
                    {t.title}
                    <Trophy className="text-[#FFD700] fill-[#FFD700]/20" size={36} />
                </h1>
                <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                    {t.subtitle}
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mb-12 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {t.categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out active:scale-95 select-none ${activeFilter === category
                            ? "bg-foreground text-background shadow-md scale-105"
                            : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid Certificates */}
            <div key={activeFilter + language} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
                {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="cert-card group flex flex-col rounded-3xl overflow-hidden bg-card border border-border/40 hover:border-foreground/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Gambar Sertifikat */}
                            <div className="relative w-full h-52 overflow-hidden bg-zinc-900/40 border-b border-border/40 flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                {cert.image.toLowerCase().endsWith(".pdf") ? (
                                    /* Placeholder untuk file PDF */
                                    <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                        <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <FileText size={40} className="text-[#e26975]" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest">{t.pdfLabel}</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-2 transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                )}
                                <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5 border border-border/50">
                                    <Award size={13} className="text-primary" />
                                    <span>{cert.category}</span>
                                </div>
                            </div>

                            {/* Konten Detail */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-2">
                                        <span className="flex items-center gap-1 text-primary">
                                            <CheckCircle size={14} />
                                            {cert.issuer}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={13} />
                                            {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                                        {cert.title}
                                    </h3>
                                </div>

                                {/* Bawah: Tags & Tombol Bukti */}
                                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3 mt-auto">
                                    <div className="flex flex-wrap gap-1.5">
                                        {cert.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${getTagColor(tag)}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-secondary hover:bg-foreground hover:text-background text-foreground px-3.5 py-2 rounded-xl transition-colors shrink-0 shadow-sm"
                                        >
                                            <span>{t.btnView}</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border">
                        <p className="font-medium text-lg">{t.emptyTitle}</p>
                        <p className="text-sm opacity-70 mt-1">{t.emptySubtitle}</p>
                    </div>
                )}
            </div>

        </div>
    );
}