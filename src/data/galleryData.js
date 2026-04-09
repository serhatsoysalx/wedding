const BASE = import.meta.env.BASE_URL;

export function galleryUrl(path) {
  return `${BASE}gallery/${path}`;
}

export const categories = [
  {
    id: "cat-1",
    titleKey: "galleryCat1",
    cover: galleryUrl("cat-1/1.1.jpeg"),
    media: [
      { src: galleryUrl("cat-1/1.1.jpeg"), type: "image" },
      { src: galleryUrl("cat-1/1.2.jpeg"), type: "image" },
    ],
  },
  {
    id: "cat-2",
    titleKey: "galleryCat2",
    cover: galleryUrl("cat-2/2.1.png"),
    media: [
      { src: galleryUrl("cat-2/2.1.png"), type: "image" },
      { src: galleryUrl("cat-2/2.2.png"), type: "image" },
    ],
  },
  {
    id: "cat-3",
    titleKey: "galleryCat3",
    cover: galleryUrl("cat-3/3.1.png"),
    media: [{ src: galleryUrl("cat-3/3.1.png"), type: "image" }],
  },
  {
    id: "cat-4",
    titleKey: "galleryCat4",
    cover: galleryUrl("cat-4/6.2.png"),
    media: [{ src: galleryUrl("cat-4/6.2.png"), type: "image" }],
  },
];
