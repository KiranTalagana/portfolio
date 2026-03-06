"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
    { label: "Experience", id: "experience" },
    { label: "Achievements", id: "achievements" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Publications", id: "publications" },
    { label: "Contact", id: "contact" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);

        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? window.scrollY / total : 0);

        const sections = navItems.map((item) => document.getElementById(item.id));
        let current = "";
        for (const section of sections) {
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150) {
                    current = section.id;
                }
            }
        }
        setActiveSection(current);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setMobileOpen(false);
        }
    };

    return (
        <>
            {/* Scroll progress bar */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
                <motion.div
                    className="h-full"
                    style={{
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                        width: `${scrollProgress * 100}%`,
                    }}
                />
            </div>

            {/* Desktop Nav */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled ? "var(--glass)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="font-bold text-lg tracking-wider"
                    >
                        <span className="gradient-text">KT</span>
                    </button>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="relative px-3 py-2 text-sm transition-colors rounded-lg"
                                style={{
                                    color: activeSection === item.id ? "var(--accent)" : "var(--text-secondary)",
                                }}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                                        style={{ background: "var(--accent)" }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}

                        {/* Theme toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="ml-3 p-2 rounded-lg transition-colors"
                                style={{ color: "var(--text-secondary)" }}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-2 md:hidden">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg"
                                style={{ color: "var(--text-secondary)" }}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg"
                            style={{ color: "var(--text-primary)" }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-6"
                        style={{
                            background: "var(--bg-primary)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navItems.map((item, i) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="text-2xl font-medium"
                                style={{
                                    color: activeSection === item.id ? "var(--accent)" : "var(--text-primary)",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
