"use client";
import { useState } from "react";
import { Button, Stepper } from "@mantine/core";
import {
  IconUser, IconUsers, IconCar, IconPaw, IconPiano, IconArrowsShuffle, IconPlayerPlay,
  IconArrowLeft, IconArrowRight, IconCpu,
} from "@tabler/icons-react";
import type { Config, GridKey, Mode } from "@/lib/game";
import type { ThemeKey } from "@/lib/themes";

type Opt<T> = { value: T; label: string; hint?: string; icon: React.ReactNode };

function Options<T extends string | number>({ options, value, onChange, cols = 2 }: { options: Opt<T>[]; value: T; onChange: (v: T) => void; cols?: number }) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button key={String(o.value)} type="button" onClick={() => onChange(o.value)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-4 text-center transition-all cursor-pointer ${on ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.35)]" : "border-white/10 bg-slate-900/60 text-slate-400 hover:border-violet-400/60"}`}>
            {o.icon}
            <span className="font-semibold">{o.label}</span>
            {o.hint && <span className="text-xs text-slate-500">{o.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function Setup({ onStart }: { onStart: (c: Config) => void }) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Mode>(1);
  const [theme, setTheme] = useState<ThemeKey>("transport");
  const [size, setSize] = useState<GridKey>("4x3");

  const sizes: { value: GridKey; label: string; hint: string; icon: React.ReactNode }[] = [
    { value: "4x3", label: "4 x 3", hint: "12 cartas", icon: <IconCpu size={26} /> },
    { value: "4x4", label: "4 x 4", hint: "16 cartas", icon: <IconCpu size={26} /> },
    { value: "5x4", label: "5 x 4", hint: "20 cartas", icon: <IconCpu size={26} /> },
    { value: "6x5", label: "6 x 5", hint: "30 cartas", icon: <IconCpu size={26} /> },
  ];
  const randomSizes: typeof sizes = [
    ...sizes,
    { value: "6x6", label: "6 x 6", hint: "36 cartas", icon: <IconCpu size={26} /> },
    { value: "8x8", label: "8 x 8", hint: "64 cartas", icon: <IconCpu size={26} /> },
  ];
  const availableSizes = theme === "mixed" ? randomSizes : sizes;
  const handleThemeChange = (nextTheme: ThemeKey) => {
    setTheme(nextTheme);
    if (nextTheme !== "mixed" && (size === "6x6" || size === "8x8")) setSize("4x3");
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl p-px bg-gradient-to-br from-cyan-500/60 via-slate-800 to-violet-500/60">
      <div className="rounded-[15px] bg-slate-950/85 p-5 backdrop-blur-xl sm:p-8">
        <h1 className="mb-1 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">Memória Neon</h1>
        <p className="mb-6 text-sm text-slate-400">Configure a partida e encontre todos os pares.</p>

        <Stepper active={step} onStepClick={setStep} size="sm" allowNextStepsSelect={false} mb="lg">
          <Stepper.Step label="Modo" />
          <Stepper.Step label="Tema" />
          <Stepper.Step label="Grade" />
        </Stepper>

        {step === 0 && (
          <Options<Mode> value={mode} onChange={setMode} options={[
            { value: 1, label: "1 Jogador", hint: "Tentativas e cronômetro", icon: <IconUser size={28} /> },
            { value: 2, label: "2 Jogadores", hint: "Acertou? Joga de novo", icon: <IconUsers size={28} /> },
          ]} />
        )}
        {step === 1 && (
          <Options<ThemeKey> value={theme} onChange={handleThemeChange} options={[
            { value: "transport", label: "Transportes", icon: <IconCar size={28} /> },
            { value: "animals", label: "Animais", icon: <IconPaw size={28} /> },
            { value: "instruments", label: "Instrumentos", icon: <IconPiano size={28} /> },
            { value: "mixed", label: "Aleatório", hint: "Mistura dos três", icon: <IconArrowsShuffle size={28} /> },
          ]} />
        )}
        {step === 2 && <Options<GridKey> value={size} onChange={setSize} options={availableSizes} cols={3} />}

        <div className="mt-6 flex justify-between">
          <Button variant="default" disabled={step === 0} leftSection={<IconArrowLeft size={16} />} onClick={() => setStep((s) => s - 1)}>Voltar</Button>
          {step < 2 ? (
            <Button rightSection={<IconArrowRight size={16} />} onClick={() => setStep((s) => s + 1)}>Avançar</Button>
          ) : (
            <Button color="teal" leftSection={<IconPlayerPlay size={16} />} onClick={() => onStart({ mode, theme, size })}>Iniciar jogo</Button>
          )}
        </div>
      </div>
    </div>
  );
}
