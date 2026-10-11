"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/hooks";

export function CursorLabel({ text }: { text: string | null }) {
  const fine = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 45 });
  const sy = useSpring(y, { stiffness: 600, damping: 45 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;

  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-45">
      <AnimatePresence>
        {text && (
          <motion.span
            key={text}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="label absolute top-4 left-4 block origin-top-left rounded-full bg-ink px-3 py-1.5 whitespace-nowrap text-paper"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
