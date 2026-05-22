"use client";

import dynamic from "next/dynamic";

const GalleryReels = dynamic(() => import("@/components/sections/GalleryReels"), {
  ssr: false,
});

export default function GalleryReelsWrapper() {
  return <GalleryReels />;
}