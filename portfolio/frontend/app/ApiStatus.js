"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

export default function ApiStatus() {
  const [state, setState] = useState("checking");

  useEffect(() => {
    fetch(`${API}/api/health`)
      .then((r) => setState(r.ok ? "up" : "down"))
      .catch(() => setState("down"));
  }, []);

  const label = { checking: "Vérification de l'API", up: "API en ligne", down: "API injoignable" }[state];
  return (
    <span className={`status status-${state}`} role="status">
      <i aria-hidden="true" /> {label}
    </span>
  );
}
