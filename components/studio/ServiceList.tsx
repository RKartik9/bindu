"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/content/studio";
import { useMediaQuery } from "@/lib/hooks";

export function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 35 });
  const sy = useSpring(y, { stiffness: 300, damping: 35 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <ol className="border-b border-ink/15">
        {services.map((s, i) => (
          <li
            key={s.title}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            className="grid gap-4 border-t border-ink/15 py-8 transition-colors md:grid-cols-12 md:gap-6 md:py-10"
          >
            <span className="label text-dim md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h3
              className={`font-display text-4xl leading-none font-medium tracking-tight transition-transform duration-500 ease-out-expo md:col-span-5 md:text-[4.2vw] ${
                active === i ? "md:translate-x-4" : ""
              }`}
            >
              {s.title}
            </h3>
            <div className="md:col-span-5 md:col-start-8">
              <p className="max-w-md text-[15px] leading-relaxed text-ink/80">{s.description}</p>
              <ul className="label mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-dim">
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="label mt-4">{s.timeline}</p>
            </div>
          </li>
        ))}
      </ol>

      {fine && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed top-0 left-0 z-20"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-32 left-8 aspect-4/5 w-52 overflow-hidden bg-mist"
              >
                <Image src={services[active].image} alt="" fill sizes="208px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
