import Link from "next/link";
import { ProjectListItem } from "@/components/project-list-item";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FadeInText,
  SlideUp,
  SlideInLeft,
  SlideInRight,
} from "@/components/scroll-animation";

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 pb-32 pt-6">
      <FadeInText>
        <nav className="mx-auto mb-4 flex w-full max-w-xl items-center justify-between px-4 md:px-6 lg:px-8 text-xs text-neutral-600 dark:text-neutral-300">
          <Link
            href="/"
            className="font-semibold text-neutral-900 dark:text-neutral-50"
          >
            ← back
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-medium text-neutral-900 dark:text-neutral-50">
              all projects
            </span>
            <ThemeToggle />
          </div>
        </nav>
      </FadeInText>

      <div className="mx-auto w-full max-w-xl px-4 md:px-6 lg:px-8">
        <SlideUp delay={0.2}>
          <section className="mt-8 section-lines p-4">
            <FadeInText delay={0.1}>
              <h2 className="mb-4 text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
                All Projects
              </h2>
            </FadeInText>
            <div className="space-y-4">
              <SlideInRight delay={0.1}>
                <ProjectListItem
                  title="SyncCanvas"
                  links={[
                    {
                      label: "live preview ↗",
                      href: "https://whiteboard-web-1.vercel.app/",
                    },
                    {
                      label: "github ↗",
                      href: "#",
                    },
                  ]}
                  bullets={[
                    "Engineered real-time WebSocket synchronization supporting sub-second CRDT propagation.",
                    "Implemented robust persistence pipeline serializing binary CRDT state to PostgreSQL.",
                    "Built end-to-end latency benchmarking tool to measure p95 WebSocket RTT and CRDT sync times.",
                  ]}
                  tags={[
                    "Next.js",
                    "Yjs",
                    "Hocuspocus",
                    "WebSockets",
                    "PostgreSQL",
                    "Neon",
                    "Prisma",
                    "Railway",
                    "Gemini AI"
                  ]}
                />
              </SlideInRight>
              <SlideInLeft delay={0.1}>
                <ProjectListItem
                  title="DocuCode AI"
                  links={[
                    {
                      label: "github ↗",
                      href: "https://github.com/jainakshat30/DocuCode-AI",
                    },
                  ]}
                  bullets={[
                    "Built an AI tool that auto-generates documentation for 12+ programming languages with GitHub repo support.",
                    "Developed a real-time Streamlit interface with session management, combining backend logic with an interactive frontend to improve developer experience.",
                    "Built scalable pipelines for repo cloning, parsing, and PDF/Markdown export, applying clean software design and deployment practices to deliver a production-ready tool.",
                  ]}
                  tags={[
                    "Python",
                    "StreamLit",
                    "OpenRouter API",
                    "GitHub API",
                    "Regex",
                  ]}
                />
              </SlideInLeft>
              <SlideInRight delay={0.1}>
                <ProjectListItem
                  title="StageLink"
                  links={[
                    {
                      label: "live preview ↗",
                      href: "https://stagelink-tau.vercel.app/",
                    },
                    {
                      label: "github ↗",
                      href: "https://github.com/jainakshat30/stagelink",
                    },
                  ]}
                  bullets={[
                    "Developed a full-stack, SSR-ready Next.js (App Router) web application using React + TypeScript with server/client component separation and a responsive, theme-aware UI powered by Tailwind CSS and next-themes.",
                    "Integrated Firebase Auth and Firestore for secure authentication and real-time data handling, and implemented Cloudinary for optimized media management with client-side compression and CDN caching.",
                    "Engineered performance and scalability improvements via code-splitting, Suspense, and lazy client components; architected a migration path to Socket.IO + Redis pub/sub for high-scale real-time messaging.",
                  ]}
                  tags={[
                    "Next.js (App Router)",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Zustand",
                    "React Hook Form",
                    "Zod",
                    "Firebase (Auth, Firestore)",
                    "Cloudinary",
                    "Framer Motion",
                    "Sonner",
                    "dnd-kit",
                    "React Dropzone",
                    "ESLint",
                    "Prettier",
                    "Vercel",
                  ]}
                />
              </SlideInRight>
              <SlideInLeft delay={0.1}>
                <ProjectListItem
                  title="Finzo"
                  links={[
                    {
                      label: "live preview ↗",
                      href: "https://finzo-two.vercel.app/",
                    },
                    {
                      label: "github ↗",
                      href: "https://github.com/jainakshat30/finzo",
                    },
                  ]}
                  bullets={[
                    "Architected a full-stack financial platform with Next.js, PostgreSQL, Prisma, and Supabase, showcasing strong skills in backend design, database modeling, and scalable system development.",
                    "Integrated AI workflows with Google Gemini and OCR to deliver smart financial insights.",
                    "Built a secure and polished user experience with Clerk authentication, role-based access, and ArcJet rate limiting, combining modern security practices with seamless frontend design.",
                  ]}
                  tags={[
                    "Next.js",
                    "TypeScript",
                    "PostgreSQL",
                    "Google Gemini Pro",
                    "Supabase",
                    "Clerk",
                    "Prisma",
                    "TailwindCSS",
                  ]}
                />
              </SlideInLeft>
            </div>
          </section>
        </SlideUp>
      </div>
    </main>
  );
}
