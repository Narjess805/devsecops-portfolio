import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('envoi...');
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message envoyé !');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Erreur : ' + (data.message || 'réponse invalide'));
      }
    } catch (err) {
      setStatus('Erreur réseau : ' + err.message);
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600 }}>
      <h1>DevSecOps Portfolio</h1>
      <p>Frontend Next.js déployé via Ansible + Docker Compose.</p>
      <p>API : <a href="http://localhost:3001/api/health">/api/health</a></p>

      <h2>Contact</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
        <input
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
      {status && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>}
    </main>
  );
}
