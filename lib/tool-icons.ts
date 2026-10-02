import Cloudflare from "@devicons-pack/react/original/cloudflare";
import Cloudflareworkers from "@devicons-pack/react/original/cloudflareworkers";
import Docker from "@devicons-pack/react/original/docker";
import Express from "@devicons-pack/react/original/express";
import Firebase from "@devicons-pack/react/original/firebase";
import Git from "@devicons-pack/react/original/git";
import Github from "@devicons-pack/react/original/github";
import Javascript from "@devicons-pack/react/original/javascript";
import Mongodb from "@devicons-pack/react/original/mongodb";
import Nextjs from "@devicons-pack/react/original/nextjs";
import Nodejs from "@devicons-pack/react/original/nodejs";
import Postgresql from "@devicons-pack/react/original/postgresql";
import Prisma from "@devicons-pack/react/original/prisma";
import Python from "@devicons-pack/react/original/python";
import ReactLogo from "@devicons-pack/react/original/react";
import Streamlit from "@devicons-pack/react/original/streamlit";
import Supabase from "@devicons-pack/react/original/supabase";
import Tailwindcss from "@devicons-pack/react/original/tailwindcss";
import Typescript from "@devicons-pack/react/original/typescript";
import Zustand from "@devicons-pack/react/original/zustand";
import SiClerk, { defaultColor as clerk } from "@icons-pack/react-simple-icons/icons/SiClerk";
import SiCloudinary, { defaultColor as cloudinary } from "@icons-pack/react-simple-icons/icons/SiCloudinary";
import SiDrizzle, { defaultColor as drizzle } from "@icons-pack/react-simple-icons/icons/SiDrizzle";
import SiGooglegemini, { defaultColor as gemini } from "@icons-pack/react-simple-icons/icons/SiGooglegemini";
import SiHono, { defaultColor as hono } from "@icons-pack/react-simple-icons/icons/SiHono";
import SiZod, { defaultColor as zod } from "@icons-pack/react-simple-icons/icons/SiZod";
import { LlmSymbol, WebSocketsSymbol, YjsSymbol } from "@/components/tool-symbols";

// Toolbox name -> logo: devicons first, simple-icons (drawn in currentColor)
// for what devicons lacks. Anything unmapped renders as text only.
export const TOOL_ICONS: Record<string, React.ComponentType<{ className?: string; title?: string }>> = {
  Docker,
  Firebase,
  Git,
  JavaScript: Javascript,
  MongoDB: Mongodb,
  "Next.js": Nextjs,
  "Node.js": Nodejs,
  PostgreSQL: Postgresql,
  Python,
  React: ReactLogo,
  Supabase,
  "Tailwind CSS": Tailwindcss,
  TypeScript: Typescript,
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
  Yjs: YjsSymbol,
};

// Black-brand logos; drawn in their white on-dark variant so they show on the dark theme.
export const MONO_ICONS = new Set(["Express", "GitHub API", "Prisma"]);

// Official brand colours, straight from simple-icons; applied as the logo's currentColor.
export const BRAND_COLORS: Record<string, string> = {
  Clerk: clerk,
  Cloudinary: cloudinary,
  Drizzle: drizzle,
  "Google Gemini": gemini,
  Hono: hono,
  Zod: zod,
};
