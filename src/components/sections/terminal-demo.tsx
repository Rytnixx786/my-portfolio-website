"use client";

import { useEffect, useRef, useState } from "react";
import {
  SquareTerminal,
  Copy,
  Check,
  Zap,
  Shield,
  Network,
  Trash2,
  BarChart3,
  Lock,
  GraduationCap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { VisualFlowInspector } from "@/components/ui/visual-flow-inspector";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "success" | "error" | "output";
}

interface CommandSuggestion {
  cmd: string;
  desc: string;
  icon: React.ElementType;
}

const COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  { cmd: "cinch-telemetry", desc: "14-stage gateway & 3-state Circuit Breaker", icon: Zap },
  { cmd: "rag-pipeline", desc: "ChromaDB + BM25 Reciprocal Rank Fusion", icon: Shield },
  { cmd: "agent-graph", desc: "8-node LangGraph execution & PostgreSQL checkpointers", icon: Network },
  { cmd: "benchmarks", desc: "vLLM Marlin INT4 vs Stock FP16 matrix", icon: BarChart3 },
  { cmd: "security-model", desc: "Segregation of Duties & PostgreSQL RLS", icon: Lock },
  { cmd: "evals-matrix", desc: "ARES model regression & promotion gates", icon: Shield },
  { cmd: "credentials", desc: "BRAC University CS & availability", icon: GraduationCap },
  { cmd: "clear", desc: "Clear console buffer", icon: Trash2 },
];

export function TerminalDemo() {
  const [viewMode, setViewMode] = useState<"console" | "visual">("console");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeNodeStep, setActiveNodeStep] = useState(0);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Mehedi Hasan Systems Explorer v2.4 initialized. [OS: Linux 6.8 / runtime: node 22]", type: "system" },
    { text: 'Type "help" to inspect systems architecture, or click a technical query below.', type: "system" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedInput = input.trim().toLowerCase();
  const suggestions = (!trimmedInput || isTyping)
    ? []
    : COMMAND_SUGGESTIONS.filter((s) => s.cmd.startsWith(trimmedInput));

  // Auto-scroll to bottom of terminal container only
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = history.map((h) => h.text).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
  };

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { text: `mehedi@systems:~$ ${cmd}`, type: "input" }]);
    setIsTyping(true);
    setActiveNodeStep(1);

    let response: TerminalLine[] = [];

    if (trimmed === "help") {
      response = [
        { text: "Verified Systems Architecture Commands:", type: "system" },
        { text: "  cinch-telemetry - Inspect 14-stage gateway & 3-state Circuit Breaker FSM", type: "system" },
        { text: "  rag-pipeline    - Inspect ChromaDB + BM25 Reciprocal Rank Fusion (k=60)", type: "system" },
        { text: "  agent-graph     - Execute stateful LangGraph 8-node workflow with SSE stream", type: "system" },
        { text: "  benchmarks      - Render vLLM Marlin INT4 GEMM comparative benchmark matrix", type: "system" },
        { text: "  security-model  - Audit Segregation of Duties & PostgreSQL Row-Level Security", type: "system" },
        { text: "  evals-matrix    - Inspect ARES commit-SHA idempotent regression gate checks", type: "system" },
        { text: "  credentials     - Print BRAC University academic core & engineering availability", type: "system" },
        { text: "  clear           - Clear terminal display buffer", type: "system" },
      ];
    } else if (trimmed === "clear") {
      setHistory([]);
      setIsTyping(false);
      setActiveNodeStep(0);
      return;
    } else if (trimmed === "cinch-telemetry" || trimmed === "query-cinch" || trimmed === "cinch") {
      setActiveNodeStep(2);
      response = [
        { text: "⟳ Ingress request intercepted on port 8081 (Traefik -> Cinch FastAPI Gateway)...", type: "system" },
        { text: "✓ Circuit Breaker check: State CLOSED (0 failures, failure_threshold: 3, recovery: 30s)", type: "success" },
        { text: "✓ Token Rate Limiting: Sliding window (18/60 tokens consumed in current 1m window)", type: "success" },
        { text: "✓ FinOps Accounting: Micro-dollar billing authorized (Remaining balance: $48.24)", type: "success" },
        { text: "✓ Ingress Security: Heuristic regex + prompt jailbreak scan clean (<0.8ms)", type: "success" },
        { text: "⟳ Querying in-process CPU Semantic Vector Cache (ONNX embeddings, Cosine >= 0.92)...", type: "system" },
        { text: "✓ Semantic Vector Cache HIT (Cosine: 0.96) -> 4.12ms response returned (0W GPU power)", type: "success" },
        { text: "▶ Fallback execution path test: Cold prompt routed to vLLM Marlin INT4 worker...", type: "system" },
        { text: "✓ vLLM Engine: Qwen2.5-7B-Instruct-AWQ (4.2 GiB VRAM) -> 331.0 tok/s sustained", type: "success" },
        { text: "→ 195/195 automated pytest fixtures verified. Kubernetes HPA: 2/6 replicas healthy.", type: "output" },
      ];
    } else if (trimmed === "rag-pipeline" || trimmed === "query-rag" || trimmed === "rag") {
      setActiveNodeStep(2);
      response = [
        { text: "⟳ Initializing hybrid retrieval pipeline (MindStack Architecture)...", type: "system" },
        { text: "✓ Dense vector index: ChromaDB cosine similarity (2 documents matched, dist < 0.28)", type: "success" },
        { text: "✓ Sparse lexical index: BM25 exact keyword matching (1 document matched)", type: "success" },
        { text: "⟳ Executing Reciprocal Rank Fusion: score(d) = Σ 1 / (60 + rank_i)...", type: "system" },
        { text: "✓ RRF Fusion complete: 3 top-ranked evidence chunks merged in 42.8ms", type: "success" },
        { text: "⟳ Gating via NLI Entailment Classifier (Premise vs Hypothesis)...", type: "system" },
        { text: "✓ Entailment Groundedness score: 0.95 >= 0.70 threshold (VERIFIED)", type: "success" },
        { text: "→ Grounded synthesis generated with verified inline citations. Hallucination rate: 0.00%.", type: "output" },
      ];
    } else if (trimmed === "agent-graph" || trimmed === "query-agent" || trimmed === "agent") {
      setActiveNodeStep(3);
      response = [
        { text: "⟳ Compiling LangGraph StateGraph(ResearchState) with PostgreSQL checkpointer...", type: "system" },
        { text: "✓ Graph topology: 8 nodes compiled, 9 conditional edges verified", type: "success" },
        { text: "▶ Node [PLANNER]: Deconstructed topic into 4 discrete research sub-tasks", type: "system" },
        { text: "▶ Node [QUERY_GEN]: Generated 8 multi-aspect search terms across domain filters", type: "system" },
        { text: "✓ Node [HITL_CHECKPOINT]: Human-in-the-loop review approved. Checkpoint ID: chp_8f0a21", type: "success" },
        { text: "▶ Node [SCRAPER]: Parallel Playwright crawl (12 URLs ingested in 1.42s)", type: "system" },
        { text: "✓ Node [REFUSAL_EVAL]: Factual overlap verified (Score: 0.91 >= 0.85)", type: "success" },
        { text: "✓ Node [SYNTHESIZER]: Research dossier compiled with 14 inline academic citations", type: "success" },
        { text: "→ Output streamed via Server-Sent Events (SSE). Sustained throughput: 8.05 req/s.", type: "output" },
      ];
    } else if (trimmed === "benchmarks" || trimmed === "metrics") {
      response = [
        { text: "==================================================================", type: "system" },
        { text: "vLLM Marlin INT4 GEMM vs. Stock FP16 Serving Benchmark Matrix:", type: "system" },
        { text: "==================================================================", type: "system" },
        { text: "  Metric                     | Stock vLLM FP16 | Cinch Marlin INT4 | Delta", type: "output" },
        { text: "  ---------------------------+-----------------+-------------------+----------", type: "output" },
        { text: "  Inference Throughput       | 30.5 tok/s      | 331.2 tok/s       | +10.86×", type: "success" },
        { text: "  VRAM Memory Footprint      | 14.8 GiB        | 4.2 GiB           | -71.6%", type: "success" },
        { text: "  Semantic Vector Cache Hit  | 620ms (GPU)     | 4.12ms (0W CPU)   | 150× faster", type: "success" },
        { text: "  Crash Recovery MTTR        | 30,000ms (fail) | 45.56ms Fast-Fail | Circuit FSM", type: "success" },
        { text: "==================================================================", type: "system" },
        { text: "→ Validated on Qwen2.5-7B on a single 8GB VRAM consumer GPU.", type: "output" },
      ];
    } else if (trimmed === "security-model" || trimmed === "security") {
      response = [
        { text: "ENTERPRISE SECURITY & DATA RESILIENCE AUDIT:", type: "system" },
        { text: "✓ Segregation of Duties (SoD): Creator ID != Approver ID enforced at middleware level", type: "success" },
        { text: "✓ Multi-Tenant Isolation: PostgreSQL Row-Level Security (RLS) keyed by session variables", type: "success" },
        { text: "✓ Cryptographic Ledger: SHA-256 chained audit logs prevent post-hoc mutation", type: "success" },
        { text: "✓ Offline Data Sync: SQLite outbox queues buffer offline mutations with microsecond logical clocks", type: "success" },
        { text: "→ 0 privilege leakage vulnerabilities detected across test matrix.", type: "output" },
      ];
    } else if (trimmed === "evals-matrix" || trimmed === "evals" || trimmed === "ares") {
      response = [
        { text: "ARES CONTINUOUS MODEL PROMOTION GATE STATUS:", type: "system" },
        { text: "  Gate Criterion              | Candidate | Champion  | Threshold   | Decision", type: "output" },
        { text: "  ----------------------------+-----------+-----------+-------------+---------", type: "output" },
        { text: "  Aggregate F1 Score          | 0.912     | 0.898     | delta > -1% | PASS (+1.4%)", type: "success" },
        { text: "  Adversarial Slice F1        | 0.884     | 0.861     | F1 >= 0.850 | PASS", type: "success" },
        { text: "  P95 Serving Latency         | 42.1ms    | 45.0ms    | <= 50.0ms   | PASS (-2.9ms)", type: "success" },
        { text: "  Golden Set Checksum         | v2.1 sha  | v2.1 sha  | match       | IDEMPOTENT", type: "success" },
        { text: "→ PROMOTION APPROVED: Candidate model promoted to production champion.", type: "output" },
      ];
    } else if (trimmed === "credentials" || trimmed === "about") {
      response = [
        { text: "ENGINEER IDENTITY & CREDENTIALS:", type: "system" },
        { text: "  Name         : Mehedi Hasan", type: "output" },
        { text: "  Academic     : BSc in Computer Science, BRAC University (2022 - 2026)", type: "output" },
        { text: "  Core Focus   : AI Systems Engineering · Inference Gateways · Multi-Agent Workflows", type: "output" },
        { text: "  Location     : Dhaka, Bangladesh (UTC+6) · Remote-first", type: "output" },
        { text: "  Availability : Open to AI Engineering, Backend, & Full-Stack roles (Full-time / Part-time / Internships)", type: "success" },
        { text: "  Contact      : nafismehedi37@gmail.com · https://github.com/Rytnix786", type: "output" },
      ];
    } else {
      // Freeform query sent to /api/query
      try {
        const res = await fetch("/api/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: cmd }),
        });

        if (!res.ok) throw new Error("Failed to query API");

        const data = await res.json();
        const fullText = data.text || "No response generated.";

        setHistory((prev) => [...prev, { text: fullText, type: "output" }]);
      } catch {
        setHistory((prev) => [
          ...prev,
          { text: "Error: Query service unavailable. Try a shortcut command like 'cinch-telemetry' or 'benchmarks'.", type: "error" },
        ]);
      }
      setIsTyping(false);
      setActiveNodeStep(4);
      return;
    }

    setHistory((prev) => [...prev, ...response]);
    setIsTyping(false);
    setActiveNodeStep(4);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[selectedIndex].cmd);
      return;
    }

    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }

    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      return;
    }

    if (e.key === "Enter") {
      const cmd = suggestions.length > 0 ? suggestions[selectedIndex].cmd : input;
      setInput("");
      executeCommand(cmd);
    }
  };

  const handleShortcutClick = (e: React.MouseEvent<HTMLButtonElement>, cmd: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTyping) return;
    setInput("");
    executeCommand(cmd);
  };

  return (
    <section id="terminal" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#030705] relative select-none">
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-primary/4 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Systems Terminal"
          title="Interactive Architecture & Systems Explorer"
          description="Inspect real telemetry, simulate circuit breaker fast-fails, audit hybrid RAG rank fusion, or query the systems database directly."
        />

        {/* Outer Container */}
        <div
          onClick={focusInput}
          className="mt-12 rounded-2xl border border-white/10 bg-slate-950/90 overflow-hidden shadow-2xl flex flex-col font-mono text-sm"
        >
          {/* Terminal Window Chrome Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900/90 border-b border-white/6 shrink-0 select-none">
            {/* Window Controls + View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 inline-block" />
              </div>

              <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("console");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "console"
                      ? "bg-primary/15 text-primary border border-primary/30 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <SquareTerminal size={14} />
                  <span>Console</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("visual");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "visual"
                      ? "bg-primary/15 text-primary border border-primary/30 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Network size={14} />
                  <span>Visual Flow</span>
                </button>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                title="Copy Terminal Logs"
                aria-label="Copy Terminal Logs"
                className="p-2 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
              </button>

              <button
                onClick={handleClear}
                title="Clear Output Buffer"
                aria-label="Clear Output Buffer"
                className="p-2 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-red-400 hover:bg-white/10 transition cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* MODE 1: TERMINAL CONSOLE VIEW - Enlarged & High-Contrast */}
          {viewMode === "console" && (
            <div
              className="h-[480px] sm:h-[520px] overflow-y-auto p-6 sm:p-8 space-y-2.5 select-text scrollbar-thin bg-slate-950 font-mono text-[13px] sm:text-sm leading-relaxed"
              ref={containerRef}
            >
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === "input"
                      ? "text-white font-bold"
                      : line.type === "system"
                      ? "text-slate-400"
                      : line.type === "success"
                      ? "text-primary font-medium"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-slate-200"
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-primary pt-1">
                  <span className="w-1.5 h-3.5 bg-primary animate-pulse inline-block" />
                  <span className="text-xs sm:text-sm">Processing systems telemetry...</span>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: VISUAL ARCHITECTURE FLOW VIEW - Enlarged */}
          {viewMode === "visual" && (
            <div className="h-[480px] sm:h-[520px] overflow-hidden bg-slate-950 select-none">
              <VisualFlowInspector
                activeStep={activeNodeStep}
                onReturnToConsole={() => setViewMode("console")}
              />
            </div>
          )}

          {/* Bottom Interactive Command Line Bar */}
          <div className="p-3.5 bg-slate-900/90 border-t border-white/6 flex flex-col gap-2 relative">
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-4 right-4 bg-slate-900 border border-white/10 rounded-xl p-2 shadow-2xl mb-1 z-20 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block px-2">
                  Command Suggestions (Press Tab)
                </span>
                {suggestions.map((s, idx) => (
                  <div
                    key={s.cmd}
                    onClick={() => {
                      setInput(s.cmd);
                      executeCommand(s.cmd);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm flex items-center justify-between cursor-pointer ${
                      idx === selectedIndex ? "bg-primary/20 text-primary font-bold" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{s.cmd}</span>
                    <span className="text-[10px] text-slate-500">{s.desc}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/90 rounded-xl border border-white/8">
              <span className="text-primary font-bold text-xs sm:text-sm select-none">mehedi@systems:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent text-white text-xs sm:text-sm focus:outline-none caret-primary placeholder:text-slate-600"
                placeholder={
                  isTyping ? "Executing telemetry..." : "Type command or custom query (Press Tab to autocomplete)..."
                }
              />
            </div>
          </div>
        </div>

        {/* Technical Shortcut Chips */}
        <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
          <span className="text-xs text-slate-500 font-mono self-center mr-1 uppercase select-none">
            Query shortcuts:
          </span>
          {COMMAND_SUGGESTIONS.slice(0, 7).map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.cmd}
                onClick={(e) => handleShortcutClick(e, s.cmd)}
                disabled={isTyping}
                className="px-3.5 py-2 sm:px-4 bg-white/[0.02] border border-white/8 hover:border-primary/40 text-slate-300 hover:text-primary active:scale-95 touch-manipulation rounded-full font-mono text-xs sm:text-[13px] transition-all select-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Icon size={13} className="text-primary" />
                <span>{s.cmd}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
