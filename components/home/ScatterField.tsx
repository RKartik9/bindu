"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { ScatterItem } from "@/lib/scatter";

function ScatterImage({ item, index }: { item: ScatterItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const distance = reduce ? 0 : item.speed * 140;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div
      ref={ref}
      className="absolute top-(--my) left-(--mx) w-(--mw) md:top-(--y) md:left-(--x) md:w-(--w)"
      style={
        {
          "--x": `${item.x}vw`,
          "--y": `${item.y}vw`,
          "--w": `${item.w}vw`,
          "--mx": `${item.mx}vw`,
          "--my": `${item.my}vw`,
          "--mw": `${item.mw}vw`,
        } as React.CSSProperties
      }
    >
      <motion.div style={{ y }}>
        <Link href={`/work?gallery=${item.project.slug}`} className="group block" draggable={false}>
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index < 4 ? 0.15 * index : 0 }}
            className="overflow-hidden bg-mist"
          >
            <Image
              src={item.shot.src}
              alt={item.shot.alt}
              width={item.shot.width}
              height={item.shot.height}
              sizes="(min-width: 768px) 22vw, 42vw"
              loading={index < 4 ? "eager" : "lazy"}
              draggable={false}
              className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="label mt-2 flex justify-between gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="truncate">{item.project.title}</span>
            <span className="shrink-0 text-dim">{item.project.year}</span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function ScatterField({
  items,
  height,
  mobileHeight,
  title,
}: {
  items: ScatterItem[];
  height: number;
  mobileHeight: number;
  title: string;
}) {
  return (
    <section
      className="relative h-(--mh) overflow-x-clip md:h-(--h)"
      style={{ "--h": `${height}vw`, "--mh": `${mobileHeight}vw` } as React.CSSProperties}
    >
      {items.map((item, i) => (
        <ScatterImage key={item.shot.src} item={item} index={i} />
      ))}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-svh items-center justify-center text-white mix-blend-difference">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.75rem,7vw,7.5rem)] leading-none font-medium tracking-tight"
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
