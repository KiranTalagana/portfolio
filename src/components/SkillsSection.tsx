"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Database, Cloud, Wrench, Code } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
    Technologies: <Cloud size={20} />,
    Database: <Database size={20} />,
    "Ticketing Tools": <Wrench size={20} />,
    "Other Tech": <Code size={20} />,
};

export default function SkillsSection() {
    return (
        <section id="skills" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Technical Skills</span>
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-base sm:text-lg">
                    Technologies and tools I work with
                </p>
            </motion.div>

            {/* Skill Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resume.skills.map((group, i) => (
                    <motion.div
                        key={i}
                        className="glass-card p-6 sm:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        {/* Category header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: "var(--accent-glow)",
                                    color: "var(--accent)",
                                }}
                            >
                                {categoryIcons[group.category] || <Code size={20} />}
                            </div>
                            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                                {group.category}
                            </h3>
                            <span
                                className="text-xs px-2 py-0.5 rounded-full ml-auto"
                                style={{
                                    background: "var(--glass)",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                {group.items.length}
                            </span>
                        </div>

                        {/* Skill chips */}
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((skill, j) => (
                                <motion.span
                                    key={j}
                                    className="text-xs sm:text-sm px-3 py-1.5 rounded-lg cursor-default transition-all duration-300"
                                    style={{
                                        background: "var(--glass)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-secondary)",
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 0 15px var(--accent-glow)",
                                        borderColor: "var(--accent)",
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: j * 0.02 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
