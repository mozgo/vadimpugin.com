import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-[#f0ece4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-black/60 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {year} {site.artist.name}</p>
        <div className="flex flex-wrap gap-5">
          <a
            href={`mailto:${site.contacts.email}`}
            className="transition-colors hover:text-black"
          >
            Mail
          </a>
          <a
            href={site.contacts.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            TikTok
          </a>
          <a
            href={site.contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
