"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const GA_ID = "G-ZF0LB5WGT3";
const STORAGE_KEY = "ga-consent";

type Decision = "accepted" | "declined" | "pending";

function readStored(): Decision {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {}
  return "pending";
}

function writeStored(value: Decision) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

export default function ConsentBanner() {
  const [decision, setDecision] = useState<Decision | null>(null);

  useEffect(() => {
    setDecision(readStored());
  }, []);

  if (decision === null) return null;

  const accept = () => {
    writeStored("accepted");
    setDecision("accepted");
  };
  const decline = () => {
    writeStored("declined");
    setDecision("declined");
  };
  const reset = () => {
    writeStored("pending");
    setDecision("pending");
  };

  return (
    <>
      {decision === "accepted" && <GoogleAnalytics gaId={GA_ID} />}

      {decision === "pending" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--foreground)]/15 bg-[var(--background)]/95 backdrop-blur-md"
        >
          <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
              This site uses Google Analytics to understand traffic. Cookies are
              only set if you accept. See{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                how Google uses data
              </a>
              .
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={decline}
                className="px-3 py-1.5 text-sm rounded border border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="px-3 py-1.5 text-sm rounded bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {decision !== "pending" && (
        <button
          type="button"
          onClick={reset}
          aria-label="Change cookie preferences"
          title="Change cookie preferences"
          className="fixed bottom-3 left-3 z-40 px-2 py-1 text-xs font-mono rounded border border-[var(--foreground)]/20 bg-[var(--background)]/70 backdrop-blur-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:border-[var(--foreground)]/40"
        >
          cookies: {decision}
        </button>
      )}
    </>
  );
}
