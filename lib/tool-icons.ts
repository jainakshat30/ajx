import Cloudflare from "@devicons-pack/react/original/cloudflare";
import Cloudflareworkers from "@devicons-pack/react/original/cloudflareworkers";
import Express from "@devicons-pack/react/original/express";
import Github from "@devicons-pack/react/original/github";
import Google from "@devicons-pack/react/original/google";
import Prisma from "@devicons-pack/react/original/prisma";
import Streamlit from "@devicons-pack/react/original/streamlit";
import Zustand from "@devicons-pack/react/original/zustand";

// Toolbox name -> devicon. Tools devicons doesn't cover (Hono, Drizzle, Zod,
// Clerk, Yjs, ...) are simply absent and render as text only.
export const TOOL_ICONS: Record<string, typeof Express> = {
  "Cloudflare Workers": Cloudflareworkers,
  D1: Cloudflare,
  Express,
  "GitHub API": Github,
  "Google Gemini": Google,
  Prisma,
  Streamlit,
  Zustand,
};

// Single-colour logos drawn near-black; tinted to the chip text so they show on the dark theme.
export const MONO_ICONS = new Set(["Express", "GitHub API", "Prisma"]);
