import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

const VENUE_MAPS_URL =
  "https://www.google.com/maps/place/R%C3%BCyapark+D%C3%BC%C4%9F%C3%BCn+Salonu/@40.2111555,29.0392379,17z/data=!3m1!4b1!4m6!3m5!1s0x14ca15fc4587ae09:0x8fa06b85334c9c14!8m2!3d40.211217!4d29.0387818!16s%2Fg%2F11q8hvtz_m";

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 60 72"
      className="mx-auto h-16 w-14 sm:h-20 sm:w-[4.5rem]"
      aria-hidden="true"
    >
      <line
        x1="18"
        y1="4"
        x2="18"
        y2="14"
        stroke="#7b5d5e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="4"
        x2="42"
        y2="14"
        stroke="#7b5d5e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="2"
        y="10"
        width="56"
        height="58"
        rx="8"
        fill="white"
        fillOpacity="0.5"
        stroke="#d8c9bc"
        strokeWidth="1.5"
      />
      <rect x="2" y="10" width="56" height="20" rx="8" fill="#9f5a57" />
      <rect x="2" y="22" width="56" height="8" fill="#9f5a57" />
      <text
        x="30"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="700"
        fontFamily="Montserrat, sans-serif"
      >
        HAZİRAN
      </text>
      <text
        x="30"
        y="56"
        textAnchor="middle"
        fill="#4f3640"
        fontSize="26"
        fontWeight="800"
        fontFamily="Montserrat, sans-serif"
      >
        21
      </text>
    </svg>
  );
}

function VenueIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="mx-auto h-12 w-12 sm:h-14 sm:w-14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="18" r="14" stroke="#d8c9bc" strokeWidth="1" />
      <path
        d="M24 8a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Z"
        fill="#9f5a57"
        fillOpacity="0.15"
        stroke="#9f5a57"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="16" r="3" fill="#9f5a57" />
      <path
        d="M10 36c0-4 6-6 14-6s14 2 14 6"
        stroke="#d8c9bc"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <text
        x="24"
        y="42"
        textAnchor="middle"
        fill="#9f5a57"
        fontSize="5"
        fontWeight="600"
        fontFamily="Montserrat, sans-serif"
      >
        KONUM
      </text>
    </svg>
  );
}

function DirectionsIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="mx-auto h-12 w-12 sm:h-14 sm:w-14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 4v40"
        stroke="#d8c9bc"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 10h14l-4-4"
        stroke="#9f5a57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 10h14l-4 4"
        stroke="#9f5a57"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="24"
        y="7"
        width="16"
        height="7"
        rx="2"
        fill="#9f5a57"
        fillOpacity="0.15"
        stroke="#9f5a57"
        strokeWidth="1"
      />
      <path
        d="M24 24H10l4-4"
        stroke="#c9956b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 24H10l4 4"
        stroke="#c9956b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="21"
        width="16"
        height="7"
        rx="2"
        fill="#c9956b"
        fillOpacity="0.15"
        stroke="#c9956b"
        strokeWidth="1"
      />
      <circle cx="24" cy="44" r="2.5" fill="#7b5d5e" />
    </svg>
  );
}

function TransportDialog({ open, onClose, t }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#4f3640]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      style={{ animation: "modal-fade-in 0.25s ease-out" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#e3d6ca] bg-[#fcf8f3] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-['Great_Vibes',cursive] text-2xl text-[#4f3640] sm:text-3xl">
            {t.transportDialogTitle}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3d6ca] text-sm text-[#4f3640] transition-colors hover:bg-[#f5ede5]"
          >
            ✕
          </button>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#5f4a41] sm:text-base">
          <div>
            <p className="font-semibold text-[#4f3640]">
              {t.transportByCarTitle}
            </p>
            <p>{t.transportByCarText}</p>
          </div>
          <div>
            <p className="font-semibold text-[#4f3640]">
              {t.transportParkingTitle}
            </p>
            <p>{t.transportParkingText}</p>
          </div>
          <div>
            <p className="font-semibold text-[#4f3640]">
              {t.transportShuttleTitle}
            </p>
            <p>{t.transportShuttleText}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-b from-[#bd6f6b] to-[#9f5a57] px-6 py-2.5 text-sm font-semibold text-[#fff0ea] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-100 sm:text-base"
        >
          {t.transportClose}
        </button>
      </div>
    </div>
  );
}

function Toast({ message, onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2400);
    const t2 = setTimeout(onDone, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-x-0 top-20 z-[70] flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-2.5 rounded-2xl border border-[#e3d6ca]/60 bg-[#fcf8f3]/95 px-5 py-3 shadow-xl backdrop-blur-lg transition-all duration-500 ${
          phase === "enter"
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a07a] to-[#b8906c]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="text-sm font-medium text-[#4f3640]">{message}</span>
      </div>
    </div>
  );
}

export default function WeddingInfo({ t }) {
  const [transportOpen, setTransportOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleRsvp = useCallback((type) => {
    const msg = type === "yes" ? t.rsvpYesConfirm : t.rsvpNoConfirm;
    setToast(msg);
  }, [t]);

  const clearToast = useCallback(() => setToast(null), []);

  return (
    <>
      <section
        id="wedding-info"
        className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
      >
        <img
          src={assetUrl("info-background.png")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[20%_center] sm:object-left"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#fcf8f3]/15" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="lg:ml-auto lg:max-w-[55%]">
            <ScrollReveal className="text-center">
              <h2 className="font-['Great_Vibes',cursive] text-4xl text-[#4f3640] sm:text-5xl">
                {t.weddingInfoTitle}
              </h2>
            </ScrollReveal>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:gap-5">
              <ScrollReveal delay={0.1} className="flex">
                <div className="flex w-full flex-col items-center rounded-2xl border border-[#e3d6ca]/50 bg-white/35 p-4 text-center shadow-md backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
                  <CalendarIcon />
                  <h3 className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#4f3640] sm:text-sm">
                    {t.dateTitle}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#5f4a41] sm:text-sm">
                    {t.dateValue}
                  </p>
                  <p className="text-xs font-medium text-[#5f4a41] sm:text-sm">
                    {t.timeValue}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="flex">
                <a
                  href={VENUE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full flex-col items-center rounded-2xl border border-[#e3d6ca]/50 bg-white/35 p-4 text-center shadow-md backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                >
                  <VenueIcon />
                  <h3 className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#4f3640] sm:text-sm">
                    {t.venueTitle}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#5f4a41] sm:text-sm">
                    {t.venueName}
                  </p>
                  <p className="text-xs font-medium text-[#5f4a41] sm:text-sm">
                    {t.venueCity}
                  </p>
                  <p className="mt-1.5 max-w-[11rem] text-[10px] leading-snug text-[#8f7d72] sm:max-w-none sm:text-xs">
                    {t.venueAddress}
                  </p>
                  <p className="mt-auto pt-2 text-[10px] font-medium text-[#c9956b] sm:text-xs">
                    {t.venueMapHint}
                  </p>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="flex">
                <button
                  onClick={() => setTransportOpen(true)}
                  className="flex w-full flex-col items-center rounded-2xl border border-[#e3d6ca]/50 bg-white/35 p-4 text-center shadow-md backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                >
                  <DirectionsIcon />
                  <h3 className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#4f3640] sm:text-sm">
                    {t.transportTitle}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#5f4a41] sm:text-sm">
                    {t.transportValue}
                  </p>
                </button>
              </ScrollReveal>
            </div>

            <ScrollReveal className="mt-8 text-center sm:mt-12" delay={0.4}>
              <h3 className="font-['Great_Vibes',cursive] text-3xl text-[#4f3640] sm:text-4xl">
                {t.rsvpTitle}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-[#5f4a41] sm:text-base">
                {t.rsvpDescription}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
                <button
                  onClick={() => handleRsvp("yes")}
                  className="w-full rounded-xl bg-gradient-to-b from-[#e2ab57] to-[#d6953d] px-8 py-3 text-base font-semibold text-[#fff5e9] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 sm:w-auto sm:px-12"
                >
                  {t.rsvpYes}
                </button>
                <button
                  onClick={() => handleRsvp("no")}
                  className="w-full rounded-xl bg-gradient-to-b from-[#bd6f6b] to-[#9f5a57] px-8 py-3 text-base font-semibold text-[#fff0ea] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 sm:w-auto sm:px-12"
                >
                  {t.rsvpNo}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-3 sm:bottom-8">
          <div className="flex items-center gap-8 sm:gap-14">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-[#c9956b]"
                style={{
                  fontSize: `${10 + (i % 3) * 4}px`,
                  opacity: 0.2 + (i % 2) * 0.1,
                  animation: `heart-float ${3 + i * 0.4}s ease-in-out ${i * 0.5}s infinite`,
                }}
              >
                ♥
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <span className="block h-px w-16 bg-gradient-to-r from-transparent to-[#d8c9bc] sm:w-24" />
            <span className="text-xs text-[#c9956b]">✦</span>
            <span className="block h-px w-16 bg-gradient-to-l from-transparent to-[#d8c9bc] sm:w-24" />
          </div>
        </div>
      </section>

      <TransportDialog
        open={transportOpen}
        onClose={() => setTransportOpen(false)}
        t={t}
      />

      {toast && <Toast message={toast} onDone={clearToast} />}
    </>
  );
}
