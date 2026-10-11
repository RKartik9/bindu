"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getShots, projects, type Project } from "@/content/projects";
import { galleryHref, stackWidth, type View } from "./shared";

const ease = [0.16, 1, 0.3, 1] as const;

function StackRow({ project, view, width, index }: { project: Project; view: View; width: number; index: number }) {
  const [hover, setHover] = useState(false);
  const [cover, ...rest] = getShots(project);
  const fanWidth = width * 0.8;
  const fanCount = Math.max(0, Math.min(rest.length, Math.floor((50 - width / 2 - 3) / (fanWidth + 1.2))));
  const fan = rest.slice(0, fanCount);

  return (
    <li
      className="relative w-(--mw) md:w-(--sw)"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Link
        href={galleryHref(view, project.slug)}
        scroll={false}
        className="group block"
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.9, ease, delay: index < 3 ? index * 0.08 : 0 }}
          className="overflow-hidden bg-mist"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 768px) 24vw, 70vw"
            loading={index < 3 ? "eager" : "lazy"}
            className="h-auto w-full"
          />
        </motion.div>
        <div className="label mt-2 flex justify-between gap-3 md:hidden">
          <span className="truncate">{project.title}</span>
          <span className="shrink-0 text-dim">{project.year}</span>
        </div>
      </Link>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35, ease }}
            className="pointer-events-none absolute top-0 right-full mr-6 hidden w-[22vw] text-right md:block"
          >
            <p className="label">{project.title}</p>
            <p className="label mt-1 text-dim">
              {project.category}, {project.year}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hover && fan.length > 0 && (
          <div className="pointer-events-none absolute top-0 left-full ml-[1.2vw] hidden items-start gap-[1.2vw] md:flex">
            {fan.map((shot, i) => (
              <motion.div
                key={shot.src}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease, delay: i * 0.06 } }}
                exit={{ opacity: 0, x: -15, transition: { duration: 0.2 } }}
                className="overflow-hidden bg-mist"
                style={{ width: `${fanWidth}vw`, marginTop: `${(i % 2) * width * 0.25}vw` }}
              >
                <Image src={shot.src} alt="" width={shot.width} height={shot.height} sizes="20vw" className="h-auto w-full" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function StackView({ view, zoom }: { view: View; zoom: number }) {
  const width = stackWidth.desktop[zoom];
  return (
    <section
      aria-label="Projects"
      className="overflow-x-clip px-5 pt-24 pb-40"
      style={{ "--sw": `${width}vw`, "--mw": `${stackWidth.mobile[zoom]}vw` } as React.CSSProperties}
    >
      <ul className="flex flex-col items-center gap-6 md:gap-[1.6vw]">
        {projects.map((project, i) => (
          <StackRow key={project.slug} project={project} view={view} width={width} index={i} />
        ))}
      </ul>
    </section>
  );
}
