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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        <CursorRobot />
      </body>
    </html>
  );
}
