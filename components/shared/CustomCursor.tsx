"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // Kita gunakan hook bawaan GSAP agar lebih stabil di Next.js

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Sembunyikan dengan cara meletakkannya jauh di luar layar (-100px), bukan dengan opacity
    gsap.set(cursor, { x: -100, y: -100, xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out", // Pergerakan lebih smooth
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  });

  return (
    <div
      ref={cursorRef}
      // Kita gunakan border warna primary (biru) dan efek glow agar sangat jelas terlihat
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] pointer-events-none z-[9999] hidden md:block"
    />
  );
}