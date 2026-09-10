import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";
import ConsentBanner from "./components/ConsentBanner";
import {
  PERSON_DESCRIPTION,
  PERSON_IMAGE,
  PERSON_NAME,
  SITE_URL,
} from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON_NAME} — Software Engineer`,
    template: "%s — Behrad Khodayar",
  },
  description: PERSON_DESCRIPTION,
  applicationName: PERSON_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  keywords: [
    "Behrad Khodayar",
    "behradkhodayar",
    "Software Engineer",
    "Technical Leadership",
    "TypeScript",
    "Rust",
    "Next.js",
    "Node.js",
    "Distributed Systems",
    "Kubernetes",
    "Blockchain",
    "Web3",
    "AI Agents",
    "Claude Code",
    "Iran",
  ],
  openGraph: {
    siteName: PERSON_NAME,
    title: `${PERSON_NAME} — Software Engineer`,
    description: PERSON_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: PERSON_IMAGE,
        alt: `Photo of ${PERSON_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${PERSON_NAME} — Software Engineer`,
    description: PERSON_DESCRIPTION,
    images: [PERSON_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "xF498x9x638tPHYCrBKGbBPGBRhbvvofRibN7Kl0LMQ",
  },
};

export const viewport: Viewport = {
  // The site is a phosphor CRT in both color schemes (see globals.css).
  themeColor: "#050806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNav />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
