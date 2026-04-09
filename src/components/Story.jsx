import ScrollReveal from "./ScrollReveal";
import { assetUrl } from "../utils/assetUrl";

export default function Story({ t }) {
  return (
    <section
      id="story"
      className="min-h-[calc(100svh-4rem)] bg-gradient-to-b from-[#fcf8f3] to-[#f5ede5] py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={assetUrl("back-ground.png")}
                alt={t.storyTitle}
                className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80 lg:h-[28rem]"
                loading="lazy"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="font-['Great_Vibes',cursive] text-4xl text-[#6a5056] sm:text-5xl">
                {t.storyTitle}
              </h2>
              <p className="mt-2 text-lg font-medium text-[#c9956b] sm:text-xl">
                {t.storySubtitle}
              </p>
              <p className="mt-6 text-base leading-relaxed text-[#5f4a41] sm:text-lg">
                {t.storyText}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
