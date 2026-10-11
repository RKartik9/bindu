import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { RollText } from "@/components/RollText";
import { ServiceList } from "@/components/studio/ServiceList";
import { clients, process } from "@/content/studio";

export const metadata: Metadata = {
  title: "Services",
  description: "Identity, packaging, books and magazines, websites and campaigns, from a small studio in New Delhi.",
};

export default function ServicesPage() {
  return (
    <div className="px-5 pt-32 md:px-6 md:pt-40">
      <section className="pb-20 md:pb-32">
        <p className="label mb-6 text-dim">Services</p>
        <Reveal>
          <h1 className="font-display max-w-[18ch] text-[clamp(2.4rem,6.2vw,6.5rem)] leading-[0.95] font-medium tracking-tight">
            Identity, packaging, print and websites, mostly for independent Indian brands.
          </h1>
        </Reveal>
      </section>

      <section aria-label="What we do" className="pb-24 md:pb-36">
        <ServiceList />
      </section>

      <section className="grid gap-12 pb-24 md:grid-cols-12 md:gap-6 md:pb-36">
        <div className="md:col-span-4">
          <p className="label mb-4 text-dim">Process</p>
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight md:text-4xl">
            How a project usually goes.
          </h2>
        </div>
        <ol className="grid gap-10 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {process.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="border-t border-ink pt-4">
                <span className="label text-dim">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-24 md:pb-36">
          <p className="label mb-6 text-dim">Some of the people we&apos;ve worked with</p>
        <Reveal>
          <p className="font-display text-[clamp(1.8rem,4vw,4rem)] leading-[1.1] font-medium tracking-tight">
            {clients.map((c, i) => (
              <span key={c}>
                {c}
                {i < clients.length - 1 && <span className="text-dim"> / </span>}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-ink/15 py-20 md:py-32">
        <a href="#contact" className="group/roll block">
          <span className="label mb-4 block text-dim">New projects go to Kartik</span>
          <span className="font-display flex items-center gap-4 text-[clamp(2.6rem,8vw,9rem)] leading-none font-medium tracking-tight">
            <RollText>Start a project</RollText>
            <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover/roll:translate-x-4">
              &rarr;
            </span>
          </span>
        </a>
      </section>
    </div>
  );
}
