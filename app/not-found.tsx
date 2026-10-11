import Link from "next/link";
import { RollText } from "@/components/RollText";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="label text-dim">404</p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none font-medium tracking-tight">
        Nothing to see here.
      </h1>
      <Link href="/work" className="group/roll label">
        <RollText>Back to the archive</RollText>
      </Link>
    </div>
  );
}
