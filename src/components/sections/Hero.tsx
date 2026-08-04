"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/**
 * Hero background: cases that signal lab competence to referring dentists —
 * All-on-X finals, full-arch zirconia, precision workflow (not casual / ASMR).
 */
const HERO_REEL_IDS = [
  "18079037333184498", // Final delivery — All-on-4 zirconia bridge
  "18320316910170297", // Final result — full-arch All-on-6 zirconia
  "17930432244111951", // Final step — All-on-6 zirconia
  "18084295355626722", // In-lab POV — making an All-on-6 zirconia case
  "18117183700526588", // Design with us — All-on-6 zirconia
  "18325399474212641", // Contouring — All-on-6 zirconia (part 2)
  "17925197565390578", // Semi-digital All-on-X mastery
  "18297914110253749", // Final — customized titanium overdenture
  "18062508077552253", // Locator overdenture — full digital 3Shape workflow
  "18052021313670713", // Design → sprue grind → sinter workflow
  "17942458119260874", // Precision pre-polish — metal framework
];

interface Reel {
  id: string;
  media_url: string;
  thumbnail_url?: string;
}

export default function Hero() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        const byId = new Map(
          ((data.reels || []) as Reel[]).map((reel) => [reel.id, reel])
        );
        const curated = HERO_REEL_IDS.map((id) => byId.get(id)).filter(
          Boolean
        ) as Reel[];

        setReels(curated.length ? curated : (data.reels || []).slice(0, 8));
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (reels.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % reels.length);
    }, 9000);
    return () => clearInterval(id);
  }, [reels]);

  useEffect(() => {
    setVideoVisible(false);
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = () => {
      const play = el.play();
      if (play) {
        play
          .then(() => setVideoVisible(true))
          .catch(() => setVideoVisible(false));
      }
    };

    el.load();
    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("canplay", tryPlay, { once: true });

    return () => el.removeEventListener("canplay", tryPlay);
  }, [active, reels]);

  const current = reels[active];
  const poster = current?.thumbnail_url || current?.media_url;

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#0a0f0d]">
      {/* Full-bleed atmosphere */}
      <div className="absolute inset-0">
        {poster ? (
          <img
            key={`poster-${current?.id ?? "none"}`}
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center animate-hero-kenburns"
          />
        ) : null}

        {current?.media_url ? (
          <video
            key={`video-${current.id}`}
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
            src={current.media_url}
            poster={poster}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            onPlaying={() => setVideoVisible(true)}
            onError={() => setVideoVisible(false)}
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:justify-center md:px-8 md:pb-20 md:pt-20">
        <div
          className={`max-w-xl transition-all duration-1000 ease-out ${
            ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-3 font-serif text-[40px] leading-[1.05] tracking-[-1.5px] text-white md:text-[64px]">
            IDOC Dental Lab
          </p>

          <h1 className="mb-4 font-serif text-[32px] leading-[1.1] tracking-[-0.5px] text-white md:text-[42px]">
            People first.
          </h1>

          <p className="mb-8 max-w-md text-[15px] leading-relaxed text-white/70 md:text-[16px]">
            Your chair time is everything. Digital workflows, in-house CAD/CAM,
            and 3D printing — so you can stay with your patients.
          </p>

          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-green-700 px-8 py-3.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
