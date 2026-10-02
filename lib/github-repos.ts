// Live repo details for the project overlay, fetched server-side with hourly
// ISR revalidation (same cadence as the contribution graph).
// Unauthenticated GitHub allows 60 req/h per IP; set GITHUB_TOKEN to lift it.
import type { Project } from "@/lib/projects";

const REVALIDATE_SECONDS = 3600;

export type RepoCommit = { sha: string; message: string; date: string; url: string };

export type RepoDetails = {
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  license: string | null;
  pushedAt: string;
  topics: string[];
  languages: { name: string; pct: number }[];
  commits: RepoCommit[];
};

// formatted on the server so client hydration can't disagree about locale or timezone
const day = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

async function gh<T>(path: string): Promise<T | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "akshat-portfolio",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type RepoJson = {
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: { spdx_id: string } | null;
  pushed_at: string;
  topics?: string[];
};
type CommitJson = { sha: string; html_url: string; commit: { message: string; author: { date: string } } };

async function getRepo(repoUrl: string): Promise<RepoDetails | null> {
  const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return null;
  const slug = `${m[1]}/${m[2]}`;

  const repo = await gh<RepoJson>(`/repos/${slug}`);
  if (!repo) return null; // private, renamed or rate-limited: the overlay falls back to local copy
  const [langs, commits] = await Promise.all([
    gh<Record<string, number>>(`/repos/${slug}/languages`),
    gh<CommitJson[]>(`/repos/${slug}/commits?per_page=5`),
  ]);

  const total = Object.values(langs ?? {}).reduce((a, b) => a + b, 0);
  return {
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    license: repo.license && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : null,
    pushedAt: day(repo.pushed_at),
    topics: repo.topics ?? [],
    languages: Object.entries(langs ?? {})
      .map(([name, bytes]) => ({ name, pct: (bytes / total) * 100 }))
      .filter((l) => l.pct >= 0.5),
    commits: (commits ?? []).map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      date: day(c.commit.author.date),
      url: c.html_url,
    })),
  };
}

// keyed by project title; projects without a reachable public repo are simply absent
export async function getRepoDetails(projects: Project[]): Promise<Record<string, RepoDetails>> {
  const entries = await Promise.all(
    projects.map(async (p) => [p.title, p.repo ? await getRepo(p.repo) : null] as const),
  );
  return Object.fromEntries(entries.filter((e): e is [string, RepoDetails] => e[1] !== null));
}
