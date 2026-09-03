import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { CursorRobot } from "@/components/cursor-robot";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "akshat@portfolio",
  description: "Akshat Jain — Full-Stack Developer. Building AI-powered and real-time systems.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <main
          style={{
            minHeight: "100dvh",
            background: "oklch(0.12 0.004 255)",
            color: "oklch(0.9 0.004 255)",
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace",
            padding: "40px 20px 60px 20px",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>{children}</div>
        </main>
        <CursorRobot />
      </body>
    </html>
  );
}
