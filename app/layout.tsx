import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Memória Neon — Jogo da Memória",
    template: "%s | Memória Neon",
  },
  description: "Jogo da memória offline com imagens reais de animais, transportes e instrumentos.",
  keywords: ["jogo da memória", "jogo offline", "animais", "transportes", "instrumentos"],
  applicationName: "Memória Neon",
  authors: [{ name: "Memória Neon" }],
  creator: "Memória Neon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Memória Neon",
    title: "Memória Neon — Jogo da Memória",
    description: "Encontre os pares com imagens reais, online ou offline.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Memória Neon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memória Neon — Jogo da Memória",
    description: "Jogo da memória offline com imagens reais.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};
export const viewport: Viewport = { themeColor: "#020617" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark" theme={{ primaryColor: "cyan" }}>
          <PwaRegister />
          <Notifications position="top-center" limit={3} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
