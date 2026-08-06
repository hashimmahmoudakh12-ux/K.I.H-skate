import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kihskate.com"),
  title: {
    default: `${BRAND.name} Skate School — Learn to Skate with Confidence`,
    template: `%s — ${BRAND.name} Skate School`,
  },
  description:
    "Private, small group, and camp skateboarding lessons for kids and beginners. Experienced coaching, a safe environment, and a curriculum built to build real confidence — book your lesson today.",
  keywords: [
    "skateboarding lessons",
    "kids skate lessons",
    "skate camp",
    "learn to skateboard",
    "skate coaching",
    "beginner skateboarding",
  ],
  openGraph: {
    title: `${BRAND.name} Skate School — Learn to Skate with Confidence`,
    description:
      "Private, small group, and camp skateboarding lessons for kids and beginners.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} Skate School — Learn to Skate with Confidence`,
    description:
      "Private, small group, and camp skateboarding lessons for kids and beginners.",
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-ink-950 font-sans text-cream-100 antialiased selection:bg-gold-500 selection:text-ink-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream-100 focus:px-5 focus:py-3 focus:text-ink-950 focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
