export type Project = {
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  repo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "SyncCanvas",
    desc: "Real-time collaborative whiteboard with sub-second CRDT sync over WebSockets, persisted to Postgres.",
    tags: ["Next.js", "Yjs", "WebSockets", "PostgreSQL", "Prisma"],
    live: "https://whiteboard-web-1.vercel.app/",
    image: "/whiteBoard.png",
  },
  {
    title: "AutoDocs",
    desc: "AI tool that auto-generates documentation for 12+ languages, with repo cloning and PDF/Markdown export.",
    tags: ["Python", "Streamlit", "LLM", "GitHub API"],
    live: "https://getautodocs.streamlit.app/",
    repo: "https://github.com/jainakshat30/AutoDocs",
    image: "/autoDocsPreview.png",
  },
  {
    title: "StageLink",
    desc: "SSR Next.js app with Firebase auth, Cloudinary media pipeline, and a path to Redis pub/sub messaging.",
    tags: ["Next.js", "TypeScript", "Firebase", "Cloudinary", "Zustand"],
    live: "https://stagelink-tau.vercel.app/",
    repo: "https://github.com/jainakshat30/stagelink",
    image: "/stageLink.png",
  },
  {
    title: "Job Orchestrator",
    desc: "Temporal-lite workflow engine: DAG jobs execute across a worker pool with leases, retries and a dead-letter queue. 100/100 killed-worker trials, 0 steps lost or duplicated.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Express", "Zod", "Docker"],
    repo: "https://github.com/jainakshat30/job-orchestrator",
    image: "/job-orchestratorPreview.png",
  },
];
