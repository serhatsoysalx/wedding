import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProtectedMedia from "./ProtectedMedia";
import { journalQuotes } from "../data/journalQuotes";

const FLIP_DURATION_MS = 700;

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function NotebookAlbum({ items, language, t }) {
  const n = items.length;
  const [idx, setIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const isFlipping = useRef(false);
  const rotationRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const quoteList = journalQuotes[language] ?? journalQuotes.tr;

  const quoteText = useMemo(() => {
    const qi = (idx * 3 + quoteList.length) % quoteList.length;
    return quoteList[qi];
  }, [idx, quoteList]);

  const sentences = useMemo(
    () => splitIntoSentences(quoteText),
    [quoteText],
  );

  const finishFlip = useCallback(() => {
    setSkipTransition(true);
    setIdx((i) => (i + 1) % n);
    setRotation(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSkipTransition(false);
        isFlipping.current = false;
      });
    });
  }, [n]);

  const goForward = useCallback(() => {
    if (n <= 1) return;
    if (isFlipping.current) return;
    if (reducedMotionRef.current) {
      setIdx((i) => (i + 1) % n);
      return;
    }
    isFlipping.current = true;
    setRotation(180);
  }, [n]);

  const goPrev = useCallback(() => {
    if (n <= 1) return;
    if (isFlipping.current) return;
    setIdx((i) => (i - 1 + n) % n);
  }, [n]);

  const onFlipTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== "transform") return;
      if (rotationRef.current !== 180) return;
      finishFlip();
    },
    [finishFlip],
  );

  useEffect(() => {
    if (n <= 1) return undefined;
    const id = window.setTimeout(goForward, 10000);
    return () => window.clearTimeout(id);
  }, [idx, n, goForward]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goForward();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goForward, goPrev]);

  const current = items[idx];
  const nextItem = items[(idx + 1) % n];

  if (n === 0) return null;

  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl pb-6">
      <div
        className="rounded-2xl border border-[#3d2a24]/25 bg-gradient-to-br from-[#5c4033] via-[#4a342c] to-[#3d2a24] p-2 shadow-[0_20px_50px_rgba(47,32,28,0.35)] sm:p-3"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.galleryTitle}
      >
        <div className="flex flex-col gap-3 rounded-xl bg-[#2a1f1c]/40 p-2 sm:gap-0 sm:p-3 lg:flex-row lg:items-stretch">
          <div className="notebook-paper relative flex min-h-[200px] flex-1 flex-col justify-center rounded-lg border border-[#e3d6ca]/60 px-5 py-6 shadow-inner sm:min-h-[260px] sm:rounded-r-none sm:border-r-0 lg:min-h-[320px] lg:px-8 lg:py-10">
            <span
              className="mb-3 font-['Great_Vibes',cursive] text-xl text-[#9f5a57] sm:text-2xl"
              aria-hidden="true"
            >
              ✦
            </span>
            <div className="space-y-3 text-left text-sm leading-relaxed text-[#4f3640] sm:text-base">
              {sentences.map((line, si) => (
                <p key={si}>{line}</p>
              ))}
            </div>
          </div>

          <div
            className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[#2a1f1c] to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[220px] flex-1 flex-col justify-center rounded-lg border border-[#e3d6ca]/60 bg-[#f4ebe0] p-3 shadow-inner sm:min-h-[260px] sm:rounded-l-none sm:border-l-0 lg:min-h-[320px] lg:p-4">
            {n === 1 ? (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-md border border-[#d8c9bc] bg-white shadow-md">
                <PhotoCorners />
                <ProtectedMedia
                  src={current.src}
                  type={current.type}
                  alt=""
                  className="h-full w-full rounded-sm"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="notebook-flip-scene mx-auto w-full max-w-md">
                <div
                  className="notebook-flipper relative aspect-[4/3] w-full"
                  style={{
                    transform: `rotateY(${rotation}deg)`,
                    transition: skipTransition
                      ? "none"
                      : `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                  onTransitionEnd={onFlipTransitionEnd}
                >
                  <div className="notebook-face absolute inset-0 overflow-hidden rounded-md border border-[#d8c9bc] bg-white shadow-md">
                    <PhotoCorners />
                    <ProtectedMedia
                      src={current.src}
                      type={current.type}
                      alt=""
                      className="h-full w-full rounded-sm"
                      objectFit="cover"
                    />
                  </div>
                  <div className="notebook-face notebook-face-back absolute inset-0 overflow-hidden rounded-md border border-[#d8c9bc] bg-white shadow-md">
                    <PhotoCorners />
                    <ProtectedMedia
                      src={nextItem.src}
                      type={nextItem.type}
                      alt=""
                      className="h-full w-full rounded-sm"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {n > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-[#e3d6ca] bg-white/90 px-5 py-2 text-sm font-semibold text-[#4f3640] shadow-sm transition-all hover:bg-[#f5ede5] hover:shadow-md"
            aria-label={t.albumPrev}
          >
            ‹ {t.albumPrev}
          </button>
          <span className="text-xs tabular-nums text-[#8f7d72]">
            {idx + 1} / {n}
          </span>
          <button
            type="button"
            onClick={goForward}
            className="rounded-full border border-[#e3d6ca] bg-white/90 px-5 py-2 text-sm font-semibold text-[#4f3640] shadow-sm transition-all hover:bg-[#f5ede5] hover:shadow-md"
            aria-label={t.albumNext}
          >
            {t.albumNext} ›
          </button>
        </div>
      )}
    </div>
  );
}

function PhotoCorners() {
  const corner =
    "pointer-events-none absolute h-5 w-5 border-[#b8906c] sm:h-6 sm:w-6";
  return (
    <>
      <span
        className={`${corner} left-2 top-2 border-l-2 border-t-2`}
        aria-hidden="true"
      />
      <span
        className={`${corner} right-2 top-2 border-r-2 border-t-2`}
        aria-hidden="true"
      />
      <span
        className={`${corner} bottom-2 left-2 border-b-2 border-l-2`}
        aria-hidden="true"
      />
      <span
        className={`${corner} bottom-2 right-2 border-b-2 border-r-2`}
        aria-hidden="true"
      />
    </>
  );
}
