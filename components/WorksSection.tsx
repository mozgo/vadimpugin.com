"use client";

import { FeaturedEvent } from "@/components/FeaturedEvent";
import { site, type Work } from "@/lib/site";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function WorkDetail({
  work,
  onClose,
}: {
  work: Work;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [work.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const paragraphs = work.description.split(/\n\n+/).filter(Boolean);

  return (
    <div
      ref={panelRef}
      className="work-panel-enter col-span-full overflow-hidden rounded-sm border border-black/10 bg-white"
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">
            Work
          </p>
          <h3 className="font-serif text-2xl md:text-3xl">{work.title}</h3>
        </div>
        <button
          type="button"
          aria-label="Close work details"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 text-xl leading-none transition-colors hover:bg-black hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-8">
        <div className="space-y-4 text-base leading-relaxed text-black/75">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-4">
          {work.images.map((image, index) => (
            <div
              key={image}
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#ece7df]"
            >
              <Image
                src={image}
                alt={`${work.title} — image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          ))}

          {work.videos.map((video) => (
            <video
              key={video}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-sm bg-black"
            >
              <source src={video} type="video/mp4" />
            </video>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkCard({
  work,
  isActive,
  onSelect,
}: {
  work: Work;
  isActive: boolean;
  onSelect: () => void;
}) {
  if (!work.featuredImage) return null;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={isActive}
      className="group text-left transition-opacity hover:opacity-80"
    >
      <div
        className={`relative mb-3 aspect-[4/5] overflow-hidden rounded-sm bg-[#ece7df] ${
          isActive ? "ring-2 ring-black/80 ring-offset-2 ring-offset-[#f7f5f0]" : ""
        }`}
      >
        <Image
          src={work.featuredImage}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="font-serif text-lg leading-snug md:text-xl">{work.title}</h3>
    </button>
  );
}

export function WorksSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openWork = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  const openFeaturedWork = useCallback(() => {
    setExpandedId(site.featuredEvent.workId);
    requestAnimationFrame(() => {
      document.getElementById("works-grid")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  return (
    <section id="works" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
            Portfolio
          </p>
          <h1 className="mb-5 font-serif text-4xl leading-tight md:text-5xl">
            {site.artist.tagline}
          </h1>
          <p className="text-lg leading-relaxed text-black/70">
            {site.artist.intro}
          </p>
        </div>

        <div className="mb-14">
          <FeaturedEvent onExplore={openFeaturedWork} />
        </div>

        <div
          id="works-grid"
          className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.works.map((work) => {
            const expandedWork =
              expandedId === work.id
                ? site.works.find((item) => item.id === expandedId)
                : null;

            return (
              <div key={work.id} className="contents">
                <WorkCard
                  work={work}
                  isActive={expandedId === work.id}
                  onSelect={() => openWork(work.id)}
                />
                {expandedWork && (
                  <WorkDetail
                    work={expandedWork}
                    onClose={() => setExpandedId(null)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
