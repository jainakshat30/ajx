"use client";

import { useEffect, useRef, useState } from "react";

type HistoryEntry = { showPrompt: boolean; cmd?: string; lines: string[] };

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands: help, whoami, skills, projects, experience, achievements, education, contact, sudo, clear",
  ],
  whoami: [
    "Akshat Jain — 22, he/him, Full-Stack Developer from India.",
    "Building AI-powered and real-time systems. Open to work.",
  ],
  skills: [
    "JavaScript, TypeScript, React, Next.js, Node.js, Python, PostgreSQL, MongoDB, Docker, Git, Tailwind CSS, Firebase, Supabase",
  ],
  projects: [
    "SyncCanvas — real-time collaborative whiteboard (Next.js, Yjs, WebSockets)",
    "AutoDocs — AI documentation generator (Python, Streamlit)",
    "StageLink — SSR event platform (Next.js, Firebase)",
  ],
  experience: [
    "Platform Engineer @ Qyupe — Jan 2026–Present",
    "Platform Engineer @ ConviSaaS Inc. — Jan 2026–Present",
    "Founding Backend Engineer @ BlissMet — Jun 2025–Dec 2025",
  ],
  achievements: [
    "SemiFinalist – HackWithMait 5.0 Hackathon, MAIT (Oct 2024)",
    "Member, CSI-Innowave (Aug 2024–Present)",
  ],
  education: [
    "B.Tech ECE, Maharaja Agrasen Institute of Technology (2023–2027)",
    "Class XII CBSE, Maheshwari Public School (2021–2023)",
  ],
  contact: [
    "Email: akshatdotjain@gmail.com",
    "GitHub: github.com/jainakshat30",
    "LinkedIn: linkedin.com/in/jainakshat30",
  ],
  sudo: ["Nice try. Permission denied: you are not in the sudoers file."],
};

function getOutput(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  if (cmd === "") return [];
  return (
    COMMANDS[cmd] || [`command not found: ${raw}`, "type 'help' for a list of commands"]
  );
}

export function Terminal() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      showPrompt: false,
      lines: ["Welcome to Akshat's terminal. Type 'help' to see available commands."],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const raw = inputValue;
    if (raw.trim().toLowerCase() === "clear") {
      setInputValue("");
      setHistory([]);
      return;
    }
    const lines = getOutput(raw);
    setInputValue("");
    setHistory((h) => [...h, { showPrompt: true, cmd: raw, lines }]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        border: "1px solid oklch(0.32 0.006 255)",
        borderRadius: 8,
        overflow: "hidden",
        background: "oklch(0.11 0.004 255)",
        cursor: "text",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "9px 12px",
          borderBottom: "1px solid oklch(0.28 0.006 255)",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "oklch(0.4 0.006 255)" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "oklch(0.5 0.006 255)" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "oklch(0.6 0.006 255)" }} />
        <span style={{ marginLeft: 6, fontSize: 11, color: "oklch(0.55 0.006 255)" }}>
          zsh — akshat@portfolio
        </span>
      </div>
      <div
        ref={bodyRef}
        style={{ padding: "14px 16px", height: 260, overflowY: "auto", fontSize: 13, lineHeight: 1.7 }}
      >
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            {h.showPrompt && (
              <div>
                <span style={{ color: "var(--accent)" }}>akshat@portfolio</span>
                <span style={{ color: "oklch(0.5 0.006 255)" }}> ~ % </span>
                <span style={{ color: "oklch(0.9 0.004 255)" }}>{h.cmd}</span>
              </div>
            )}
            {h.lines.map((line, j) => (
              <div key={j} style={{ color: "oklch(0.72 0.006 255)", whiteSpace: "pre-wrap" }}>
                {line}
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "var(--accent)" }}>akshat@portfolio</span>
          <span style={{ color: "oklch(0.5 0.006 255)" }}>&nbsp;~ %&nbsp;</span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            style={{
              // sized to its content so the block caret below sits right after
              // the text — flex:1 pinned it to the far right of the row
              // ...but never zero-width, or there's nothing left to click or focus
              width: `${inputValue.length || 1}ch`,
              maxWidth: "100%",
              padding: 0, // the UA default would eat 4px out of that exact width
              background: "transparent",
              border: "none",
              outline: "none",
              caretColor: "transparent", // the block caret is the only one we show
              color: "oklch(0.94 0.004 255)",
              fontFamily: "inherit",
              fontSize: 13,
            }}
          />
          <span className="caret" style={{ color: "var(--accent)" }}>
            ▍
          </span>
        </div>
      </div>
    </div>
  );
}
