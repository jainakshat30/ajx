// Real GitHub contribution graph, fetched server-side with hourly ISR revalidation.
// No token needed — uses the public github-contributions-api proxy.
// Override the account with the GITHUB_USERNAME env var; defaults below.

const USERNAME = process.env.GITHUB_USERNAME ?? "jainakshat30";
const REVALIDATE_SECONDS = 3600;

export const LEVEL_COLORS = [
  "oklch(0.24 0.004 255)",
  "oklch(0.4 0.01 240)",
  "oklch(0.55 0.02 240)",
  "oklch(0.7 0.025 240)",
  "oklch(0.85 0.03 240)",
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export type Day = { date: string; count: number; level: number };
export type Week = { days: (Day | null)[]; month: string | null };
export type Contributions = { weeks: Week[]; total: number };

export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      total: { lastYear: number };
      contributions: Day[];
    };
    const days = data.contributions ?? [];
    if (days.length === 0) return null;

    const weeks: Week[] = [];
    let current: (Day | null)[] = [];

    // Pad the first column so weekdays line up (0 = Sunday, GitHub-style).
    const firstDow = new Date(`${days[0].date}T00:00:00`).getDay();
    for (let i = 0; i < firstDow; i++) current.push(null);

    for (const day of days) {
      current.push(day);
      if (current.length === 7) {
        weeks.push({ days: current, month: null });
        current = [];
      }
    }
    if (current.length > 0) {
      while (current.length < 7) current.push(null);
      weeks.push({ days: current, month: null });
    }

    // Label the first week of each month, skipping labels too close to sit
    // side by side (GitHub does the same for the leading partial week).
    let lastMonth = -1;
    let lastLabelCol = -3;
    weeks.forEach((week, wi) => {
      const firstReal = week.days.find((d): d is Day => d !== null);
      if (!firstReal) return;
      const m = new Date(`${firstReal.date}T00:00:00`).getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        if (wi - lastLabelCol >= 3) {
          week.month = MONTHS[m];
          lastLabelCol = wi;
        }
      }
    });

    return { weeks, total: data.total.lastYear };
  } catch {
    return null;
  }
}
