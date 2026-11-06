"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Não foi possível ativar o modo offline.", error);
      });
    }
  }, []);

  return null;
}
