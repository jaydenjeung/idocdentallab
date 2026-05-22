"use client";

import { useEffect, useRef, useState } from "react";

const REEL_IDS = ["18079037333184498", "18062508077552253"];

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

  const thumb = reel.thumbnail_url || "";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-black/8 bg-black"
      style={{ aspectRatio: "9/16" }}
    >
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
              alt={reel.caption?.slice(0, 60) || "IDOC reel"}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/30 backdrop-blur-sm group-hover:scale-110 group-hover:bg-black/70 transition-all duration-200">
              <div className="ml-1 h-0 w-0 border-b-[8px] border-t-[8px] border-l-[14px] border-b-transparent border-t-transparent border-l-white" />
            </div>
          </button>
          {reel.caption && (
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                {reel.caption}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TechReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.reels || []).filter((r: Reel) =>
          REEL_IDS.includes(r.id)
        );
        // preserve order
        const ordered = REEL_IDS
          .map((id) => filtered.find((r: Reel) => r.id === id))
          .filter(Boolean) as Reel[];
        setReels(ordered);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-gray-100 animate-pulse"
            style={{ aspectRatio: "9/16" }}
          />
        ))}
      </div>
    );
  }

  if (!reels.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
      <a
        href="https://www.instagram.com/idocdentallab"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/3 hover:bg-black/6 transition-colors py-2.5 text-[12px] text-ink-3"
      >
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
        @idocdentallab
      </a>
    </div>
  );
}