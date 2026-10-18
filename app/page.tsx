"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/shared/LanguageContext";

const SKILL_CATEGORIES: Record<string, string[]> = {
  ID: ["Semua", "Utama", "Robotics", "Tools"],
  US: ["All", "Main", "Robotics", "Tools"],
};

const SKILLS_DATA = [
  { name: "Autodesk Inventor", category: "Robotics", categoryID: "Robotics", color: "#E5661E", icon: "🧱" },
  { name: "Inventor Cam", category: "Robotics", categoryID: "Robotics", color: "#D2611B", icon: "🔩" },
  { name: "Orca Slicer", category: "Robotics", categoryID: "Robotics", color: "#22D3EE", icon: "🐋" },
  { name: "VS Code", category: "Robotics", categoryID: "Robotics", color: "#007ACC", icon: "VS" },
  { name: "SolidWorks", category: "Tools", categoryID: "Tools", color: "#E1251B", icon: "⚙️" },
  { name: "Matlab", category: "Tools", categoryID: "Tools", color: "#E16737", icon: "📊" },
  { name: "Scilab", category: "Tools", categoryID: "Tools", color: "#0096D1", icon: "🧮" },
  { name: "ROS 2", category: "Tools", categoryID: "Tools", color: "#33BBCE", icon: "🤖" },
  { name: "Ultimaker Cura", category: "Tools", categoryID: "Tools", color: "#0066CC", icon: "🧊" },
  { name: "Fluidsim", category: "Tools", categoryID: "Tools", color: "#0F766E", icon: "💧" },
  { name: "CX Programmer", category: "Tools", categoryID: "Tools", color: "#005BAC", icon: "🏭" },
  { name: "GX Works", category: "Tools", categoryID: "Tools", color: "#DC2626", icon: "🛠️" },
  { name: "Tuner pro", category: "Tools", categoryID: "Tools", color: "#7C3AED", icon: "🎛️" },
  { name: "C++", category: "Tools", categoryID: "Tools", color: "#00599C", icon: "C++" },
];

const MAIN_SKILLS = ["Autodesk Inventor", "Inventor Cam", "Orca Slicer", "VS Code"];

const pageTranslations: Record<"ID" | "US", {
  heroTitle: string;
  heroSub: string;
  heroCalling: string;
  aboutTitle: string;
  now: string;
  role: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  aboutP4: string;
  focusTitle: string;
  focusItems: { title: string; desc: string }[];
  skillsSubtitle: string;
  emptySkill: string;
  basedIn: string;
}> = {
  ID: {
    heroTitle: "Mengubah ide menjadi",
    heroSub: "produk nyata",
    heroCalling: "panggilan jiwa saya",
    aboutTitle: "Tentang Saya",
    now: "Sekarang",
    role: "Mahasiswa D4 Teknik Mekatronika",
    aboutP1: "Halo, saya Ocdyvian Alfin Ramadhani, mahasiswa semester 5 D4 Teknik Mekatronika di Politeknik Elektronika Negeri Surabaya (PENS). Sebagai perantau dari Gresik, saya membawa dedikasi dan semangat tinggi untuk membangun solusi rekayasa yang presisi, fungsional, dan tepat sasaran. Saya memiliki keahlian komprehensif dalam perancangan mekanik, proses manufaktur, dan pengembangan sistem tertanam (embedded systems), mulai dari pemodelan CAD 3D, permesinan CNC, hingga pemrograman mikrokontroler serta analisis sistem kontrol PID.",
    aboutP2: "Selain perancangan perangkat keras dan mekanik, saya juga aktif mengeksplorasi inovasi di bidang robotika. Saat ini, saya tergabung sebagai anggota Divisi Mekanik Tim Robot PENS (Tim EMOVER 2026 & ERSOW 2024–2025), berkolaborasi dalam riset, perancangan sasis, dan pengembangan robot kompetisi.",
    aboutP3: "Saya percaya pada pertumbuhan yang berkelanjutan. Di luar laboratorium dan perancangan teknik, saya terus mengasah keterampilan teknis, aktif dalam pengalaman kerja lapangan, serta berkomitmen untuk menghasilkan karya rekayasa yang andal dan solutif.",
    aboutP4: "",
    focusTitle: "Fokus Utama",
    focusItems: [
      { title: "Perancangan Mekanik & 3D CAD", desc: "Merancang dan memodelkan komponen presisi, perakitan mekanik (assembly), sheet metal, hingga gambar teknik menggunakan Autodesk Inventor untuk kebutuhan manufaktur dan robotika." },
      { title: "Manufaktur & Permesinan Industri", desc: "Mengoperasikan proses fabrikasi fisik secara langsung, mulai dari pemesinan 3-Axis CNC Milling, bubut konvensional, pengelasan (SMAW/MIG), hingga 3D Printing (FDM) dan laser cutting." },
      { title: "Sistem Tertanam & Robotika", desc: "Mengembangkan sistem kontrol cerdas, pemrograman mikrokontroler (ESP32, OpenCM), integrasi aktuator (Dynamixel), serta riset mekanik robotika kompetisi melalui Tim Robot PENS." },
    ],
    skillsSubtitle: "Keahlian profesional & teknologi yang saya gunakan.",
    emptySkill: "Belum ada keahlian di kategori ini.",
    basedIn: "Berbasis di Surabaya, Indonesia",
  },
  US: {
    heroTitle: "Turning ideas into",
    heroSub: "real life products",
    heroCalling: "is my calling",
    aboutTitle: "About Me",
    now: "Present",
    role: "D4 Mechatronics Engineering Student",
    aboutP1: "Hello, I am Ocdyvian Alfin Ramadhani, a 5th-semester D4 Mechatronics Engineering student at the Electronic Engineering Polytechnic Institute of Surabaya (PENS). As someone far from home, originally from Gresik, I bring dedication and great enthusiasm to building precise, functional, and on-target engineering solutions. I have comprehensive skills in mechanical design, manufacturing processes, and embedded systems development — ranging from 3D CAD modeling and CNC machining to microcontroller programming and PID control system analysis.",
    aboutP2: "Beyond hardware and mechanical design, I also actively explore innovations in robotics. Currently, I am a member of the Mechanical Division of the PENS Robot Team (EMOVER 2026 & ERSOW 2024–2025), collaborating on research, chassis design, and the development of competition robots.",
    aboutP3: "I believe in continuous growth. Outside the laboratory and engineering design work, I keep sharpening my technical skills, stay active in hands-on field work experiences, and am committed to producing reliable and solution-driven engineering works.",
    aboutP4: "",
    focusTitle: "Main Focus",
    focusItems: [
      { title: "Mechanical Design & CAD Modeling", desc: "Designing and modeling precision components, mechanical assemblies, sheet metal, and technical drawings using Autodesk Inventor for manufacturing and robotics needs." },
      { title: "Manufacturing & CNC Machining", desc: "Directly operating physical fabrication processes, ranging from 3-Axis CNC Milling machining, conventional lathe work, welding (SMAW/MIG), to 3D Printing (FDM) and laser cutting." },
      { title: "Embedded Systems & Robotics", desc: "Developing intelligent control systems, microcontroller programming (ESP32, OpenCM), actuator integration (Dynamixel), and competition robotics mechanical research through the PENS Robot Team." },
    ],
    skillsSubtitle: "My professional skills & tech stack.",
    emptySkill: "No skills in this category yet.",
    basedIn: "Based in Surabaya, Indonesia",
  },
};

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = pageTranslations[language as "ID" | "US"];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Ubah .from menjadi .fromTo agar opacity tidak nyangkut saat React re-render
    tl.fromTo(".hero-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power4.out" }
    );
    tl.fromTo(".hero-social",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(".hero-image",
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
    tl.fromTo(".min-fade",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", clearProps: "all" },
      "-=0.3"
    );
  }, { scope: container });

  useGSAP(() => {
    gsap.fromTo(
      ".skill-badge",
      { scale: 0.85, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)", clearProps: "all" }
    );
  }, { scope: container, dependencies: [activeCategoryIndex, language] });

  useGSAP(() => {
    gsap.fromTo(
      ".skill-badge",
      { scale: 0.85, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "back.out(1.5)", clearProps: "all" }
    );
  }, { scope: container, dependencies: [activeCategoryIndex, language] });

  const categoriesList = SKILL_CATEGORIES[language as "ID" | "US"];
  const activeCategoryName = categoriesList[activeCategoryIndex] || categoriesList[0];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategoryIndex === 0) return true;
    if (activeCategoryIndex === 1) return MAIN_SKILLS.includes(skill.name);
    const catID = language === "ID" ? skill.categoryID : skill.category;
    return catID === activeCategoryName;
  });

  const getCategoryCount = (idx: number) => {
    if (idx === 0) return SKILLS_DATA.length;
    if (idx === 1) return MAIN_SKILLS.length;
    const catName = categoriesList[idx];
    return SKILLS_DATA.filter((s) => (language === "ID" ? s.categoryID : s.category) === catName).length;
  };

  return (
    <div ref={container} className="max-w-5xl pb-1 relative z-10 pt-10 sm:pt-16">
      {/* =========================================================
          HERO SECTION (Diperbarui)
          ========================================================= */}
      <section className="mb-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-10">
        <div className="w-full lg:w-3/5">
          <h1 className="hero-text text-[2rem] md:text-[2rem] lg:text-[4.2rem] font-bold tracking-tighter mb-6 leading-[1.1] text-zinc-900 dark:text-[#f4f4f5]">
            {t.heroTitle} <br />
            <span className="text-zinc-600 dark:text-zinc-400">{t.heroSub}</span> <br />
            {language === "ID" ? (
              <>adalah <span className="bg-gradient-to-r from-[#e26975] to-[#7986cf] bg-clip-text text-transparent">{t.heroCalling}</span>.</>
            ) : (
              <>{t.heroCalling} <span className="bg-gradient-to-r from-[#e26975] to-[#7986cf] bg-clip-text text-transparent">calling</span>.</>
            )}
          </h1>

          <div className="hero-social flex items-center gap-6 mt-10">
            <div className="w-16 h-[2px] bg-zinc-200 dark:bg-white/10 rounded-full"></div>
            <div className="flex items-center gap-5 text-zinc-500 dark:text-muted-foreground">
              <a href="https://www.instagram.com/odyvn/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="http://www.linkedin.com/in/alfin-ramadhani-5b1589420" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image w-full lg:w-2/5 flex justify-center lg:justify-end relative items-center">
          {/* Background Glow Elegan */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#e26975]/20 via-[#7986cf]/20 to-[#FFD700]/10 rounded-full blur-[3rem] -z-10 w-[120%] h-[120%] left-[-10%] top-[-10%] animate-pulse"></div>

          <div className="relative z-10 w-[280px] h-[340px] md:w-[320px] md:h-[400px] overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900/80 border-[4px] border-white/40 dark:border-white/10 shadow-2xl group transition-all duration-500 hover:shadow-[#7986cf]/20 hover:border-white/60 dark:hover:border-white/20">
            <img
              src="/my..jpg"
              alt="Ocdyvian Alfin Ramadhani"
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl font-bold text-zinc-400 dark:text-white/20">AM</div>';
              }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT SECTION
          ========================================================= */}
      <section className="mb-24 border-t border-zinc-200 dark:border-white/10 pt-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="min-fade text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight">{t.aboutTitle}</h2>
            <div className="min-fade mt-8 relative border-l-2 border-zinc-200 dark:border-white/10 ml-2 space-y-8 pb-2">
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-zinc-900 dark:bg-white rounded-full -left-[7px] top-1 ring-4 ring-white dark:ring-background shadow-sm"></div>
                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5 block">{t.now}</span>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">Politeknik Elektronika Negeri Surabaya</h4>
                <p className="text-xs font-medium text-zinc-500 dark:text-white/60 mt-1.5">{t.role}</p>
              </div>
              <div className="relative pl-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute w-2 h-2 bg-zinc-300 dark:bg-white/20 rounded-full -left-[5px] top-1.5 ring-4 ring-white dark:ring-background"></div>
                <h4 className="text-sm font-medium text-zinc-700 dark:text-muted-foreground">SMKN 1 CERME</h4>
              </div>
              <div className="relative pl-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute w-2 h-2 bg-zinc-300 dark:bg-white/20 rounded-full -left-[5px] top-1.5 ring-4 ring-white dark:ring-background"></div>
                <h4 className="text-sm font-medium text-zinc-700 dark:text-muted-foreground">SMPN 1 BENJENG</h4>
              </div>
            </div>
          </div>

          {/* BAGIAN YANG DIPERBARUI: Hapus sm:text-left, biarkan text-justify agar rata kanan kiri di semua layar */}
          <div className="w-full md:w-2/3 space-y-6 text-zinc-600 dark:text-muted-foreground leading-relaxed font-light text-sm sm:text-[15px] text-justify mt-2">
            <p className="min-fade">{t.aboutP1}</p>
            <p className="min-fade">{t.aboutP2}</p>
            <p className="min-fade">{t.aboutP3}</p>
            {t.aboutP4 && <p className="min-fade">{t.aboutP4}</p>}
          </div>
        </div>
      </section>
      {/* =========================================================
          FOKUS UTAMA SECTION (Diperbarui)
          ========================================================= */}
      <section className="mb-24">
        <h2 className="min-fade text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight mb-8">{t.focusTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.focusItems.map((item: { title: string; desc: string }, i: number) => (
            <div
              key={i}
              className="min-fade group relative p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-white dark:hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 overflow-hidden"
            >
              {/* Ornamen Latar Belakang */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 mb-5 block uppercase tracking-widest font-mono">0{i + 1}</span>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 text-lg">{item.title}</h3>
                <p className="text-[14px] text-zinc-600 dark:text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SKILLS SECTION
          ========================================================= */}
      <section className="mb-24">
        <div className="min-fade mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-foreground tracking-tight flex items-center gap-3 mb-2">
            <span className="text-zinc-300 dark:text-white/20 font-mono text-2xl font-light">&lt;/&gt;</span> Skills
          </h2>
          <p className="text-zinc-500 dark:text-muted-foreground text-sm">{t.skillsSubtitle}</p>
        </div>

        <div className="min-fade flex flex-wrap gap-3 mb-10">
          {categoriesList.map((category: string, idx: number) => {
            const isActive = activeCategoryIndex === idx;
            const count = getCategoryCount(idx);
            return (
              <button
                key={category}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${isActive ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white shadow-md" : "bg-transparent text-zinc-600 dark:text-white/70 border-zinc-200 dark:border-white/20 hover:border-zinc-400 dark:hover:border-white/40 hover:text-zinc-900 dark:hover:text-white"
                  }`}
              >
                {category}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${isActive ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-white/60'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-start content-start gap-3 min-h-[200px]">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-badge flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-white/10">
              <span className="flex items-center justify-center font-bold text-[15px] drop-shadow-sm" style={{ color: skill.color }}>{skill.icon}</span>
              <span className="text-[13px] font-medium text-zinc-800 dark:text-white/90 tracking-wide">{skill.name}</span>
            </div>
          ))}
          {filteredSkills.length === 0 && <div className="w-full py-12 text-center text-zinc-500 dark:text-muted-foreground text-sm border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl">{t.emptySkill}</div>}
        </div>
      </section>

      {/* =========================================================
          FOOTER
          ========================================================= */}
      <footer className="min-fade border-t border-zinc-200 dark:border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-[13px] text-zinc-500 dark:text-muted-foreground font-medium">
          <span>Ocdyvian Alfin R.</span>
          <span className="hidden sm:block w-[4px] h-[4px] rounded-full bg-zinc-300 dark:bg-white/20"></span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{t.basedIn}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-[13px] font-semibold text-zinc-500 dark:text-muted-foreground">
          <a href="https://www.linkedin.com/in/alfin-ramadhani-5b1589420" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-foreground transition-colors">LinkedIn</a>
          <a href="mailto:alfinrmdhan15@gmail.com" className="hover:text-zinc-900 dark:hover:text-foreground transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}