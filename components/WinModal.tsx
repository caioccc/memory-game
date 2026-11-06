"use client";
import { Button, Modal } from "@mantine/core";
import { IconRefresh, IconSettings, IconTrophy } from "@tabler/icons-react";
import { fmtTime, type Mode } from "@/lib/game";

type Props = {
  opened: boolean; mode: Mode; moves: number; time: number; scores: [number, number];
  onRestart: () => void; onReconfigure: () => void;
};

export default function WinModal({ opened, mode, moves, time, scores, onRestart, onReconfigure }: Props) {
  const [a, b] = scores;
  const title = mode === 1 ? "Missão cumprida!" : a === b ? "Empate!" : `Jogador ${a > b ? 1 : 2} venceu!`;
  return (
    <Modal opened={opened} onClose={() => {}} withCloseButton={false} closeOnClickOutside={false} closeOnEscape={false} centered
      overlayProps={{ backgroundOpacity: 0.7, blur: 6 }}
      styles={{ content: { background: "rgba(2,6,23,0.92)", border: "1px solid rgba(52,211,153,0.5)", boxShadow: "0 0 40px rgba(52,211,153,0.3)" } }}>
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <IconTrophy size={56} className="text-emerald-300" />
        <h2 className="text-2xl font-black text-emerald-300">{title}</h2>
        <div className="grid w-full grid-cols-2 gap-3 text-sm">
          <Stat label="Tempo" value={fmtTime(time)} />
          <Stat label="Tentativas" value={String(moves)} />
          {mode === 2 && (<><Stat label="Jogador 1" value={`${a} pares`} /><Stat label="Jogador 2" value={`${b} pares`} /></>)}
        </div>
        <div className="mt-2 flex w-full gap-2">
          <Button fullWidth color="teal" leftSection={<IconRefresh size={16} />} onClick={onRestart}>Jogar novamente</Button>
          <Button fullWidth variant="default" leftSection={<IconSettings size={16} />} onClick={onReconfigure}>Novo jogo</Button>
        </div>
      </div>
    </Modal>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-white/10 bg-slate-900/70 p-3">
    <div className="text-slate-500">{label}</div>
    <div className="text-lg font-bold tabular-nums text-cyan-300">{value}</div>
  </div>
);
