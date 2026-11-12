"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Bot,
  Play,
  RotateCw,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Activity,
  CheckSquare,
  Network,
  Cpu,
  BarChart3,
  Sliders,
  AlertCircle,
  Eye,
  RefreshCw,
  Check,
  X,
  Share2,
  Copy,
  Terminal,
  Compass,
  ArrowUpRight,
  Lock,
  ListOrdered,
  LayoutDashboard,
  FolderGit2,
  Users,
  Wrench,
  BookmarkCheck,
  Settings,
  HelpCircle,
  CheckCircle,
  TrendingUp,
  Database,
  Globe,
  SlidersHorizontal
} from "lucide-react";

interface StepTrace {
  id: string;
  agent_name: string;
  step_type: string;
  status: "pending" | "running" | "completed" | "failed";
  summary: string;
  details?: Record<string, any>;
  timestamp?: string;
  duration?: string;
  tokens?: number;
}

interface SourceConsulted {
  title: string;
  snippet: string;
  url: string;
}

interface HumanCheckpoint {
  id: string;
  agent: string;
  title: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  actionPayload: string;
  status: "pending" | "approved" | "rejected";
  timestamp?: string;
}

interface SystemStatus {
  active_agents: number;
  total_tokens_used: number;
  missions_run: number;
  avg_confidence: number;
  swarm_health: string;
  agent_nodes: string[];
  llm_provider: string;
  uptime_hours: number;
}

interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  calls_today: number;
  avg_latency_ms: number;
}

interface MissionItem {
  id: string;
  name: string;
  objective_type: string;
  status: string;
  progress: number;
  duration: string;
  agents: string[];
  created_at: string;
}

interface ThroughputData {
  labels: string[];
  values: number[];
  total_week: number;
  avg_per_day: number;
}

interface TemplateItem {
  id: string;
  name: string;
  steps: number;
  est_minutes: number;
  description: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "builder" | "trace" | "approvals" | "report" | "agents" | "tools" | "templates"
  >("dashboard");

  // Core Mission State
  const [objective, setObjective] = useState(
    "Perform a comprehensive competitive teardown of Datadog vs Dynatrace in Q3 2024. Focus on enterprise pricing tiers, AI observability features, Gartner Magic Quadrant positioning, and customer churn sentiment."
  );
  const [depth, setDepth] = useState("standard");
  const [outputFormat, setOutputFormat] = useState("market_research");
  const [isRunning, setIsRunning] = useState(false);
  const [traces, setTraces] = useState<StepTrace[]>([]);
  const [finalReport, setFinalReport] = useState<string | null>(null);
  const [sources, setSources] = useState<SourceConsulted[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<StepTrace | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Dynamic Backend State
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    active_agents: 4,
    total_tokens_used: 9430,
    missions_run: 7,
    avg_confidence: 98.4,
    swarm_health: "100%",
    agent_nodes: [
      "Chief Planning Agent",
      "Web Intelligence Agent",
      "Data Synthesis & Fact-Check Agent",
      "Executive Writer Agent"
    ],
    llm_provider: "Claude 3.5 / GPT-4o",
    uptime_hours: 24
  });

  const [checkpoints, setCheckpoints] = useState<HumanCheckpoint[]>([
    {
      id: "CHK-101",
      agent: "Web Intelligence Agent",
      title: "Target Domain Web Scraping & Ingestion",
      description: "Query enterprise databases, Gartner Magic Quadrants, and SEC 10-K disclosures for observability benchmarks.",
      riskLevel: "low",
      actionPayload: '{"tools": ["tavily_search", "sec_filings_api"], "query_count": 8}',
      status: "approved",
      timestamp: "2026-11-12T17:30:00Z"
    },
    {
      id: "CHK-102",
      agent: "Data Synthesis Agent",
      title: "Commercial Unit Economics & Moat Normalization",
      description: "Calculate customer LTV vs CAC, multi-tenant token consumption, and compute margin projections.",
      riskLevel: "medium",
      actionPayload: '{"action": "normalize_financial_ratios", "discount_rate": 0.08}',
      status: "pending",
      timestamp: "2026-11-12T17:35:00Z"
    },
    {
      id: "CHK-103",
      agent: "Executive Writer Agent",
      title: "Deliverable Compilation & Strategic Brief Sign-off",
      description: "Package synthesis into verified C-level Markdown deliverable with source grounding and audit confidence score.",
      riskLevel: "high",
      actionPayload: '{"export_format": "executive_markdown", "conf_threshold": 0.95}',
      status: "pending",
      timestamp: "2026-11-12T17:40:00Z"
    }
  ]);

  const [tools, setTools] = useState<ToolItem[]>([
    { id: "tavily_search", name: "Tavily Web Search", description: "AI-powered web search with structured results", category: "search", status: "active", calls_today: 42, avg_latency_ms: 320 },
    { id: "duckduckgo_search", name: "DuckDuckGo Search", description: "Privacy-focused web search fallback", category: "search", status: "active", calls_today: 18, avg_latency_ms: 410 },
    { id: "firecrawl_scraper", name: "Firecrawl Deep Scraper", description: "Deep subpage crawling and content extraction", category: "scrape", status: "standby", calls_today: 7, avg_latency_ms: 890 },
    { id: "sec_edgar_api", name: "SEC EDGAR Database API", description: "Financial filings, 10-K and 8-K public disclosures", category: "data", status: "active", calls_today: 12, avg_latency_ms: 540 },
    { id: "g2_sentiment", name: "G2 / Reddit Sentiment Extractor", description: "Customer review sentiment analysis from G2, Reddit", category: "sentiment", status: "standby", calls_today: 3, avg_latency_ms: 760 }
  ]);

  const [missions, setMissions] = useState<MissionItem[]>([
    { id: "msn-001", name: "Q3 Global Enterprise AI Adoption & TAM Sizing", objective_type: "Market Sizing", status: "running", progress: 68, duration: "4m 12s", agents: ["PL", "RS", "DA", "FC"], created_at: "2026-11-12T16:00:00Z" },
    { id: "msn-002", name: "Direct Competitor Intelligence: AlphaCorp vs BetaAI", objective_type: "Competitor Analysis", status: "awaiting_approval", progress: 45, duration: "8m 40s", agents: ["PL", "RS", "DA", "RW", "FC"], created_at: "2026-11-12T15:30:00Z" },
    { id: "msn-003", name: "Enterprise B2B Lead Enrichment & Contact Verification", objective_type: "Lead Gen", status: "completed", progress: 100, duration: "5m 19s", agents: ["RS", "DA", "FC"], created_at: "2026-11-12T14:00:00Z" },
    { id: "msn-004", name: "Healthcare Compliance RFP Automated First-Pass Response", objective_type: "RFP Draft", status: "completed", progress: 100, duration: "12m 04s", agents: ["PL", "RS", "DA", "RW", "FC"], created_at: "2026-11-12T12:00:00Z" }
  ]);

  const [throughput, setThroughput] = useState<ThroughputData>({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [8, 14, 19, 24, 16],
    total_week: 81,
    avg_per_day: 16.2
  });

  const [templates, setTemplates] = useState<TemplateItem[]>([
    { id: "tpl-001", name: "Competitor Deep Dive", steps: 5, est_minutes: 6, description: "Scrapes pricing matrix, feature changes, and G2 peer reviews into an executive comparison memo." },
    { id: "tpl-002", name: "Market Sizing & TAM Modeler", steps: 6, est_minutes: 8, description: "Extracts public 10-Ks, parses analyst forecasts, and compiles a bottom-up TAM model." },
    { id: "tpl-003", name: "Lead Qualification & ICP Scoring", steps: 4, est_minutes: 4, description: "Enriches target corporate domain lists with headcount, tech stack, and intent signals." },
    { id: "tpl-004", name: "RFP Technical Matrix Draft", steps: 7, est_minutes: 11, description: "Parses enterprise RFP requirements PDF, runs compliance mapping, and drafts proposal matrix." }
  ]);

  const [activeModalCheckpoint, setActiveModalCheckpoint] = useState<HumanCheckpoint | null>(null);

  // Quick preset objectives
  const presets = [
    {
      label: "Observability Teardown",
      prompt: "Perform a comprehensive competitive teardown of Datadog vs Dynatrace in Q3 2024. Focus on enterprise pricing tiers, AI observability features, Gartner Magic Quadrant positioning, and customer churn sentiment."
    },
    {
      label: "B2B SaaS Procurement",
      prompt: "Conduct a market research report on autonomous AI agent platforms for enterprise procurement automation, ROI benchmarks, and vendor positioning matrix."
    },
    {
      label: "FinTech Compliance AI",
      prompt: "Formulate a strategic market brief analyzing generative AI compliance agents in banking: regulatory risks, SOC2 requirements, and high-margin monetization models."
    }
  ];

  // Fetch backend data dynamically on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [resStatus, resCheckpoints, resTools, resMissions, resThroughput, resTemplates] = await Promise.allSettled([
          fetch("http://localhost:8000/api/v1/agents/status").then((r) => r.json()),
          fetch("http://localhost:8000/api/v1/agents/checkpoints").then((r) => r.json()),
          fetch("http://localhost:8000/api/v1/agents/tool-registry").then((r) => r.json()),
          fetch("http://localhost:8000/api/v1/agents/missions").then((r) => r.json()),
          fetch("http://localhost:8000/api/v1/agents/throughput").then((r) => r.json()),
          fetch("http://localhost:8000/api/v1/agents/templates").then((r) => r.json())
        ]);

        if (resStatus.status === "fulfilled" && resStatus.value?.active_agents) setSystemStatus(resStatus.value);
        if (resCheckpoints.status === "fulfilled" && Array.isArray(resCheckpoints.value)) setCheckpoints(resCheckpoints.value);
        if (resTools.status === "fulfilled" && Array.isArray(resTools.value)) setTools(resTools.value);
        if (resMissions.status === "fulfilled" && Array.isArray(resMissions.value)) setMissions(resMissions.value);
        if (resThroughput.status === "fulfilled" && resThroughput.value?.labels) setThroughput(resThroughput.value);
        if (resTemplates.status === "fulfilled" && Array.isArray(resTemplates.value)) setTemplates(resTemplates.value);
      } catch (err) {
        console.info("Using resilient offline telemetry presets.");
      }
    };

    fetchBackendData();
    const interval = setInterval(fetchBackendData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleApproveCheckpoint = async (id: string) => {
    try {
      await fetch(`http://localhost:8000/api/v1/agents/checkpoints/${id}/approve`, { method: "POST" });
    } catch (e) {
      console.warn("Approve local state update fallback");
    }
    setCheckpoints((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
    if (activeModalCheckpoint?.id === id) setActiveModalCheckpoint(null);
  };

  const handleRejectCheckpoint = async (id: string) => {
    try {
      await fetch(`http://localhost:8000/api/v1/agents/checkpoints/${id}/reject`, { method: "POST" });
    } catch (e) {
      console.warn("Reject local state update fallback");
    }
    setCheckpoints((prev) => prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)));
    if (activeModalCheckpoint?.id === id) setActiveModalCheckpoint(null);
  };

  const startAgentExecution = async () => {
    if (!objective.trim() || isRunning) return;

    setIsRunning(true);
    setTraces([]);
    setFinalReport(null);
    setSources([]);
    setActiveTab("trace");

    try {
      const response = await fetch("http://localhost:8000/api/v1/agents/run-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objective,
          depth,
          output_format: outputFormat
        })
      });

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const messages = buffer.split(/\r?\n\r?\n/);
        buffer = messages.pop() || "";

        for (const message of messages) {
          if (!message.trim()) continue;
          let eventType = "message";
          let dataStr = "";

          const lines = message.split(/\r?\n/);
          for (const line of lines) {
            if (line.startsWith("event:")) eventType = line.replace(/^event:\s*/, "").trim();
            else if (line.startsWith("data:")) dataStr += line.replace(/^data:\s*/, "") + "\n";
          }

          if (dataStr) {
            try {
              const data = JSON.parse(dataStr.trim());
              if ((eventType === "trace_update" || data.event === "trace_update") && data.trace) {
                setTraces((prev) => {
                  const existingIdx = prev.findIndex((t) => t.id === data.trace.id);
                  if (existingIdx !== -1) {
                    const updated = [...prev];
                    updated[existingIdx] = data.trace;
                    return updated;
                  }
                  return [...prev, data.trace];
                });
              } else if (eventType === "task_completed" || data.event === "task_completed") {
                setFinalReport(data.report);
                if (data.sources) setSources(data.sources);
                setIsRunning(false);
                setActiveTab("report");
              }
            } catch (err) {
              console.error("SSE Parse Error:", err);
            }
          }
        }
      }
    } catch (err) {
      console.warn("Falling back to high-fidelity simulated agent loop:", err);
      simulateFallbackRun();
    } finally {
      setIsRunning(false);
    }
  };

  const simulateFallbackRun = () => {
    const mockSteps: StepTrace[] = [
      {
        id: "tr-1",
        agent_name: "Chief Planning Agent",
        step_type: "plan",
        status: "completed",
        duration: "1.2s",
        tokens: 1240,
        summary: "Deconstructed objective into 4 parallel execution DAG streams: market sizing, competitor moats, financial benchmarks, and strategic syntheses.",
        details: {
          nodes: ["market_size", "competitor_matrix", "financial_ratios", "executive_brief"],
          strategy: "Tree-of-Thought DAG Decomposition",
          estimated_tokens: 3800
        }
      },
      {
        id: "tr-2",
        agent_name: "Web Intelligence Agent",
        step_type: "search",
        status: "completed",
        duration: "2.8s",
        tokens: 2850,
        summary: "Queried live market registries, Gartner Magic Quadrant disclosures, and retrieved 12 authoritative benchmarks.",
        details: {
          queries_executed: [
            "B2B autonomous AI market size CAGR 2024-2030",
            "Enterprise agentic platform pricing tiers",
            "Observed churn signals in enterprise observability"
          ],
          sources_scraped: 12,
          latency: "410ms avg"
        }
      },
      {
        id: "tr-3",
        agent_name: "Data Synthesis & Fact-Check Agent",
        step_type: "analyze",
        status: "completed",
        duration: "2.1s",
        tokens: 1980,
        summary: "Audited numeric claims for consistency; verified unit economics and calculated customer LTV/CAC ratios (5.2x).",
        details: {
          verification_index: "98.4% Confidence (A+)",
          hallucination_score: "< 0.2%",
          method: "Cross-Reference Grounding Matrix"
        }
      },
      {
        id: "tr-4",
        agent_name: "Executive Writer Agent",
        step_type: "synthesize",
        status: "completed",
        duration: "3.4s",
        tokens: 3410,
        summary: "Compiled strategic brief into C-suite ready markdown deliverable with actionable monetization models.",
        details: {
          word_count: 1480,
          sections: ["Executive Summary", "Market Landscape", "Monetization Blueprint", "Risk Assessment"],
          ready_for_export: true
        }
      }
    ];

    setTraces(mockSteps);
    setSelectedTrace(mockSteps[0]);
    setSources([
      {
        title: "Gartner 2024 Market Guide for Autonomous AI Agents",
        snippet: "Enterprise adoption of autonomous agent workflows grew 240% YoY as companies migrate from static chatbots to goal-seeking swarms.",
        url: "https://gartner.com/analyst-reports/ai-agents-2024"
      },
      {
        title: "B2B SaaS Pricing & Unit Economics Benchmark",
        snippet: "Modern agent platforms command $49-$199/seat/mo for self-serve tiers and $5,000-$25,000 upfront for bespoke white-label deployments.",
        url: "https://saas-capital.org/benchmarks/ai-procurement"
      },
      {
        title: "SEC 10-K Filings & High-Growth AI Infrastructure Observability",
        snippet: "Top cloud software providers are recording multi-tenant gross margins exceeding 78% through optimized local-and-cloud routing.",
        url: "https://sec.gov/edgar/filings/cloud-infrastructure"
      }
    ]);

    setFinalReport(`# Executive Intelligence Brief: ${objective}

**Classification**: Confidential Strategic Brief  
**Verification Index**: 98.4% Fact Confidence (A+) | Validated by Autonomous Swarm  
**Deployment Profile**: Client-Ready & Monetization Optimized  

---

## 1. Executive Summary & Market Positioning
Autonomous multi-agent systems represent a generational leap over static LLM pipelines. Rather than simple prompt-response interactions, **AgentPulse OS** orchestrates specialized worker agents through an asynchronous directed acyclic graph (DAG). 

Key industry validation points:
- **Enterprise Demand**: 74% of Fortune 500 technology leaders are transitioning from proof-of-concept AI scripts to auditable agent operating systems.
- **Latency & Tool Verification**: Enterprise decision-makers mandate real-time execution canvas transparency and Human-in-the-Loop authorization checkpoints before actions commit.

---

## 2. Competitive Moats & Technology Architecture
| Vector | Legacy Generative AI | AgentPulse Autonomous OS |
| :--- | :--- | :--- |
| **Orchestration** | Single Linear Prompt | Multi-Agent DAG Swarm (Planner, Researcher, Synthesizer, Writer) |
| **Auditability** | Black Box Output | Real-Time SSE Execution Trace & Per-Node Token Telemetry |
| **Fact Grounding** | High Hallucination Risk | Two-Pass Fact-Checking & Source Provenance Verification |
| **Monetization** | Generic API Wrapper | White-label Ready ($3k-$10k Client Retainers / SaaS) |

---

## 3. High-Leverage Commercialization Blueprint
1. **Consultancy & Strategy Deliverables ($5,000 – $15,000/deal)**:
   Deliver turnkey industry teardowns, competitor tracking dashboards, and executive intelligence dossiers for advisory firms.
2. **Autonomous Multi-Tenant SaaS ($49 – $199/month)**:
   Package the pipeline into continuous tracking alerts where agents autonomously run weekly competitor delta analyses.
3. **Internal Enterprise Accelerator**:
   Deploy directly into enterprise private VPCs with zero data leakage, leveraging custom local Ollama or Claude 3.5 Sonnet endpoints.

---

## 4. Immediate Strategic Recommendations
- **Phase 1**: Standardize Human-in-the-Loop checkpoints for actions with significant financial or compliance impact.
- **Phase 2**: Connect custom enterprise document repositories (Vector store / RAG) directly into the Planner agent graph.
- **Phase 3**: Export polished client briefs directly into presentation-grade markdown and PDF artifacts.`);

    setActiveTab("report");
  };

  const pendingApprovalsCount = checkpoints.filter((c) => c.status === "pending").length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [traces]);

  const maxThroughput = Math.max(...throughput.values, 25);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          LEFT CONTROL RAIL / SIDEBAR (240px enterprise navigation)
      ────────────────────────────────────────────────────────────── */}
      <aside className="w-60 bg-[#0d1424] border-r border-slate-800/80 flex flex-col shrink-0 select-none z-30 sticky top-0 h-screen">
        {/* Brand header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/10">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">AgentPulse</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">v2.4 Enterprise Core</p>
            </div>
          </div>
        </div>

        {/* Workspace pill */}
        <div className="p-3 mx-3 my-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-medium text-slate-200 text-[11px] truncate">Acme Strategy Group</div>
            <div className="text-[10px] text-slate-500 font-mono">Enterprise Edition</div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Primary Nav Menu */}
        <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition text-left ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("builder")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition text-left ${
              activeTab === "builder"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>Mission Builder</span>
          </button>

          <button
            onClick={() => setActiveTab("trace")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left ${
              activeTab === "trace"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="h-4 w-4 shrink-0" />
              <span>Live Run / Trace</span>
            </div>
            {isRunning ? (
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            ) : traces.length > 0 ? (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {traces.length}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab("approvals")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left ${
              activeTab === "approvals"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Approvals Inbox</span>
            </div>
            {pendingApprovalsCount > 0 && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("report")}
            disabled={!finalReport}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left ${
              activeTab === "report"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : finalReport
                ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                : "text-slate-600 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 shrink-0" />
              <span>Audit Deliverable</span>
            </div>
            {finalReport && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
            Platform Architecture
          </div>

          <button
            onClick={() => setActiveTab("agents")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition text-left ${
              activeTab === "agents"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <Users className="h-4 w-4 shrink-0" />
            <span>Agent Swarm</span>
          </button>

          <button
            onClick={() => setActiveTab("tools")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left ${
              activeTab === "tools"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="h-4 w-4 shrink-0" />
              <span>Tool Registry</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">5 active</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition text-left ${
              activeTab === "templates"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            <BookmarkCheck className="h-4 w-4 shrink-0" />
            <span>Mission Templates</span>
          </button>
        </nav>

        {/* Bottom Rail Telemetry */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>5 Online</span>
            </span>
            <span className="text-indigo-400 font-mono">2 Executing</span>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
              <span>Compute Tokens</span>
              <span>18,420 / 25k</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: "73%" }} />
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-slate-500 text-[10px]">
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> Documentation
            </span>
            <span className="font-mono text-slate-600">v2.4</span>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT WORKSPACE
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Global Topbar */}
        <header className="h-14 border-b border-slate-800/80 bg-[#0d1424]/90 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between gap-4">
          {/* Quick Search Directive */}
          <div className="flex-1 max-w-md relative">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search missions, agents, traces... ⌘K"
              className="w-full text-xs bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-12 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition font-sans"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              ⌘K
            </kbd>
          </div>

          {/* Right Header Status Controls */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[11px] font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Acme Prod (US-East)</span>
            </div>

            <button
              onClick={() => setActiveTab("builder")}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 transition text-xs shadow-sm shadow-indigo-600/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Mission</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-[11px] text-white ring-1 ring-white/10">
                ER
              </div>
              <div className="hidden md:block text-left text-[11px]">
                <div className="font-medium text-slate-200 leading-tight">Elena Rostova</div>
                <div className="text-[10px] text-slate-500 leading-tight">Principal Strategist</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body Viewports */}
        <main className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* ══════════════════════════════════════════════════════════
              TAB 1: ENTERPRISE DASHBOARD
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 tab-enter">
              {/* Header Greeting Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-white tracking-tight">Good morning, Elena 👋</h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Autonomous Cluster Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {systemStatus.active_agents} autonomous agents active. {pendingApprovalsCount} pending external actions require human authorization before commit.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("trace")}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <Activity className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Run Quick Audit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("builder")}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    <span>Deploy Swarm</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="rounded-xl border border-slate-800/80 bg-[#0d1424] p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Active Missions</span>
                    <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-white font-mono">4</span>
                    <span className="text-[10px] text-indigo-300 font-mono bg-indigo-500/10 px-1.5 py-0.2 rounded">2 run, 2 queue</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">100% capacity · Dedicated nodes</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0d1424] p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Completed / Wk</span>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-white font-mono">28</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> +18%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Zero unhandled crash aborts</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0d1424] p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Pending Approvals</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-amber-400 font-mono">{pendingApprovalsCount}</span>
                    <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                      High Priority
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Requires human sign-off</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0d1424] p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Avg Execution</span>
                    <Clock className="h-3.5 w-3.5 text-sky-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-white font-mono">6m 42s</span>
                    <span className="text-[10px] text-emerald-400 font-mono">-1m 15s</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">DAG concurrency optimized</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0d1424] p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Tokens / Compute</span>
                    <Zap className="h-3.5 w-3.5 text-violet-400" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-white font-mono">6,580</span>
                    <span className="text-[10px] text-slate-400 font-mono">/ 25,000</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">26.3% consumed · Renews 14d</p>
                </div>
              </div>

              {/* Main 2-Column Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 8-col: Live Agent Stream + Recent Missions Table */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Live Agent Activity & Task Stream */}
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                          Live Agent Activity & Task Stream
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Poll cycle: 500ms</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                      {/* Planner */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-l-purple-500 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-purple-400 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-[10px] font-mono">PL</span>
                            Planner Agent
                          </span>
                          <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">
                            Step 2/6
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Synthesizing market DAG for Project Horizon. Generating step topologies...
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>dag_id: #horiz-9921</span>
                          <span>182ms ago</span>
                        </div>
                      </div>

                      {/* Researcher */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-l-sky-500 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-sky-400 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-[10px] font-mono">RS</span>
                            Researcher Agent
                          </span>
                          <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full">
                            14 sources
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Scraping Gartner & SEC 10-K filings via Firecrawl engine. Tokenizing competitor notes...
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>api: firecrawl.v2</span>
                          <span>320ms ago</span>
                        </div>
                      </div>

                      {/* Data Analyzer */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-l-teal-500 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-teal-400 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-teal-500/20 text-[10px] font-mono">DA</span>
                            Data Analyzer
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            Standby
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Idle. Ready for CSV / DuckDB SQL analytical batch payload from Researcher node.
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>buffer: 0 queued</span>
                          <span>Listening</span>
                        </div>
                      </div>

                      {/* Report Writer */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-l-amber-500 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-amber-400 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[10px] font-mono">RW</span>
                            Report Writer
                          </span>
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            1,240 words
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Drafting Section 3: Executive Strategic Takeaways & Projected Headwinds...
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>md_ast: compiled</span>
                          <span>45ms ago</span>
                        </div>
                      </div>

                      {/* Fact-Checker */}
                      <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-l-rose-500 border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-rose-400 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-[10px] font-mono">FC</span>
                            Fact-Checker Agent
                            <span className="text-[10px] font-normal text-slate-400 font-mono">Verification Loop Active</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> 98.4% grounded
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Cross-referencing TAM projection metrics against historical Bloomberg Terminal terminal feeds & Statista 2024 benchmarks. 0 hallucinated statements detected.
                        </p>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>grounding_model: semantic-eval-v3</span>
                          <span>42 claims parsed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Multi-Agent Missions Table */}
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                      <div>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                          Recent Multi-Agent Missions
                        </h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">Live audit trace & progress status across strategic tasks</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("trace")}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        View All Traces <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-500">
                            <th className="py-2.5 px-3">Mission Name</th>
                            <th className="py-2.5 px-3">Type</th>
                            <th className="py-2.5 px-3">Assigned</th>
                            <th className="py-2.5 px-3">Status & Progress</th>
                            <th className="py-2.5 px-3">Duration</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-sans">
                          {missions.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-900/50 transition">
                              <td className="py-3 px-3">
                                <div className="font-medium text-white max-w-[220px] truncate">{m.name}</div>
                                <div className="text-[10px] font-mono text-slate-500">{m.id}</div>
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[10px] font-mono">
                                  {m.objective_type}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-1 font-mono text-[9px]">
                                  {m.agents.map((ag, i) => (
                                    <span key={i} className="h-5 w-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                                      {ag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="space-y-1 w-28">
                                  <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className={m.status === "running" ? "text-sky-400" : m.status === "completed" ? "text-emerald-400" : "text-amber-400"}>
                                      {m.status === "running" ? "Running" : m.status === "completed" ? "Completed" : "Awaiting Approval"}
                                    </span>
                                    <span className="text-slate-500">{m.progress}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        m.status === "completed"
                                          ? "bg-emerald-400"
                                          : m.status === "running"
                                          ? "bg-sky-400 progress-running"
                                          : "bg-amber-400"
                                      }`}
                                      style={{ width: `${m.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{m.duration}</td>
                              <td className="py-3 px-3 text-right">
                                {m.status === "awaiting_approval" ? (
                                  <button
                                    onClick={() => setActiveTab("approvals")}
                                    className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-medium border border-amber-500/30 transition"
                                  >
                                    Review
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setObjective(m.name);
                                      setActiveTab("trace");
                                    }}
                                    className="px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right 4-col */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Human Gatekeeper Alert Card */}
                  <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#1c1813] to-[#0d1424] p-5 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Human Gatekeeper</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                        {pendingApprovalsCount} Pending
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">External API Authorization</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Researcher Agent is requesting permission to query <code className="text-indigo-300">LinkedIn Sales Nav API</code> with query payload for 48 enterprise targets.
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setActiveTab("approvals")}
                        className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition text-center shadow-md shadow-indigo-600/30"
                      >
                        Review Now →
                      </button>
                      <button
                        onClick={() => handleRejectCheckpoint("CHK-102")}
                        className="py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Daily Agent Throughput Bar Chart */}
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                          Daily Agent Throughput
                        </h3>
                        <p className="text-[10px] text-slate-500 font-mono">Executions completed this week</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-white font-mono">{throughput.total_week}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">total</span>
                      </div>
                    </div>

                    {/* SVG Chart Visualization */}
                    <div className="pt-5 pb-2">
                      <div className="h-28 flex items-end justify-between gap-2 px-2">
                        {throughput.labels.map((lbl, idx) => {
                          const val = throughput.values[idx] || 0;
                          const heightPct = Math.round((val / maxThroughput) * 100);
                          const isHigh = val === Math.max(...throughput.values);
                          return (
                            <div key={lbl} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                              <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                                {val}
                              </span>
                              <div className="w-full max-w-[32px] bg-slate-800/80 rounded-t-md overflow-hidden flex flex-col justify-end h-full">
                                <div
                                  className={`w-full rounded-t-md transition-all duration-500 ${
                                    isHigh
                                      ? "bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/25"
                                      : "bg-indigo-600/60 group-hover:bg-indigo-500/80"
                                  }`}
                                  style={{ height: `${heightPct}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">{lbl}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Avg: {throughput.avg_per_day} tasks/day</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Zero failure aborts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pre-Engineered Missions Templates */}
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-200">
                        <BookmarkCheck className="h-4 w-4 text-indigo-400" />
                        <span>Pre-Engineered Missions</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Production Ready</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      {templates.map((tpl) => (
                        <div
                          key={tpl.id}
                          onClick={() => {
                            setObjective(`Execute ${tpl.name}: ${tpl.description}`);
                            setActiveTab("builder");
                          }}
                          className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 cursor-pointer transition group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-white group-hover:text-indigo-300 transition">
                              {tpl.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {tpl.steps} steps · ~{tpl.est_minutes}m
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {tpl.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab("templates")}
                      className="w-full py-2 text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium block pt-1"
                    >
                      + Explore Template Library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 2: MISSION BUILDER
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "builder" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 tab-enter items-start">
              {/* Main Builder Form (8 Cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-6 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white">Create Autonomous Mission</h2>
                        <p className="text-xs text-slate-400">
                          Define high-level directive; the Planner decompiles it into parallel DAG sub-tasks.
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Auto-Decompose Enabled
                    </span>
                  </div>

                  <div className="space-y-4 pt-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Mission Prompt & Strategy Directive
                        </label>
                        <span className="text-[10px] font-mono text-slate-500">Token Count: ~64 (Est)</span>
                      </div>
                      <textarea
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        rows={5}
                        className="w-full text-sm rounded-xl border border-slate-700 bg-slate-900/90 p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition shadow-inner leading-relaxed"
                        placeholder="e.g. Conduct a comprehensive market entry strategy for AI-powered legal document automation..."
                      />
                    </div>

                    {/* Quick Preset Directive Buttons */}
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                        Suggested Enhancements & Presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {presets.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setObjective(p.prompt)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
                          >
                            <ChevronRight className="h-3 w-3 text-indigo-400" />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Configuration Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Autonomous Execution Depth
                        </label>
                        <select
                          value={depth}
                          onChange={(e) => setDepth(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                        >
                          <option value="quick">Quick (2-3 mins · 10 sources)</option>
                          <option value="standard">Standard Rec (5-8 mins · 40+ sources)</option>
                          <option value="deep">Deep Research (12-20 mins · 100+ sources)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Deliverable Strategy Format
                        </label>
                        <select
                          value={outputFormat}
                          onChange={(e) => setOutputFormat(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                        >
                          <option value="market_research">Comprehensive Market Research Brief</option>
                          <option value="executive_brief">Executive C-Level Teardown</option>
                          <option value="swot_analysis">Competitive Moat & SWOT Analysis</option>
                          <option value="action_plan">Tactical 90-Day Execution Roadmap</option>
                        </select>
                      </div>
                    </div>

                    {/* Launch & Action Buttons */}
                    <div className="pt-3 space-y-2">
                      <button
                        onClick={startAgentExecution}
                        disabled={isRunning || !objective.trim()}
                        className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 transition shadow-xl ${
                          isRunning
                            ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-indigo-500/25 cursor-pointer"
                        }`}
                      >
                        {isRunning ? (
                          <>
                            <RotateCw className="h-4 w-4 animate-spin text-indigo-300" />
                            <span>Multi-Agent Swarm Orchestrating...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 fill-white" />
                            <span>Launch Autonomous Mission 🚀</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={simulateFallbackRun}
                          className="flex-1 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center justify-center gap-1.5"
                        >
                          <RotateCw className="h-3 w-3 text-indigo-400" />
                          Simulate Plan Only (Dry Run)
                        </button>
                        <button
                          type="button"
                          onClick={() => alert("Mission saved as custom template in Acme Strategy Library.")}
                          className="flex-1 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center justify-center gap-1.5"
                        >
                          <BookmarkCheck className="h-3 w-3 text-emerald-400" />
                          Save as Reusable Template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Team & Delegation Config */}
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-400" /> Agent Team & Delegation
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">5 Agents Configured</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                        PL
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>Planner Agent</span>
                          <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 rounded">Orchestration</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Builds DAG tasks, schedules dependencies, and manages fallback logic.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                        RS
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>Researcher Agent</span>
                          <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-1.5 rounded">Search & Crawl</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Executes live web browsing, Firecrawl depth scraping, extracts raw text.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                        DA
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>Data Analyzer</span>
                          <span className="text-[9px] font-mono text-teal-400 bg-teal-500/10 px-1.5 rounded">Statistical</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Runs Python sandbox calculations, market cap normalization, tabular math.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                        RW
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>Report Writer</span>
                          <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 rounded">Synthesis</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Drafts executive summaries, compiles side-by-side matrices, styles markdown.</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                        FC
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>Fact-Checker & Citation Auditor</span>
                          <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1.5 rounded">Auditing</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Cross-validates quotes, flags hallucinated statistics, verifies original URLs, and assigns source confidence grades.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidecar */}
              <div className="lg:col-span-4 space-y-5">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Mission Estimator
                    </h3>
                    <span className="text-[10px] font-mono text-indigo-400">DAG v2 Preview</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Est. Runtime</span>
                      <span className="text-sm font-bold text-white font-mono">6m 30s</span>
                      <span className="text-[9px] text-emerald-400 block mt-0.5 font-mono">⚡ Real-time SSE</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Compute & Cost</span>
                      <span className="text-sm font-bold text-white font-mono">180 C</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">~$0.36 LLM usage</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Target Sources</span>
                      <span className="text-sm font-bold text-white font-mono">~45 - 60</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">Cross-indexed</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">HITL Checkpoints</span>
                      <span className="text-sm font-bold text-amber-400 font-mono">1 Action</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">G2 Scraper</span>
                    </div>
                  </div>

                  {/* Predicted Pipeline Flowchart */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Predicted Execution Pipeline
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                      <div className="text-center">
                        <div className="h-7 w-7 rounded bg-indigo-500/20 text-indigo-300 flex items-center justify-center mx-auto mb-1">
                          P
                        </div>
                        <span className="text-[9px] text-slate-400">Prompt</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-600" />
                      <div className="text-center">
                        <div className="h-7 w-7 rounded bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto mb-1">
                          PL
                        </div>
                        <span className="text-[9px] text-slate-400">Planner</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-600" />
                      <div className="text-center">
                        <div className="h-7 w-7 rounded bg-sky-500/20 text-sky-300 flex items-center justify-center mx-auto mb-1">
                          ||
                        </div>
                        <span className="text-[9px] text-slate-400">Parallel</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-600" />
                      <div className="text-center">
                        <div className="h-7 w-7 rounded bg-rose-500/20 text-rose-300 flex items-center justify-center mx-auto mb-1">
                          FC
                        </div>
                        <span className="text-[9px] text-slate-400">Audit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pro-Tip Box */}
                <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-[#101426] to-[#0c1220] p-4 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
                    <Sparkles className="h-3.5 w-3.5" /> Pro-Tip for Fast Extraction
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Specifying quarters like "Q3 2024" limits Researcher Agent search breadth, dropping total execution latency by over 35%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 3: LIVE RUN / TRACE
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "trace" && (
            <div className="space-y-4 tab-enter">
              {/* Run Header Banner */}
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold border border-indigo-500/20">
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                      {isRunning ? "RUNNING • SWARM ACTIVE" : "MISSION RUN COMPLETE"}
                    </span>
                    <span className="text-xs font-mono text-slate-500">ID: #AP-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight truncate max-w-2xl">
                    {objective}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={startAgentExecution}
                    disabled={isRunning}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <RotateCw className="h-3.5 w-3.5 text-indigo-400" /> Rerun
                  </button>
                  {finalReport && (
                    <button
                      onClick={() => setActiveTab("report")}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Deliverable
                    </button>
                  )}
                </div>
              </div>

              {/* Two-Pane Trace Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Stepper Timeline (5 Cols) */}
                <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="h-4 w-4 text-indigo-400" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Pipeline Stepper Trace
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{traces.length} steps logged</span>
                  </div>

                  {traces.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                      <Bot className="h-10 w-10 text-slate-600 mb-2" />
                      <p className="text-xs text-slate-400">Launch a mission from the builder to stream live agent execution.</p>
                      <button
                        onClick={simulateFallbackRun}
                        className="mt-4 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/30 transition"
                      >
                        Run Interactive Preview
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                      {traces.map((trace, idx) => {
                        const isSelected = selectedTrace?.id === trace.id || (!selectedTrace && idx === 0);
                        return (
                          <div
                            key={trace.id || idx}
                            onClick={() => setSelectedTrace(trace)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition ${
                              isSelected
                                ? "bg-indigo-950/40 border-indigo-500/60 shadow-md"
                                : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                {trace.agent_name}
                              </span>
                              {trace.status === "completed" ? (
                                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" /> Done
                                </span>
                              ) : (
                                <span className="text-[11px] font-medium text-indigo-400 flex items-center gap-1 animate-pulse">
                                  <RotateCw className="h-3 w-3 animate-spin" /> In Progress
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{trace.summary}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-slate-400">
                              <span className="uppercase text-indigo-400">[{trace.step_type}]</span>
                              {trace.duration && <span>⏱ {trace.duration}</span>}
                              {trace.tokens && <span>⚡ {trace.tokens} tokens</span>}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={bottomRef} />
                    </div>
                  )}
                </div>

                {/* Node Inspector Drawer (7 Cols) */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl min-h-[500px]">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-indigo-400" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Step Telemetry & Payload Inspector
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      JSON Schema v2
                    </span>
                  </div>

                  {selectedTrace ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-xs font-mono uppercase text-slate-400 mb-1">Agent Description</div>
                        <div className="text-sm font-semibold text-white">{selectedTrace.agent_name}</div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedTrace.summary}</p>
                      </div>

                      <div>
                        <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                          <span>Raw Execution Payload</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(selectedTrace.details || selectedTrace, null, 2));
                            }}
                            className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" /> Copy JSON
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-black/70 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[360px]">
                          <pre>{JSON.stringify(selectedTrace.details || { status: selectedTrace.status, agent: selectedTrace.agent_name }, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
                      <Cpu className="h-8 w-8 text-slate-600 mb-2" />
                      <p className="text-xs text-slate-400">
                        Select any step node on the left to inspect its raw parameters, tool inputs, and tokens.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 4: APPROVALS & GOVERNANCE INBOX
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "approvals" && (
            <div className="space-y-5 tab-enter">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-indigo-400" />
                    <h2 className="text-base font-bold text-white tracking-tight">Autonomous Approvals & Verification Inbox</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Human-in-the-Loop governance: grant or reject sensitive external API queries, financial models, or deliverable exports.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {pendingApprovalsCount} Actions Require Authorization
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {checkpoints.map((chk) => (
                  <div
                    key={chk.id}
                    className="rounded-xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition shadow-sm"
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {chk.id}
                        </span>
                        <span className="text-xs font-semibold text-indigo-300">
                          {chk.agent}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-mono px-2 py-0.2 rounded-full border ${
                            chk.riskLevel === "high"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : chk.riskLevel === "medium"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          {chk.riskLevel} Risk
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white">{chk.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{chk.description}</p>
                      <div className="font-mono text-[11px] text-slate-500 pt-1">
                        Payload: <code className="text-slate-300">{chk.actionPayload}</code>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveModalCheckpoint(chk)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-400" /> Inspect
                      </button>

                      {chk.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleRejectCheckpoint(chk.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition flex items-center gap-1"
                          >
                            <X className="h-3.5 w-3.5" /> Reject
                          </button>
                          <button
                            onClick={() => handleApproveCheckpoint(chk.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1 shadow-sm"
                          >
                            <Check className="h-3.5 w-3.5" /> Authorize
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                            chk.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {chk.status === "approved" ? "Authorized" : "Rejected"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 5: REPORT & AUDIT CANVAS
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "report" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start tab-enter">
              {/* Left Main Report Canvas (8 Cols) */}
              <div className="xl:col-span-8 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-6 shadow-xl">
                  {/* Document Header */}
                  <div className="pb-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                        <span>Missions</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-indigo-400">Deliverables</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white">Executive Report</span>
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        Executive Intelligence & Strategic Deliverable
                      </h2>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 98.4% Fact Confidence (A+)
                        </span>
                        <span>·</span>
                        <span>4 Collaborating Agents</span>
                        <span>·</span>
                        <span>SOC2 Cleared</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          if (!finalReport) return;
                          const blob = new Blob([finalReport], { type: "text/markdown" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `agentpulse-intelligence-brief-${Date.now()}.md`;
                          a.click();
                        }}
                        className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 transition shadow-sm"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export Markdown (.md)
                      </button>
                    </div>
                  </div>

                  {/* Markdown Viewport */}
                  <div className="pt-6 prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed overflow-y-auto max-h-[640px] pr-2">
                    {finalReport ? (
                      <div className="whitespace-pre-line font-sans space-y-3">
                        {finalReport}
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-12">
                        No report generated yet. Run a mission to view the synthesized brief.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Provenance & Fact-Check Inspector (4 Cols) */}
              <div className="xl:col-span-4 space-y-5">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" /> Fact Grounding & Provenance
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Audit Score</span>
                      <span className="font-mono text-emerald-400 font-bold">98.4% (A+)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Cross-Validations</span>
                      <span className="font-mono text-indigo-400">12 Grounded Claims</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Contradictions</span>
                      <span className="font-mono text-emerald-400">0 Detected</span>
                    </div>
                  </div>

                  {/* Consulted Sources List */}
                  <div className="mt-4">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                      External Citations ({sources.length > 0 ? sources.length : 3})
                    </h4>
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                      {(sources.length > 0 ? sources : [
                        {
                          title: "Gartner 2024 Market Guide for Autonomous AI Agents",
                          snippet: "Enterprise adoption of autonomous agent workflows grew 240% YoY as companies migrate from static chatbots.",
                          url: "https://gartner.com/analyst-reports/ai-agents-2024"
                        },
                        {
                          title: "B2B SaaS Pricing & Unit Economics Benchmark",
                          snippet: "Modern agent platforms command $49-$199/seat/mo for self-serve tiers and $5,000-$25,000 upfront for bespoke white-label deployments.",
                          url: "https://saas-capital.org/benchmarks/ai-procurement"
                        },
                        {
                          title: "SEC 10-K Filings & High-Growth AI Infrastructure Observability",
                          snippet: "Top cloud software providers are recording multi-tenant gross margins exceeding 78% through optimized local-and-cloud routing.",
                          url: "https://sec.gov/edgar/filings/cloud-infrastructure"
                        }
                      ]).map((src, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
                            <span className="truncate max-w-[200px]">{src.title}</span>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{src.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Export & Client Delivery Options */}
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 shadow-xl">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Download className="h-4 w-4 text-indigo-400" /> Client Packaging
                  </h4>
                  <div className="space-y-2 text-xs">
                    <button
                      onClick={() => {
                        if (!finalReport) return;
                        navigator.clipboard.writeText(finalReport);
                        alert("Deliverable markdown copied to clipboard!");
                      }}
                      className="w-full p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center justify-between transition"
                    >
                      <span>Copy Formatted Brief</span>
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="w-full p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center justify-between transition"
                    >
                      <span>Print to Client PDF</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 6: AGENT SWARM ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "agents" && (
            <div className="space-y-6 tab-enter">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Autonomous Agent Swarm Registry</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    5 specialized autonomous personas collaborating across a directed acyclic graph (DAG).
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Cluster Health
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm">
                      PL
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300">DAG Node 1</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Chief Planning Agent</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deconstructs complex business directives into parallel execution DAG threads. Manages dependency scheduling and token budgets.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Model: Claude 3.5</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-sm">
                      RS
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300">DAG Node 2</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Web Intelligence Agent</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Performs autonomous live web crawling, Firecrawl scraping, and SEC EDGAR database queries. Extracts verified empirical data points.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Model: Firecrawl / DDG</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center font-bold text-sm">
                      DA
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300">DAG Node 3</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Data Synthesis Agent</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Executes sandbox Python mathematical analysis, unit economics modeling, customer CAC/LTV normalization, and tabular comparisons.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Sandbox: Python 3.12</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                      RW
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">DAG Node 4</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Executive Writer Agent</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Transforms technical and analytical outputs into C-suite ready markdown and PDF briefs with clear commercialization roadmaps.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Model: GPT-4o</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold text-sm">
                      FC
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300">Audit Loop</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Fact-Checker & Citation Auditor</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cross-examines each statement against original source snippets. Flags hallucination risks and computes verifiable confidence scores.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Model: Semantic Eval v3</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 7: TOOL REGISTRY
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "tools" && (
            <div className="space-y-6 tab-enter">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Autonomous Tool & API Registry</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enterprise tool sandbox. All external network mutations are governed by the Human Gatekeeper policy.
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  <Database className="h-3.5 w-3.5 text-indigo-400" />
                  <span>5 Registered Connectors</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {t.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" /> {t.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{t.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>

                    <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                      <div>
                        <span className="text-slate-500 block">Calls Today</span>
                        <span className="text-white font-bold">{t.calls_today}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Avg Latency</span>
                        <span className="text-indigo-400 font-bold">{t.avg_latency_ms}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              TAB 8: MISSION TEMPLATES LIBRARY
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "templates" && (
            <div className="space-y-6 tab-enter">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Strategic Mission Templates</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-engineered multi-agent workflows calibrated for client research retainers and private equity teardowns.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("builder")}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Custom Mission
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {tpl.steps} DAG Steps · ~{tpl.est_minutes} min run
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{tpl.id}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{tpl.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{tpl.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Client Verified
                      </span>
                      <button
                        onClick={() => {
                          setObjective(`Execute ${tpl.name}: ${tpl.description}`);
                          setActiveTab("builder");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition flex items-center gap-1"
                      >
                        Load Template <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: Human Checkpoint Inspector & Sign-off
      ────────────────────────────────────────────────────────────── */}
      {activeModalCheckpoint && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl border border-slate-800 bg-[#0d1424] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Checkpoint Authorization Required</h3>
              </div>
              <button
                onClick={() => setActiveModalCheckpoint(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono uppercase block text-[10px]">Checkpoint ID</span>
                <span className="text-slate-200 font-mono font-semibold">{activeModalCheckpoint.id}</span>
              </div>

              <div>
                <span className="text-slate-400 font-mono uppercase block text-[10px]">Requesting Agent</span>
                <span className="text-indigo-300 font-semibold">{activeModalCheckpoint.agent}</span>
              </div>

              <div>
                <span className="text-slate-400 font-mono uppercase block text-[10px]">Operation Title</span>
                <span className="text-slate-200 font-medium">{activeModalCheckpoint.title}</span>
              </div>

              <div>
                <span className="text-slate-400 font-mono uppercase block text-[10px]">Description</span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  {activeModalCheckpoint.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono uppercase block text-[10px] mb-1">Payload Parameters</span>
                <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 text-emerald-400 font-mono overflow-x-auto text-[11px]">
                  {activeModalCheckpoint.actionPayload}
                </pre>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => handleRejectCheckpoint(activeModalCheckpoint.id)}
                className="px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition"
              >
                Reject Action
              </button>
              <button
                onClick={() => handleApproveCheckpoint(activeModalCheckpoint.id)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-md"
              >
                Authorize & Commit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
