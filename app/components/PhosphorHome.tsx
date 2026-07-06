"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FeedEntry } from "../lib/content";

const PAGE_SIZE = 5;

// The homepage terminal: one chronological feed of everything written and
// built, rendered as an `ls -t` listing on a phosphor CRT. Rows ignite on
// load and expand in 3D toward the cursor on hover; all the visual work
// lives in globals.css under [data-phosphor-home].
export default function PhosphorHome({ entries }: { entries: FeedEntry[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(entries.length / PAGE_SIZE);

  // After a page flip, bring the feed top back on screen if it scrolled away.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const feed = listRef.current;
    if (feed && feed.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      feed.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  }, [page]);

  // Cursor-tracked tilt + glare: pointermove over a row updates its CSS vars,
  // rAF-throttled and transform-only, so nothing here triggers layout.
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let row: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      frame = 0;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const x = Math.min(Math.max((pointerX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((pointerY - rect.top) / rect.height, 0), 1);
      row.style.setProperty("--ry", `${((x - 0.5) * 4.5).toFixed(2)}deg`);
      row.style.setProperty("--rx", `${((0.5 - y) * 3.5).toFixed(2)}deg`);
      row.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      row.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };

    const onMove = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
      if (!hit) return;
      row = hit;
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onOut = (e: PointerEvent) => {
      const left = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
      if (!left || left.contains(e.relatedTarget as Node)) return;
      left.style.setProperty("--rx", "0deg");
      left.style.setProperty("--ry", "0deg");
      if (row === left) row = null;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerout", onOut);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerout", onOut);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const pageEntries = entries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const groups: { year: string; entries: FeedEntry[] }[] = [];
  for (const entry of pageEntries) {
    const year = entry.date.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.entries.push(entry);
    else groups.push({ year, entries: [entry] });
  }

  // Sequential ignite order: header, then `total`, then each year marker and
  // row in document order. Drives the staggered load cascade.
  let ignite = 0;
  const igniteStyle = () => ({ "--i": ignite++ }) as React.CSSProperties;

  return (
    <main
      data-phosphor-home
      className="mx-auto max-w-3xl px-5 pb-24 pt-24 md:pt-28"
    >
      <header className="phos-ignite mb-10" style={igniteStyle()}>
        <p className="phos-prompt" aria-hidden="true">
          <span className="phos-user">behrad@khodayar</span>:~ $ ls -t writing/
          projects/ <span className="phos-cursor" />
        </p>
        <h1 className="phos-name">Behrad Khodayar</h1>
        <p className="phos-bio">
          Software engineer. I used to read source before reading docs, now ask
          AI to do it for me.
        </p>
      </header>

      <p className="phos-total phos-ignite" style={igniteStyle()} aria-hidden="true">
        total {entries.length}
      </p>

      <div ref={listRef} className="phos-feed">
        {/* keyed by page too, so flipping remounts rows and replays the ignite cascade */}
        {groups.map((group) => (
          <section key={`${group.year}-p${page}`} aria-label={group.year}>
            <h2 className="phos-year phos-ignite" style={igniteStyle()}>
              {group.year}
            </h2>
            <ol className="phos-list">
              {group.entries.map((entry) => (
                <li
                  key={entry.href}
                  data-row
                  className="phos-row phos-ignite"
                  style={igniteStyle()}
                >
                  <Link href={entry.href} className="phos-card">
                    <span className="phos-line">
                      <span className="phos-meta">
                        <span className="phos-mode" aria-hidden="true">
                          {entry.kind === "project" ? "drwx" : "-rw-"}
                        </span>
                        <time dateTime={entry.date} className="phos-date">
                          {entry.date}
                        </time>
                        <span className="phos-section">[{entry.section}]</span>
                        {entry.kind === "project" && (
                          <span className="sr-only">interactive project</span>
                        )}
                      </span>
                      <span className="phos-title">{entry.title}</span>
                    </span>
                    <span className="phos-more">
                      <span className="phos-more-inner">
                        <span className="phos-excerpt">{entry.excerpt}</span>
                        <span className="phos-tags">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="phos-tag">
                              {tag}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="phos-pager" aria-label="Feed pages">
          <button
            type="button"
            className="phos-pager-btn"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            ← newer
          </button>
          <span className="phos-pager-status" aria-live="polite">
            -- page {page + 1}/{pageCount} --
          </span>
          <button
            type="button"
            className="phos-pager-btn"
            disabled={page === pageCount - 1}
            onClick={() => setPage(page + 1)}
          >
            older →
          </button>
        </nav>
      )}
    </main>
  );
}
