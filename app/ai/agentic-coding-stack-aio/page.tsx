import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import TaxonomyExplorer from "./TaxonomyExplorer";

// Fonts scoped to this project (the rest of the site uses Geist). The CSS
// module reads these via --font-inter / --font-jbmono.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agentic Coding Stack — All-in-One",
  description:
    "An interactive ontology of the agentic coding stack: nine layers, the request lifecycle, cross-cutting concerns, and build-time provenance — explorable across four axes.",
  alternates: { canonical: "https://behrad.khodayar.me/ai/agentic-coding-stack-aio/" },
};

export default function Page() {
  return (
    <div className={`${inter.variable} ${jbMono.variable}`}>
      <TaxonomyExplorer />
    </div>
  );
}
