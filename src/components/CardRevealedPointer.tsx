"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { ReactNode } from "react";

export function CardRevealedPointer(
    { className, children }: { className?: string, children: ReactNode }
) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className={`group relative overflow-hidden bg-neutral-950 w-full h-full ${ className }`}
    >
      <div className="absolute z-20 right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.4), transparent 80%)
					`,
        }}
      />
      { children }
    </div>
  );
}
