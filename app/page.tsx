
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { WorkItem } from "@/components/work-item";
import { ProjectListItem } from "@/components/project-list-item";
import { AchievementItem } from "@/components/achievement-item";
import { Dock } from "@/components/dock";
import { SkillsDraggable } from "@/components/skills-draggable";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FadeInText,
  SlideUp,
  SlideInLeft,
  SlideInRight,
} from "@/components/scroll-animation";

export default function Page() {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 pb-32 pt-6">
      <FadeInText>
        <nav className="mx-auto mb-4 flex w-full max-w-xl items-center justify-between px-4 md:px-6 lg:px-8 text-xs text-neutral-600 dark:text-neutral-300">
          <Link
            href="#"
            className="font-semibold text-neutral-900 dark:text-neutral-50"
          >
            akshat.
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#experience"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs"
            >
              experience
            </a>
            <a
              href="#projects"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs"
            >
              projects
            </a>
            <a
              href="#achievements"
              className="hover:text-neutral-900 dark:hover:text-neutral-50 text-xs sm:text-xs"
            >
              achievements
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </FadeInText>

      <div className="mx-auto max-w-xl px-4 md:px-6 lg:px-8">
        <article
          aria-label="Portfolio"
          className="relative rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="p-4 md:p-6 lg:p-6">
            {/* Header */}

            <SlideUp>
              <header id="about" className="space-y-2 section-lines p-4">
                <FadeInText delay={0.1}>
                  <p className="text-xs text-neutral-500">hi there 😊, I am</p>
                </FadeInText>
                <SlideInLeft delay={0.2}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16 ring-2 ring-neutral-200 dark:ring-neutral-900">
                      <AvatarImage
                        src="/avatar.jpg"
                        alt="Akshat"
                      />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50">
                      Akshat Jain
                    </h1>
                  </div>
                </SlideInLeft>
                <FadeInText delay={0.3}>
                  <div className="flex flex-wrap items-center mt-3 gap-2 sm:gap-4 text-xs text-neutral-600 dark:text-neutral-300">
                    <span>21, he/him</span>
                    <span className="hidden sm:inline">{"||"}</span>
                    <span className="max-w-[38ch]">
                      Full Stack Developer from India.
                    </span>
                  </div>
                </FadeInText>
                <SlideInRight delay={0.4}>
                  <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-4">
                    <Button
                      size="sm"
                      asChild
                      className="h-6 w-20 rounded-sm bg-neutral-900 px-4 text-white shadow-sm hover:bg-neutral-900/90 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      <a
                        href="https://drive.google.com/file/d/14qUViGOy522UWowivl-GNz8Mezpmx0TV/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Resume"
                      >
                        Resume
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="h-6 w-6 rounded-sm border border-neutral-200 p-0 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <a
                        href="mailto:akshatdotjain@gmail.com"
                        aria-label="Send email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="h-6 w-6 rounded-sm border border-neutral-200 p-0 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <a
                        href="https://twitter.com/akshatdotjain"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="h-6 w-6 rounded-sm border border-neutral-200 p-0 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <a
                        href="https://github.com/jainakshat30"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="h-6 w-6 rounded-sm border border-neutral-200 p-0 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      <a
                        href="https://www.linkedin.com/in/jainakshat30/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </SlideInRight>
              </header>
            </SlideUp>

            {/* Bio */}
            <FadeInText delay={0.5}>
              <section className="mt-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow text-[13px] leading-6 text-neutral-600 dark:text-neutral-300">
                <p>
                  A 21 year-old developer from India who loves building{" "}
                  <span className="rounded bg-yellow-200 px-1.5 py-0.5 text-[12px] font-medium text-neutral-900">
                    efficient, scalable, and intuitive applications.
                  </span>{" "}
                  With over a year of hands-on experience, I previously worked
                  at a Indian-based startup and am now looking for new opportunities.
                </p>
              </section>
            </FadeInText>

            {/* Work Experience */}
            <SlideUp delay={0.5}>
              <section id="experience" className="mt-6 section-lines p-4">
                <FadeInText delay={0.1}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    Work Experience.
                  </h3>
                </FadeInText>
                <div className="mt-3 space-y-3">
                  <SlideInLeft delay={0.1}>
                    <WorkItem
                      icon="shield"
                      company="BlissMet"
                      role="Founding BackEnd Engineer"
                      period="June 2025 – Present"
                      summary="Built the backend from scratch and architected a scalable, production-ready platform, implementing robust development workflows and optimized system architecture."
                      logoUrl="/blissmet.jpeg"
                    />
                  </SlideInLeft>
                </div>
              </section>
            </SlideUp>

            {/* Projects */}
            <SlideUp delay={0.2}>
              <section id="projects" className="mt-8 section-lines p-4">
                <FadeInText delay={0.1}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    Projects.
                  </h3>
                </FadeInText>
                <div className="space-y-2">
                  <SlideInLeft delay={0.1}>
                    <ProjectListItem
                      title="AutoDocs"
                      links={[
                        {
                          label: "live preview ↗",
                          href: "https://getautodocs.streamlit.app/",
                        },
                        {
                          label: "github ↗",
                          href: "https://github.com/jainakshat30/AutoDocs",
                        },
                      ]}
                      bullets={[
                        "Built an AI tool that auto-generates documentation for 12+ programming languages with GitHub repo support.",
                        "Developed a real-time Streamlit interface with session management, combining backend logic with an interactive frontend to improve developer experience.",
                        "Built scalable pipelines for repo cloning, parsing, and PDF/Markdown export, applying clean software design and deployment practices to deliver a production-ready tool.",
                      ]}
                      tags={["Python", "StreamLit", "OpenRouter API", "GitHub API", "Regex"]}
                    />
                  </SlideInLeft>
                  <SlideInRight delay={0.1}>
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
                  </SlideInRight>
                </div>
                <FadeInText delay={0.2}>
                  <div className="mt-3 flex justify-center">
                    <a
                      href="https://github.com/jainakshat30?tab=repositories"
                      className="inline-flex items-center gap-1 rounded-sm border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                    >
                      View all projects →
                    </a>
                  </div>
                </FadeInText>
              </section>
            </SlideUp>

            <SlideUp delay={0.3}>
              <section id="achievements" className="mt-8 section-lines p-4">
                <FadeInText delay={0.1}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    Achievements.
                  </h3>
                </FadeInText>
                <ul className="space-y-2">
                  <SlideInLeft delay={0.1}>
                    <li>
                      <AchievementItem
                        title="SemiFinalist – HackWithMait 5.0 Hackathon, MAIT"
                        date="October 2024"
                        description="Build and Deployed NyayNari that bridges the gap between legal complexity and everyday understanding,
                        empowering women across India to know and assert their rights.."
                      />
                    </li>
                  </SlideInLeft>
                  <SlideInRight delay={0.1}>
                    <li>
                      <AchievementItem
                        title="Member at CSI-Innowave"
                        date="August 2024 - Present"
                        description="Led and coordinated multiple technical club events, including organizing a college-level hackathon and gaming
                        competition, ensuring smooth execution and high engagement."
                      />
                    </li>
                  </SlideInRight>
                </ul>
              </section>
            </SlideUp>
            {/* Skills */}
            <SlideUp delay={0.3}>
              <section className="mt-5 section-lines p-4">
                <SkillsDraggable />
              </section>
            </SlideUp>

            {/* Education */}
            <SlideUp delay={0.3}>
              <section className="mt-8 section-lines p-4">
                <FadeInText delay={0.1}>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    Education.
                  </h3>
                </FadeInText>
                <ul className="space-y-2">
                  <SlideInLeft delay={0.1}>
                    <li>
                      <AchievementItem
                        title="Maharaja Agrasen Institute of Technology"
                        date="2023 – 2027"
                        description="B.Tech in ECE"
                      />
                    </li>
                  </SlideInLeft>
                  <SlideInRight delay={0.1}>
                    <li>
                      <AchievementItem
                        title="Maheshwari Public School"
                        date="2021 – 2023"
                        description="Class XII (CBSE)"
                      />
                    </li>
                  </SlideInRight>
                </ul>
              </section>
            </SlideUp>

            {/* Get in Touch */}
            <SlideUp delay={0.3}>
              <section className="mt-8 text-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow">
                <FadeInText delay={0.1}>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {"Lets work together."}
                  </h2>
                </FadeInText>
                <FadeInText delay={0.1}>
                  <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-500 dark:text-neutral-400">
                    {
                      "I'm always interested in new opportunities and exciting projects. Whether you have a project in mind or just want to chat about tech, I'd love to hear from you."
                    }
                  </p>
                </FadeInText>

                {/* CTAs */}
                <SlideInLeft delay={0.1}>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    <Button
                      size="sm"
                      asChild
                      className="h-9 rounded-md bg-neutral-900 px-4 text-white shadow-sm hover:bg-neutral-900/90 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      <a
                        href="mailto:akshatdotjain@gmail.com"
                        aria-label="Get in touch via email"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Get in touch</span>
                        </span>
                      </a>
                    </Button>
                  </div>
                </SlideInLeft>

                {/* Social row */}
                <SlideInRight delay={0.1}>
                  <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4 text-neutral-600 dark:text-neutral-300">
                    <a
                      href="https://twitter.com/akshatdotjain"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href="https://github.com/jainakshat30"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jainakshat30/"
                      aria-label="Open LinkedIn"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </SlideInRight>

                {/* Availability + response time */}
                <FadeInText delay={0.1}>
                  <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                    Currently available for freelance work and full‑time
                    opportunities
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Response time: Usually within 24 hours
                  </p>
                </FadeInText>

                {/* Divider before footer */}
              </section>
            </SlideUp>
          </div>
        </article>
      </div>

      {/* Floating Dock */}

      <Dock />
    </main>
  );
}
