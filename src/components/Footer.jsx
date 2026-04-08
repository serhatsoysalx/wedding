import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

export default function Footer({ t }) {
  return (
    <footer className="relative overflow-hidden py-12 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8">
      <img
        src={assetUrl("footer-background.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#fcf8f3]/40" />
      <ScrollReveal className="relative z-10 mx-auto max-w-2xl text-center sm:max-w-3xl">
        <p className="font-['Great_Vibes',cursive] text-2xl leading-relaxed text-[#6a5056] sm:text-4xl sm:leading-snug lg:text-5xl">
          {t.footerMessage}
        </p>
        <p className="mt-4 text-xs text-[#8a7068] sm:mt-6 sm:text-sm">{t.footerCopyright}</p>
      </ScrollReveal>
    </footer>
  );
}
