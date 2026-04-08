import { useEffect } from "react";
import { useLanguage } from "./hooks/useLanguage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import WeddingInfo from "./components/WeddingInfo";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";

const BLOCKED_KEYS = new Set(["s", "u", "p"]);

function blockShortcuts(e) {
  if (
    (e.ctrlKey && BLOCKED_KEYS.has(e.key.toLowerCase())) ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    e.key === "F12"
  ) {
    e.preventDefault();
  }
}

export default function App() {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    document.addEventListener("keydown", blockShortcuts);
    return () => document.removeEventListener("keydown", blockShortcuts);
  }, []);

  return (
    <main
      className="min-h-svh bg-[#fcf8f3] pt-16 font-['Montserrat',sans-serif] text-[#4f3640]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Navbar language={language} onLanguageChange={setLanguage} t={t} />
      <FloatingElements />
      <Hero t={t} />
      <Story t={t} />
      <WeddingInfo t={t} />
      <Gallery language={language} t={t} />
      <FAQ t={t} />
      <Footer t={t} />
    </main>
  );
}
