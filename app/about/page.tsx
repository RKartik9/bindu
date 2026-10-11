import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ParallaxStrip } from "@/components/studio/ParallaxStrip";
import { site } from "@/content/site";
import { stats, studioPhotos, team, values } from "@/content/studio";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a seven-person design studio in New Delhi, started by Kartik.`,
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40">
      <section className="px-5 pb-20 md:px-6 md:pb-32">
        <p className="label mb-6 text-dim">About</p>
        <Reveal>
          <h1 className="font-display max-w-[20ch] text-[clamp(2.4rem,6.2vw,6.5rem)] leading-[0.95] font-medium tracking-tight">
            Kartik and six designers, in one room in Delhi.
          </h1>
        </Reveal>
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-12">
          {site.bio.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className={`text-[15px] leading-relaxed text-ink/80 md:col-span-3 ${i === 0 ? "md:col-start-7" : ""}`}
            >
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="The studio" className="pb-24 md:pb-36">
        <ParallaxStrip images={studioPhotos} />
      </section>

      <section className="px-5 pb-24 md:px-6 md:pb-36">
        <dl className="grid grid-cols-2 gap-y-12 border-t border-ink/15 pt-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <dt className="label text-dim">{s.label}</dt>
              <dd className="font-display mt-3 text-5xl leading-none sm:text-6xl font-medium tracking-tight md:text-[6vw]">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="grid gap-12 px-5 pb-24 md:grid-cols-12 md:gap-6 md:px-6 md:pb-36">
        <div className="md:col-span-4">
          <p className="label mb-4 text-dim">How we work</p>
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            A few things we&apos;re particular about.
          </h2>
        </div>
        <ul className="grid gap-10 md:col-span-7 md:col-start-6 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={i * 0.08} className="border-t border-ink pt-4">
                <h3 className="text-xl font-medium">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{v.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-24 md:px-6 md:pb-36">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight md:text-4xl">The team</h2>
          <p className="label text-dim">{team.length} people, one studio</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-4">
          {team.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={(i % 3) * 0.06} className="group">
                <div className="relative aspect-4/5 overflow-hidden bg-mist">
                  <Image
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <p className="label mt-3">{m.name}</p>
                <p className="label mt-0.5 text-dim">{m.role}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
