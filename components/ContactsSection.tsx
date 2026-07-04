import { site } from "@/lib/site";

export function ContactsSection() {
  return (
    <section id="contacts" className="scroll-mt-24 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
          Get in touch
        </p>
        <h2 className="mb-8 font-serif text-3xl md:text-4xl">Contacts</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/45">
              Email
            </p>
            <a
              href={`mailto:${site.contacts.email}`}
              className="text-lg transition-opacity hover:opacity-60"
            >
              {site.contacts.email}
            </a>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/45">
              Instagram
            </p>
            <a
              href={site.contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-opacity hover:opacity-60"
            >
              @mozgo
            </a>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/45">
              TikTok
            </p>
            <a
              href={site.contacts.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-opacity hover:opacity-60"
            >
              @mozgotronica
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
