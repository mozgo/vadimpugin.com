import { site } from "@/lib/site";

export function StatementSection() {
  return (
    <section id="statement" className="scroll-mt-24 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
          Artist statement
        </p>
        <h2 className="mb-8 font-serif text-3xl md:text-4xl">Statement</h2>
        <p className="max-w-3xl text-lg leading-[1.8] text-black/75 whitespace-pre-line">
          {site.statement}
        </p>
      </div>
    </section>
  );
}
