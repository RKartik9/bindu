"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type Img = { src: string; width: number; height: number; alt?: string };

export function ParallaxStrip({ images }: { images: readonly Img[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-18%"]);

  return (
    <div ref={ref} className="overflow-x-clip">
      <motion.div style={{ x }} className="flex items-start gap-4 md:gap-6">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="relative w-[58vw] shrink-0 overflow-hidden bg-mist md:w-[26vw]"
            style={{ aspectRatio: `${img.width} / ${img.height}`, marginTop: `${(i % 3) * 4}vw` }}
          >
            <Image src={img.src} alt={img.alt ?? ""} fill sizes="(min-width: 768px) 26vw, 58vw" className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
