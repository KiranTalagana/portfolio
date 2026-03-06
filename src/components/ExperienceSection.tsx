"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Briefcase, Calendar, Building2 } from "lucide-react";
import { resume } from "@/data/resume";

const impactKeywords = ["real-time", "production-grade", "automated", "CI/CD", "end-to-end", "near real-time", "scalable", "SLA", "KPI", "forecasting", "gold layer", "streaming"];

function extractImpactBullets(bullets: string[]): string[] {
    return bullets
        .filter((b) => impactKeywords.some((k) => b.toLowerCase().includes(k.toLowerCase())))
        .slice(0, 3);
}

export default function ExperienceSection() {
    const [expanded, setExpanded] = useState<number | null>(0);

    return (
        <section id="experience" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Professional Experience</span>
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-base sm:text-lg max-w-[500px] mx-auto">
                    8 years of engineering experience building data solutions at scale
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div
                    className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] hidden sm:block"
                    style={{
                        background: "linear-gradient(to bottom, var(--accent), rgba(99,102,241,0.1))",
                    }}
                />

                {resume.experience.map((exp, i) => {
                    const isExpanded = expanded === i;
                    const isLeft = i % 2 === 0;
                    const impacts = extractImpactBullets(exp.bullets);

                    return (
                        <motion.div
                            key={i}
                            className={`relative mb-8 sm:mb-12 ${i % 2 === 0 ? "md:pr-[calc(50%+40px)]" : "md:pl-[calc(50%+40px)]"
                                }`}
                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {/* Timeline dot */}
                            <div
                                className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 hidden sm:flex items-center justify-center"
                                style={{
                                    background: "var(--bg-primary)",
                                    border: "2px solid var(--accent)",
                                    boxShadow: "0 0 15px var(--accent-glow)",
                                }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                            </div>

                            {/* Card */}
                            <div
                                className="glass-card glow-border p-6 sm:p-8 cursor-pointer transition-all duration-300 ml-0 sm:ml-12 md:ml-0"
                                onClick={() => setExpanded(isExpanded ? null : i)}
                                style={{
                                    boxShadow: isExpanded
                                        ? "0 8px 40px rgba(99, 102, 241, 0.1)"
                                        : "none",
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Briefcase size={16} style={{ color: "var(--accent)" }} />
                                            <span
                                                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                                                style={{
                                                    background: "var(--accent-glow)",
                                                    color: "var(--accent)",
                                                }}
                                            >
                                                {exp.role}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                                            {exp.company}
                                        </h3>
                                        {exp.contractCompany && (
                                            <div className="flex items-center gap-1.5 text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
                                                <Building2 size={13} />
                                                <span>via {exp.contractCompany}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                            <Calendar size={13} />
                                            <span>{exp.dates}</span>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} style={{ color: "var(--text-secondary)" }} />
                                    </motion.div>
                                </div>

                                {/* Impact highlights (always visible) */}
                                {impacts.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: "var(--accent)" }}>
                                            Impact Highlights
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {impacts.map((imp, j) => {
                                                const short = imp.length > 80 ? imp.substring(0, 77) + "..." : imp;
                                                return (
                                                    <span
                                                        key={j}
                                                        className="text-xs px-3 py-1.5 rounded-lg"
                                                        style={{
                                                            background: "var(--glass)",
                                                            border: "1px solid var(--glass-border)",
                                                            color: "var(--text-secondary)",
                                                        }}
                                                    >
                                                        {short}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Expanded bullets */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isExpanded ? "auto" : 0,
                                        opacity: isExpanded ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <ul className="space-y-3 mb-6 pt-2">
                                        {exp.bullets.map((bullet, j) => (
                                            <motion.li
                                                key={j}
                                                className="flex gap-3 text-sm leading-relaxed"
                                                style={{ color: "var(--text-secondary)" }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                                transition={{ delay: j * 0.03 }}
                                            >
                                                <span
                                                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                    style={{ background: "var(--accent)" }}
                                                />
                                                <span>{bullet}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Environment tags */}
                                    <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                                        <p className="text-xs uppercase tracking-wider mb-3 font-medium" style={{ color: "var(--text-secondary)" }}>
                                            Environment
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.environment.map((tag, j) => (
                                                <span
                                                    key={j}
                                                    className="text-[11px] px-2 py-1 rounded-md"
                                                    style={{
                                                        background: "var(--glass)",
                                                        border: "1px solid var(--glass-border)",
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
