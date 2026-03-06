"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { GraduationCap, BadgeCheck, Calendar } from "lucide-react";

export default function EducationSection() {
    return (
        <section id="education" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Education & Certifications</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                {/* Education Cards */}
                {resume.education.map((edu, i) => (
                    <motion.div
                        key={i}
                        className="glass-card glow-border p-6 sm:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                            style={{
                                background: "var(--accent-glow)",
                                color: "var(--accent)",
                            }}
                        >
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                            {edu.degree}
                        </h3>
                        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                            {edu.institution}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <Calendar size={13} />
                            <span>{edu.dates}</span>
                        </div>
                    </motion.div>
                ))}

                {/* Certification Card */}
                {resume.certifications.map((cert, i) => (
                    <motion.div
                        key={`cert-${i}`}
                        className="glass-card glow-border p-6 sm:p-8 md:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        style={{
                            background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))",
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "var(--accent-glow)",
                                    color: "var(--accent)",
                                    boxShadow: "0 0 25px var(--accent-glow)",
                                }}
                            >
                                <BadgeCheck size={28} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: "var(--accent)" }}>
                                    Certification
                                </p>
                                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                                    {cert.name}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
