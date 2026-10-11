"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { useLockScroll } from "@/lib/hooks";
import { RollText } from "./RollText";

type NavItem = { label: string; href: string };

function NavLink({ item, active, className = "" }: { item: NavItem; active?: boolean; className?: string }) {
  const cls = `group/roll label relative inline-flex items-center ${className}`;
  const content = (
    <>
      <span
        aria-hidden
        className={`absolute top-1/2 -left-3 size-1.5 -translate-y-1/2 rounded-full bg-ink transition-transform duration-300 ${active ? "scale-100" : "scale-0"}`}
      />
      <RollText>{item.label}</RollText>
    </>
  );
  if (item.href.startsWith("#")) {
    return (
      <a href={item.href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
      {content}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const isActive = (href: string) => href !== "/" && pathname.startsWith(href);
  const allLinks = [...site.nav.left, ...site.nav.right];

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useLockScroll(menuOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {!isHome && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-paper via-paper/80 to-transparent"
        />
      )}
      <nav aria-label="Main" className="relative grid grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-[17px] font-medium tracking-tight whitespace-nowrap md:hidden">
            {site.name}
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {site.nav.left.map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
        </div>

        <Link
          href="/"
          aria-hidden={isHome}
          tabIndex={isHome ? -1 : undefined}
          className={`hidden font-display text-[19px] font-medium tracking-tight transition-opacity duration-500 md:block ${
            isHome ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {site.name}
        </Link>

        <div className="flex items-center justify-end gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {site.nav.right.map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
          <button
            type="button"
            className="group/roll label md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <RollText>{menuOpen ? "Close" : "Menu"}</RollText>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 flex flex-col justify-between bg-paper px-5 pt-24 pb-8 md:hidden"
          >
            <ul className="space-y-1">
              {allLinks.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-5xl font-medium tracking-tight"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="font-display text-5xl font-medium tracking-tight">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="label flex flex-wrap gap-x-5 gap-y-2 text-dim">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
