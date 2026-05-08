import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://behrad.khodayar.me";
const PERSON_NAME = "Behrad Khodayar";
const PERSON_DESCRIPTION =
  "Software engineer. I used to read source before reading docs, now ask AI to do it for me.";
const PERSON_IMAGE = "/BehradKhodayar.jpeg";

const SAME_AS = [
  "https://github.com/behradkhodayar",
  "https://www.linkedin.com/in/behradkhodayar/",
  "https://stackoverflow.com/users/6532189/behrad-khodayar",
  "https://behradkhodayar.medium.com/",
  "https://www.reddit.com/user/behradkhodayar/",
];

const KNOWS_ABOUT = [
  "TypeScript", "JavaScript", "Rust", "PHP", "SQL", "Bash",
  "Node.js", "NestJS", "Tokio", "Axum", "SQLx", "Symfony", "Drupal",
  "Next.js", "React", "Ratatui",
  "Microservices", "Monolith to Microservices", "Event-Driven Architecture", "Domain-Driven Design",
  "REST APIs", "WebSockets", "API Design",
  "Distributed Systems", "Real-Time Pipelines", "High Availability", "Low Latency", "Multi-Cluster",
  "Kubernetes", "Helm", "Docker", "Docker Compose",
  "Terraform", "GitOps", "ArgoCD", "Tilt", "GitHub Actions", "Self-Hosted Runners",
  "Nginx", "Linux", "CI/CD", "On-Prem", "Cost Optimization",
  "Azure", "IaaS", "PaaS", "SaaS", "AKS", "ACA",
  "PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "TimescaleDB",
  "Database Migrations", "Query Optimization", "Schema Design",
  "JWT", "OAuth", "SIWE",
  "NATS", "RabbitMQ",
  "Anthropic Claude", "OpenAI", "LLM Apps", "RAG", "AI Agents", "Function Calling", "Prompt Engineering",
  "Claude Code", "Agentic IDE Workflows", "MCP Servers", "AI Code Review",
  "Grafana", "Distributed Tracing", "Structured Logging", "Rust Tracing", "Pino",
  "Vitest", "Cargo Test", "Unit Testing", "Integration Testing", "Contract Testing",
  "Code Review", "SLI/SLO/SLA", "Reliability Engineering",
  "Blockchain", "Web3", "Bitcoin", "Ethereum", "Base", "Solana",
  "Polymarket", "Hyperliquid", "Chainlink",
  "Chainstack", "Alchemy", "QuickNode",
  "On-Chain/Off-Chain Integration",
  "Technical Leadership", "System Design", "Cloud Architecture",
  "Project Management", "Roadmapping", "Agile", "Scrum",
  "Hiring", "Mentoring", "Stakeholder Management",
  "Security & Compliance", "Quantitative Risk",
  "Technical Writing", "Documentation",
  "Startups", "Philosophy",
];

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
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: PERSON_NAME,
    title: `${PERSON_NAME} — Software Engineer`,
    description: PERSON_DESCRIPTION,
    locale: "en_US",
    firstName: "Behrad",
    lastName: "Khodayar",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  givenName: "Behrad",
  familyName: "Khodayar",
  description: PERSON_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${PERSON_IMAGE}`,
  jobTitle: "Software Engineer",
  birthDate: "1987-08-08",
  nationality: { "@type": "Country", name: "Iran" },
  knowsLanguage: ["English", "Persian", "Turkish"],
  worksFor: { "@type": "Organization", name: "Independent" },
  knowsAbout: KNOWS_ABOUT,
  sameAs: SAME_AS,
  mainEntityOfPage: SITE_URL,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <TopNav />
        {children}
      </body>
    </html>
  );
}
