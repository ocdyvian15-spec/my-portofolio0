"use client";

import { useEffect, useRef } from "react";

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Array untuk menampung partikel percikan
    const particles: any[] = [];
    
    // Palet warna percikan (Biru, Ungu, Cyan, Pink ala Cyberpunk/Dark Theme)
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Fungsi untuk mengubah kode Hex warna menjadi RGB agar bisa diatur transparansinya
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : "255, 255, 255";
    };

    // Fungsi menambahkan partikel saat mouse bergerak
    const addParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        // Kecepatan dan arah sebaran (random)
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        // Ukuran partikel (random)
        radius: Math.random() * 4 + 2,
        color: hexToRgb(colors[Math.floor(Math.random() * colors.length)]),
        life: 1, // Umur partikel (1 = 100%)
        decay: Math.random() * 0.02 + 0.015, // Kecepatan memudar
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      // Memunculkan 4 partikel sekaligus setiap kali mouse bergeser
      for (let i = 0; i < 4; i++) {
        addParticle(e.clientX, e.clientY);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    // Loop Animasi Canvas
    const render = () => {
      // Membersihkan frame sebelumnya agar tidak menumpuk
      ctx.clearRect(0, 0, width, height);

      // Render setiap partikel
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; // Bergerak sumbu X
        p.y += p.vy; // Bergerak sumbu Y
        p.life -= p.decay; // Semakin pudar
        p.radius *= 0.96; // Semakin menyusut

        // Jika partikel sudah mati, hapus dari array
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup saat komponen ditutup agar memori PC tetap lega
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}