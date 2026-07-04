import siteData from "@/data/site.json";

export type Work = {
  id: string;
  title: string;
  description: string;
  featuredImage: string | null;
  images: string[];
  videos: string[];
};

export type SiteData = {
  artist: {
    name: string;
    tagline: string;
    intro: string;
  };
  statement: string;
  bio: string[];
  contacts: {
    email: string;
    instagram: string;
    tiktok: string;
  };
  featuredEvent: {
    title: string;
    subtitle: string;
    description: string;
    image: string | null;
    workId: string;
  };
  works: Work[];
};

export const site = siteData as SiteData;

export const navItems = [
  { id: "works", label: "Works" },
  { id: "statement", label: "Statement" },
  { id: "bio", label: "Bio" },
  { id: "contacts", label: "Contacts" },
] as const;
