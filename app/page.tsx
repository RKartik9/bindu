import { ScatterField } from "@/components/home/ScatterField";
import { getShots, projects } from "@/content/projects";
import { site } from "@/content/site";
import { scatterLayout, type Entry } from "@/lib/scatter";

function homeEntries(): Entry[] {
  const covers = projects.map((project) => ({ project, shot: getShots(project)[0] }));
  const extras = projects
    .filter((_, i) => i % 2 === 0)
    .map((project) => ({ project, shot: getShots(project)[2] ?? getShots(project)[1] }));
  return covers.flatMap((cover, i) => (extras[i] ? [cover, extras[i]] : [cover]));
}

export default function Home() {
  const { items, height, mobileHeight } = scatterLayout(homeEntries());
  return <ScatterField items={items} height={height} mobileHeight={mobileHeight} title={site.name} />;
}
