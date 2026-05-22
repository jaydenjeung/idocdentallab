"use client";

import dynamic from "next/dynamic";

const TechReels = dynamic(() => import("@/components/sections/TechReels"), {
  ssr: false,
});

export default function TechReelsWrapper() {
  return <TechReels />;
}