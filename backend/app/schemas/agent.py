from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class AgentTaskCreateRequest(BaseModel):
    objective: str = Field(..., description="High level goal or business question to investigate")
    depth: Literal["quick", "standard", "deep"] = Field("standard", description="Research and analysis depth")
    output_format: Literal["executive_brief", "market_research", "swot_analysis", "action_plan"] = "market_research"
    custom_instructions: Optional[str] = Field(None, description="Client-specific domain constraints or focus areas")

class StepTrace(BaseModel):
    id: str
    agent_name: str
    step_type: Literal["plan", "search", "scrape", "analyze", "reflect", "synthesize", "finish", "error"]
    status: Literal["pending", "running", "completed", "failed"]
    summary: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class AgentTaskResponse(BaseModel):
    task_id: str
    objective: str
    status: Literal["queued", "running", "completed", "failed"]
    created_at: datetime
    completed_at: Optional[datetime] = None
    final_report_markdown: Optional[str] = None
    sources_consulted: List[Dict[str, str]] = []
    traces: List[StepTrace] = []


class CheckpointItem(BaseModel):
    id: str
    agent: str
    title: str
    description: str
    riskLevel: Literal["low", "medium", "high"]
    actionPayload: str
    status: Literal["pending", "approved", "rejected"]
    timestamp: str


class ToolRegistryItem(BaseModel):
    id: str
    name: str
    description: str
    category: str
    status: str
    calls_today: int
    avg_latency_ms: int


class MissionItem(BaseModel):
    id: str
    name: str
    objective_type: str
    status: str
    progress: int
    duration: str
    agents: List[str]
    created_at: str


class ThroughputData(BaseModel):
    labels: List[str]
    values: List[int]
    total_week: int
    avg_per_day: float


class TemplateItem(BaseModel):
    id: str
    name: str
    steps: int
    est_minutes: int
    description: str

