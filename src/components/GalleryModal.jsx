import { useCallback, useEffect } from "react";
import NotebookAlbum from "./NotebookAlbum";
import { categories } from "../data/galleryData";

function prevent(e) {
  e.preventDefault();
}

export default function GalleryModal({
  mode,
  categoryId,
  language,
  onClose,
  t,
}) {
  const mediaItems =
    mode === "all"
      ? categories.flatMap((cat) =>
          cat.media.map((m) => ({ ...m, catTitle: t[cat.titleKey] })),
        )
      : (categories.find((c) => c.id === categoryId)?.media ?? []);

  const categoryTitle =
    mode === "category"
      ? t[categories.find((c) => c.id === categoryId)?.titleKey]
      : t.galleryAllPhotos;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[60] flex flex-col bg-[#4f3640]/60 backdrop-blur-sm"
      onContextMenu={prevent}
    >
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#e3d6ca]/30 bg-[#fcf8f3]/95 px-4 py-4 backdrop-blur-md sm:px-6">
        <h3 className="font-['Great_Vibes',cursive] text-2xl text-[#4f3640] sm:text-3xl">
          {categoryTitle}
        </h3>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e3d6ca] bg-white/80 text-lg text-[#4f3640] transition-all duration-200 hover:bg-[#f5ede5] hover:shadow-md"
        >
          ✕
        </button>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto bg-[#fcf8f3]/70 p-4 sm:p-6 lg:p-8">
        {mediaItems.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-center text-lg text-[#9f8574]">{t.galleryEmpty}</p>
          </div>
        ) : (
          <NotebookAlbum items={mediaItems} language={language} t={t} />
        )}
      </div>
    </div>
  );
}
