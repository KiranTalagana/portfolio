"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { BookOpen } from "lucide-react";

export default function PublicationsSection() {
    if (!resume.publications || resume.publications.length === 0) return null;

    return (
        <section id="publications" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Publications</span>
                </h2>
            </motion.div>

            <div className="max-w-[800px] mx-auto">
                {resume.publications.map((pub, i) => (
                    <motion.div
                        key={i}
                        className="glass-card glow-border p-6 sm:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                        <div className="flex gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "var(--accent-glow)",
                                    color: "var(--accent)",
                                }}
                            >
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--accent)" }}>
                                    Research Paper
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {pub.citation}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
