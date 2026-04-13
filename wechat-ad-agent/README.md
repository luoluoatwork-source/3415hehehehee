# WeChat Ad Multi-Agent System — Singapore

AI-powered multi-agent system for Tencent's WeChat Advertising team in Singapore.

## Architecture

```
User Interface (Chat + Dashboard)
        │
   Orchestrator Agent (LangGraph)
        │
   ┌────┼────┬────────┬──────────┬───────────┐
   ▼    ▼    ▼        ▼          ▼           ▼
Insight Strategy Creative Analytics Compliance CI
Agent   Agent    Agent    Agent      Agent    Agent
   │    │        │        │          │        │
   └────┴────────┴────────┴──────────┴────────┘
                     │
              Shared Memory Layer
```

## Quick Start

### Backend
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Edit with your GROQ_API_KEY
uvicorn backend.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

Copy `.env.example` to `.env` and fill in:
- `GROQ_API_KEY` — Get one free at https://console.groq.com

## Tech Stack

- **LLM Provider**: Groq (Llama 3.3 70B via LPU inference)
- **Agent Framework**: LangGraph + LangChain
- **Backend**: FastAPI + WebSocket
- **Frontend**: React + Vite + Tailwind CSS
- **Memory**: Redis (optional, falls back to in-memory)

## Agents

| Agent | Role | Model |
|-------|------|-------|
| Orchestrator | Routes requests, synthesizes results | Llama 3.3 70B |
| Insight | Client analysis, audience profiling | Llama 3.3 70B |
| Strategy | Media planning, budget allocation | Llama 3.3 70B |
| Creative | Ad copy, visual briefs, A/B plans | Llama 3.3 70B |
| Analytics | Performance reports, anomaly detection | Llama 3.3 70B |
| Compliance | Policy checking, regulatory review | Llama 3.1 8B (fast) |
| CI | Competitive intelligence (WeChat vs Meta/TikTok) | Llama 3.3 70B |
