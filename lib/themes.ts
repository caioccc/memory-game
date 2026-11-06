export type ThemeKey = "transport" | "animals" | "instruments" | "mixed";

export type Subject = {
  q: string;
  name: string;
  emoji: string;
  category: "transport" | "animals" | "instruments";
};

export const SUBJECTS: Record<Exclude<ThemeKey, "mixed">, Subject[]> = {
  transport: [
    { q: "car", name: "Carro", emoji: "🚗", category: "transport" },
    { q: "train", name: "Trem", emoji: "🚆", category: "transport" },
    { q: "rocket", name: "Foguete", emoji: "🚀", category: "transport" },
    { q: "airplane", name: "Avião", emoji: "✈️", category: "transport" },
    { q: "sailboat", name: "Barco", emoji: "⛵", category: "transport" },
    { q: "bicycle", name: "Bicicleta", emoji: "🚲", category: "transport" },
    { q: "bus", name: "Ônibus", emoji: "🚌", category: "transport" },
    { q: "truck", name: "Caminhão", emoji: "🚚", category: "transport" },
    { q: "helicopter", name: "Helicóptero", emoji: "🚁", category: "transport" },
    { q: "motorcycle", name: "Moto", emoji: "🏍️", category: "transport" },
    { q: "tractor", name: "Trator", emoji: "🚜", category: "transport" },
    { q: "ship", name: "Navio", emoji: "🚢", category: "transport" },
    { q: "subway", name: "Metrô", emoji: "🚇", category: "transport" },
    { q: "tram", name: "Bonde", emoji: "🚋", category: "transport" },
    { q: "ambulance", name: "Ambulância", emoji: "🚑", category: "transport" },
    { q: "firetruck", name: "Caminhão de bombeiros", emoji: "🚒", category: "transport" },
  ],
  animals: [
    { q: "lion", name: "Leão", emoji: "🦁", category: "animals" },
    { q: "tiger", name: "Tigre", emoji: "🐯", category: "animals" },
    { q: "eagle", name: "Águia", emoji: "🦅", category: "animals" },
    { q: "dolphin", name: "Golfinho", emoji: "🐬", category: "animals" },
    { q: "wolf", name: "Lobo", emoji: "🐺", category: "animals" },
    { q: "elephant", name: "Elefante", emoji: "🐘", category: "animals" },
    { q: "giraffe", name: "Girafa", emoji: "🦒", category: "animals" },
    { q: "zebra", name: "Zebra", emoji: "🦓", category: "animals" },
    { q: "bear", name: "Urso", emoji: "🐻", category: "animals" },
    { q: "fox", name: "Raposa", emoji: "🦊", category: "animals" },
    { q: "owl", name: "Coruja", emoji: "🦉", category: "animals" },
    { q: "penguin", name: "Pinguim", emoji: "🐧", category: "animals" },
    { q: "horse", name: "Cavalo", emoji: "🐴", category: "animals" },
    { q: "rabbit", name: "Coelho", emoji: "🐰", category: "animals" },
    { q: "monkey", name: "Macaco", emoji: "🐒", category: "animals" },
    { q: "kangaroo", name: "Canguru", emoji: "🦘", category: "animals" },
  ],
  instruments: [
    { q: "guitar", name: "Violão", emoji: "🎸", category: "instruments" },
    { q: "piano", name: "Piano", emoji: "🎹", category: "instruments" },
    { q: "drums", name: "Bateria", emoji: "🥁", category: "instruments" },
    { q: "saxophone", name: "Saxofone", emoji: "🎷", category: "instruments" },
    { q: "violin", name: "Violino", emoji: "🎻", category: "instruments" },
    { q: "trumpet", name: "Trompete", emoji: "🎺", category: "instruments" },
    { q: "flute", name: "Flauta", emoji: "🪈", category: "instruments" },
    { q: "accordion", name: "Acordeão", emoji: "🪗", category: "instruments" },
    { q: "cello", name: "Violoncelo", emoji: "🎻", category: "instruments" },
    { q: "harp", name: "Harpa", emoji: "🎼", category: "instruments" },
    { q: "banjo", name: "Banjo", emoji: "🪕", category: "instruments" },
    { q: "microphone", name: "Microfone", emoji: "🎤", category: "instruments" },
    { q: "oboe", name: "Oboé", emoji: "🎶", category: "instruments" },
    { q: "tuba", name: "Tuba", emoji: "🎺", category: "instruments" },
    { q: "maracas", name: "Maracas", emoji: "🎶", category: "instruments" },
    { q: "xylophone", name: "Xilofone", emoji: "🎶", category: "instruments" },
  ],
};

export const THEME_LABELS: Record<ThemeKey, string> = {
  transport: "Transportes",
  animals: "Animais",
  instruments: "Instrumentos",
  mixed: "Aleatório",
};
