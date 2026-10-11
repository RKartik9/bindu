import type { Metadata, Viewport } from "next";
import { Inter_Tight, Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactOverlay } from "@/components/overlays/ContactOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const ui = Inter_Tight({ variable: "--font-ui", subsets: ["latin"] });
const name = Jost({ variable: "--font-name", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: "website",
    images: ["/work/monsoon-sound/01.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ui.variable} ${name.variable}`}>
      <body className="min-h-svh">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <ContactOverlay />
        </SmoothScroll>
      </body>
    </html>
  );
}
