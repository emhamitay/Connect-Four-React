import { useEffect, useRef } from "react";

// Confetti particles config
const CONFETTI = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 4.2) % 91}%`,
  color: i % 5 === 0 ? "#2f76ff" : i % 5 === 1 ? "#ef4e4a" : i % 5 === 2 ? "#fbbf24" : i % 5 === 3 ? "#34d399" : "#a78bfa",
  size: 7 + (i % 5),
  duration: `${1.6 + (i % 7) * 0.22}s`,
  delay: `${(i % 9) * 0.11}s`,
}));

export default function WinModal({ winner, onRestart, onBackToMenu }) {
  const dialogRef = useRef(null);

  // Trap focus inside the modal
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const isBlue = winner === "blue";
  const chipColor = isBlue
    ? "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300"
    : "bg-gradient-to-br from-red-400 to-red-600 border-red-300";
  const accentText = isBlue ? "text-blue-600" : "text-red-500";
  const accentBorder = isBlue ? "border-blue-200" : "border-red-200";
  const accentBg = isBlue ? "from-blue-50" : "from-red-50";
  const winnerLabel = isBlue ? "Blue" : "Red";
  const emoji = isBlue ? "🔵" : "🔴";

  return (
    /* Backdrop */
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${winnerLabel} wins`}
    >
      {/* Confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI.map((p) => (
          <div
            key={p.id}
            className="confetti-piece absolute rounded-sm"
            style={{
              left: p.left,
              top: "-12px",
              width: p.size,
              height: p.size,
              background: p.color,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`modal-card relative flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl border ${accentBorder} bg-gradient-to-b ${accentBg} to-white p-8 shadow-[0_32px_80px_rgba(0,0,0,0.22)] outline-none`}
      >
        {/* Big bouncing chip */}
        <div className={`chip-bounce h-20 w-20 rounded-full border-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${chipColor}`} />

        {/* Trophy */}
        <div className="text-5xl select-none">🏆</div>

        {/* Winner text */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">We have a winner!</p>
          <h2 className={`mt-1 text-4xl font-bold ${accentText}`}>
            {emoji} {winnerLabel}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isBlue ? "Blue player" : "Red player"} connected four first.
          </p>
        </div>

        {/* Divider */}
        <div className={`w-full h-px bg-gradient-to-r from-transparent via-${isBlue ? "blue" : "red"}-200 to-transparent`} />

        {/* Action buttons */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={onRestart}
            className={`flex-1 rounded-2xl bg-gradient-to-b ${isBlue ? "from-blue-500 to-blue-700" : "from-red-500 to-red-700"} py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0`}
          >
            ▶ Play Again
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md active:translate-y-0"
          >
            ← Menu
          </button>
        </div>
      </div>
    </div>
  );
}
