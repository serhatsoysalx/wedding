import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

function HeartSvg({ className, style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Arka plan: pastel kalpler + çiçekler (gradient aynı kalır) */
function StorySectionDecor() {
  const hearts = [
    { t: "4%", l: "2%", w: 28, rot: -12 },
    { t: "7%", r: "6%", w: 24, rot: 8 },
    { t: "16%", l: "8%", w: 20, rot: 10 },
    { t: "22%", r: "3%", w: 32, rot: -6 },
    { t: "34%", l: "1%", w: 24, rot: 5 },
    { t: "40%", r: "11%", w: 22, rot: -10 },
    { t: "52%", l: "12%", w: 28, rot: 6 },
    { t: "58%", r: "5%", w: 26, rot: -8 },
    { t: "68%", l: "4%", w: 30, rot: 12 },
    { t: "74%", r: "16%", w: 22, rot: -12 },
    { t: "84%", l: "20%", w: 26, rot: 6 },
    { t: "90%", r: "8%", w: 28, rot: -5 },
    { t: "12%", l: "42%", w: 18, rot: -15 },
    { t: "45%", r: "38%", w: 20, rot: 15 },
  ];
  const flowers = [
    { t: "10%", l: "16%", s: 26, rot: 25 },
    { t: "28%", r: "20%", s: 30, rot: -15 },
    { t: "46%", r: "2%", s: 32, rot: 10 },
    { t: "63%", l: "26%", s: 24, rot: -20 },
    { t: "78%", r: "22%", s: 28, rot: 8 },
    { t: "18%", r: "32%", s: 22, rot: -8 },
    { t: "50%", l: "6%", s: 26, rot: 12 },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((d, i) => (
        <HeartSvg
          key={`h-${i}`}
          className="absolute text-[#d4a08c]"
          style={{
            top: d.t,
            left: d.l,
            right: d.r,
            width: `${d.w}px`,
            height: `${d.w}px`,
            opacity: 0.42,
            transform: `rotate(${d.rot}deg)`,
          }}
        />
      ))}
      {flowers.map((d, i) => (
        <span
          key={`f-${i}`}
          className="absolute select-none font-serif text-[#c9956b]"
          style={{
            top: d.t,
            left: d.l,
            right: d.r,
            fontSize: `${d.s}px`,
            opacity: 0.4,
            transform: `rotate(${d.rot}deg)`,
          }}
        >
          ✿
        </span>
      ))}
    </div>
  );
}

export default function Story({ t }) {
  return (
    <section
      id="story"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-gradient-to-b from-[#fcf8f3] to-[#f5ede5] py-8 sm:py-10 lg:py-12"
    >
      <StorySectionDecor />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-1 flex w-full justify-center lg:order-1 lg:justify-end lg:pr-2">
              <div className="relative w-full max-w-[min(100%,440px)] shrink-0 sm:max-w-[420px] lg:w-full lg:max-w-[420px]">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#fcf8f3] shadow-xl ring-1 ring-[#e8ddd4]/70">
                  <img
                    src={assetUrl("our-story.png")}
                    alt={t.storyTitle}
                    className="h-full w-full object-contain object-center p-3 transition-transform duration-700 hover:scale-[1.02] sm:p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="order-2 flex w-full flex-col justify-center text-center lg:order-2 lg:max-w-xl lg:justify-center lg:self-center lg:text-left xl:max-w-lg">
              <h2 className="font-['Great_Vibes',cursive] text-4xl leading-tight text-[#4f3640] sm:text-5xl lg:text-[3.25rem]">
                {t.storyTitle}
              </h2>
              <p className="mt-3 text-base font-medium tracking-[0.14em] text-[#c9956b] sm:text-lg">
                {t.storySubtitle}
              </p>
              <p className="mx-auto mt-6 max-w-md text-sm italic leading-[1.8] text-[#5f4a41]/95 sm:mt-8 sm:text-[0.9375rem] lg:mx-0 lg:max-w-none">
                {t.storyText}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
