import type { Project, Shot } from "@/content/projects";

export type Entry = { project: Project; shot: Shot };

export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (r: () => number, min: number, max: number) => min + r() * (max - min);

export function shuffle<T>(list: T[], seed: number) {
  const r = seeded(seed);
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type ScatterItem = Entry & {
  /** desktop position and width, in vw */
  x: number;
  y: number;
  w: number;
  /** mobile position and width, in vw */
  mx: number;
  my: number;
  mw: number;
  speed: number;
};

/** Lays images out in loose lanes down the page; every unit is vw so the layout scales with the viewport. */
export function scatterLayout(entries: Entry[], seed = 7) {
  const r = seeded(seed);
  const lanes = [
    [3, 20],
    [33, 48],
    [58, 78],
  ];
  const laneBottom = [0, 0, 0];
  const mobileLanes = [
    [4, 10],
    [50, 56],
  ];
  const mobileBottom = [0, 0];
  let cursor = 2;
  let mobileCursor = 4;
  let lastLane = -1;

  const items: ScatterItem[] = entries.map((entry, i) => {
    const ratio = entry.shot.height / entry.shot.width;

    let lane = Math.floor(r() * 3);
    if (lane === lastLane) lane = (lane + 1 + Math.floor(r() * 2)) % 3;
    lastLane = lane;
    const w = between(r, 14, 21);
    const x = Math.min(between(r, lanes[lane][0], lanes[lane][1]), 97 - w);
    const y = Math.max(cursor + between(r, 4, 12), laneBottom[lane] + between(r, 5, 10));
    cursor = y;
    laneBottom[lane] = y + w * ratio;

    const mLane = i % 2;
    const mw = between(r, 36, 42);
    const mx = Math.min(between(r, mobileLanes[mLane][0], mobileLanes[mLane][1]), 96 - mw);
    const my = Math.max(mobileCursor + between(r, 14, 30), mobileBottom[mLane] + 10);
    mobileCursor = my;
    mobileBottom[mLane] = my + mw * ratio;

    return { ...entry, x, y, w, mx, my, mw, speed: between(r, 0.15, 1) };
  });

  return {
    items,
    height: Math.max(...laneBottom) + 10,
    mobileHeight: Math.max(...mobileBottom) + 16,
  };
}

export type BoardItem = Entry & { x: number; y: number; w: number; h: number };

/** Free-form canvas for the archive board view, in px at zoom 1. */
export function boardLayout(entries: Entry[], seed = 11) {
  const r = seeded(seed);
  const cols = 8;
  const cellW = 360;
  const cellH = 470;
  const items: BoardItem[] = entries.map((entry, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ratio = entry.shot.height / entry.shot.width;
    const w = between(r, 170, 270);
    const h = w * ratio;
    const offset = row % 2 ? cellW / 2 : 0;
    return {
      ...entry,
      w,
      h,
      x: col * cellW + offset + between(r, 20, cellW - w - 20),
      y: row * cellH + between(r, 20, Math.max(24, cellH - h - 20)),
    };
  });
  const rows = Math.ceil(entries.length / cols);
  return { items, width: cols * cellW + cellW / 2, height: rows * cellH + 40 };
}
