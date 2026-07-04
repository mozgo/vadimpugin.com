import { site } from "@/lib/site";
import Image from "next/image";

type FeaturedEventProps = {
  onExplore?: () => void;
};

export function FeaturedEvent({ onExplore }: FeaturedEventProps) {
  const { featuredEvent } = site;

  return (
    <article className="overflow-hidden rounded-sm border border-black/10 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.45)]">
      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        {featuredEvent.image && (
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
            <Image
              src={featuredEvent.image}
              alt={featuredEvent.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-black/45">
            {featuredEvent.subtitle}
          </p>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {featuredEvent.title}
          </h2>
          <p className="text-base leading-relaxed text-black/70">
            {featuredEvent.description}
          </p>
          {onExplore && (
            <button
              type="button"
              onClick={onExplore}
              className="mt-2 w-fit border-b border-black pb-1 text-sm uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
            >
              View work
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
