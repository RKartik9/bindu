import type { Metadata } from "next";
import { Suspense } from "react";
import { Archive } from "@/components/archive/Archive";
import { defaultView, defaultZoom } from "@/components/archive/shared";
import { StackView } from "@/components/archive/StackView";

export const metadata: Metadata = {
  title: "Archive",
  description: "Selected identity, editorial, digital, packaging and campaign work.",
};

export default function WorkPage() {
  return (
    <Suspense fallback={<StackView view={defaultView} zoom={defaultZoom} />}>
      <Archive />
    </Suspense>
  );
}
