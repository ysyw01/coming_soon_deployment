import type { Metadata } from "next";
import { Geist, Geist_Mono, Bruno_Ace_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bruno = Bruno_Ace_SC({
  weight: "400",
  variable: "--font-bruno",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Sport Your World - Coming Soon",
  description: "Something amazing is coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bruno.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
