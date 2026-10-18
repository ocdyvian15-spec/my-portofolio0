"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const container = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useGSAP(() => {
        // Animasi transisi setiap kali rute (pathname) berubah
        gsap.fromTo(
            container.current,
            {
                y: 40,
                opacity: 0,
                filter: "blur(8px)" // Tambahan efek blur halus khas iOS/Premium Web
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power3.out"
            }
        );
    }, { scope: container, dependencies: [pathname] });

    return (
        <div ref={container} className="will-change-transform">
            {children}
        </div>
    );
}