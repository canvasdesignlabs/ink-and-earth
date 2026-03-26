"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatherFloatProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export default function FeatherFloat({
  children,
  delay = 0,
  className = "",
  yOffset = 20,
}: FeatherFloatProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo matching global CSS
      }}
    >
      {children}
    </motion.div>
  );
}
