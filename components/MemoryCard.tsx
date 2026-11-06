"use client";
import { useState } from "react";
import type { Card } from "@/lib/game";

type Props = { card: Card; flipped: boolean; matched: boolean; disabled: boolean; onFlip: (id: number) => void };

export default function MemoryCard({ card, flipped, matched, disabled, onFlip }: Props) {
  const [broken, setBroken] = useState(false);

  if (card.joker) {
    return (
      <div title="Coringa" className="aspect-square flex items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-[clamp(1rem,4vw,2.25rem)] leading-none text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.25)]">
        ★
      </div>
    );
  }
  const show = flipped || matched;
  return (
    <button
      type="button"
      aria-label={show ? card.label : "Carta virada para baixo"}
      disabled={disabled || show}
      onClick={() => onFlip(card.id)}
      className="aspect-square [perspective:800px] cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-lg"
    >
      <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${show ? "[transform:rotateY(180deg)]" : "hover:-translate-y-0.5"}`}>
        {/* verso: padrão em CSS, sem ícone */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg p-px bg-gradient-to-br from-cyan-500/70 via-slate-700 to-violet-500/70">
          <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_70%)] bg-slate-900/90 backdrop-blur">
            <div className="h-1/3 w-1/3 rotate-45 rounded-[3px] border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
          </div>
        </div>
        {/* frente: imagem */}
        <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden rounded-lg border-2 bg-slate-800 ${matched ? "matched-glow border-emerald-400/80" : "border-violet-400/70 shadow-[0_0_20px_rgba(139,92,246,0.4)]"}`}>
          {/* A foto remota tem uma ilustração SVG local como fallback, nunca um emoji. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={broken ? card.fallbackSrc : card.src}
            alt={card.label}
            draggable={false}
            onError={() => setBroken(true)}
            className="h-full w-full object-cover"
          />
          {matched && <div className="pointer-events-none absolute inset-0 bg-emerald-400/10" />}
        </div>
      </div>
    </button>
  );
}
