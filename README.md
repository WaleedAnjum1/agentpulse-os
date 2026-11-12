# AgentPulse OS: Enterprise Autonomous Multi-Agent Platform 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Async-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js 16](https://img.shields.io/badge/Frontend-Next.js%2016-black.svg?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg?logo=typescript)](https://www.typescriptlang.org)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-3776AB.svg?logo=python)](https://python.org)

> **AgentPulse** is an industry-standard, client-ready Autonomous Multi-Agent platform engineered to plan, execute, cross-validate, and deliver high-impact market research, competitive analysis, and strategic briefs.

<div align="center">
  <img src="./assets/showcase.gif" alt="AgentPulse OS Autonomous AI Agent Launch Showcase" width="100%" style="border-radius: 12px; border: 1px solid #1e293b; margin: 16px 0;" />
</div>

Built with **FastAPI (Python async backend)** and **Next.js 16 / TypeScript / Tailwind CSS**, it features real-time agent execution streaming via Server-Sent Events (SSE), Human-in-the-Loop approval checkpoints, and verifiable fact-grounding audit reports.

---

## 🌟 Key Architecture & Capabilities

### 1. Autonomous Agent Swarm (Directed Acyclic Graph)
- **Chief Planning Agent**: Deconstructs high-level objectives into targeted research threads, schedules dependencies, and structures the execution DAG.
- **Web Intelligence Agent**: Executes autonomous search and gathers live external data points from industry registries and financial disclosures.
- **Data Synthesis & Fact-Check Agent**: Filters noise, verifies numerical consistency, computes unit economics, and grounds claims to eliminate hallucinations.
- **Executive Writer Agent**: Compiles polished, structured C-level deliverables (Markdown / PDF / Strategic Briefs).

### 2. Enterprise Mission Workstation (Inspired by Stitch Design System)
- **Mission Builder**: Strategic prompt directive input with one-click industry presets (Observability Teardown, B2B Procurement, FinTech Compliance).
- **Live Run / Trace Stepper**: Real-time event streaming over SSE, per-step execution status, latency telemetry, and JSON inspection drawers.
- **Approvals & Governance Inbox**: Human-in-the-Loop checkpoint authorization modals for sensitive external tool queries and financial models.
- **Report & Provenance Canvas**: Verified deliverables with 98.4% fact-confidence scoring, external citation inspection, and markdown/PDF client exports.

### 3. Client & Monetization Ready
- **White-Label Architecture**: Configure branding, model providers, and rate limits via `.env` without modifying core code.
- **Multi-LLM Support**: Dynamic provider fallback (Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o, or local private Ollama nodes).
- **High-Margin Deployment**: Designed for $3,000 – $15,000 client research retainers or $49–$199/month automated competitor intelligence subscriptions.

---

## 🏗️ Architecture Flow

```text
                        +-------------------------------+
                        |   Next.js 16 Executive OS     |
                        |   (Mission Builder / Trace /  |
                        |    Approvals / Audit Canvas)  |
                        +---------------+---------------+
                                        |
                             HTTP POST / SSE Stream
                                        |
                        +---------------v---------------+
                        |     FastAPI Async Engine      |
                        |   (Modular Routers & SSE)     |
                        +---------------+---------------+
                                        |
            +---------------------------+---------------------------+
            |                           |                           |
   +--------v--------+         +--------v--------+         +--------v--------+
   |  Chief Planner  | <=====> |  Web Scraper &  | <=====> |  Fact-Checker   |
   |   Agent Graph   |         | Intelligence    |         | & Synthesis     |
   +-----------------+         +-----------------+         +-----------------+
            |
            +-------------------------> [ Executive Writer Agent ] ===> Verified Deliverable
```

---

## 🚀 Quickstart Guide

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Unix/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Interactive API Documentation will be available at: `http://localhost:8000/docs`

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💼 Commercialization & Client Deployment Models

1. **Strategic AI Automation Agency**: Sell customized intelligence pipelines to private equity, management consultancies, and marketing departments.
2. **Subscription SaaS**: Multi-tenant research portal charging \$49–\$199/month for continuous automated market monitoring.
3. **Private VPC Enterprise Accelerator**: Deploy on air-gapped or corporate infrastructure with zero data leakage using local LLM inference.

---

## 📄 License
MIT License — Free for commercial deployment and portfolio showcase.
