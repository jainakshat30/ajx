import Cloudflare from "@devicons-pack/react/original/cloudflare";
import Cloudflareworkers from "@devicons-pack/react/original/cloudflareworkers";
import Express from "@devicons-pack/react/original/express";
import Github from "@devicons-pack/react/original/github";
import Prisma from "@devicons-pack/react/original/prisma";
import Streamlit from "@devicons-pack/react/original/streamlit";
import Zustand from "@devicons-pack/react/original/zustand";
import SiClerk from "@icons-pack/react-simple-icons/icons/SiClerk";
import SiCloudinary from "@icons-pack/react-simple-icons/icons/SiCloudinary";
import SiDrizzle from "@icons-pack/react-simple-icons/icons/SiDrizzle";
import SiGooglegemini from "@icons-pack/react-simple-icons/icons/SiGooglegemini";
import SiHono from "@icons-pack/react-simple-icons/icons/SiHono";
import SiZod from "@icons-pack/react-simple-icons/icons/SiZod";
import { LlmSymbol, WebSocketsSymbol } from "@/components/tool-symbols";

// Toolbox name -> logo: devicons first, simple-icons (drawn in currentColor)
// for what devicons lacks. Anything unmapped renders as text only.
export const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Cloudflare Workers": Cloudflareworkers,
  D1: Cloudflare,
  Express,
  "GitHub API": Github,
  "Google Gemini": SiGooglegemini,
  Prisma,
  Streamlit,
  Zustand,
  Clerk: SiClerk,
  Cloudinary: SiCloudinary,
  Drizzle: SiDrizzle,
  Hono: SiHono,
  Zod: SiZod,
  WebSockets: WebSocketsSymbol,
  LLM: LlmSymbol,
};

// Single-colour logos drawn near-black; tinted to the chip text so they show on the dark theme.
export const MONO_ICONS = new Set(["Express", "GitHub API", "Prisma"]);
