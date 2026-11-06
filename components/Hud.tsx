"use client";
import { Button } from "@mantine/core";
import { IconClock, IconHandClick, IconRefresh, IconSettings, IconUser } from "@tabler/icons-react";
import { fmtTime, type Mode } from "@/lib/game";

type Props = {
  mode: Mode; moves: number; time: number; scores: [number, number]; turn: 0 | 1;
  onRestart: () => void; onReconfigure: () => void;
};

const panel = "rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-2";

export default function Hud({ mode, moves, time, scores, turn, onRestart, onReconfigure }: Props) {
  return (
    <div className="mx-auto mb-4 flex w-full max-w-3xl flex-wrap items-center justify-between gap-3">
      {mode === 1 ? (
        <div className="flex gap-3">
          <div className={`${panel} flex items-center gap-2 text-cyan-300`}><IconHandClick size={18} /> <span className="tabular-nums">{moves} tentativas</span></div>
          <div className={`${panel} flex items-center gap-2 text-violet-300`}><IconClock size={18} /> <span className="tabular-nums">{fmtTime(time)}</span></div>
        </div>
      ) : (
        <div className="flex gap-3">
          {[0, 1].map((p) => {
            const active = turn === p;
            return (
              <div key={p} className={`${panel} flex items-center gap-2 transition-all ${active ? (p === 0 ? "border-cyan-400/80 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.45)]" : "border-violet-400/80 text-violet-300 shadow-[0_0_22px_rgba(139,92,246,0.5)]") : "text-slate-500"}`}>
                <IconUser size={18} />
                <span>Jogador {p + 1}</span>
                <span className="text-lg font-bold tabular-nums">{scores[p]}</span>
                {active && <span className="text-xs">sua vez</span>}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="default" size="xs" leftSection={<IconRefresh size={16} />} onClick={onRestart}>Reiniciar</Button>
        <Button variant="default" size="xs" leftSection={<IconSettings size={16} />} onClick={onReconfigure}>Configurar</Button>
      </div>
    </div>
  );
}
