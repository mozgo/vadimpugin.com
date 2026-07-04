import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vadim Pugin Art",
  description: site.artist.intro,
  openGraph: {
    title: "Vadim Pugin Art",
    description: site.artist.intro,
    url: "https://www.vadimpugin.com",
    siteName: "Vadim Pugin Art",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[#f7f5f0] font-sans text-black antialiased">
        {children}
      </body>
    </html>
  );
}
