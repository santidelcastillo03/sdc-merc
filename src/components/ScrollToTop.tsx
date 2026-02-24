"use client";

import { useEffect } from "react";

// Fuerza scroll al tope en cada carga y deshabilita la restauración automática del navegador
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);

  return null;
}
