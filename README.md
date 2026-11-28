# DevSecOps Portfolio

Projet DevSecOps de bout en bout : infrastructure automatisée, API sécurisée,
pipelines CI/CD, supply chain et Infrastructure as Code.

**Auteure :** Narjess Dabbech

## Les 10 activités

| N° | Thème | Documentation | Code |
|----|-------|---------------|------|
| 1 | Mini CV | [minicv](https://github.com/Narjess805/minicv) | dépôt dédié |
| 2 | DevSecOps avec Next.js | [devsecops-nextjs](https://github.com/Narjess805/devsecops-nextjs) | dépôt dédié |
| 3 | Ansible | [ansible-devsecops](https://github.com/Narjess805/ansible-devsecops) | dépôt dédié |
| 4 | Vagrant, Ansible, API sécurisée, PostgreSQL, Jenkins | [docs/activite-04.md](docs/activite-04.md) | tag `activite-04` |
| 5 | GitHub Actions, Git workflow, Harbor, supply chain | [docs/activite-05.md](docs/activite-05.md) | tag `activite-05` |
| 6 | Floci, Terraform, Terraform + Ansible | à venir | |
| 7 | à définir | à venir | |
| 8 | à définir | à venir | |
| 9 | à définir | à venir | |
| 10 | à définir | à venir | |

## Architecture du dépôt

    .
    ├── README.md        # cette page
    ├── docs/            # documentation par activité
    ├── captures/        # captures d'écran par activité
    ├── portfolio/       # code : frontend Next.js + API Express
    ├── jenkins/         # pipeline Jenkins
    └── .github/         # workflows GitHub Actions

## Démarrage rapide

    git clone https://github.com/Narjess805/devsecops-portfolio.git
    cd devsecops-portfolio
    cp .env.example .env
    vagrant up --provider=docker
