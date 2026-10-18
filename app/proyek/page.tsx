"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageContext";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

interface Project {
    id: string;
    title: string;
    titleUS: string;
    category: string;
    shortDesc: string;
    shortDescUS: string;
    tags: string[];
    image: string;
}

const projectsData: Project[] = [
    {
        id: "emosver-robotics",
        title: "EMOSVER - Underwater Robotics",
        titleUS: "EMOSVER - Underwater Robotics",
        category: "Robotics & Mechanics",
        shortDesc: "Perancangan sistem mekanik dan navigasi robot bawah air (AUV/ROV).",
        shortDescUS: "Mechanical system and navigation design for underwater robots (AUV/ROV).",
        tags: ["CAD", "SolidWorks", "Mekanik", "ROS"],
        image: "/assets/images/proyek/emosver1.jpg"
    },
    {
        id: "ersow-soccer-robot",
        title: "ERSOW - Wheeled Soccer Robot",
        titleUS: "ERSOW - Wheeled Soccer Robot",
        category: "Robotics & Mechanics",
        shortDesc: "Desain dan fabrikasi chassis serta drive system robot sepak bola beroda.",
        shortDescUS: "Design and fabrication of the chassis and drive system of a wheeled soccer robot.",
        tags: ["Autodesk Inventor", "CNC", "Manufaktur", "Mekanik"],
        image: "/assets/images/proyek/ersow1.jpg"
    },
    {
        id: "mekanisme-gripper-arm",
        title: "Robotic Transporter",
        titleUS: "Robotic Transporter",
        category: "Robotics & Mechanics",
        shortDesc: "Robot transporter berbasis 3 roda omni dengan kemampuan gerak 360° untuk navigasi presisi dan pemindahan objek cepat diarena lomba.",
        shortDescUS: "A transporter robot based on 3 omni wheels with 360° movement capability for precise navigation and fast object handling in the competition arena.",
        tags: ["Autodesk Inventor", "3D Printing", "Mekatronik"],
        image: "/assets/images/proyek/robot-transporter.jpg"
    },
    {
        id: "custom-gearbox-assembly",
        title: "Alat Filament Extruder",
        titleUS: "Filament Extruder Machine",
        category: "Mechanical Design",
        shortDesc: "Mesin pemroses limbah botol plastik PET menjadi filamen 3D printer berkualitas tinggi menggunakan sistem pemotong dan ekstrusi otomatis berpresisi.",
        shortDescUS: "A machine that processes PET plastic bottle waste into high-quality 3D printer filament using a precise automatic cutting and extrusion system.",
        tags: ["Autodesk Inventor", "Ekstrusi", "3D Printing"],
        image: "/assets/images/proyek/filament-extruder.jpg"
    },
    {
        id: "cnc-manufacturing-project",
        title: "Mini Konveyor",
        titleUS: "Mini Conveyor",
        category: "Manufacturing",
        shortDesc: "Mini konveyor berbasis motor stepper untuk simulasi pemindahan dan pengaturan posisi obat secara presisi dan terotomasi.",
        shortDescUS: "A mini conveyor based on a stepper motor for simulated handling and automated, precise positioning of medicine.",
        tags: ["Autodesk Inventor", "Stepper Motor", "Otomasi"],
        image: "/assets/images/proyek/mini-konveyor.jpg"
    }
];

export default function ProyekPage() {
    const container = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState("Semua");
    const { language } = useLanguage();

    const categories = ["Semua", "Robotics & Mechanics", "Mechanical Design", "Manufacturing"];

    const filteredProjects = projectsData.filter((project) => {
        if (activeCategory === "Semua") return true;
        return project.category === activeCategory;
    });

    useGSAP(() => {
        gsap.from(".header-anim", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
    }, { scope: container });

    useGSAP(() => {
        if (filteredProjects.length > 0) {
            gsap.fromTo(
                ".project-card",
                { y: 30, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.1)", clearProps: "all" }
            );
        }
    }, { scope: container, dependencies: [activeCategory] });

    return (
        <div ref={container} className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 header-anim text-foreground">
                    {language === "US" ? "Featured Projects" : "Portofolio Proyek"}
                </h1>
                <p className="text-base text-muted-foreground max-w-xl header-anim leading-relaxed">
                    {language === "US" 
                        ? "A collection of robotics, mechanical design, and precision manufacturing projects."
                        : "Kumpulan proyek riset robotika, perancangan desain mekanik, dan manufaktur presisi."}
                </p>
            </div>

            {/* Filter Kategori */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10 header-anim bg-secondary/30 p-2 rounded-2xl w-fit border border-border/50">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            activeCategory === cat
                                ? "bg-foreground text-background shadow-md scale-105"
                                : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Kartu Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/proyek/${project.id}`}
                        className="project-card group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="relative w-full h-48 bg-zinc-900/50 overflow-hidden border-b border-border/40">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-foreground mt-3 mb-2 flex items-center justify-between group-hover:text-primary transition-colors">
                                    <span>{language === "US" ? project.titleUS : project.title}</span>
                                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {language === "US" ? project.shortDescUS : project.shortDesc}
                                </p>
                            </div>
                        </div>

                        <div className="px-6 pb-6 pt-2 flex flex-wrap gap-1.5 border-t border-border/30 mt-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}