"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { resume } from "@/data/resume";

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const end = value;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, value, duration]);

    return <span ref={ref}>{count}</span>;
}

const iconMap: Record<string, React.ReactNode> = {
    recognition: <Trophy size={24} />,
    award: <Award size={24} />,
};

export default function AchievementsSection() {
    // Top 3 impact items
    const topImpact = [
        {
            label: "16 Kudos — Atlassian",
            icon: <Star size={18} />,
        },
        {
            label: "3 Performance Awards — Citrix",
            icon: <Medal size={18} />,
        },
        {
            label: "Above & Beyond — Citrix Q1-2018",
            icon: <Award size={18} />,
        },
    ];

    return (
        <section id="achievements" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Achievements</span>
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-base sm:text-lg">
                    Recognition and awards earned throughout my career
                </p>
            </motion.div>

            {/* Top 3 Impact Strip */}
            <motion.div
                className="glass-card p-4 sm:p-6 mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))",
                    border: "1px solid rgba(99,102,241,0.15)",
                }}
            >
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--accent)" }}>
                    Top Impact
                </span>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {topImpact.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                            <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resume.achievements.map((achievement, i) => (
                    <motion.div
                        key={i}
                        className="glass-card glow-border p-6 sm:p-8 group cursor-default"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        {/* Icon */}
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                            style={{
                                background: "var(--accent-glow)",
                                color: "var(--accent)",
                                boxShadow: "0 0 20px var(--accent-glow)",
                            }}
                        >
                            {iconMap[achievement.type] || <Trophy size={24} />}
                        </div>

                        {/* Number counter */}
                        {achievement.number && (
                            <div className="text-4xl font-bold mb-2 gradient-text">
                                <AnimatedCounter value={achievement.number} />
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                            {achievement.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            {achievement.description}
                        </p>

                        {/* Company badge */}
                        <div className="mt-4">
                            <span
                                className="text-xs px-3 py-1 rounded-full"
                                style={{
                                    background: "var(--glass)",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                {achievement.company}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
