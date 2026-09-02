"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Database,
  Terminal,
  Activity,
  BarChart3,
  Lock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

interface Capability {
  id: string;
  title: string;
  eyebrow: string;
  projectSlug: string;
  projectName: string;
  summary: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  visualType: "rag" | "agents" | "serving" | "security" | "evals";
}

const capabilities: Capability[] = [
  {
    id: "rag",
    title: "Production RAG Pipelines",
    eyebrow: "Retrieval & Groundedness",
    projectSlug: "mindstack",
    projectName: "MindStack",
    summary:
      "Hybrid lexical plus semantic retrieval pipelines that refuse to hallucinate when factual evidence is absent.",
    architecture:
      "BM25 + ChromaDB vectors merged via Reciprocal Rank Fusion (k=60) and gated by an NLI entailment classifier.",
    metrics: [
      { value: "95%", label: "Groundedness Score" },
      { value: "66.7%", label: "Adversarial Refusal" },
      { value: "<45ms", label: "Fusion Retrieval Latency" },
    ],
    visualType: "rag",
  },
  {
    id: "agents",
    title: "Stateful Multi-Agent Workflows",
    eyebrow: "Agentic Orchestration",
    projectSlug: "nexus-researcher",
    projectName: "Nexus Researcher",
    summary:
      "Deterministic 8-node LangGraph research workflows with human-in-the-loop gates and resumable checkpointing.",
    architecture:
      "PostgreSQL schema-level checkpointing, token-bucket rate limiting, and Server-Sent Events (SSE) streaming.",
    metrics: [
      { value: "8.05 req/s", label: "Sustained Throughput" },
      { value: "91%", label: "Refusal Precision" },
      { value: "122 Tests", label: "0 Failures in CI" },
    ],
    visualType: "agents",
  },
  {
    id: "serving",
    title: "Low-Latency LLM Serving & Gateway",
    eyebrow: "Inference & FinOps",
    projectSlug: "cinch",
    projectName: "Cinch",
    summary:
      "14-stage asynchronous FastAPI traffic gateway serving quantized 7B models with sub-5ms semantic caching.",
    architecture:
      "AWQ Marlin INT4 GEMM kernels in vLLM, 3-state Circuit Breaker FSM, and in-process CPU ONNX semantic cache.",
    metrics: [
      { value: "10.86×", label: "Throughput Speedup" },
      { value: "4.12ms", label: "CPU Semantic Cache Hit" },
      { value: "45ms", label: "Circuit Breaker Fast-Fail" },
    ],
    visualType: "serving",
  },
  {
    id: "security",
    title: "Resilient Backends & Data Integrity",
    eyebrow: "Enterprise Security & Sync",
    projectSlug: "offboarder",
    projectName: "OFFBoarder / MaSheba AI",
    summary:
      "Strict tenant isolation with Segregation of Duties controls, cryptographic audit logs, and offline-first SQLite sync.",
    architecture:
      "PostgreSQL Row-Level Security, SHA-256 chained ledgers, and transactional outbox queues with logical clocks.",
    metrics: [
      { value: "SoD", label: "Creator ≠ Approver Gate" },
      { value: "SHA-256", label: "Immutable Chained Ledger" },
      { value: "Zero Loss", label: "Offline SQLite Outbox Sync" },
    ],
    visualType: "security",
  },
  {
    id: "evals",
    title: "Continuous Model Evaluation Gates",
    eyebrow: "MLOps & Quality Assurance",
    projectSlug: "ares",
    projectName: "ARES",
    summary:
      "Idempotent regression testing framework evaluating candidate models against golden sets and live champions.",
    architecture:
      "Async SQLAlchemy evaluation engine, commit-SHA keyed idempotency, critical slice gates, and CI workflows.",
    metrics: [
      { value: "92%+", label: "Pytest Coverage in CI" },
      { value: "Idempotent", label: "Commit-SHA Keyed" },
      { value: "Multi-Slice", label: "Regression Detection" },
    ],
    visualType: "evals",
  },
];

/* ──────────────────────────────────────────────────────────
   1. RAG Pipeline Visualizer
   ────────────────────────────────────────────────────────── */
function RagPipelineVisual() {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/8">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <Database size={13} />
          <span>Hybrid Retrieval Flow</span>
        </span>
        <span className="text-[10px] text-slate-500">MindStack Architecture</span>
      </div>

      <div className="space-y-2.5">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/8 flex items-center justify-between">
          <span className="text-slate-300">1. User Query Ingress</span>
          <span className="text-primary text-[11px]">Normalized</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-center space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase">Dense Vector</span>
            <span className="text-primary font-bold">ChromaDB</span>
            <span className="text-[10px] text-slate-500 block">cosine dist &lt; 0.28</span>
          </div>
          <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-center space-y-1">
            <span className="text-[10px] text-slate-400 block uppercase">Sparse Lexical</span>
            <span className="text-primary font-bold">BM25 Index</span>
            <span className="text-[10px] text-slate-500 block">exact token overlap</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-between">
          <span className="text-slate-200">2. Reciprocal Rank Fusion</span>
          <span className="text-primary font-bold">RRF (k = 60)</span>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-between">
          <span className="text-slate-200 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary" />
            <span>3. NLI Grounding Refusal Gate</span>
          </span>
          <span className="text-primary font-bold text-[11px]">Score: 0.95 &gt;= 0.70</span>
        </div>

        <div className="p-3 rounded-lg bg-[#030705] border border-white/10 flex items-center justify-between text-slate-300">
          <span>4. Generator Synthesis</span>
          <span className="text-emerald-400 font-bold">Cited Markdown</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   2. Multi-Agent SSE Stream Visualizer
   ────────────────────────────────────────────────────────── */
function AgentStreamVisual() {
  const events = [
    { time: "0.02s", node: "PLANNER", msg: "Deconstructed query into 4 factual sub-topics" },
    { time: "0.18s", node: "QUERY_GEN", msg: "Generated 8 multi-aspect search terms" },
    { time: "0.45s", node: "HITL_GATE", msg: "Human-in-the-loop checkpoint: approved" },
    { time: "1.42s", node: "SCRAPER", msg: "Parallel Playwright crawl: 12 URLs processed" },
    { time: "1.89s", node: "REFUSAL", msg: "Groundedness score: 0.91 >= 0.85 (PASSED)" },
    { time: "2.10s", node: "SYNTHESIZER", msg: "Compiled academic report with 14 inline citations" },
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/8">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <Terminal size={13} />
          <span>LangGraph SSE Execution Event Stream</span>
        </span>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE
        </span>
      </div>

      <div className="space-y-1.5 bg-black/50 p-3 rounded-xl border border-white/8 max-h-[260px] overflow-y-auto">
        {events.map((ev, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
            <span className="text-slate-600 shrink-0">{ev.time}</span>
            <span className="px-1.5 py-0.2 rounded bg-primary/10 border border-primary/25 text-primary shrink-0 text-[10px]">
              {ev.node}
            </span>
            <span className="text-slate-300">{ev.msg}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
        <span>Checkpointer: PostgreSQL schema isolation</span>
        <span className="text-primary">122 CI tests passing</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. LLM Serving Benchmark Table Visualizer
   ────────────────────────────────────────────────────────── */
function ServingBenchmarkVisual() {
  const rows = [
    { metric: "Inference Throughput", vanilla: "30.5 tok/s", cinch: "331.2 tok/s", delta: "+10.86×" },
    { metric: "VRAM Memory Footprint", vanilla: "14.8 GiB", cinch: "4.2 GiB", delta: "-71.6%" },
    { metric: "Semantic Cache Hit Latency", vanilla: "620ms (GPU)", cinch: "4.12ms (0W CPU)", delta: "150× faster" },
    { metric: "Worker Crash MTTR", vanilla: "30,000ms timeout", cinch: "45.56ms Fast-Fail", delta: "Circuit FSM" },
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/8">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <BarChart3 size={13} />
          <span>vLLM Marlin INT4 vs Vanilla Serving</span>
        </span>
        <span className="text-[10px] text-slate-500">Qwen2.5-7B on 8GB GPU</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-500">
              <th className="pb-2 font-normal">Benchmark Dimension</th>
              <th className="pb-2 font-normal">Stock vLLM</th>
              <th className="pb-2 font-normal text-primary">Cinch Gateway</th>
              <th className="pb-2 font-normal text-right">Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="py-2.5 text-slate-200">{r.metric}</td>
                <td className="py-2.5 text-slate-500 tabular-nums">{r.vanilla}</td>
                <td className="py-2.5 text-primary font-bold tabular-nums">{r.cinch}</td>
                <td className="py-2.5 text-right font-semibold text-emerald-400 tabular-nums">
                  {r.delta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[10px] text-slate-500 pt-1">
        Validated via 195 automated pytest fixtures and k3d horizontal pod autoscaling.
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   4. Backend Security & Sync Ledger Visualizer
   ────────────────────────────────────────────────────────── */
function SecurityLedgerVisual() {
  const blocks = [
    { block: "#1042", type: "ACCESS_REVOCATION", hash: "8f2a...c4e1", status: "VERIFIED", tenant: "ent_09" },
    { block: "#1043", type: "SOD_ENFORCEMENT", hash: "1b9e...7d82", status: "CREATOR ≠ APPROVER", tenant: "ent_09" },
    { block: "#1044", type: "OUTBOX_SYNC_FLUSH", hash: "d43c...aa90", status: "18 MUTATIONS SYNCED", tenant: "masheba_clin" },
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/8">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <Lock size={13} />
          <span>Chained Cryptographic Audit Ledger</span>
        </span>
        <span className="text-[10px] text-slate-500">Immutable SHA-256</span>
      </div>

      <div className="space-y-2">
        {blocks.map((b, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/8 space-y-1.5"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-primary font-bold">{b.block} · {b.type}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {b.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>SHA-256: {b.hash}</span>
              <span>Tenant: {b.tenant}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-slate-500 pt-1 flex justify-between">
        <span>PostgreSQL Row-Level Security</span>
        <span className="text-primary">SQLite Outbox Queue · Zero loss</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   5. Model Evaluation Decision Matrix Visualizer
   ────────────────────────────────────────────────────────── */
function EvalsMatrixVisual() {
  const gates = [
    { name: "Aggregate F1 Score", candidate: "0.912", champion: "0.898", gate: "delta > -0.01", status: "PASS (+1.4%)" },
    { name: "Adversarial Demographic Slice", candidate: "0.884", champion: "0.861", gate: "f1 >= 0.850", status: "PASS" },
    { name: "P95 Serving Latency", candidate: "42.1ms", champion: "45.0ms", gate: "latency <= 50ms", status: "PASS (-2.9ms)" },
    { name: "Golden Set Hash Validation", candidate: "v2.1 (sha256)", champion: "v2.1 (sha256)", gate: "checksum match", status: "IDEMPOTENT" },
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/8">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <Activity size={13} />
          <span>ARES Automated Promotion Gate Decision</span>
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold">
          PROMOTION APPROVED
        </span>
      </div>

      <div className="space-y-2">
        {gates.map((g, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-white/[0.02] border border-white/6 flex items-center justify-between gap-2"
          >
            <div className="space-y-0.5">
              <span className="text-slate-200 text-[11px] block">{g.name}</span>
              <span className="text-[10px] text-slate-500">Gate: {g.gate}</span>
            </div>
            <div className="text-right">
              <span className="text-primary font-bold text-[11px] block tabular-nums">
                {g.candidate} vs {g.champion}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">{g.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-slate-500 pt-1 flex justify-between">
        <span>Evaluations keyed by commit SHA + model name</span>
        <span className="text-primary">92%+ pytest coverage in CI</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Capabilities Showcase Section
   ────────────────────────────────────────────────────────── */
export function CapabilitiesAccordion() {
  const [activeTab, setActiveTab] = useState<string>("rag");
  const activeCapability = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  const renderVisual = (type: Capability["visualType"]) => {
    switch (type) {
      case "rag":
        return <RagPipelineVisual />;
      case "agents":
        return <AgentStreamVisual />;
      case "serving":
        return <ServingBenchmarkVisual />;
      case "security":
        return <SecurityLedgerVisual />;
      case "evals":
        return <EvalsMatrixVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="capabilities" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#030705] relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Technical Focus"
          title="Architecting Production AI"
          description="Deploying AI into production requires bridging the gap between stochastic model outputs and deterministic software quality. Here are the core engineering capabilities I build."
        />

        {/* Desktop & Tablet: Side-by-Side Interactive Workbench */}
        <div className="mt-12 hidden md:grid md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Capability Selector Tabs */}
          <div role="tablist" aria-label="Capabilities" className="md:col-span-5 space-y-2.5">
            {capabilities.map((cap) => {
              const isActive = activeTab === cap.id;
              return (
                <button
                  key={cap.id}
                  role="tab"
                  onClick={() => setActiveTab(cap.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer focus-ring ${
                    isActive
                      ? "bg-white/[0.04] border-primary/40 shadow-lg shadow-primary/5"
                      : "bg-white/[0.015] border-white/6 hover:border-white/15 hover:bg-white/[0.025]"
                  }`}
                  aria-selected={isActive}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
                      {cap.eyebrow}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {cap.projectName}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 text-pretty">
                    {cap.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Technical Visualizer & Case Study Deep Dive */}
          <div className="md:col-span-7 rounded-2xl border border-white/10 bg-[#030705]/90 p-6 sm:p-7 shadow-2xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4 flex-wrap">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-wider block">
                  Capability Architecture
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  {activeCapability.title}
                </h3>
              </div>

              <Link
                href={`/work/${activeCapability.projectSlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider py-1 px-2.5 rounded-full border border-primary/20 bg-primary/5"
              >
                <span>Read {activeCapability.projectName}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Render Active Visualizer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-white/8 bg-black/40 p-5 shadow-inner"
              >
                {renderVisual(activeCapability.visualType)}
              </motion.div>
            </AnimatePresence>

            {/* Verified Metrics for Active Capability */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {activeCapability.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-white/6 bg-white/[0.02] text-left space-y-1"
                >
                  <div className="font-mono text-base font-bold text-primary tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider line-clamp-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Interactive Stacked Accordion Cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {capabilities.map((cap) => {
            const isExpanded = activeTab === cap.id;
            return (
              <div
                key={cap.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? "bg-white/[0.03] border-primary/30"
                    : "bg-white/[0.015] border-white/8"
                }`}
              >
                <button
                  onClick={() => setActiveTab(isExpanded ? "" : cap.id)}
                  className="w-full p-5 text-left flex flex-col gap-1 min-h-[48px] focus-ring"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-primary uppercase">
                    <span>{cap.eyebrow}</span>
                    <span className="text-slate-500">{cap.projectName}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {cap.summary}
                  </p>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 space-y-4 border-t border-white/6">
                    <div className="rounded-xl border border-white/8 bg-black/50 p-4">
                      {renderVisual(cap.visualType)}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {cap.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg border border-white/6 bg-white/[0.02] text-center"
                        >
                          <div className="font-mono text-sm font-bold text-primary tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 uppercase line-clamp-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/work/${cap.projectSlug}`}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/25 text-primary text-xs font-mono uppercase tracking-wider hover:bg-primary/20 transition-colors"
                    >
                      <span>Read {cap.projectName} Case Study</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
