"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Accueil", href: "#", icon: Home },
  { name: "Projets", href: "#projects", icon: Briefcase },
  { name: "À propos", href: "#about", icon: User },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl"
    >
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <item.icon size={18} />
              <span className="hidden md:block">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
