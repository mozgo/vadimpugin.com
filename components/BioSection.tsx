import { site } from "@/lib/site";

export function BioSection() {
  return (
    <section id="bio" className="scroll-mt-24 border-t border-black/10">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
          About the artist
        </p>
        <h2 className="mb-8 font-serif text-3xl md:text-4xl">Bio</h2>
        <div className="max-w-3xl space-y-6 text-lg leading-[1.8] text-black/75">
          {site.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
