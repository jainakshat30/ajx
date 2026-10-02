"use client";

import Image from "next/image";
import type { RefObject } from "react";
import type { Project } from "@/lib/projects";
import type { RepoDetails } from "@/lib/github-repos";

// GitHub linguist colours for the languages these repos actually use
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  CSS: "#663399",
  HTML: "#e34c26",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  PLpgSQL: "#336790",
};

// Project detail sheet: the curated copy from lib/projects plus live GitHub
// data when the repo is public. Native <dialog> gives Esc, focus trap and backdrop.
export function ProjectOverlay({
  project: p,
  repo,
  dialogRef,
}: {
  project: Project;
  repo?: RepoDetails;
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const close = () => dialogRef.current?.close();
  const slug = p.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <dialog
      ref={dialogRef}
      className="sheet"
      aria-labelledby={`sheet-${slug}`}
      // a click on the backdrop lands on the dialog element itself
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="sheet-bar">
        <span>~/projects/{slug}</span>
        <button type="button" className="sheet-close" onClick={close} autoFocus>
          esc ✕
        </button>
      </div>

      <div className="sheet-body">
        {p.image && (
          <div className="sheet-shot">
            <Image src={p.image} alt={`${p.title} preview`} fill sizes="(max-width: 720px) 100vw, 820px" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        )}

        <div className="sheet-info">
          <h2 id={`sheet-${slug}`} className="sheet-title">
            {p.title}
          </h2>
          <p className="sheet-desc">{p.desc}</p>
          {repo?.description && repo.description !== p.desc && (
            <p className="sheet-gh-desc">
              <span>{"// github: "}</span>
              {repo.description}
            </p>
          )}

          {repo ? (
            <dl className="sheet-stats">
              <div>
                <dt>stars</dt>
                <dd>★ {repo.stars}</dd>
              </div>
              <div>
                <dt>forks</dt>
                <dd>{repo.forks}</dd>
              </div>
              <div>
                <dt>open issues</dt>
                <dd>{repo.openIssues}</dd>
              </div>
              <div>
                <dt>license</dt>
                <dd>{repo.license ?? "none"}</dd>
              </div>
              <div>
                <dt>last push</dt>
                <dd>{repo.pushedAt}</dd>
              </div>
            </dl>
          ) : (
            <p className="sheet-note">{"// source isn't public — details from the portfolio"}</p>
          )}

          {repo && repo.languages.length > 0 && (
            <div className="sheet-section">
              <p className="file-label">languages</p>
              <div className="lang-bar" aria-hidden="true">
                {repo.languages.map((l) => (
                  <span key={l.name} style={{ flexGrow: l.pct, background: LANG_COLORS[l.name] ?? "var(--accent)" }} />
                ))}
              </div>
              <ul className="lang-legend">
                {repo.languages.map((l) => (
                  <li key={l.name}>
                    <span className="lang-dot" style={{ background: LANG_COLORS[l.name] ?? "var(--accent)" }} />
                    {l.name} <span style={{ color: "var(--muted)" }}>{l.pct.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="sheet-section">
            <p className="file-label">stack</p>
            <div className="sheet-chips">
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
              {repo?.topics
                .filter((t) => !p.tags.some((tag) => tag.toLowerCase() === t))
                .map((t) => (
                  <span key={t} className="chip chip-topic">
                    #{t}
                  </span>
                ))}
            </div>
          </div>

          <div className="sheet-links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary">
                open live ↗
              </a>
            )}
            {(repo?.url ?? p.repo) && (
              <a href={repo?.url ?? p.repo} target="_blank" rel="noreferrer" className="btn-ghost">
                view source ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
