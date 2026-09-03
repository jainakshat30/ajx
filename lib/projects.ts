export type Project = {
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  repo?: string;
  image: string;
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
    title: "Finzo",
    desc: "Full-stack finance platform with Gemini + OCR insights, Clerk auth, and ArcJet rate limiting.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Google Gemini", "Supabase", "Clerk"],
    live: "https://finzo-two.vercel.app/",
    repo: "https://github.com/jainakshat30/finzo",
    image: "/finzoPreview.png",
  },
];
