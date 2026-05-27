"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Reel {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

function ReelsFeed({ maxHeight = 420, showThumbs = true }: { maxHeight?: number; showThumbs?: boolean }) {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.reels?.length) setReels(data.reels.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reels.length < 2 || playing) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % reels.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reels, playing]);

  useEffect(() => {
    setPlaying(false);
  }, [active]);

  const handlePlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  const handleThumbClick = (i: number) => {
    setActive(i);
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div
          className="w-full rounded-2xl bg-[#0d1510] border border-white/6 flex items-center justify-center"
          style={{ aspectRatio: "9/16", maxHeight }}
        >
          <div className="h-6 w-6 rounded-full border-2 border-green-400/40 border-t-green-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (!reels.length) return null;

  const current = reels[active];
  const thumb = current.thumbnail_url || current.media_url;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main reel */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/6 bg-black"
        style={{ aspectRatio: "9/16", maxHeight }}
      >
        {playing ? (
          <video
            ref={videoRef}
            src={current.media_url}
            className="h-full w-full object-cover"
            controls
            autoPlay
            playsInline
            onEnded={() => {
              setPlaying(false);
              setActive((prev) => (prev + 1) % reels.length);
            }}
          />
        ) : (
          <>
            <img
              src={thumb}
              alt={current.caption?.slice(0, 60) || "IDOC Reel"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 border border-white/30 backdrop-blur-sm group-hover:scale-110 group-hover:bg-black/70 transition-all duration-200">
                <div className="ml-1 h-0 w-0 border-b-[9px] border-t-[9px] border-l-[16px] border-b-transparent border-t-transparent border-l-white" />
              </div>
            </button>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 border border-white/10">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-[10px] text-white/80">@idocdentallab</span>
            </div>
            {current.caption && (
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                  {current.caption}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Thumbnails + follow — desktop only */}
      {showThumbs && (
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {reels.map((reel, i) => (
              <button
                key={reel.id}
                onClick={() => handleThumbClick(i)}
                className={`relative flex-1 overflow-hidden rounded-lg transition-all duration-300 ${
                  i === active
                    ? "ring-2 ring-green-400 opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{ aspectRatio: "9/16", maxHeight: 60 }}
              >
                <img
                  src={reel.thumbnail_url || reel.media_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <a
            href="https://www.instagram.com/idocdentallab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-3 py-2 min-w-[56px]"
            style={{ height: 60 }}
          >
            <svg className="h-4 w-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="text-[9px] text-white/40 leading-none">Follow</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-[#0a0f0d]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-0 md:grid-cols-[1fr_auto]">

          {/* Left — copy */}
          <div className="py-16 md:py-20 md:pr-12 md:border-r md:border-white/5">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/25 px-3 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-green-400">
                NADL/CDL Certified Full Service Dental Lab
              </span>
            </div>

            <h1 className="mb-5 font-serif text-[44px] leading-[1.02] tracking-[-1.5px] text-white md:text-[56px]">
              Your chair time is everything. We handle the rest.<br />
              <span className="text-green-400">People</span> first.
            </h1>

            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-white/40 font-light">
              From single-unit crowns to full-arch implant cases — IDOC delivers
              lab-grade quality with in-house CAD/CAM milling and 3D printing,
              backed by 20+ years of expertise.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-green-700 px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-[14px] text-white/60 transition-colors hover:border-white/30 hover:text-white/80"
              >
                View services →
              </Link>
            </div>

            {/* Mobile — reel */}
            <div className="mt-10 md:hidden">
              <ReelsFeed maxHeight={360} showThumbs={false} />
            </div>
          </div>

          {/* Right — desktop only */}
          <div className="hidden md:flex items-center justify-center py-10 pl-12">
            <div className="w-[300px]">
              <ReelsFeed maxHeight={560} showThumbs={true} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}