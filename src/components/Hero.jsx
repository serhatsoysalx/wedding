import { useMemo } from "react";
import { useCountdown } from "../hooks/useCountdown";
import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

export default function Hero({ t }) {
  const weddingDate = useMemo(() => new Date(2026, 5, 21, 19, 0, 0), []);
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  const countdown = [
    { value: days, label: t.countdownDay },
    { value: hours, label: t.countdownHour },
    { value: minutes, label: t.countdownMinute },
    { value: seconds, label: t.countdownSecond },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      <img
        src={assetUrl("back-ground.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "gentle-breathe 8s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fcf8f3]/60 via-transparent to-[#fcf8f3]/40 lg:bg-gradient-to-r lg:from-[#fcf8f3]/85 lg:via-[#fcf8f3]/30 lg:to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <ScrollReveal delay={0.2}>
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-lg lg:text-left">
            <p className="font-['Great_Vibes',cursive] text-2xl text-[#7b5d5e] sm:text-3xl lg:text-4xl">
              {t.homeTitleTop}
            </p>
            <h1 className="mt-3 font-['Great_Vibes',cursive] text-5xl leading-tight text-[#6a5056] sm:mt-4 sm:text-6xl lg:text-7xl">
              {t.coupleNames}
            </h1>
            <div className="mx-auto mt-4 max-w-md border-y border-[#d8c9bc] py-2.5 sm:mt-5 lg:mx-0">
              <p className="text-base font-semibold text-[#5f3f47] sm:text-lg lg:text-xl">
                {t.homeInviteLine}
              </p>
            </div>

            <div className="mx-auto mt-5 grid max-w-md grid-cols-4 gap-2 sm:mt-6 sm:gap-3 lg:mx-0">
              {countdown.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#e3d6ca] bg-white/60 px-2 py-2.5 text-center backdrop-blur-sm sm:px-4 sm:py-3"
                >
                  <span className="block text-xl font-bold text-[#4f3241] sm:text-2xl lg:text-3xl">
                    {item.value}
                  </span>
                  <span className="text-[10px] font-medium text-[#5f4a41] sm:text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("wedding-info");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 64;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="mt-5 w-full rounded-xl bg-gradient-to-b from-[#bd6f6b] to-[#9f5a57] px-8 py-3 text-sm font-semibold text-[#f9f2ea] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 sm:mt-6 sm:w-auto sm:px-12 sm:py-3.5 sm:text-base"
            >
              {t.invitationDetailsButton}
            </button>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
