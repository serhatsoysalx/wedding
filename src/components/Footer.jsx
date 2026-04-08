import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

const footerBgUrl = assetUrl("footer-background.png");

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden bg-[#fcf8f3] px-6 py-5 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${footerBgUrl})` }}
        aria-hidden="true"
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
