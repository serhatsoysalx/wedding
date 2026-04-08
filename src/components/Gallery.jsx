import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import GalleryModal from "./GalleryModal";
import GalleryAnimations from "./GalleryAnimations";
import { categories } from "../data/galleryData";

const GUEST_PHOTO_UPLOAD_URL =
  "https://drive.google.com/drive/folders/1WeEUMNiHPf_ZbEMTf_zEQ9K4WqFKiWM4";

export default function Gallery({ t }) {
  const [modal, setModal] = useState(null);

  return (
    <>
      <section
        id="photos"
        className="relative bg-gradient-to-b from-[#fcf8f3] to-[#f5ede5] py-12 sm:min-h-[calc(100svh-4rem)] sm:py-24 lg:py-32"
      >
        <GalleryAnimations />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-['Great_Vibes',cursive] text-4xl text-[#4f3640] sm:text-5xl">
              {t.galleryTitle}
            </h2>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={0.1 * (i + 1)}>
                <button
                  onClick={() =>
                    setModal({ mode: "category", categoryId: cat.id })
                  }
                  className="group flex w-full flex-col overflow-hidden rounded-xl border border-[#e8ddd4] bg-[#fcf8f3] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#d8c9bc] hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#f5ede5]">
                    <img
                      src={cat.cover}
                      alt={t[cat.titleKey]}
                      className="h-full w-full object-cover object-[center_26%] transition-transform duration-500 group-hover:scale-105"
                      style={{ height: "100%" }}
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                  <div className="border-t border-[#e3d6ca]/70 bg-gradient-to-b from-[#fffdfb] to-[#f9f2ea] px-2 py-2.5 text-center sm:px-3 sm:py-3">
                    <span className="font-['Great_Vibes',cursive] text-lg leading-tight text-[#5a443b] sm:text-xl">
                      {t[cat.titleKey]}
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8 text-center sm:mt-10" delay={0.5}>
            <button
              onClick={() => setModal({ mode: "all" })}
              className="w-full rounded-xl bg-gradient-to-b from-[#bd6f6b] to-[#9f5a57] px-8 py-3.5 text-base font-semibold text-[#fff0ea] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 sm:w-auto sm:px-12 sm:text-lg"
            >
              {t.galleryCta}
            </button>
          </ScrollReveal>

          <ScrollReveal className="mt-12 sm:mt-16" delay={0.6}>
            <div className="mx-auto max-w-md rounded-2xl border border-[#e3d6ca]/50 bg-white/50 px-6 py-8 text-center shadow-md backdrop-blur-sm sm:px-8 sm:py-10">
              <svg
                viewBox="0 0 48 48"
                className="mx-auto h-12 w-12 sm:h-14 sm:w-14"
                fill="none"
                aria-hidden="true"
              >
                <rect x="6" y="10" width="36" height="28" rx="4" stroke="#c9a07a" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="7" stroke="#9f5a57" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="3.5" fill="#9f5a57" fillOpacity="0.2" />
                <rect x="10" y="6" width="8" height="6" rx="1.5" fill="#c9a07a" fillOpacity="0.3" stroke="#c9a07a" strokeWidth="1" />
                <circle cx="36" cy="16" r="1.5" fill="#c9a07a" />
                <path d="M14 38l6-8 4 5 6-10 8 13" stroke="#d8c9bc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-4 font-['Great_Vibes',cursive] text-2xl text-[#4f3640] sm:text-3xl">
                {t.galleryUploadTitle}
              </h3>
              <p className="mt-2 text-sm text-[#8f7d72] sm:text-base">
                {t.galleryUploadDesc}
              </p>
              <a
                href={GUEST_PHOTO_UPLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#c9a07a] to-[#b8906c] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 sm:px-10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {t.galleryUploadBtn}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {modal && (
        <GalleryModal
          mode={modal.mode}
          categoryId={modal.categoryId}
          onClose={() => setModal(null)}
          t={t}
        />
      )}
    </>
  );
}
