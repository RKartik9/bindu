import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Imprint",
  robots: { index: false },
};

export default function ImprintPage() {
  const [studio] = site.addresses;
  return (
    <div className="grid gap-10 px-5 pt-32 pb-24 md:grid-cols-12 md:px-6 md:pt-40">
      <h1 className="font-display text-5xl leading-none font-medium tracking-tight md:col-span-4">Imprint</h1>
      <div className="space-y-8 text-[15px] leading-relaxed md:col-span-6 md:col-start-7">
        <section>
          <h2 className="label mb-2 text-dim">Studio</h2>
          {studio.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </section>
        <section>
          <h2 className="label mb-2 text-dim">Contact</h2>
          <p>{site.phone}</p>
          <p>{site.email}</p>
        </section>
        <section>
          <h2 className="label mb-2 text-dim">Run by</h2>
          <p>Kartik</p>
        </section>
        <p className="text-dim">
          Add your registered business name, GSTIN and registered address here before the site goes live.
        </p>
      </div>
    </div>
  );
}
