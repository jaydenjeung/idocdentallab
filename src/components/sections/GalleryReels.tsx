"use client";

import { useEffect, useRef, useState } from "react";

const WORK_REEL_IDS = [
  "18079037333184498", // All-on-4 zirconia bridge final delivery
  "18062508077552253", // Locator overdenture digital workflow
  "18052021313670713", // Full workflow: designing → sintering
  "18320316910170297", // All-on-6 zirconia final result
  "18297914110253749", // Titanium overdenture final result
  "17912939553247053", // Day in the life: Jesus (dentures)
  "18101069179825671", // 3D printed partial denture
  "17963375531928740", // Perfit OVIS CAD/CAM 10-min crown
  "17900973324194662", // How a crown is made
  "17881701441288748", // Day in the life: Max (model department)
  "17985818723893301", // Locator overdenture in action
  "18070628909144715", // Full zirconia All-on-4 tissue buildup
  "17944468008102638", // What happens after you send a case
  "18082228558944143", // Denture workshop
  "17925254940158052", // Diagnostic wax-up: nesting → milling
  "18078408929571921", // Sports mouthguard ASMR
  "18114288406655665", // 4 types of dentures
  "18117541504664895", // Night guard ASMR
];

interface Reel {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
}

function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-surface-3 bg-black">
      <div style={{ aspectRatio: "9/16" }}>
        {playing ? (
          <video
            ref={videoRef}
            src={reel.media_url}
            className="h-full w-full object-cover"
            controls
            playsInline
            autoPlay
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <>
            {reel.thumbnail_url && (
              <img
                src={reel.thumbnail_url}
                alt={reel.caption?.slice(0, 60) || "IDOC case"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/30 backdrop-blur-sm group-hover:scale-110 group-hover:bg-black/70 transition-all duration-200">
                <div className="ml-1 h-0 w-0 border-b-[8px] border-t-[8px] border-l-[14px] border-b-transparent border-t-transparent border-l-white" />
              </div>
            </button>
            {reel.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[12px] text-white/90 line-clamp-2 leading-relaxed">
                  {reel.caption.split("\n")[0]}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl bg-gray-100 animate-pulse"
      style={{ aspectRatio: "9/16" }}
    />
  );
}

export default function GalleryReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.reels || []).filter((r: Reel) =>
          WORK_REEL_IDS.includes(r.id)
        );
        const ordered = WORK_REEL_IDS
          .map((id) => filtered.find((r: Reel) => r.id === id))
          .filter(Boolean) as Reel[];
        setReels(ordered);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!reels.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
}