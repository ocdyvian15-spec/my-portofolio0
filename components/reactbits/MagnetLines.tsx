"use client";

import { useRef, useEffect } from "react";

export interface MagnetLinesProps {
    rows?: number;
    columns?: number;
    containerSize?: string;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function MagnetLines({
    rows = 9,
    columns = 9,
    containerSize = "80vmin",
    lineColor = "hsl(var(--primary))", // Menggunakan warna primary Tailwind Anda
    lineWidth = "1vmin",
    lineHeight = "6vmin",
    baseAngle = -10,
    className = "",
    style = {},
}: MagnetLinesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLSpanElement>(".magnet-item");

        const onPointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Hitung posisi relatif kursor dari pusat kontainer
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            items.forEach((item) => {
                // Efek magnet: rotasi berdasarkan posisi pointer
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2;
                const itemCenterY = itemRect.top + itemRect.height / 2;

                const deltaX = e.clientX - itemCenterX;
                const deltaY = e.clientY - itemCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Semakin dekat kursor, semakin besar efek rotasinya
                const maxDistance = rect.width;
                const effect = Math.max(0, 1 - distance / maxDistance);

                const angle = baseAngle + (x * 45 * effect) + (y * 45 * effect);

                item.style.transform = `rotate(${angle}deg)`;
            });
        };

        const onPointerLeave = () => {
            items.forEach((item) => {
                item.style.transform = `rotate(${baseAngle}deg)`;
            });
        };

        window.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerleave", onPointerLeave);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [baseAngle]);

    // Generate grid items
    const gridItems = Array.from({ length: rows * columns }, (_, i) => i);

    return (
        <div
            ref={containerRef}
            className={`grid place-items-center ${className}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: containerSize,
                height: containerSize,
                ...style,
            }}
        >
            {gridItems.map((id) => (
                <span
                    key={id}
                    className="magnet-item block rounded-full transition-transform duration-300 ease-out will-change-transform"
                    style={{
                        backgroundColor: lineColor,
                        width: lineWidth,
                        height: lineHeight,
                        transform: `rotate(${baseAngle}deg)`,
                        transformOrigin: "center center",
                    }}
                />
            ))}
        </div>
    );
}