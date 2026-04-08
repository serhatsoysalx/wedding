import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

const FOOTER_BG_W = 2128;
const FOOTER_BG_H = 496;

export default function Footer({ t }) {
  const intrinsicMinH = `max(7.25rem, calc(100vw * ${FOOTER_BG_H} / ${FOOTER_BG_W}))`;

  return (
    <footer
      className="relative isolate overflow-hidden bg-[#fcf8f3] px-6 py-5 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{ minHeight: intrinsicMinH }}
    >
      <img
        src={assetUrl("footer-background.png")}
        alt=""
        width={FOOTER_BG_W}
        height={FOOTER_BG_H}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-bottom"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 z-[1] bg-[#fcf8f3]/40" aria-hidden="true" />
      <ScrollReveal className="relative z-10 mx-auto max-w-xs text-center sm:max-w-2xl lg:max-w-3xl">
        <p className="font-['Great_Vibes',cursive] text-[1.25rem] leading-snug text-[#6a5056] sm:text-4xl sm:leading-snug lg:text-5xl">
          {t.footerMessage}
        </p>
        <p className="mt-2 text-[11px] leading-tight text-[#8a7068] sm:mt-6 sm:text-sm">
          {t.footerCopyright}
        </p>
      </ScrollReveal>
    </footer>
  );
}
