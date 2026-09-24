# Aashritha N — Engineering Portfolio

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-View_site-ff8a78?style=for-the-badge)](https://codebyaash.github.io/portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/aashritha-nagesh-333748250)

Recruiter-focused engineering portfolio for a Senior Software Engineer specializing in backend and integration engineering with C#, .NET, Microsoft Azure, REST APIs, event-driven systems, and cloud automation.

![Aashritha N engineering portfolio](assets/social/aashritha-portfolio-og.jpg)

## What this portfolio demonstrates

- Five years of backend, cloud, DevOps, and enterprise delivery experience
- Work history across Innominds and Accenture
- Detailed project case studies with architecture diagrams and engineering decisions
- Seven professional certificates with verifiable credential links
- Responsive, accessible, progressively enhanced static frontend engineering
- Consent-gated Google Analytics 4 event measurement
- Search metadata, sitemap, social previews, and structured data

## Featured case studies

| Project | Engineering focus | Evidence |
| --- | --- | --- |
| [AI CloudOps Assistant](https://codebyaash.github.io/portfolio/cloudops.html) | Cloud operations, incident context, applied AI, FastAPI, Azure | Architecture and operational workflow |
| [TopologyX](https://codebyaash.github.io/portfolio/topologyx.html) | Azure architecture generation, diagrams, Well-Architected review, cost, security and IaC | [Source](https://github.com/codebyaash/TopologyX) |
| [DeployForge](https://codebyaash.github.io/portfolio/deployforge.html) | Platform engineering, IaC planning, policy checks, drift and rollback | [Live demo](https://deployforge-eight.vercel.app) · [Source](https://github.com/codebyaash/IDP) |
| [WealthCompass](https://codebyaash.github.io/portfolio/wealthcompass.html) | Full-stack fintech, local-first data, portfolio rules and AI guidance | [Source](https://github.com/codebyaash/WealthCompass) |

## Technical implementation

The site is intentionally dependency-free and requires no build pipeline. It uses semantic HTML, modular CSS, and vanilla JavaScript, with GitHub Actions handling deployment to GitHub Pages.

```text
portfolio/
├── index.html                 # Main recruiter-facing portfolio
├── cloudops.html              # AI CloudOps case study
├── topologyx.html             # TopologyX architecture copilot case study
├── deployforge.html           # DeployForge case study
├── wealthcompass.html         # WealthCompass case study
├── assets/                    # Architecture, screenshots and social imagery
├── script.js                  # Navigation, filtering and UI interactions
├── analytics.js              # Consent-gated GA4 integration
├── sitemap.xml                # Search discovery
└── .github/workflows/         # GitHub Pages deployment
```

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Analytics is intentionally disabled on local hosts.

## Deployment

Pushes to `main` automatically deploy through the GitHub Pages workflow:

```bash
git push origin main
```

Production: <https://codebyaash.github.io/portfolio/>

## Analytics and privacy

Google Analytics does not load until a visitor explicitly allows analytics. Advertising storage, personalization, and Google Signals remain disabled. See [ANALYTICS.md](ANALYTICS.md) for the event definitions and privacy constraints.
