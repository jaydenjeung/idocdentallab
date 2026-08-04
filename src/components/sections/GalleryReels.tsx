"use client";

import { useEffect, useRef, useState } from "react";

const GALLERY_LIMIT = 30;

interface Reel {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
}

function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumb = reel.thumbnail_url || reel.media_url;

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
            {thumb && (
              <img
                src={thumb}
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
        // Instagram Graph API returns newest first — show latest videos as they post
        setReels((data.reels || []).slice(0, GALLERY_LIMIT));
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
