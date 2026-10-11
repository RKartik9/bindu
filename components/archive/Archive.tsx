"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { GalleryOverlay } from "@/components/overlays/GalleryOverlay";
import { getProject } from "@/content/projects";
import { ArchiveControls } from "./ArchiveControls";
import { BoardView } from "./BoardView";
import { GridView } from "./GridView";
import { defaultView, defaultZoom, views, type View } from "./shared";
import { StackView } from "./StackView";

export function Archive() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [zoom, setZoom] = useState(defaultZoom);

  const viewParam = params.get("view");
  const view: View = views.includes(viewParam as View) ? (viewParam as View) : defaultView;
  const project = getProject(params.get("gallery"));

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params);
      if (value === null) next.delete(key);
      else next.set(key, value);
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const closeGallery = useCallback(() => setParam("gallery", null), [setParam]);
  const selectGallery = useCallback((slug: string) => setParam("gallery", slug), [setParam]);

  return (
    <>
      <h1 className="sr-only">Archive</h1>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === "board" && <BoardView view={view} zoom={zoom} />}
          {view === "stack" && <StackView view={view} zoom={zoom} />}
          {view === "grid" && <GridView view={view} zoom={zoom} />}
        </motion.div>
      </AnimatePresence>
      <ArchiveControls
        view={view}
        zoom={zoom}
        onView={(v) => setParam("view", v === defaultView ? null : v)}
        onZoom={setZoom}
      />
      <GalleryOverlay project={project} onClose={closeGallery} onSelect={selectGallery} />
    </>
  );
}
