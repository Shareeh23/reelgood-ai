import type { Metadata } from "next";
import { Fredoka, Geist_Mono, Nunito } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

const displayFont = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ReelGood | Find your next favorite movie",
  description:
    "Get thoughtful movie recommendations based on your mood and preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}