import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden px-6 py-10 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <img
        src={assetUrl("footer-background.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#fcf8f3]/40" />
      <ScrollReveal className="relative z-10 mx-auto max-w-xs text-center sm:max-w-2xl lg:max-w-3xl">
        <p className="font-['Great_Vibes',cursive] text-[1.35rem] leading-relaxed text-[#6a5056] sm:text-4xl sm:leading-snug lg:text-5xl">
          {t.footerMessage}
        </p>
        <p className="mt-3 text-[11px] text-[#8a7068] sm:mt-6 sm:text-sm">{t.footerCopyright}</p>
      </ScrollReveal>
    </footer>
  );
}
