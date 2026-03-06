"use client";

import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer
            className="py-8 px-6 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
        >
            <p className="text-sm flex items-center justify-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                Crafted with <Heart size={14} style={{ color: "var(--accent)" }} fill="var(--accent)" /> by Kiran Talagana
            </p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>
                © {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
}
