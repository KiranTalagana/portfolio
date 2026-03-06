"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 1500;

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const p = Math.min(elapsed / duration, 1);
            setProgress(p);
            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    setShow(false);
                    setTimeout(onComplete, 600);
                }, 200);
            }
        };
        requestAnimationFrame(tick);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    style={{ background: "var(--bg-primary)" }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Monogram */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative mb-10"
                    >
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            {/* K */}
                            <motion.path
                                d="M 20 20 L 20 80 M 20 50 L 45 20 M 20 50 L 45 80"
                                stroke="url(#monogramGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                            {/* T */}
                            <motion.path
                                d="M 55 20 L 85 20 M 70 20 L 70 80"
                                stroke="url(#monogramGrad)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                            />
                            <defs>
                                <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                                filter: "blur(20px)",
                            }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Name */}
                    <motion.p
                        className="text-sm tracking-[0.3em] uppercase mb-8"
                        style={{ color: "var(--text-secondary)" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        Kiran Talagana
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                                width: `${progress * 100}%`,
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
