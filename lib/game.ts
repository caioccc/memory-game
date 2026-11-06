import { SUBJECTS, type ThemeKey, type Subject } from "./themes";

export type Mode = 1 | 2;
export type GridKey = "4x3" | "4x4" | "5x4" | "6x5" | "6x6" | "8x8";
export type Config = { mode: Mode; theme: ThemeKey; size: GridKey };
export type Card = { id: number; pair: number; src: string; fallbackSrc: string; label: string; emoji: string; joker?: boolean };

/** Imagem empacotada no build para funcionar sem internet. */
export const imageUrl = (s: Subject, variant: number) =>
  `/assets/${s.category}/${s.q}.jpg`;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sourceSubjects(theme: ThemeKey): Subject[] {
  if (theme !== "mixed") return shuffle(SUBJECTS[theme]);
  const lists = (["transport", "animals", "instruments"] as const).map((k) => shuffle(SUBJECTS[k]));
  const out: Subject[] = [];
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) lists.forEach((l) => l[i] && out.push(l[i])); // intercalado = mistura equilibrada
  return out;
}

/** Em grades ímpares: floor(total/2) pares + 1 coringa central. */
export function buildDeck({ theme, size }: Config): { cards: Card[]; pairs: number } {
  const [columns, rows] = size.split("x").map(Number);
  const total = columns * rows;
  const pairs = Math.floor(total / 2);
  const src = sourceSubjects(theme);
  const base: Omit<Card, "id">[] = [];
  for (let k = 0; k < pairs; k++) {
    const s = src[k % src.length];
    const variant = Math.floor(k / src.length); // mesmo assunto, foto diferente
    const url = imageUrl(s, variant);
    const fallbackSrc = url;
    base.push({ pair: k, src: url, fallbackSrc, label: s.name, emoji: s.emoji }, { pair: k, src: url, fallbackSrc, label: s.name, emoji: s.emoji });
  }
  const list = shuffle(base);
  return { cards: list.map((c, id) => ({ ...c, id })), pairs };
}

/** Pré-carrega as imagens (com timeout) para que as cartas virem já com a foto pronta. */
export function preload(urls: string[], timeout = 10000): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];
  const all = Promise.all(
    unique.map((u) => new Promise<void>((res) => { const i = new Image(); i.onload = () => res(); i.onerror = () => res(); i.src = u; }))
  ).then(() => undefined);
  return Promise.race([all, new Promise<void>((r) => setTimeout(r, timeout))]);
}

export const fmtTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
