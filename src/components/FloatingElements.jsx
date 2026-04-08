const butterflies = [
  { left: "8%", top: "18%", delay: 0, duration: 15 },
  { left: "82%", top: "42%", delay: 4, duration: 19 },
];

const petals = [
  { left: "12%", delay: 0, duration: 13 },
  { left: "38%", delay: 5, duration: 11 },
  { left: "62%", delay: 2, duration: 15 },
  { left: "88%", delay: 7, duration: 12 },
];

const balloons = [
  { left: "6%", delay: 2, duration: 20 },
  { left: "78%", delay: 8, duration: 24 },
];

const flowers = [
  { left: "3%", bottom: "8%", delay: 0 },
  { right: "5%", bottom: "12%", delay: 2 },
];

export default function FloatingElements() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden overflow-hidden sm:block"
      aria-hidden="true"
    >
      {butterflies.map((b, i) => (
        <span
          key={`bt-${i}`}
          className="absolute text-xl opacity-20"
          style={{
            left: b.left,
            top: b.top,
            animation: `butterfly-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          🦋
        </span>
      ))}

      {petals.map((p, i) => (
        <span
          key={`pt-${i}`}
          className="absolute text-base opacity-25"
          style={{
            left: p.left,
            top: "-5%",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          🌸
        </span>
      ))}

      {balloons.map((b, i) => (
        <span
          key={`bl-${i}`}
          className="absolute text-xl opacity-20"
          style={{
            left: b.left,
            bottom: "-10%",
            animation: `balloon-rise ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          🎈
        </span>
      ))}

      {flowers.map((f, i) => (
        <span
          key={`fl-${i}`}
          className="absolute text-2xl opacity-20"
          style={{
            left: f.left,
            right: f.right,
            bottom: f.bottom,
            animation: `flower-sway 3s ease-in-out ${f.delay}s infinite`,
          }}
        >
          🌷
        </span>
      ))}
    </div>
  );
}
