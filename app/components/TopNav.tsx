"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Link = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const iconClass = "w-5 h-5 fill-current";

const LINKS: Link[] = [
  {
    name: "GitHub",
    href: "https://github.com/behradkhodayar",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={iconClass}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/behradkhodayar/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={iconClass}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Stack Overflow",
    href: "https://stackoverflow.com/users/6532189/behrad-khodayar",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={iconClass}>
        <path d="M17.36 20.13v-4.61h1.54V22H3v-6.48h1.54v4.61h12.82zM5.81 14.99l7.55 1.58.32-1.51-7.55-1.58-.32 1.51zm1-3.6l7 3.27.65-1.4-7-3.27-.65 1.4zm1.94-3.42l5.92 4.93.97-1.16-5.92-4.93-.97 1.16zm3.84-3.66L17.27 11l1.21-.92-4.71-6.21-1.21.92zM5.65 18.61h7.71v-1.54H5.65v1.54z" />
      </svg>
    ),
  },
  {
    name: "Medium",
    href: "https://behradkhodayar.medium.com/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={iconClass}>
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/behradkhodayar/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={iconClass}>
        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z" />
      </svg>
    ),
  },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm bg-[var(--background)]/30"
    >
      <div className="flex items-center justify-between px-4 py-3 md:py-4 max-w-6xl mx-auto">
        <Link
          href="/"
          className="font-mono text-sm md:text-base tracking-tight text-[var(--foreground)] hover:opacity-80"
        >
          behrad.khodayar.me
        </Link>

        <ul className="hidden md:flex items-center gap-5">
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                className="block text-[var(--foreground)] opacity-75 hover:opacity-100 transition-opacity"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-[var(--foreground)]"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
            {open ? (
              <path d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z" />
            ) : (
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <ul
          id="mobile-menu"
          className="md:hidden flex items-center justify-center gap-6 px-4 pb-4 pt-1 border-t border-[var(--foreground)]/10"
        >
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                onClick={() => setOpen(false)}
                className="block p-2 text-[var(--foreground)] opacity-80 hover:opacity-100"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
