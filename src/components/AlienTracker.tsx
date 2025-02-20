"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function Tracker() {
    const blinkRef = useRef<null | NodeJS.Timeout>(null);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [positions, setPositions] = useState({
        leftEye: { x: 75, y: 120 },
        rightEye: { x: 105, y: 120 },
        leftPupil: { x: 75, y: 120 },
        rightPupil: { x: 105, y: 120 },
    });

    const handleMove = useCallback((clientX: number, clientY: number) => {
        const svgElement = document.getElementById("tracker");
        if (!svgElement) return;

        const rect = svgElement.getBoundingClientRect();
        const svgCenterX = rect.left + rect.width / 2;
        const svgCenterY = rect.top + rect.height / 2;

        const offsetX = clientX - svgCenterX;
        const offsetY = clientY - svgCenterY;

        const maxEyeOffset = 8;
        const maxPupilOffset = 15; // Make pupils more responsive to mouse movement

        const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
        const clampedEyeDistance = Math.min(distance, maxEyeOffset);
        const clampedPupilDistance = Math.min(distance, maxPupilOffset);

        const angle = Math.atan2(offsetY, offsetX);

        const eyeMoveX = clampedEyeDistance * Math.cos(angle);
        const eyeMoveY = clampedEyeDistance * Math.sin(angle);

        const pupilMoveX = clampedPupilDistance * Math.cos(angle);
        const pupilMoveY = clampedPupilDistance * Math.sin(angle);

        requestAnimationFrame(() => {
            setPositions({
                leftEye: { x: 75 + eyeMoveX, y: 110 + eyeMoveY },
                rightEye: { x: 105 + eyeMoveX, y: 110 + eyeMoveY },
                leftPupil: { x: 75 + pupilMoveX, y: 110 + pupilMoveY },
                rightPupil: { x: 105 + pupilMoveX, y: 110 + pupilMoveY },
            });
        });
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => handleMove(event.clientX, event.clientY);
        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                handleMove(event.touches[0].clientX, event.touches[0].clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [handleMove]);

    useEffect(() => {
        const scheduleBlink = () => {
            const nextBlinkInterval = Math.random() * 3000 + 2000;
            blinkRef.current = setTimeout(() => {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 200);
                scheduleBlink();
            }, nextBlinkInterval);
        };

        scheduleBlink();
        return () => clearTimeout(blinkRef.current!);
    }, []);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));

        const observer = new MutationObserver(() => {
            setTimeout(() => {
                setIsDarkMode(document.documentElement.classList.contains("dark"));
            }, 1);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return (
        <svg id="tracker" width="64" height="64" viewBox="0 0 180 180">
            {isDarkMode ? (
                <>
                    {/* 👽 Alien (Dark Mode) */}
                    <path
                        d="M 90 10 C 140 10, 170 60, 160 110 C 155 140, 120 170, 90 180 C 60 170, 25 140, 20 110 C 10 60, 40 10, 90 10 Z"
                        className="fill-lime-900 dark:fill-lime-600"
                    />
                    {/* 🛸 Antennas */}
                    <line x1="70" y1="40" x2="70" y2="20" className="stroke-black dark:stroke-black black stroke-[3]" />
                    <line x1="110" y1="40" x2="110" y2="20" className="stroke-black dark:stroke-black stroke-[3]" />
                </>
            ) : (
                <>
                    {/* 👦 Human (Light Mode, Aligned with Alien's Position) */}
                    <g transform="translate(10, 20) scale(4.5)">
                        {/* Face */}
                        <path
                            fill="#f9d9bd"
                            d="M32 20c0-2.209-1.119-4-2.5-4c-.012 0-.021.005-.033.005C27.955 9.704 23.394 5.125 18 5.125s-9.956 4.58-11.467 10.88C6.521 16.004 6.511 16 6.5 16C5.119 16 4 17.791 4 20c0 2.107 1.021 3.815 2.314 3.97C7.537 30.619 12.299 35 18 35c5.7 0 10.463-4.381 11.685-11.03C30.979 23.815 32 22.107 32 20z"
                        />
                        {/* Hair */}
                        <path
                            fill="#5a220c"
                            d="M18 1c8 0 13 6 13 11s-1 7-2 5l-2-4s-6 0-8-2c0 0 3 6-3 0c0 0 1 4-5-1c0 0-3 2-4 7c-.277 1.387-2 0-2-5S9 1 18 1z"
                        />
                    </g>
                </>
            )}

            {/* 👀 Eyes (Blinking & Moving) */}
            <ellipse
                cx={positions.leftEye.x}
                cy={positions.leftEye.y}
                rx={isDarkMode ? "10" : "12"}
                ry={isBlinking ? "0" : isDarkMode ? "18" : "14"}
                className="fill-white dark:fill-black transition-[ry] duration-150 ease-in-out"
            />
            <ellipse
                cx={positions.rightEye.x}
                cy={positions.rightEye.y}
                rx={isDarkMode ? "10" : "12"}
                ry={isBlinking ? "0" : isDarkMode ? "18" : "14"}
                className="fill-white dark:fill-black transition-[ry] duration-150 ease-in-out"
            />

            {/* 🔵 Pupils (Only Visible When Eyes Are Open) */}
            {!isBlinking && (
                <>
                    <circle cx={positions.leftPupil.x} cy={positions.leftPupil.y} r="3" className="fill-black" />
                    <circle cx={positions.rightPupil.x} cy={positions.rightPupil.y} r="3" className="fill-black" />
                </>
            )}

            {/* 😐 Neutral / Smiling Mouth */}
            {isDarkMode ? (
                <path d="M75 155h30" className="stroke-black stroke-[3]" />
            ) : (
                <path d="M75 155 Q90 160, 105 155" className="stroke-amber-800 stroke-[3] fill-none" />
            )}
        </svg>

    );
}
