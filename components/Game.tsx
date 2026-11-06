"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { buildDeck, preload, type Card, type Config } from "@/lib/game";
import Setup from "./Setup";
import Hud from "./Hud";
import MemoryCard from "./MemoryCard";
import WinModal from "./WinModal";

const MISMATCH_DELAY = 800;

export default function Game() {
  const [config, setConfig] = useState<Config | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [totalPairs, setTotalPairs] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);
  const token = useRef(0);

  const start = useCallback((c: Config) => {
    if (timer.current) clearTimeout(timer.current);
    const { cards, pairs } = buildDeck(c);
    setConfig(c); setCards(cards); setTotalPairs(pairs);
    setFlipped([]); setMatched(new Set()); setLocked(false);
    setMoves(0); setTime(0); setRunning(false); setScores([0, 0]); setTurn(0); setFinished(false);
    const t = ++token.current;
    setReady(false);
    preload(cards.map((c) => c.src)).then(() => { if (t === token.current) setReady(true); });
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [running]);

  const onFlip = (id: number) => {
    if (!ready || locked || flipped.includes(id) || !config) return;
    if (!running) setRunning(true);
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length < 2) return;

    setLocked(true);
    setMoves((m) => m + 1);
    const [a, b] = next.map((i) => cards[i]);

    if (a.pair === b.pair) {
      timer.current = setTimeout(() => {
        const m = new Set(matched); m.add(a.id); m.add(b.id);
        setMatched(m); setFlipped([]); setLocked(false);
        setScores((s) => (turn === 0 ? [s[0] + 1, s[1]] : [s[0], s[1] + 1]));
        if (config.mode === 2) notifications.show({ message: `Jogador ${turn + 1} acertou e joga novamente!`, color: "teal", icon: <IconCheck size={16} />, autoClose: 1200 });
        if (m.size >= totalPairs * 2) { setRunning(false); setFinished(true); }
      }, 500);
    } else {
      timer.current = setTimeout(() => {
        setFlipped([]); setLocked(false);
        if (config.mode === 2) {
          const nt = turn === 0 ? 1 : 0;
          setTurn(nt);
          notifications.show({ message: `Vez do Jogador ${nt + 1}`, color: "violet", icon: <IconX size={16} />, autoClose: 1000 });
        }
      }, MISMATCH_DELAY);
    }
  };

  if (!config) {
    return (
      <main className="relative flex min-h-dvh items-center justify-center p-4">
        <Backdrop />
        <Setup onStart={start} />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh p-3 sm:p-6">
      <Backdrop />
      <Hud mode={config.mode} moves={moves} time={time} scores={scores} turn={turn}
        onRestart={() => start(config)} onReconfigure={() => { setConfig(null); }} />
      <div className="mx-auto rounded-2xl p-px bg-gradient-to-br from-cyan-500/40 via-slate-800 to-violet-500/40"
        style={{ width: "min(100%, calc(100dvh - 150px))", maxWidth: 760 }}>
        <div className="relative grid gap-1.5 rounded-[15px] bg-slate-950/70 p-2 backdrop-blur-md sm:gap-2 sm:p-3"
          style={{ gridTemplateColumns: `repeat(${Number(config.size.split("x")[0])}, minmax(0, 1fr))` }}>
          {!ready && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[15px] bg-slate-950/90 text-cyan-300 backdrop-blur">
              <Loader color="cyan" />
              <span className="text-sm">Carregando imagens…</span>
            </div>
          )}
          {cards.map((c) => (
            <MemoryCard key={c.id} card={c} flipped={flipped.includes(c.id)} matched={matched.has(c.id)} disabled={locked || !ready} onFlip={onFlip} />
          ))}
        </div>
      </div>
      <WinModal opened={finished} mode={config.mode} moves={moves} time={time} scores={scores}
        onRestart={() => start(config)} onReconfigure={() => setConfig(null)} />
    </main>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-slate-950">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
    </div>
  );
}
