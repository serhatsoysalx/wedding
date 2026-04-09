import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProtectedMedia from "./ProtectedMedia";
import { journalQuotes } from "../data/journalQuotes";

const FLIP_DURATION_MS = 850;
const FLIP_EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";
/** Sol menteşe (kitap ortası): sağ sayfa ekranda sola doğru kapanır → negatif rotateY */
const FLIP_ANGLE_Y_DEG = -178;
/** Mobil: üst menteşe */
const FLIP_ANGLE_X_DEG = 178;

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function quoteSentencesAtIndex(idx, quoteList) {
  const qi = (idx * 3 + quoteList.length) % quoteList.length;
  return splitIntoSentences(quoteList[qi]);
}

function AlbumLeftPage({ sentences }) {
  return (
    <div className="album-page-paper notebook-paper relative z-[1] flex min-h-[200px] flex-1 flex-col justify-center rounded-lg border border-[#e3d6ca]/60 px-5 py-6 shadow-inner sm:min-h-[260px] sm:rounded-r-none sm:border-r-0 lg:min-h-[320px] lg:px-8 lg:py-10">
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
  );
}

function AlbumPhotoFrame({ item }) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-md border border-[#d8c9bc] bg-white shadow-md">
      <PhotoCorners />
      <ProtectedMedia
        src={item.src}
        type={item.type}
        alt=""
        className="h-full w-full rounded-sm"
        objectFit="cover"
      />
    </div>
  );
}

function AlbumSpreadSingle({ item, sentences }) {
  return (
    <div className="album-book-spread flex flex-col gap-3 rounded-xl bg-[#2a1f1c]/40 p-2 sm:gap-0 sm:flex-row sm:p-3 sm:items-stretch">
      <AlbumLeftPage sentences={sentences} />
      <div
        className="album-book-spine album-book-spine--h shrink-0 sm:hidden"
        aria-hidden="true"
      />
      <div
        className="album-book-spine album-book-spine--v hidden shrink-0 sm:block"
        aria-hidden="true"
      />
      <div className="relative z-[1] flex min-h-[220px] flex-1 flex-col justify-center rounded-lg border border-[#e3d6ca]/60 bg-[#f4ebe0] p-3 shadow-inner sm:min-h-[260px] sm:rounded-l-none sm:border-l-0 lg:min-h-[320px] lg:p-4">
        <AlbumPhotoFrame item={item} />
      </div>
    </div>
  );
}

export default function NotebookAlbum({ items, language, t }) {
  const n = items.length;
  const [idx, setIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const isFlipping = useRef(false);
  const rotationRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const compactLayoutRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 639px)").matches
      : false,
  );
  const [compactLayout, setCompactLayout] = useState(
    () => compactLayoutRef.current,
  );

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
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      const m = mq.matches;
      compactLayoutRef.current = m;
      setCompactLayout(m);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const quoteList = journalQuotes[language] ?? journalQuotes.tr;

  const sentences = useMemo(
    () => quoteSentencesAtIndex(idx, quoteList),
    [idx, quoteList],
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
    setRotation(
      compactLayoutRef.current ? FLIP_ANGLE_X_DEG : FLIP_ANGLE_Y_DEG,
    );
  }, [n]);

  const goPrev = useCallback(() => {
    if (n <= 1) return;
    if (isFlipping.current) return;
    setIdx((i) => (i - 1 + n) % n);
  }, [n]);

  const onFlipTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;
      const r = rotationRef.current;
      if (r !== FLIP_ANGLE_X_DEG && r !== FLIP_ANGLE_Y_DEG) return;
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

  const zLift = rotation !== 0 ? 72 : 0;
  const flipTransformDesktop = `rotateY(${rotation}deg) translateZ(${zLift}px)`;
  const flipTransformMobile = `rotateX(${rotation}deg) translateZ(${zLift}px)`;

  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl pb-6">
      <div
        className="rounded-2xl border border-[#3d2a24]/25 bg-gradient-to-br from-[#5c4033] via-[#4a342c] to-[#3d2a24] p-2 shadow-[0_20px_50px_rgba(47,32,28,0.35)] sm:p-3"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.galleryTitle}
      >
        {n === 1 ? (
          <AlbumSpreadSingle item={current} sentences={sentences} />
        ) : (
          <div className="album-book-scene rounded-xl">
            <div className="album-book-spread relative rounded-xl bg-[#2a1f1c]/40 p-2 sm:p-3">
              {/* Alttaki yayılım: sol yazı + sırt + sağda sonraki foto */}
              <div className="relative z-0 flex min-h-[240px] flex-col gap-3 sm:min-h-[280px] sm:flex-row sm:items-stretch sm:gap-0">
                <AlbumLeftPage sentences={sentences} />
                <div
                  className="album-book-spine album-book-spine--h shrink-0 sm:hidden"
                  aria-hidden="true"
                />
                <div
                  className="album-book-spine album-book-spine--v hidden shrink-0 sm:block"
                  aria-hidden="true"
                />
                {/* Masaüstü: altta sadece sonraki foto (sağ sayfa) */}
                <div className="relative z-[1] hidden min-h-0 min-w-0 flex-1 flex-col justify-center rounded-lg border border-[#e3d6ca]/60 bg-[#f4ebe0] p-3 shadow-inner sm:flex sm:rounded-l-none sm:border-l-0 sm:py-4 lg:py-5">
                  <AlbumPhotoFrame item={nextItem} />
                </div>
              </div>

              {/* Masaüstü: menteşe tam ortada — sağ yarıyı kaplayan gerçek sayfa */}
              <div
                className={`album-page-turn hidden sm:flex ${
                  rotation !== 0 ? "album-page-turn--active" : ""
                }`}
                style={{
                  transform: flipTransformDesktop,
                  transition: skipTransition
                    ? "none"
                    : `transform ${FLIP_DURATION_MS}ms ${FLIP_EASE}, box-shadow ${FLIP_DURATION_MS}ms ${FLIP_EASE}`,
                }}
                onTransitionEnd={onFlipTransitionEnd}
              >
                <div className="album-page-turn-face flex h-full w-full flex-col justify-center rounded-lg border border-[#e3d6ca]/60 bg-[#f4ebe0] p-3 shadow-inner sm:rounded-l-none sm:border-l-0 sm:py-4 lg:py-5">
                  <AlbumPhotoFrame item={current} />
                </div>
              </div>

              {/* Mobil: yazının altında tek foto alanı (altında sonraki, üstte mevcut) */}
              <div
                className={`album-mobile-flip relative z-[2] mt-1 min-h-[200px] sm:hidden ${
                  rotation !== 0 ? "album-mobile-flip--active" : ""
                }`}
              >
                <div className="album-mobile-flip-under flex items-center justify-center py-2">
                  <AlbumPhotoFrame item={nextItem} />
                </div>
                <div
                  className="album-mobile-flip-top"
                  style={{
                    transform: flipTransformMobile,
                    transition: skipTransition
                      ? "none"
                      : `transform ${FLIP_DURATION_MS}ms ${FLIP_EASE}, box-shadow ${FLIP_DURATION_MS}ms ${FLIP_EASE}`,
                  }}
                  onTransitionEnd={onFlipTransitionEnd}
                >
                  <div className="flex items-center justify-center py-2">
                    <AlbumPhotoFrame item={current} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
