import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

function FAQItem({ question, answer, delay }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div className="overflow-hidden rounded-xl border border-[#e3d6ca] bg-white/80 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[#4f3640] sm:px-6 sm:py-5 sm:text-base"
        >
          <span>{question}</span>
          <span
            className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5b9ad] text-sm text-[#a07063] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="px-5 pb-5 text-sm leading-relaxed text-[#5f4a41] sm:px-6 sm:text-base">
            {answer}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FAQ({ t }) {
  const faqs = [
    { q: t.faqQuestion1, a: t.faqAnswer1 },
    { q: t.faqQuestion2, a: t.faqAnswer2 },
    { q: t.faqQuestion3, a: t.faqAnswer3 },
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#f5ede5] to-[#fcf8f3] py-12 sm:min-h-[calc(100svh-4rem)] sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <h2 className="font-['Great_Vibes',cursive] text-4xl text-[#4f3640] sm:text-5xl">
            {t.faqTitle}
          </h2>
        </ScrollReveal>

        <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              delay={0.1 * (i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
