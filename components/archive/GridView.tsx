"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { getCover, projects } from "@/content/projects";
import { galleryHref, gridColumns, type View } from "./shared";

export function GridView({ view, zoom }: { view: View; zoom: number }) {
  const cols = (n: number) => `repeat(${n}, minmax(0, 1fr))`;
  return (
    <section
      aria-label="Projects"
      className="px-5 pt-24 pb-40 md:px-6"
      style={
        {
          "--dc": cols(gridColumns.desktop[zoom]),
          "--mc": cols(gridColumns.mobile[zoom]),
        } as React.CSSProperties
      }
    >
      <ul className="grid grid-cols-(--mc) gap-x-3 gap-y-8 md:grid-cols-(--dc) md:gap-x-4 md:gap-y-10">
        {projects.map((project, i) => {
          const cover = getCover(project);
          return (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 10) * 0.03 }}
            >
              <Link href={galleryHref(view, project.slug)} scroll={false} className="group block">
                <div className="relative aspect-4/5 overflow-hidden bg-mist">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <p className="label mt-2.5 truncate">{project.title}</p>
                <p className="label mt-0.5 text-dim">
                  {project.category}, {project.year}
                </p>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
