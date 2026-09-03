import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { CursorCat } from "@/components/cursor-cat";
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
        {/* 1000 = the 960 content column plus its 20px gutters (border-box) */}
        <main style={{ minHeight: "100dvh", maxWidth: 1000, margin: "0 auto", padding: "40px 20px 60px" }}>
          {children}
        </main>
        <CursorCat />
      </body>
    </html>
  );
}
