"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

export default function ContactForm() {
  const [state, setState] = useState({ type: "idle", text: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setState({ type: "loading", text: "" });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset();
        setState({ type: "success", text: "Message envoyé. Je vous réponds rapidement." });
      } else if (res.status === 429) {
        setState({ type: "error", text: "Trop de messages envoyés. Réessayez dans quelques minutes." });
      } else {
        setState({ type: "error", text: data.error || "Le message n'a pas pu être envoyé. Vérifiez les champs." });
      }
    } catch {
      setState({ type: "error", text: "Le serveur ne répond pas. Réessayez plus tard." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <label>
        Nom
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" />
      </label>
      <label>
        E-mail
        <input name="email" type="email" required maxLength={150} autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={5} maxLength={2000} rows={5} />
      </label>
      <button type="submit" disabled={state.type === "loading"}>
        {state.type === "loading" ? "Envoi en cours" : "Envoyer le message"}
      </button>
      <p className={`feedback feedback-${state.type}`} role="status" aria-live="polite">
        {state.text}
      </p>
    </form>
  );
}
