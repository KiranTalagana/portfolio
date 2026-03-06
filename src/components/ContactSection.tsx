"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const contactItems = [
    {
        icon: <Mail size={20} />,
        label: "Email",
        value: resume.basics.email,
        href: `mailto:${resume.basics.email}`,
    },
    {
        icon: <Phone size={20} />,
        label: "Phone",
        value: resume.basics.phone,
        href: `tel:${resume.basics.phone.replace(/\s/g, "")}`,
    },
    {
        icon: <MapPin size={20} />,
        label: "Location",
        value: resume.basics.location,
        href: null,
    },
    {
        icon: <Linkedin size={20} />,
        label: "LinkedIn",
        value: "LinkedIn Profile",
        href: resume.basics.linkedin,
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="section-container">
            {/* Section header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Get In Touch</span>
                </h2>
                <p style={{ color: "var(--text-secondary)" }} className="text-base sm:text-lg max-w-[500px] mx-auto">
                    Feel free to reach out for collaborations, opportunities, or just a friendly chat
                </p>
            </motion.div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mx-auto">
                {contactItems.map((item, i) => (
                    <motion.a
                        key={i}
                        href={item.href || undefined}
                        target={item.href?.startsWith("http") ? "_blank" : undefined}
                        rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="glass-card glow-border p-5 flex items-center gap-4 transition-all duration-300"
                        style={{ cursor: item.href ? "pointer" : "default", textDecoration: "none" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: "var(--accent-glow)",
                                color: "var(--accent)",
                            }}
                        >
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--text-secondary)" }}>
                                {item.label}
                            </p>
                            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                {item.value}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
