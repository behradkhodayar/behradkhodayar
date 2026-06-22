"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ui2ui.module.css";
import { TAXONOMY, type Edge, type EdgeType, type TaxNode } from "./taxonomy.data";

type Kind = "layer" | "plane" | "prov" | "phase";
type IndexRec = { node: TaxNode; kind: Kind; parentId: string | null };

// inline style that may carry CSS custom properties
type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

const STAGE_VAR: Record<string, string> = {
  intent: "--stage-intent",
  client: "--stage-client",
  harness: "--stage-harness",
  api: "--stage-api",
  engine: "--stage-engine",
  world: "--stage-world",
};

const ET_CLASS: Record<EdgeType, string> = {
  impl: styles.etImpl,
  provenance: styles.etProvenance,
  concern: styles.etConcern,
  recursion: styles.etRecursion,
  routing: styles.etRouting,
};

const PALETTE = ["--L0", "--L1", "--L2", "--L3", "--L4", "--L5", "--L6", "--L7", "--L8"];

const SECTIONS = [
  { href: "journey", label: "The Journey" },
  { href: "stack", label: "The Stack" },
  { href: "planes", label: "Cross-cutting" },
  { href: "provenance", label: "Provenance" },
];

const STAGE_LEGEND: [string, string][] = [
  ["intent", "Intent (L0)"],
  ["client", "Client (L1)"],
  ["harness", "Harness (L2)"],
  ["api", "API (L3)"],
  ["engine", "Engine (L4–L8)"],
  ["world", "World (side effects)"],
];

export default function TaxonomyExplorer() {
  const T = TAXONOMY;

  // ---------- node index (flatten everything, remember parents) ----------
  const index = useMemo(() => {
    const m = new Map<string, IndexRec>();
    const indexTree = (node: TaxNode, kind: Kind, parentId: string | null) => {
      m.set(node.id, { node, kind, parentId });
      (node.children || []).forEach((c) => indexTree(c, kind, node.id));
    };
    T.layers.forEach((n) => indexTree(n, "layer", null));
    T.planes.forEach((n) => indexTree(n, "plane", null));
    T.provenance.forEach((n) => indexTree(n, "prov", null));
    T.lifecycle.forEach((n) => m.set(n.id, { node: n, kind: "phase", parentId: null }));
    return m;
  }, [T]);

  const colorVar = useCallback(
    (id: string): string => {
      const root = String(id).split(".")[0];
      if (/^L[0-8]$/.test(root)) return `var(--${root})`;
      if (root[0] === "C") return "var(--L7)";
      if (root[0] === "D") return "var(--L0)";
      if (root[0] === "Φ") {
        const rec = index.get(root);
        return rec ? `var(${STAGE_VAR[rec.node.stage || ""] || "--ink-faint"})` : "var(--ink-faint)";
      }
      return "var(--ink-faint)";
    },
    [index],
  );

  const ancestors = useCallback(
    (id: string): string[] => {
      const chain: string[] = [];
      let cur = index.get(id);
      while (cur && cur.parentId) {
        chain.unshift(cur.parentId);
        cur = index.get(cur.parentId);
      }
      return chain;
    },
    [index],
  );

  const title = useCallback((id: string) => index.get(id)?.node.title ?? id, [index]);

  const relevantEdges = useCallback(
    (id: string) => {
      const touches = (ep: string) => ep === id || ep.startsWith(id + ".") || id.startsWith(ep + ".");
      return T.edges
        .filter((e: Edge) => touches(e.from) || touches(e.to))
        .map((e: Edge) => {
          const outward = touches(e.from) && !touches(e.to);
          return {
            type: e.type,
            label: e.label,
            target: outward ? e.to : e.from,
            dir: outward ? "→" : "←",
          };
        });
    },
    [T.edges],
  );

  // ---------- drawer / expansion state ----------
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [openLayers, setOpenLayers] = useState<Set<string>>(new Set());
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const openDrawer = useCallback(
    (id: string) => {
      if (!index.has(id)) return;
      if (drawerId === null && typeof document !== "undefined") {
        lastFocus.current = document.activeElement as HTMLElement | null;
      }
      setDrawerId(id);
    },
    [index, drawerId],
  );

  const closeDrawer = useCallback(() => {
    setDrawerId(null);
    lastFocus.current?.focus?.();
  }, []);

  // focus the close button when the drawer opens
  useEffect(() => {
    if (drawerId) closeRef.current?.focus();
  }, [drawerId]);

  // escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerId) closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerId, closeDrawer]);

  // deep-link: #node=L4.c.3 opens that node
  useEffect(() => {
    const checkHash = () => {
      const m = /[#&]node=([^&]+)/.exec(window.location.hash);
      if (m) openDrawer(decodeURIComponent(m[1]));
    };
    window.addEventListener("hashchange", checkHash);
    checkHash();
    return () => window.removeEventListener("hashchange", checkHash);
    // openDrawer is stable enough; we only want this wired once on mount + hashchange
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLayer = (id: string) => {
    setOpenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---------- node chip (Axis A children) ----------
  const NodeChip = ({ node }: { node: TaxNode }) => (
    <button
      type="button"
      className={`${styles.nodeChip}${node.boundary ? " " + styles.boundary : ""}`}
      onClick={() => openDrawer(node.id)}
    >
      <span className={styles.ncId}>{node.id}</span>{" "}
      {node.children ? <span className={styles.ncHas}>{node.children.length} ›</span> : null}
      <span className={styles.ncTitle}>{node.title}</span>
    </button>
  );

  // ---------- card grid (Axis C / D) ----------
  const CardGrid = ({ list, gridId }: { list: TaxNode[]; gridId: string }) => (
    <div className={styles.cardGrid} id={gridId}>
      {list.map((node, i) => {
        const color = `var(${PALETTE[i % PALETTE.length]})`;
        return (
          <button
            key={node.id}
            type="button"
            className={styles.concernCard}
            style={{ "--card-color": color } as CSSVars}
            onClick={() => openDrawer(node.id)}
          >
            <span className={styles.ccId}>{node.id}</span>
            <span className={styles.ccTitle}>{node.title}</span>
            <span className={styles.ccNote}>{node.note || node.summary || ""}</span>
          </button>
        );
      })}
    </div>
  );

  // ---------- drawer body ----------
  const renderNode = (id: string) => {
    const rec = index.get(id);
    if (!rec) return null;
    const node = rec.node;
    const accent = colorVar(id);
    const chain = ancestors(id);
    const edges = relevantEdges(id);

    return (
      <div style={{ "--accent": accent } as CSSVars}>
        {chain.length > 0 && (
          <div className={styles.dCrumb}>
            {chain.map((a, i) => (
              <span key={a}>
                {i > 0 && <span className={styles.cSep}>/</span>}
                <button type="button" className={styles.crumbLink} onClick={() => openDrawer(a)}>
                  {a}
                </button>
              </span>
            ))}
            <span className={styles.cSep}>/</span>
            <span className={styles.cCur}>{id}</span>
          </div>
        )}

        <span className={styles.dAddr}>{id}</span>
        {node.boundary && (
          <span className={`${styles.dPill} ${styles.pillBoundary}`}>boundary · out of scope</span>
        )}
        {node.fractal && (
          <span className={`${styles.dPill} ${styles.pillFractal}`}>↺ fractal recursion point</span>
        )}
        {node.recurses && (
          <span className={`${styles.dPill} ${styles.pillRecurse}`}>↺ may recurse</span>
        )}

        <h2 className={styles.dTitle}>{node.title}</h2>
        {node.tag && <div className={styles.dTag}>{node.tag}</div>}
        {node.desc && <p className={styles.dDesc}>{node.desc}</p>}
        {node.summary && rec.kind === "layer" && <p className={styles.dDesc}>{node.summary}</p>}
        {node.note && <div className={styles.dNote}>{node.note}</div>}

        {rec.kind === "phase" && (
          <>
            {node.recurses && (
              <div className={styles.dNote}>
                This phase can <strong>recurse</strong>: a sub-agent or MCP sampling re-enters the
                entire loop back at Φ3.
              </div>
            )}
            <div className={styles.dSectionTitle}>Layers exercised</div>
            {node.layers && node.layers.length > 0 ? (
              <div className={styles.layerLinkGrid}>
                {node.layers.map((lid) => {
                  const known = index.has(lid);
                  return (
                    <button
                      key={lid}
                      type="button"
                      className={styles.layerLink}
                      style={{ "--chip-color": colorVar(lid) } as CSSVars}
                      disabled={!known}
                      onClick={() => known && openDrawer(lid)}
                    >
                      {lid}
                      {known && <span className={styles.llTitle}>{title(lid)}</span>}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className={styles.dNote}>
                Outside the system — effects land on the world (files, git, processes).
              </div>
            )}
          </>
        )}

        {node.children && node.children.length > 0 && (
          <>
            <div className={styles.dSectionTitle}>Zoom in — {node.children.length} parts</div>
            <div className={styles.dChildren}>
              {node.children.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={styles.dChild}
                  onClick={() => openDrawer(c.id)}
                >
                  <span className={styles.dcId}>{c.id}</span>
                  <span className={styles.dcTitle}>{c.title}</span>
                  <span className={styles.dcArrow}>{c.children ? `${c.children.length} ›` : "→"}</span>
                  {c.note && <span className={styles.dcNote}>{c.note}</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {edges.length > 0 && (
          <>
            <div className={styles.dSectionTitle}>Cross-axis links</div>
            <div className={styles.edgeList}>
              {edges.map((e, i) => (
                <button
                  key={`${e.target}-${i}`}
                  type="button"
                  className={styles.edge}
                  onClick={() => openDrawer(e.target)}
                >
                  <span className={`${styles.edgeType} ${ET_CLASS[e.type]}`}>{e.type}</span>
                  <span className={styles.edgeTarget} style={{ color: colorVar(e.target) }}>
                    {e.dir} {e.target}
                  </span>
                  <span className={styles.edgeLabel}>{e.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <header className={styles.siteHeader}>
        <Link href="/ai" className={styles.backLink}>
          ← AI
        </Link>
        <div className={styles.wordmark}>
          <span className={styles.uiIn}>UI</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <span className={styles.uiOut}>UI</span>
        </div>
        <div className={styles.tagline}>
          <strong>User&nbsp;Intent</strong> to <strong>User&nbsp;Interface</strong>
          <span className={styles.sub}>the agentic coding stack, traced end to end</span>
        </div>
        <nav className={styles.headerNav}>
          {SECTIONS.map((s) => (
            <a key={s.href} href={`#${s.href}`} onClick={(e) => scrollTo(e, s.href)}>
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <p className={styles.kicker}>v0.1 · a conjecture, perpetually exposed to refutation</p>
          <h1>
            From <span className={styles.g}>User Intent</span>
            <br />
            to <span className={styles.g}>User Interface</span>
          </h1>
          <p className={styles.lede}>{T.meta.blurb}</p>
          <p className={styles.hint}>
            Click any node to zoom in. The journey is the spine; every phase drills into the layers
            it exercises.
          </p>
        </section>

        {/* AXIS B — THE JOURNEY */}
        <section id="journey" className={styles.band}>
          <div className={styles.bandHead}>
            <span className={`${styles.axisBadge} ${styles.axisB}`}>Axis B · Lifecycle</span>
            <h2>The Journey — one request, Φ0 → Φ17</h2>
            <p>
              Follow a single prompt from intent to interface. The{" "}
              <span className={styles.loopWord}>loop</span> (Φ3 → Φ13) repeats every turn; tool calls
              can recurse into the whole machine again. Click a phase to see the layers it touches.
            </p>
          </div>

          <div className={styles.journeyRail}>
            <div className={`${styles.endcap} ${styles.endcapStart}`}>
              <span className={styles.endcapLabel}>User Intent</span>
              <span className={styles.endcapSub}>a thought, underspecified</span>
            </div>
            <div className={styles.journeyTrack} role="list">
              {T.lifecycle.map((p) => (
                <PhaseGroup key={p.id} phase={p} colorVar={colorVar} openDrawer={openDrawer} />
              ))}
            </div>
            <div className={`${styles.endcap} ${styles.endcapEnd}`}>
              <span className={styles.endcapLabel}>User Interface</span>
              <span className={styles.endcapSub}>a rendered result</span>
            </div>
          </div>

          <div className={styles.stageLegend}>
            {STAGE_LEGEND.map(([k, label]) => (
              <span key={k} className={styles.lg}>
                <span className={styles.dot} style={{ background: `var(${STAGE_VAR[k]})` }} />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* AXIS A — THE STACK */}
        <section id="stack" className={styles.band}>
          <div className={styles.bandHead}>
            <span className={`${styles.axisBadge} ${styles.axisA}`}>Axis A · Vertical layers</span>
            <h2>The Stack — what is built on what</h2>
            <p>
              Human at the top, silicon at the bottom. Each layer consumes the interface below it and
              exposes one above. Click to expand; the zoom <em>is</em> the recursion.
            </p>
          </div>
          <div className={styles.stackTower}>
            {T.layers.map((layer) => {
              const c = colorVar(layer.id);
              const open = openLayers.has(layer.id);
              return (
                <div
                  key={layer.id}
                  className={`${styles.layerRow}${open ? " " + styles.open : ""}`}
                  style={{ "--layer-color": c } as CSSVars}
                >
                  <button
                    type="button"
                    className={styles.layerHead}
                    aria-expanded={open}
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <span
                      className={styles.layerAddr}
                      role="link"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(layer.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          openDrawer(layer.id);
                        }
                      }}
                    >
                      {layer.id}
                    </span>
                    <span className={styles.layerMain}>
                      <span className={styles.layerTitle}>{layer.title}</span>{" "}
                      <span className={styles.layerTag}>{layer.tag || ""}</span>
                      <span className={styles.layerSummary}>{layer.summary || ""}</span>
                    </span>
                    <span className={styles.layerMeta}>
                      <span className={styles.count}>{(layer.children || []).length} parts</span>
                      <span className={styles.chev}>▸</span>
                    </span>
                  </button>
                  <div className={styles.layerChildren}>
                    {(layer.children || []).map((ch) => (
                      <NodeChip key={ch.id} node={ch} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AXIS C — CROSS-CUTTING */}
        <section id="planes" className={styles.band}>
          <div className={styles.bandHead}>
            <span className={`${styles.axisBadge} ${styles.axisC}`}>Axis C · Cross-cutting planes</span>
            <h2>The Concerns that span every layer</h2>
            <p>
              The systematically under-enumerated stuff — threaded through the whole stack rather than
              living in any one layer.
            </p>
          </div>
          <CardGrid list={T.planes} gridId="planes-grid" />
        </section>

        {/* AXIS D — PROVENANCE */}
        <section id="provenance" className={styles.band}>
          <div className={styles.bandHead}>
            <span className={`${styles.axisBadge} ${styles.axisD}`}>Axis D · Provenance</span>
            <h2>Where every runtime artifact came from</h2>
            <p>
              Build-time pipelines. Lets the drill-downs terminate honestly: weights, tokenizer,
              engine, kernels, harness — each has an origin.
            </p>
          </div>
          <CardGrid list={T.provenance} gridId="provenance-grid" />
        </section>

        <footer className={styles.siteFooter}>
          <p>
            Rendered <em>from</em> the ontology, not the reverse (§5.1). Single source of truth:{" "}
            <code>taxonomy.data.ts</code>. Every node has a stable address — use it to log
            refutations.
          </p>
          <p className={styles.muted}>
            The Agentic Coding Stack · A Comprehensive Building-Block Taxonomy · v0.1 — open for
            refutation.
          </p>
        </footer>
      </main>

      {/* DETAIL DRAWER */}
      <aside
        className={`${styles.drawer}${drawerId ? " " + styles.open : ""}`}
        aria-hidden={drawerId ? "false" : "true"}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerInner}>
          <button
            type="button"
            ref={closeRef}
            className={styles.drawerClose}
            aria-label="Close"
            onClick={closeDrawer}
          >
            ×
          </button>
          <div className={styles.drawerScroll}>{drawerId && renderNode(drawerId)}</div>
        </div>
      </aside>
      {drawerId && (
        <button
          type="button"
          className={styles.drawerScrim}
          aria-label="Close detail panel"
          onClick={closeDrawer}
        />
      )}
    </div>
  );
}

// Renders the optional loop banner before the phase, then the phase card.
function PhaseGroup({
  phase,
  colorVar,
  openDrawer,
}: {
  phase: TaxNode;
  colorVar: (id: string) => string;
  openDrawer: (id: string) => void;
}) {
  return (
    <>
      {phase.loopStart && (
        <div className={styles.loopBanner}>
          ↺ agent loop — repeats Φ3 → Φ13, appending context each turn
        </div>
      )}
      <button
        type="button"
        className={styles.phase}
        style={{ "--stage-color": `var(${STAGE_VAR[phase.stage || ""]})` } as CSSVars}
        aria-label={`${phase.id} ${phase.title}`}
        onClick={() => openDrawer(phase.id)}
      >
        <span className={styles.phaseFlags}>
          {phase.recurses && <span className={`${styles.flag} ${styles.flagRecurse}`}>↺ recurses</span>}
          {(phase.loopStart || phase.loopEnd) && (
            <span className={`${styles.flag} ${styles.flagLoop}`}>loop</span>
          )}
        </span>
        <span className={styles.phaseId}>{phase.id}</span>
        <span className={styles.phaseTitle}>{phase.title}</span>
        <span className={styles.phaseLayers}>
          {phase.layers && phase.layers.length > 0 ? (
            phase.layers.map((lid) => (
              <span
                key={lid}
                className={styles.miniChip}
                style={{ "--chip-color": colorVar(lid) } as CSSVars}
              >
                {lid}
              </span>
            ))
          ) : (
            <span className={styles.miniChip} style={{ "--chip-color": "var(--stage-world)" } as CSSVars}>
              world
            </span>
          )}
        </span>
      </button>
    </>
  );
}
