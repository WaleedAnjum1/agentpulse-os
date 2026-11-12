import json
from fastapi import APIRouter, HTTPException, Depends
from sse_starlette.sse import EventSourceResponse
from app.schemas.agent import AgentTaskCreateRequest, AgentTaskResponse
from app.services.orchestrator import orchestrator

router = APIRouter()

@router.post("/run-stream")
async def run_agent_task_stream(request: AgentTaskCreateRequest):
    """
    Spawns an autonomous multi-agent task and streams live thought-traces,
    tool executions, and the final deliverable via Server-Sent Events (SSE).
    """
    async def event_generator():
        async for data in orchestrator.execute_task_stream(request):
            yield {"event": data.get("event", "message"), "data": json.dumps(data)}

    return EventSourceResponse(event_generator())

@router.get("/task/{task_id}", response_model=AgentTaskResponse)
async def get_task_status(task_id: str):
    task = orchestrator.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# In-memory checkpoint store (persists during server session)
_checkpoint_store = {
    "CHK-101": {
        "id": "CHK-101", "agent": "Web Intelligence Agent",
        "title": "Target Domain Web Scraping & Ingestion",
        "description": "Query enterprise databases, Gartner Magic Quadrants, and SEC 10-K disclosures for observability benchmarks.",
        "riskLevel": "low",
        "actionPayload": '{"tools": ["tavily_search", "sec_filings_api"], "query_count": 8}',
        "status": "approved", "timestamp": "2026-11-12T17:30:00Z"
    },
    "CHK-102": {
        "id": "CHK-102", "agent": "Data Synthesis Agent",
        "title": "Commercial Unit Economics & Moat Normalization",
        "description": "Calculate customer LTV vs CAC, multi-tenant token consumption, and compute margin projections.",
        "riskLevel": "medium",
        "actionPayload": '{"action": "normalize_financial_ratios", "discount_rate": 0.08}',
        "status": "pending", "timestamp": "2026-11-12T17:35:00Z"
    },
    "CHK-103": {
        "id": "CHK-103", "agent": "Executive Writer Agent",
        "title": "Deliverable Compilation & Strategic Brief Sign-off",
        "description": "Package synthesis into verified C-level Markdown deliverable with source grounding and audit confidence score.",
        "riskLevel": "high",
        "actionPayload": '{"export_format": "executive_markdown", "conf_threshold": 0.95}',
        "status": "pending", "timestamp": "2026-11-12T17:40:00Z"
    }
}


@router.get("/status")
async def get_system_status():
    return {
        "active_agents": 4,
        "total_tokens_used": 9430,
        "missions_run": 7,
        "avg_confidence": 98.4,
        "swarm_health": "100%",
        "agent_nodes": [
            "Chief Planning Agent",
            "Web Intelligence Agent",
            "Data Synthesis & Fact-Check Agent",
            "Executive Writer Agent"
        ],
        "llm_provider": "Claude 3.5 / GPT-4o",
        "uptime_hours": 24
    }


@router.get("/checkpoints")
async def get_checkpoints():
    return list(_checkpoint_store.values())


@router.post("/checkpoints/{checkpoint_id}/approve")
async def approve_checkpoint(checkpoint_id: str):
    if checkpoint_id not in _checkpoint_store:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    _checkpoint_store[checkpoint_id]["status"] = "approved"
    return {"id": checkpoint_id, "status": "approved"}


@router.post("/checkpoints/{checkpoint_id}/reject")
async def reject_checkpoint(checkpoint_id: str):
    if checkpoint_id not in _checkpoint_store:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    _checkpoint_store[checkpoint_id]["status"] = "rejected"
    return {"id": checkpoint_id, "status": "rejected"}


@router.get("/tool-registry")
async def get_tool_registry():
    return [
        {"id": "tavily_search", "name": "Tavily Web Search", "description": "AI-powered web search with structured results", "category": "search", "status": "active", "calls_today": 42, "avg_latency_ms": 320},
        {"id": "duckduckgo_search", "name": "DuckDuckGo Search", "description": "Privacy-focused web search fallback", "category": "search", "status": "active", "calls_today": 18, "avg_latency_ms": 410},
        {"id": "firecrawl_scraper", "name": "Firecrawl Deep Scraper", "description": "Deep subpage crawling and content extraction", "category": "scrape", "status": "standby", "calls_today": 7, "avg_latency_ms": 890},
        {"id": "sec_edgar_api", "name": "SEC EDGAR Database API", "description": "Financial filings, 10-K and 8-K public disclosures", "category": "data", "status": "active", "calls_today": 12, "avg_latency_ms": 540},
        {"id": "g2_sentiment", "name": "G2 / Reddit Sentiment Extractor", "description": "Customer review sentiment analysis from G2, Reddit", "category": "sentiment", "status": "standby", "calls_today": 3, "avg_latency_ms": 760}
    ]


@router.get("/missions")
async def get_missions():
    return [
        {"id": "msn-001", "name": "Q3 Global Enterprise AI Adoption & TAM Sizing", "objective_type": "Market Sizing", "status": "running", "progress": 68, "duration": "4m 12s", "agents": ["PL", "RS", "DA", "FC"], "created_at": "2026-11-12T16:00:00Z"},
        {"id": "msn-002", "name": "Direct Competitor Intelligence: AlphaCorp vs BetaAI", "objective_type": "Competitor Analysis", "status": "awaiting_approval", "progress": 45, "duration": "8m 40s", "agents": ["PL", "RS", "DA", "RW", "FC"], "created_at": "2026-11-12T15:30:00Z"},
        {"id": "msn-003", "name": "Enterprise B2B Lead Enrichment & Contact Verification", "objective_type": "Lead Gen", "status": "completed", "progress": 100, "duration": "5m 19s", "agents": ["RS", "DA", "FC"], "created_at": "2026-11-12T14:00:00Z"},
        {"id": "msn-004", "name": "Healthcare Compliance RFP Automated First-Pass Response", "objective_type": "RFP Draft", "status": "completed", "progress": 100, "duration": "12m 04s", "agents": ["PL", "RS", "DA", "RW", "FC"], "created_at": "2026-11-12T12:00:00Z"}
    ]


@router.get("/throughput")
async def get_throughput():
    return {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "values": [8, 14, 19, 24, 16],
        "total_week": 81,
        "avg_per_day": 16.2
    }


@router.get("/templates")
async def get_templates():
    return [
        {"id": "tpl-001", "name": "Competitor Deep Dive", "steps": 5, "est_minutes": 6, "description": "Scrapes pricing matrix, feature changes, and G2 peer reviews into an executive comparison memo."},
        {"id": "tpl-002", "name": "Market Sizing & TAM Modeler", "steps": 6, "est_minutes": 8, "description": "Extracts public 10-Ks, parses analyst forecasts, and compiles a bottom-up TAM model."},
        {"id": "tpl-003", "name": "Lead Qualification & ICP Scoring", "steps": 4, "est_minutes": 4, "description": "Enriches target corporate domain lists with headcount, tech stack, and intent signals."},
        {"id": "tpl-004", "name": "RFP Technical Matrix Draft", "steps": 7, "est_minutes": 11, "description": "Parses enterprise RFP requirements PDF, runs compliance mapping, and drafts proposal matrix."}
    ]

