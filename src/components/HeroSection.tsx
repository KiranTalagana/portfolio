"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { resume } from "@/data/resume";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6">
            <div className="max-w-[900px] mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
                {/* Greeting badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8"
                    style={{
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--text-secondary)",
                    }}
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for opportunities
                </motion.div>

                {/* Name */}
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <span className="gradient-text">{resume.basics.name}</span>
                </motion.h1>

                {/* Title */}
                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl font-medium mb-6"
                    style={{ color: "var(--text-secondary)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                >
                    {resume.basics.title}
                </motion.h2>

                {/* Summary */}
                <motion.p
                    className="text-base sm:text-lg max-w-[600px] mx-auto mb-10 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                >
                    {resume.basics.summary}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                >
                    <button
                        onClick={() => {
                            const el = document.getElementById("experience");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-white transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
                        }}
                    >
                        View Experience
                        <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={() => {
                            // Create downloadable resume content
                            const printWindow = window.open('', '_blank');
                            if (!printWindow) return;
                            printWindow.document.write(generateResumeHTML());
                            printWindow.document.close();
                            printWindow.print();
                        }}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300"
                        style={{
                            background: "var(--glass)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--text-primary)",
                        }}
                    >
                        <Download size={16} />
                        Download Resume
                    </button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={20} style={{ color: "var(--text-secondary)", opacity: 0.4 }} />
                </motion.div>
            </div>
        </section>
    );
}

function generateResumeHTML() {
    const r = resume;
    return `<!DOCTYPE html><html><head><title>${r.basics.name} - Resume</title>
  <style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#222;line-height:1.5}
  h1{font-size:28px;margin-bottom:4px}h2{font-size:18px;border-bottom:2px solid #6366f1;padding-bottom:4px;margin-top:24px}
  h3{font-size:15px;margin-bottom:2px}ul{padding-left:20px}li{margin-bottom:4px;font-size:13px}
  .contact{font-size:13px;color:#555}.tags{font-size:12px;color:#666;margin-top:4px}
  .skills-group{margin-bottom:8px}.skill-cat{font-weight:bold;font-size:13px}
  .cert{margin:4px 0;font-size:13px;}</style></head><body>
  <h1>${r.basics.name}</h1>
  <p class="contact">${r.basics.email} | ${r.basics.location} | ${r.basics.phone} | LinkedIn</p>
  <p style="font-size:14px;margin-top:8px">${r.basics.summary}</p>
  <h2>Technical Skills</h2>
  ${r.skills.map(s => `<div class="skills-group"><span class="skill-cat">${s.category}:</span> <span style="font-size:13px">${s.items.join(', ')}</span></div>`).join('')}
  <h2>Certifications</h2>
  ${r.certifications.map(c => `<p class="cert">• ${c.name}</p>`).join('')}
  <h2>Professional Experience</h2>
  ${r.experience.map(e => `<h3>${e.role} — ${e.company}${e.contractCompany ? ' (' + e.contractCompany + ')' : ''}</h3>
  <p style="font-size:12px;color:#666">${e.dates}</p>
  <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
  <p class="tags"><strong>Environment:</strong> ${e.environment.join(', ')}</p>`).join('')}
  <h2>Achievements</h2>
  <ul>${r.achievements.map(a => `<li>${a.description}</li>`).join('')}</ul>
  <h2>Education</h2>
  ${r.education.map(e => `<p style="font-size:13px"><strong>${e.degree}</strong> — ${e.institution} (${e.dates})</p>`).join('')}
  <h2>Publications</h2>
  ${r.publications.map(p => `<p style="font-size:13px">${p.citation}</p>`).join('')}
  </body></html>`;
}
