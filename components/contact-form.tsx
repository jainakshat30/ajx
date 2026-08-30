"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  background: "oklch(0.12 0.004 255)",
  border: "1px solid oklch(0.32 0.006 255)",
  borderRadius: 4,
  padding: "9px 10px",
  color: "oklch(0.9 0.004 255)",
  fontFamily: "inherit",
  fontSize: 13,
};

const labelStyle: React.CSSProperties = { fontSize: 11, color: "oklch(0.55 0.006 255)" };

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = () => {
    const subject = encodeURIComponent(`Portfolio contact — ${name || "hello"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:akshatdotjain@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="tr-cols-contact"
      style={{
        border: "1px solid oklch(0.28 0.006 255)",
        borderRadius: 8,
        background: "oklch(0.17 0.004 255)",
        padding: 22,
      }}
    >
      <div style={{ gridColumn: "1/-1", fontSize: 13, color: "oklch(0.7 0.006 255)", marginBottom: 4 }}>
        Have a project or just want to talk tech? Reach me at{" "}
        <span style={{ color: "var(--accent)" }}>akshatdotjain@gmail.com</span> — reply time is usually under
        24h.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>--name</label>
        <input
          type="text"
          placeholder="jane-doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>--email</label>
        <input
          type="email"
          placeholder="jane@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>--message</label>
        <textarea
          rows={4}
          placeholder="type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
      <button
        onClick={send}
        style={{
          gridColumn: "1/-1",
          justifySelf: "start",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 600,
          padding: "10px 22px",
          borderRadius: 4,
          border: "none",
          background: "var(--accent)",
          color: "oklch(0.14 0.006 255)",
          cursor: "pointer",
        }}
      >
        run send()
      </button>
    </div>
  );
}
