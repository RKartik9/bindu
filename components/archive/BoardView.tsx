"use client";

import { animate, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CursorLabel } from "@/components/CursorLabel";
import { getShots, projects } from "@/content/projects";
import { boardLayout, shuffle } from "@/lib/scatter";
import { boardScale, galleryHref, type View } from "./shared";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const entries = shuffle(
  projects.flatMap((project) => getShots(project).map((shot) => ({ project, shot }))),
  3,
);
const layout = boardLayout(entries);

export function BoardView({ view, zoom }: { view: View; zoom: number }) {
  const scale = boardScale[zoom];
  const viewportRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const dragging = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const placed = useRef(false);
  const lastScale = useRef(scale);

  const W = layout.width * scale;
  const H = layout.height * scale;
  const bounds = useMemo(() => {
    const bx = size.w >= W ? [(size.w - W) / 2, (size.w - W) / 2] : [size.w - W, 0];
    const by = size.h >= H ? [(size.h - H) / 2, (size.h - H) / 2] : [size.h - H, 0];
    return { left: bx[0], right: bx[1], top: by[0], bottom: by[1] };
  }, [size, W, H]);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Center the canvas on first measure, and keep the viewport center fixed while zooming.
  useEffect(() => {
    if (!size.w) return;
    if (!placed.current) {
      placed.current = true;
      x.set((size.w - W) / 2);
      y.set((size.h - H) / 2);
      return;
    }
    const prev = lastScale.current;
    lastScale.current = scale;
    if (prev === scale) {
      x.set(clamp(x.get(), bounds.left, bounds.right));
      y.set(clamp(y.get(), bounds.top, bounds.bottom));
      return;
    }
    const cx = size.w / 2;
    const cy = size.h / 2;
    const nx = cx - ((cx - x.get()) / prev) * scale;
    const ny = cy - ((cy - y.get()) / prev) * scale;
    const opts = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };
    animate(x, clamp(nx, bounds.left, bounds.right), opts);
    animate(y, clamp(ny, bounds.top, bounds.bottom), opts);
  }, [scale, size, W, H, bounds, x, y]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) return;
      x.set(clamp(x.get() - e.deltaX, bounds.left, bounds.right));
      y.set(clamp(y.get() - e.deltaY, bounds.top, bounds.bottom));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [bounds, x, y]);

  return (
    <section aria-label="Projects board" className="relative">
      <div
        ref={viewportRef}
        data-lenis-prevent
        className="relative h-svh cursor-grab touch-none overflow-hidden bg-mist active:cursor-grabbing"
      >
        <motion.div
          drag
          dragConstraints={bounds}
          dragElastic={0.06}
          dragTransition={{ power: 0.25, timeConstant: 220 }}
          onDragStart={() => {
            dragging.current = true;
            setHovered(null);
          }}
          onDragEnd={() =>
            requestAnimationFrame(() => {
              dragging.current = false;
            })
          }
          style={{ x, y, width: W, height: H }}
          className="absolute top-0 left-0"
        >
          <div
            className="relative origin-top-left transition-transform duration-700 ease-out-expo motion-reduce:transition-none"
            style={{ width: layout.width, height: layout.height, transform: `scale(${scale})` }}
          >
            {layout.items.map((item) => (
              <Link
                key={item.shot.src}
                href={galleryHref(view, item.project.slug)}
                scroll={false}
                draggable={false}
                aria-label={`${item.project.title}, ${item.project.year}`}
                onClick={(e) => dragging.current && e.preventDefault()}
                onPointerEnter={(e) => e.pointerType === "mouse" && !dragging.current && setHovered(item.project.title)}
                onPointerLeave={() => setHovered(null)}
                className="group absolute block bg-paper"
                style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
              >
                <Image
                  src={item.shot.src}
                  alt={item.shot.alt}
                  fill
                  draggable={false}
                  sizes={`${Math.round(item.w * Math.max(scale, 1))}px`}
                  className="object-cover transition-transform duration-500 ease-out-expo select-none group-hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      <p className="label pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 text-dim">Drag to explore</p>
      <CursorLabel text={hovered} />
    </section>
  );
}
