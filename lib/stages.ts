// The page is told as one CI run: every section is a stage, and this rail
// ticks them off as the visitor scrolls past.
export const STAGES = [
  { id: "boot", label: "boot" },
  { id: "init", label: "init" },
  { id: "commit", label: "commit" },
  { id: "branch", label: "branch" },
  { id: "build", label: "build" },
  { id: "ship", label: "ship" },
  { id: "log", label: "log" },
  { id: "connect", label: "connect" },
] as const;
