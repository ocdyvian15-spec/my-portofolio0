"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/shared/LanguageContext";

// Data lengkap proyek
const projectsData: Record<string, any> = {
    "emosver-robotics": {
        title: "EMOSVER - Robotics",
        titleUS: "EMOSVER - Robotics",
        category: "Robotics & AI",
        shortDesc: "Riset wahana bawah air (AUV/ROV) untuk kompetisi TEKNOFEST.",
        shortDescUS: "Underwater vehicle (AUV/ROV) research for the TEKNOFEST competition.",
        fullDesc: "Pengembangan sistem kontrol navigasi dan kestabilan robot bawah air (Autonomous Underwater Vehicle) menggunakan Robot Operating System (ROS). Fokus utama pada pemrograman sensor IMU MPU-6000 untuk menjaga keseimbangan di arus air yang dinamis.",
        fullDescUS: "Development of navigation control and stability systems for an Autonomous Underwater Vehicle using the Robot Operating System (ROS). The main focus is programming the MPU-6000 IMU sensor to maintain balance in dynamic water currents.",
        tags: ["ROS", "Robotics", "C++"],
        screenshots: [
            "/assets/images/proyek/emosver1.jpg",
            "/assets/images/krbai/gambar1EMOSVER.png",
            "/assets/images/krbai/gambar2.png",
            "/assets/images/krbai/gambar3.png",
            "/assets/images/krbai/gambar4.png",
            "/assets/images/krbai/gambar5.png",
        ]
    },
    "ersow-soccer-robot": {
        title: "ERSOW - Wheeled Soccer Robot",
        titleUS: "ERSOW - Wheeled Soccer Robot",
        category: "Robotics & Mechanics",
        shortDesc: "Desain dan fabrikasi chassis serta drive system robot sepak bola beroda.",
        shortDescUS: "Design and fabrication of the chassis and drive system of a wheeled soccer robot.",
        fullDesc: "Desain dan fabrikasi chassis serta drive system robot sepak bola beroda (ERSOW). Perancangan dilakukan menggunakan Autodesk Inventor, dilanjutkan dengan fabrikasi komponen presisi melalui proses CNC dan manual machining hingga menghasilkan robot yang andal di arena lomba.",
        fullDescUS: "Design and fabrication of the chassis and drive system of a wheeled soccer robot (ERSOW). The design was made using Autodesk Inventor, followed by precision component fabrication through CNC and manual machining processes, resulting in a reliable robot for the competition arena.",
        tags: ["Autodesk Inventor", "CNC", "Manufaktur", "Mekanik"],
        screenshots: [
            "/assets/images/proyek/ersow1.jpg",
            "/assets/images/proyek/ersow2.jpg",
            "/assets/images/proyek/ersow3.jpg",
        ]
    },
    "mekanisme-gripper-arm": {
        title: "Robotic Transporter",
        titleUS: "Robotic Transporter",
        category: "Robotics & Mechanics",
        shortDesc: "Robot transporter berbasis 3 roda omni dengan kemampuan gerak 360°.",
        shortDescUS: "A transporter robot based on 3 omni wheels with 360° movement capability.",
        fullDesc: "Robot transporter berbasis 3 roda omni dengan kemampuan gerak 360° untuk navigasi presisi dan pemindahan objek cepat diarena lomba.",
        fullDescUS: "A transporter robot based on 3 omni wheels with 360° movement capability for precise navigation and fast object handling in the competition arena.",
        tags: ["Autodesk Inventor", "3D Printing", "Mekatronik"],
        screenshots: [
            "/assets/images/proyek/robot-transporter.jpg",
        ]
    },
    "custom-gearbox-assembly": {
        title: "Alat Filament Extruder",
        titleUS: "Filament Extruder Machine",
        category: "Mechanical Design",
        shortDesc: "Mesin pemroses limbah botol plastik PET menjadi filamen 3D printer.",
        shortDescUS: "A machine that processes PET plastic bottle waste into 3D printer filament.",
        fullDesc: "Mesin pemroses limbah botol plastik PET menjadi filamen 3D printer berkualitas tinggi menggunakan sistem pemotong dan ekstrusi otomatis berpresisi.",
        fullDescUS: "A machine that processes PET plastic bottle waste into high-quality 3D printer filament using a precise automatic cutting and extrusion system.",
        tags: ["Autodesk Inventor", "Ekstrusi", "3D Printing"],
        screenshots: [
            "/assets/images/proyek/filament-extruder.jpg",
        ]
    },
    "cnc-manufacturing-project": {
        title: "Mini Konveyor",
        titleUS: "Mini Conveyor",
        category: "Manufacturing",
        shortDesc: "Mini konveyor berbasis motor stepper untuk pemindahan dan posisi obat.",
        shortDescUS: "A mini conveyor based on a stepper motor for medicine handling and positioning.",
        fullDesc: "Mini konveyor berbasis motor stepper untuk simulasi pemindahan dan pengaturan posisi obat secara presisi dan terotomasi.",
        fullDescUS: "A mini conveyor based on a stepper motor for simulated handling and automated, precise positioning of medicine.",
        tags: ["Autodesk Inventor", "Stepper Motor", "Otomasi"],
        screenshots: [
            "/assets/images/proyek/mini-konveyor.jpg",
        ]
    }
};
export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const isUS = language === "US";

    const labels = {
        back: isUS ? "Back to Projects" : "Kembali ke Daftar Proyek",
        notFoundTitle: isUS ? "Project Not Found" : "Proyek Tidak Ditemukan",
        notFoundDesc: isUS ? "The project page you are looking for is not available." : "Halaman proyek yang kamu cari tidak tersedia.",
        galleryTitle: isUS ? "Screen Preview (Scroll Right →)" : "Pratinjau Layar (Geser ke Kanan →)",
        noImages: isUS ? "No preview images available for this project yet." : "Belum ada gambar pratinjau untuk proyek ini.",
        aboutTitle: isUS ? "About This Project" : "Tentang Proyek Ini",
        techTitle: isUS ? "Technologies Used" : "Teknologi yang Digunakan",
        sourceTitle: isUS ? "Source Code" : "Kode Sumber",
        githubBtn: isUS ? "View Code on GitHub" : "Lihat Kode di GitHub",
        figmaBtn: isUS ? "View Design on Figma" : "Lihat Desain di Figma",
    };

    const projectId = typeof params.id === 'string' ? params.id : '';
    const project = projectsData[projectId];

    if (!project) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold mb-2 text-foreground">{labels.notFoundTitle}</h2>
                <p className="text-muted-foreground mb-6">{labels.notFoundDesc}</p>
                <button
                    onClick={() => router.push('/proyek')}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm"
                >
                    {labels.back}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

            {/* Tombol Kembali */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-xl border border-border/50"
            >
                <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                {labels.back}
            </button>

            {/* Header Halaman Detail */}
            <div className="mb-8 border-b border-border/60 pb-8">
                <span className="text-xs font-extrabold bg-primary/15 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black mt-4 mb-3 text-foreground tracking-tight">
                    {isUS && project.titleUS ? project.titleUS : project.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    {isUS && project.shortDescUS ? project.shortDescUS : project.shortDesc}
                </p>
            </div>

            {/* =========================================================================
          GALERI GAMBAR (UKURAN LEBIH KECIL & HORIZONTAL / LANDSCAPE 16:9)
      ========================================================================= */}
            <div className="mb-12">


                {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="mb-12">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            {labels.galleryTitle}
                        </h3>

                        {project.screenshots && project.screenshots.length > 0 ? (
                            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border">
                                {project.screenshots.map((imgUrl: string, idx: number) => {

                                    /* PENGECEKAN OTOMATIS: Apakah ini aplikasi Mobile/HP? */
                                    const isMobileApp = project.category.toLowerCase().includes("mobile") || project.isPortrait;

                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-border/80 bg-muted/30 shadow-lg hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center ${isMobileApp
                                                ? "w-[180px] sm:w-[200px] md:w-[220px] h-[360px] sm:h-[400px] md:h-[440px]" // -> UKURAN HP LEBIH KECIL & RAMPING (1:2)
                                                : "w-[280px] sm:w-[340px] md:w-[380px] h-[160px] sm:h-[190px] md:h-[215px]" // -> UKURAN WEB
                                                }`}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                /* KUNCI ANTI-KEPOTONG: 
                                                   Menggunakan 'object-contain' untuk Mobile App agar seluruh bingkai HP tampil utuh! */
                                                className={`w-full h-full ${isMobileApp ? "object-contain p-1.5" : "object-cover object-center"}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-secondary/20 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                                {labels.noImages}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-48 bg-secondary/20 rounded-3xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                        {labels.noImages}
                    </div>
                )}
            </div>

            {/* Bagian Penjelasan & Tombol GitHub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-border/60 pt-10">

                {/* Kiri: Tentang Proyek */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                        {labels.aboutTitle}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed text-base whitespace-pre-line text-justify sm:text-left font-light">
                        {isUS && project.fullDescUS ? project.fullDescUS : project.fullDesc}
                    </p>
                </div>

                {/* Kanan: Teknologi & Tombol GitHub */}
                <div className="space-y-6 bg-secondary/20 p-6 sm:p-8 rounded-3xl border border-border/50 h-fit">
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                            {labels.techTitle}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-background border border-border text-foreground shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                            {labels.sourceTitle}
                        </h3>
                        {/* Bungkus dengan flex-col dan gap-4 (jarak vertikal 16px antar tombol) */}
                        <div className="flex flex-col gap-4 my-2">

                            {/* 1. TOMBOL GOOGLE PLAY STORE (BARU!) */}
                            {project.playStoreUrl && (
                                <a
                                    href={project.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    /* Menggunakan warna Hijau khas Google Play Store (#01875F) */
                                    className="w-full flex items-center justify-center gap-2.5 bg-[#01875F] hover:bg-[#01875F]/90 text-white py-3.5 px-5 rounded-2xl font-bold transition duration-300 text-sm shadow-md"
                                >
                                    {/* Ikon Google Play Store Native SVG */}
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.21-.786V2.6a1.5 1.5 0 0 1 .209-.786zm11.244 11.243l3.119 3.118-10.375 5.952 7.256-9.07zM20.258 10.74l-1.503-.86-2.457 2.457 2.457 2.458 1.503-.861c.963-.55 .963-1.644 0-2.194zM7.598 1.874l10.375 5.952-3.119 3.118-7.256-9.07z" />
                                    </svg>
                                    <span>Unduh di Google Play Store</span>
                                </a>
                            )}

                            {/* 2. TOMBOL GITHUB */}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 bg-foreground hover:bg-foreground/90 text-background py-3.5 px-5 rounded-2xl font-bold transition duration-200 text-sm shadow-md"
                                >
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    <span>{labels.githubBtn}</span>
                                </a>
                            )}

                            {/* 3. TOMBOL FIGMA */}
                            {project.figmaUrl && (
                                <a
                                    href={project.figmaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2.5 bg-[#F24E1E]/10 hover:bg-[#F24E1E] text-[#F24E1E] hover:text-white border border-[#F24E1E]/30 py-3.5 px-5 rounded-2xl font-bold transition duration-300 text-sm shadow-sm"
                                >
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 12a3 3 0 1 0 3 3V9a3 3 0 1 0-3 3z" /><path d="M12 6a3 3 0 1 0-3 3h3V6z" /><path d="M6 12a3 3 0 1 0 3 3H6v-3z" /><path d="M6 6a3 3 0 1 0 3 3H6V6z" /><path d="M18 6a3 3 0 1 0-3 3h-3V6h3z" /></svg>
                                    <span>{labels.figmaBtn}</span>
                                </a>
                            )}

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}