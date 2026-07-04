"use client";

import { navItems, site } from "@/lib/site";
import { useEffect, useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("works");

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => scrollTo("works")}
          className="text-left font-serif text-lg tracking-wide transition-opacity hover:opacity-70 md:text-xl"
        >
          {site.artist.name}
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`text-sm uppercase tracking-[0.18em] transition-colors ${
                activeSection === item.id
                  ? "text-black"
                  : "text-black/45 hover:text-black/75"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-px w-full bg-black transition-transform ${
                menuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-full bg-black transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-black transition-transform ${
                menuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-black/10 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left text-sm uppercase tracking-[0.18em] ${
                    activeSection === item.id ? "text-black" : "text-black/50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
