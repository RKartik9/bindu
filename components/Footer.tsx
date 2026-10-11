"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { RollText } from "./RollText";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/work")) return null;

  return (
    <footer className="label flex flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-6">
      <span className="text-dim">
        &copy; {site.copyrightYear} {site.name}
      </span>
      <div className="flex flex-wrap gap-6">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group/roll">
            <RollText>{s.label}</RollText>
          </a>
        ))}
      </div>
      <div className="flex gap-6">
        <a href={`mailto:${site.email}`} className="group/roll">
          <RollText>{site.email}</RollText>
        </a>
        <Link href="/imprint" className="group/roll">
          <RollText>Imprint</RollText>
        </Link>
      </div>
    </footer>
  );
}
