"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, FolderOpen, Award, Mail } from "lucide-react";

const dockItems = [
  { icon: Home, label: "About", href: "#about" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: FolderOpen, label: "Projects", href: "#projects" },
  { icon: Award, label: "Achievements", href: "#achievements" },
  { icon: Mail, label: "Contact", href: "mailto:akshatdotjain@gmail.com" },
];

export function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg">
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded whitespace-nowrap"
                >
                  {item.label}
                </motion.div>
              )}
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
