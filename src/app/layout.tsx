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
    "Dark art streetwear from Malaysia. Hand-illustrated, hand-painted, one of one. Skulls, thorns, and biomechanical forms on reworked silhouettes.",
  openGraph: {
    title: "FOUNDED — Dark Art Streetwear",
    description:
      "Hand-illustrated dark art on reimagined silhouettes. Every piece born from chaos, crafted with precision.",
    images: ["/images/collection/painted-polo.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOUNDED — Dark Art Streetwear",
    description:
      "Hand-illustrated dark art on reimagined silhouettes. Every piece born from chaos, crafted with precision.",
    images: ["/images/collection/painted-polo.jpg"],
  },
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
