"use client";

import { useState } from "react";
import { motion, Reorder } from "framer-motion";

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Python", "PostgreSQL", "MongoDB", "AWS", "Docker", 
  "Git", "Tailwind CSS", "Firebase", "Supabase"
];

export function SkillsDraggable() {
  const [items, setItems] = useState(skills);

  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
        Skills. <span className="text-xs font-normal text-neutral-500">(drag to reorder)</span>
      </h3>
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={setItems}
        className="space-y-2"
      >
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <Reorder.Item 
              key={skill} 
              value={skill}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.span
                whileDrag={{ scale: 1.05 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {skill}
              </motion.span>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}
