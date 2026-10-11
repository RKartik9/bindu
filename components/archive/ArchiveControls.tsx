"use client";

import { motion } from "motion/react";
import { views, zoomLevels, type View } from "./shared";

export function ArchiveControls({
  view,
  zoom,
  onView,
  onZoom,
}: {
  view: View;
  zoom: number;
  onView: (view: View) => void;
  onZoom: (zoom: number) => void;
}) {
  const iconBtn =
    "grid size-10 place-items-center rounded-full text-lg leading-none transition-colors hover:bg-ink/5 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/75 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur-xl">
        <div role="group" aria-label="Layout" className="flex">
          {views.map((v) => {
            const active = v === view;
            return (
              <button
                key={v}
                type="button"
                aria-pressed={active}
                onClick={() => onView(v)}
                className="label relative rounded-full px-4 py-2.5 sm:px-5"
              >
                {active && (
                  <motion.span
                    layoutId="view-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className={`relative transition-colors ${active ? "text-paper" : "text-ink/55 hover:text-ink"}`}>
                  {v}
                </span>
              </button>
            );
          })}
        </div>
        <span aria-hidden className="mx-1 h-6 w-px bg-ink/10" />
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom === 0}
          onClick={() => onZoom(zoom - 1)}
          className={iconBtn}
        >
          &minus;
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom === zoomLevels - 1}
          onClick={() => onZoom(zoom + 1)}
          className={iconBtn}
        >
          +
        </button>
      </div>
    </div>
  );
}
