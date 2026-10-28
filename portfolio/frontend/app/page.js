import ApiStatus from "./ApiStatus";
import ContactForm from "./ContactForm";

const NAME = "Narjess Dabbech";

const pipeline = [
  { tool: "Gitleaks", what: "Aucun secret dans le dépôt" },
  { tool: "Semgrep", what: "Analyse statique du code" },
  { tool: "npm audit", what: "Dépendances Node.js" },
  { tool: "Dependency-Check", what: "Bases CVE et NVD" },
  { tool: "Trivy", what: "Images Docker" },
  { tool: "Déploiement", what: "Vagrant, Ansible, Compose" },
];

const stack = [
  ["Frontend", "Next.js"],
  ["API", "Express, Zod, Helmet, rate limiting"],
  ["Données", "PostgreSQL, migrations Prisma"],
  ["Infrastructure", "Vagrant, Ansible, Docker Compose"],
  ["CI/CD", "Jenkins, images taguées par Git SHA"],
];

export default function Home() {
  return (
    <>
      <header className="bar">
        <div className="wrap bar-in">
          <strong>{NAME}</strong>
          <nav aria-label="Navigation principale">
            <a href="#pipeline">Pipeline</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="wrap hero">
          <ApiStatus />
          <h1>Du premier commit au déploiement, chaque étape est contrôlée.</h1>
          <p className="lead">
            Portfolio d'un projet DevSecOps : une VM créée par Vagrant, configurée par Ansible, une API
            Express validée et protégée, et un pipeline Jenkins qui bloque toute faille critique.
          </p>
          <div className="actions">
            <a className="btn" href="#contact">Me contacter</a>
            <a className="btn btn-ghost" href="#pipeline">Voir le pipeline</a>
          </div>
        </section>

        <section id="pipeline" className="wrap section">
          <h2>Le pipeline qui protège chaque version</h2>
          <p className="muted">Une version n'est déployée que si toutes les étapes passent.</p>
          <ol className="pipe">
            {pipeline.map((s, i) => (
              <li key={s.tool}>
                <span className="dot" aria-hidden="true">{i + 1}</span>
                <strong>{s.tool}</strong>
                <span>{s.what}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="stack" className="wrap section">
          <h2>Stack technique</h2>
          <dl className="stack">
            {stack.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="wrap section contact">
          <div>
            <h2>Contact</h2>
            <p className="muted">
              Une question sur le projet ou une proposition ? Écrivez-moi, le message est enregistré
              dans PostgreSQL via l'API.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="wrap foot">© {new Date().getFullYear()} {NAME}</footer>
    </>
  );
}
