export const views = ["board", "stack", "grid"] as const;
export type View = (typeof views)[number];
export const defaultView: View = "stack";

export const zoomLevels = 5;
export const defaultZoom = 2;

export const boardScale = [0.4, 0.55, 0.72, 1, 1.35];
export const stackWidth = { desktop: [10, 14, 18, 24, 32], mobile: [40, 50, 62, 74, 88] };
export const gridColumns = { desktop: [8, 6, 4, 3, 2], mobile: [4, 3, 2, 2, 1] };

export function galleryHref(view: View, slug: string) {
  const params = new URLSearchParams();
  if (view !== defaultView) params.set("view", view);
  params.set("gallery", slug);
  return `/work?${params}`;
}
