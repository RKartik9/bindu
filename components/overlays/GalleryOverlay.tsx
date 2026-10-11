"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { RollText } from "@/components/RollText";
import { getCover, getShots, projects, type Project } from "@/content/projects";
import { useFocusTrap, useLockScroll } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

function Strip({ project, onNext }: { project: Project; onNext: (slug: string) => void }) {
  const shots = getShots(project);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const nextCover = getCover(next);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const go = useCallback((index: number) => {
    const el = scrollerRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const child = c as HTMLElement;
        const d = Math.abs(child.offsetLeft + child.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setCurrent(Math.min(best, shots.length - 1));
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
    };
  }, [shots.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(Math.min(current + 1, shots.length));
      if (e.key === "ArrowLeft") go(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go, shots.length]);

  return (
    <>
      <p className="label pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 tabular-nums" aria-live="polite">
        {String(current + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
      </p>

      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain px-5 md:snap-none md:gap-5 md:px-6"
      >
        {shots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.15 + Math.min(i, 5) * 0.07 }}
            className="relative h-[58svh] shrink-0 snap-center bg-mist md:h-[70svh]"
            style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 768px) 60vw, 90vw"
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover"
            />
          </motion.figure>
        ))}
        <button
          type="button"
          onClick={() => onNext(next.slug)}
          className="group/roll flex h-[58svh] shrink-0 snap-center flex-col justify-between bg-mist p-5 text-left md:h-[70svh]"
          style={{ aspectRatio: "3 / 4" }}
        >
          <span className="label text-dim">Next project</span>
          <span className="block">
            <span className="relative mb-4 block aspect-4/5 w-1/2 overflow-hidden">
              <Image src={nextCover.src} alt="" fill sizes="20vw" className="object-cover" />
            </span>
            <span className="font-display block text-2xl leading-tight font-medium tracking-tight md:text-3xl">
              {next.title}
            </span>
            <span className="label mt-3 inline-flex items-center gap-2">
              <RollText>View project</RollText>
              <span aria-hidden>&rarr;</span>
            </span>
          </span>
        </button>
      </div>

      <div className="grid gap-5 px-5 pt-5 pb-6 md:grid-cols-12 md:px-6">
        <p className="max-w-xl text-[15px] leading-relaxed text-ink/80 md:col-span-6">{project.summary}</p>
        <dl className="grid grid-cols-3 gap-4 md:col-span-4 md:col-start-8">
          {[
            ["Client", project.client],
            ["Discipline", project.category],
            ["Year", String(project.year)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label text-dim">{k}</dt>
              <dd className="mt-1 text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="hidden items-start justify-end gap-2 md:col-span-2 md:flex">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(Math.max(current - 1, 0))}
            className="grid size-10 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(Math.min(current + 1, shots.length))}
            className="grid size-10 place-items-center rounded-full ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            &rarr;
          </button>
        </div>
      </div>
    </>
  );
}

export function GalleryOverlay({
  project,
  onClose,
  onSelect,
}: {
  project: Project | undefined;
  onClose: () => void;
  onSelect: (slug: string) => void;
}) {
  const open = !!project;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col bg-paper"
        >
          <div className="relative flex items-start justify-between gap-6 px-5 py-4 md:px-6">
            <div className="min-w-0">
              <h2 className="label truncate">{project.title}</h2>
            </div>
            <button ref={closeRef} type="button" onClick={onClose} className="group/roll label shrink-0">
              <RollText>Close</RollText>
            </button>
          </div>
          <Strip key={project.slug} project={project} onNext={onSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
