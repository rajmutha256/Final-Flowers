"use client";

import { useMemo, useRef, useState } from "react";

const PASSWORD = "27042022";
const START_DATE = "2022-04-27";

const reasons = [
  "You laugh at my worst jokes like they are premium comedy.",
  "You make ordinary days feel like tiny holidays.",
  "You look cute even when pretending to be angry.",
  "You turn my overthinking into calm in two sentences.",
  "You are my favorite notification.",
  "You make silence feel cozy, not awkward.",
  "You are the only person who can steal my fries and still be adored.",
  "You make me feel lucky in a very loud way.",
  "You are my soft place to land after hard days.",
  "You are beautiful and weird in the best possible ratio.",
];

const gallery = [1, 2, 3].map((n) => ({
  src: `/photos/${n}.jpg`,
  alt: `Memory ${n}`,
}));

const flowers = ["🌸", "🌼", "🌷"];

function pseudoRotation(index: number): number {
  const seed = Math.sin((index + 1) * 999) * 10000;
  return ((seed - Math.floor(seed)) * 4 - 2);
}

function daysSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function Page() {
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentReason, setCurrentReason] = useState(reasons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const floating = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: flowers[i % flowers.length],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 1.4}rem`,
        delay: `${Math.random() * 4}s`,
        duration: `${4 + Math.random() * 4}s`,
      })),
    []
  );

  const totalDays = useMemo(() => daysSince(START_DATE), []);

  const checkPassword = () => {
    if (input.trim() === PASSWORD) {
      setIsUnlocked(true);
      setIsWrong(false);
      return;
    }
    setIsWrong(true);
    setTimeout(() => setIsWrong(false), 420);
  };

  const randomizeReason = () => {
    const next = reasons[Math.floor(Math.random() * reasons.length)];
    setCurrentReason(next);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-8 sm:py-10">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {floating.map((item) => (
          <span
            key={item.id}
            className="absolute select-none animate-float"
            style={{
              left: item.left,
              top: item.top,
              fontSize: item.size,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {!isUnlocked ? (
        <section className="relative z-10 flex min-h-[86vh] items-center justify-center">
          <div
            className={[
              "w-full max-w-md rounded-[3rem] border border-white/70 bg-white/65 p-6 shadow-xl backdrop-blur-md sm:p-8",
              isWrong ? "animate-shake" : "",
            ].join(" ")}
          >
            <h1 className="text-center text-2xl font-bold text-slate sm:text-3xl">
              Blooming Reasons I Love You
            </h1>
            <p className="mt-3 text-center text-sm text-slate/80 sm:text-base">
              Enter password to open our little world.
            </p>

            <div className="mt-6 space-y-3">
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") checkPassword();
                }}
                className="w-full rounded-full border border-slate/20 bg-white/90 px-5 py-3 text-center text-base text-slate outline-none ring-pink-200 transition focus:ring-2"
                placeholder="Password"
                inputMode="numeric"
              />
              <button
                onClick={checkPassword}
                className="w-full rounded-full bg-slate px-5 py-3 text-base font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]"
              >
                Unlock
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative z-10 mx-auto max-w-6xl">
          <header className="sticky top-3 z-20 mb-6 rounded-full border border-white/70 bg-white/60 px-4 py-3 shadow-lg backdrop-blur-md sm:top-5 sm:mb-8 sm:px-8 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-sm font-bold text-slate sm:text-xl">
                Blooming Reasons I Love You
              </h1>
              <p className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-slate sm:px-4 sm:py-1.5 sm:text-sm">
                {totalDays} days together
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-5">
            <article className="rounded-[3rem] border border-white/80 bg-white/70 p-6 shadow-lg backdrop-blur-sm lg:col-span-2">
              <h2 className="text-xl font-bold text-slate sm:text-2xl">Random Reason 💌</h2>
              <p className="mt-4 min-h-[96px] rounded-[2rem] bg-cream/90 p-4 text-base leading-relaxed text-slate sm:min-h-[120px] sm:text-lg">
                {currentReason}
              </p>
              <button
                onClick={randomizeReason}
                className="mt-5 w-full rounded-full bg-rose-400 px-6 py-4 text-base font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-[0.98] sm:text-lg"
              >
                Give Me Another 🌷
              </button>
            </article>

            <section className="rounded-[3rem] border border-white/80 bg-white/55 p-4 shadow-lg backdrop-blur-sm sm:p-6 lg:col-span-3">
              <h2 className="mb-4 text-lg font-bold text-slate sm:text-2xl">Our Polaroids 📸</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((photo, idx) => (
                  <figure
                    key={photo.src}
                    className="group overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-md transition hover:scale-105 active:scale-105"
                    style={{ transform: `rotate(${pseudoRotation(idx)}deg)` }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <button
            onClick={toggleMusic}
            className="fixed bottom-5 right-5 z-30 rounded-full bg-slate px-5 py-4 text-xl text-white shadow-xl transition hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? "⏸️" : "🎵"}
          </button>
        </section>
      )}
    </main>
  );
}
