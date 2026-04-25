import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FOUNDED — Dark Art Streetwear",
  description:
    "Where darkness meets craft. Hand-illustrated streetwear born from the void.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-void text-bone min-h-screen">
        <div className="noise-overlay grain-animate" />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
