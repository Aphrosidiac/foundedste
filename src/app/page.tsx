"use client";

import { useState } from "react";
import { Preloader } from "@/components/preloader";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Collection } from "@/components/collection";
import { SectionDivider } from "@/components/section-divider";
import { Featured } from "@/components/featured";
import { HorizontalGallery } from "@/components/horizontal-gallery";
import { Lookbook } from "@/components/lookbook";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <SectionDivider label="Process" />
        <Featured />
        <SectionDivider />
        <HorizontalGallery />
        <Marquee />
        <Lookbook />
        <SectionDivider label="Manifesto" />
        <About />
      </main>
      <Footer />
    </>
  );
}
