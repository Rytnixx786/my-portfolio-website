export const profile = {
  name: "Mehedi Hasan",
  role: "AI Systems Engineer",
  location: "Dhaka, Bangladesh",
  email: "nafismehedi37@gmail.com",
  github: "https://github.com/Rytnixx786",
  linkedin: "https://www.linkedin.com/in/mehedi-hasan-llm",
  resume: "/assets/Mehedi_Hasan_Resume_Main.docx",
  portrait: "/assets/mehedi-hasan-profile.jpg",
  headline:
    "I build AI systems that stay useful when the demo ends and reality starts.",
  summary:
    "CS undergraduate at BRAC University focused on RAG, multi-agent orchestration, backend systems, and products that fail honestly when evidence is missing.",
} as const;

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const metrics = [
  { value: "95%", label: "groundedness on factual QA" },
  { value: "195", label: "system & gateway tests maintained" },
  { value: "4.12ms", label: "semantic vector cache lookup (0W GPU)" },
] as const;

export const focusAreas = [
  {
    title: "LLM Serving & Gateway Control Planes",
    description:
      "AWQ Marlin INT4 quantization, sub-5ms semantic caching, 3-state circuit breakers, token rate limiting, and Kubernetes HPA.",
  },
  {
    title: "Grounded RAG",
    description:
      "Hybrid retrieval, evidence checks, refusal calibration, adversarial QA, and evaluation loops.",
  },
  {
    title: "Agentic Workflows",
    description:
      "Stateful LangGraph flows, tool use, memory, checkpoints, streamed execution, and human review.",
  },
  {
    title: "Backend Systems",
    description:
      "FastAPI, Node.js, PostgreSQL, Redis, Supabase, Docker, CI, and observable service boundaries.",
  },
  {
    title: "Product Delivery",
    description:
      "Mobile and web surfaces with offline-first sync, clean APIs, performance budgets, and deployable UX.",
  },
] as const;

export const skillGroups = [
  {
    title: "AI Systems & Serving",
    skills: ["vLLM", "AWQ Marlin", "Semantic Caching", "LangGraph", "RAG", "LLM evals", "Promptfoo"],
  },
  {
    title: "Models & Infra",
    skills: ["Qwen2.5-7B", "OpenAI", "Mistral", "Kubernetes", "k3d", "Docker", "Prometheus", "OpenTelemetry"],
  },
  {
    title: "Backend & Offline Sync",
    skills: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "Redis", "SQLite Sync", "Supabase"],
  },
  {
    title: "Mobile & Frontend",
    skills: ["React Native", "Expo Router", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
] as const;

export const projects = [
  {
    slug: "cinch",
    name: "Cinch",
    eyebrow: "Self-hosted LLM serving platform & async gateway",
    description:
      "A 14-stage asynchronous FastAPI gateway & INT4 Marlin quantized serving platform for Qwen2.5-7B on workstation GPUs with sub-5ms semantic caching, Kubernetes HPA, and multi-tenant FinOps governance.",
    impact:
      "10.86x throughput speedup (331 tok/s), 4.12ms semantic cache hits (0W GPU), 45ms circuit breaker fast-fail, 195 verified tests, and 2-to-6 replica HPA autoscaling on k3d.",
    highlightMetrics: [
      { value: "10.86×", label: "Throughput Speedup" },
      { value: "4.12ms", label: "Semantic Cache Hit" },
      { value: "195", label: "Verified Tests" },
      { value: "45ms", label: "Circuit Fast-Fail" },
    ],
    tech: ["Python", "FastAPI", "vLLM", "AWQ Marlin", "Kubernetes", "k3d", "Docker", "Prometheus", "OpenTelemetry", "ONNX", "Next.js"],
    href: "https://github.com/Rytnixx786/Cinch",
    challenge:
      "Serving LLMs in multi-tenant self-hosted environments creates severe operational challenges: raw vLLM workers lack security guardrails, budget allocation, and circuit breaking. Worker crashes cause 30-second TCP timeouts that cascade across microservices, while redundant prompt paraphrases repeatedly burn GPU cycles. Moreover, small models require strict EBNF JSON grammar enforcement to prevent broken downstream tool executions.",
    approach:
      "Built Cinch as an asynchronous 14-stage traffic governance gateway around Marlin W4A16 AWQ quantized vLLM backends. Integrated an in-process CPU ONNX semantic vector cache (cosine similarity >= 0.92) returning duplicate queries in 4.12ms with zero GPU power. Implemented a 3-state circuit breaker FSM that isolates GPU panics in 45.56ms (HTTP 503) and self-heals via canary probes. Added micro-dollar token accounting with hard HTTP 402 budget cutoffs, sliding-window rate limiting, AST JSON grammar repair, sandboxed server-side tool execution, and Kubernetes HPA autoscaling from 2 to 6 replicas under load.",
    architecture: {
      nodes: [
        { id: "circuit_breaker", label: "Circuit Breaker FSM", desc: "45ms fast-fail with automated canary probe MTTR recovery" },
        { id: "finops_gate", label: "FinOps Budget Gate", desc: "Pre-flight micro-dollar token cost accounting with HTTP 402 cutoff" },
        { id: "guardrails", label: "Security & PII Filter", desc: "Lightweight regex & heuristic scanner masking SSN/keys before GPU" },
        { id: "semantic_cache", label: "Semantic Vector Cache", desc: "In-process CPU cosine similarity cache returning hits in 4.12ms (0W GPU)" },
        { id: "rate_limiter", label: "Dual-Tier Limiter & Queue", desc: "Sliding-window 60 RPM / 50k TPM limiter with interactive priority queue" },
        { id: "vllm_engine", label: "vLLM Marlin Engine", desc: "INT4 W4A16 GEMM inference serving Qwen2.5-7B in 4.2 GiB VRAM" },
        { id: "tool_engine", label: "Sandboxed Tool Executor", desc: "Closed-loop execution for Python REPL, SQL runner, and math tools" },
        { id: "shadow_replayer", label: "Async Shadow Replayer", desc: "Fire-and-forget 5% candidate traffic duplication with Jaccard divergence score" },
      ],
      connections: [
        { from: "circuit_breaker", to: "finops_gate", label: "Breaker Closed" },
        { from: "finops_gate", to: "guardrails", label: "Budget OK" },
        { from: "guardrails", to: "semantic_cache" },
        { from: "semantic_cache", to: "rate_limiter", label: "Cache Miss" },
        { from: "rate_limiter", to: "vllm_engine", label: "Priority Scheduled" },
        { from: "vllm_engine", to: "tool_engine", label: "Tool Call Loop" },
        { from: "vllm_engine", to: "shadow_replayer", label: "Async Replay" },
        { from: "tool_engine", to: "vllm_engine", label: "Tool Output Re-inject" },
      ]
    },
    lessons: [
      "In-process CPU vector caching with pure Python TF-IDF and ONNX eliminates external Redis vector DB latency hops and avoids consuming precious GPU VRAM, delivering sub-5ms memoized responses with zero wattage overhead.",
      "A 3-state Circuit Breaker FSM prevents cascading failures: when upstream vLLM workers crash or encounter CUDA OOM, Cinch fast-fails incoming requests in 45.56ms (HTTP 503) instead of waiting for 30-second socket timeouts.",
      "Prefix caching and speculative decoding combine to slash Time-To-First-Token (TTFT) by 4.87x and accelerate per-token generation speed by 2.58x on consumer 8GB VRAM hardware."
    ],
    codeLanguage: "python",
    codeSnippet: `# Cinch: Async Circuit Breaker FSM & Canary Recovery (gateway/circuit_breaker.py)
import time
from enum import Enum
from typing import Optional, Tuple

class BreakerState(str, Enum):
    CLOSED = "CLOSED"
    OPEN = "OPEN"
    HALF_OPEN = "HALF_OPEN"

class CircuitBreaker:
    """Isolates GPU/vLLM backend panics in <46ms and canary-probes recovery."""
    def __init__(self, failure_threshold: int = 3, recovery_timeout_s: float = 10.0):
        self.state = BreakerState.CLOSED
        self.consecutive_failures = 0
        self.last_failure_time = 0.0
        self.canary_in_flight = False
        self.failure_threshold = failure_threshold
        self.recovery_timeout_s = recovery_timeout_s

    def can_execute(self) -> Tuple[bool, str, Optional[float]]:
        now = time.monotonic()
        if self.state == BreakerState.CLOSED:
            return True, "healthy", None

        if self.state == BreakerState.OPEN:
            elapsed = now - self.last_failure_time
            if elapsed >= self.recovery_timeout_s:
                self.state = BreakerState.HALF_OPEN
                self.canary_in_flight = False
            else:
                remaining = round(self.recovery_timeout_s - elapsed, 2)
                return False, f"Circuit breaker OPEN. Retry in {remaining}s", remaining

        if self.state == BreakerState.HALF_OPEN:
            if not self.canary_in_flight:
                self.canary_in_flight = True
                return True, "canary_probe", None
            return False, "Canary probe in-flight", 2.0

        return True, "healthy", None

    def record_success(self) -> None:
        self.state = BreakerState.CLOSED
        self.consecutive_failures = 0
        self.canary_in_flight = False

    def record_failure(self) -> None:
        self.consecutive_failures += 1
        self.last_failure_time = time.monotonic()
        self.canary_in_flight = False
        if self.consecutive_failures >= self.failure_threshold:
            self.state = BreakerState.OPEN`,
  },
  {
    slug: "nexus-researcher",
    name: "Nexus Researcher",
    eyebrow: "Stateful multi-agent research",
    description:
      "An 8-node LangGraph workflow with four-stage retrieval, human-in-the-loop approval, resumable SSE streaming, and PostgreSQL checkpointing.",
    impact:
      "8.05 req/s under sustained load, 91% refusal accuracy across adversarial cases, and 122 backend tests with zero failures.",
    highlightMetrics: [
      { value: "8.05 req/s", label: "Sustained Throughput" },
      { value: "91%", label: "Refusal Accuracy" },
      { value: "122", label: "Backend Tests (0 fails)" },
      { value: "8 Nodes", label: "LangGraph Flow" },
    ],
    tech: ["LangGraph", "FastAPI", "PostgreSQL", "SSE", "Redis", "Next.js"],
    href: "https://github.com/Rytnixx786/Nexus",
    challenge: 
      "Automated research systems often fail in production because they operate in a single shot. If the LLM enters a bad search query or encounters a broken link, the entire run fails. Furthermore, fully automated agents consume excessive tokens crawling irrelevant content and risk hallucinating synthesis summaries when web sources contain conflicting or sparse evidence.",
    approach: 
      "Designed an 8-node stateful agentic system using LangGraph. The workflow splits research into distinct stages: Planning, Query Formulation, Human Approval (to prune keywords and save costs), Parallel Web Scraping (with Redis-backed rate limiting), Extraction, Grounding Validation, Synthesis, and Refusal Calibration. State is persisted in PostgreSQL using custom checkpointers so interrupted runs can resume instantly from where they stopped. Streaming is achieved viaServer-Sent Events (SSE) for sub-second visual updates.",
    architecture: {
      nodes: [
        { id: "planner", label: "Research Planner", desc: "Deconstructs user prompt into factual sub-topics" },
        { id: "query_gen", label: "Query Generator", desc: "Generates multi-aspect search terms optimized for Google Search API" },
        { id: "hitl", label: "Human Loop Checkpoint", desc: "Interrupts execution for user validation/pruning of search terms" },
        { id: "scraper", label: "Parallel Scraper", desc: "Crawls HTML in parallel using Playwright, bypasses cookie walls" },
        { id: "extractor", label: "Context Extractor", desc: "Extracts key sentences matching sub-topics using dense embeddings" },
        { id: "refusal", label: "Refusal Evaluator", desc: "Verifies if sources have enough evidence; scores groundedness" },
        { id: "synthesizer", label: "Report Synthesizer", desc: "Generates markdown dossier with inline academic citations" },
      ],
      connections: [
        { from: "planner", to: "query_gen" },
        { from: "query_gen", to: "hitl" },
        { from: "hitl", to: "scraper", label: "Approved" },
        { from: "scraper", to: "extractor" },
        { from: "extractor", to: "refusal" },
        { from: "refusal", to: "synthesizer", label: "Groundedness > 0.85" },
        { from: "refusal", to: "planner", label: "Failed (Re-plan)" }
      ]
    },
    lessons: [
      "Initially used Redis for checkpointing but found it inadequate for recovering long-running sessions after server crashes. Migrating checkpointers to PostgreSQL schema-level isolation added 12ms latency, which we neutralized by layering an in-memory cache for warm runs.",
      "Parallel scraping caused rate-limit blocks. Implemented a token-bucket rate limiter in Redis to self-regulate outgoing request spikes."
    ],
    codeLanguage: "python",
    codeSnippet: `# Nexus Researcher: LangGraph Stateful Multi-Agent Workflow (workflow.py)
from typing import TypedDict, Annotated, List, Dict, Any
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver

class ResearchState(TypedDict):
    topic: str
    sub_queries: List[str]
    is_approved: bool
    scraped_documents: List[Dict[str, Any]]
    groundedness_score: float
    citation_dossier: str

# Instantiate state graph with typed schema
workflow = StateGraph(ResearchState)

# Register execution nodes
workflow.add_node("planner", plan_research_subtopics)
workflow.add_node("query_generator", generate_focused_queries)
workflow.add_node("human_approval", hitl_checkpoint_node)
workflow.add_node("parallel_scraper", scrape_with_rate_limits)
workflow.add_node("refusal_check", evaluate_groundedness_score)
workflow.add_node("synthesizer", compile_citation_dossier)

# Define transitions & conditional gates
workflow.add_edge(START, "planner")
workflow.add_edge("planner", "query_generator")
workflow.add_edge("query_generator", "human_approval")
workflow.add_conditional_edges(
    "human_approval",
    lambda state: "parallel_scraper" if state["is_approved"] else "planner"
)
workflow.add_edge("parallel_scraper", "refusal_check")
workflow.add_conditional_edges(
    "refusal_check",
    lambda state: "synthesizer" if state["groundedness_score"] >= 0.85 else "planner"
)
workflow.add_edge("synthesizer", END)

# Compile with PostgreSQL checkpointer for resumable SSE streaming
app = workflow.compile(checkpointer=AsyncPostgresSaver(connection_pool))`,
  },
  {
    slug: "ares",
    name: "ARES",
    eyebrow: "ML model evaluation & promotion gate",
    description:
      "A Python 3.11+ model regression detection system that evaluates candidates against a golden dataset, compares them to the live champion, applies configurable promotion gate rules, and records every decision trail.",
    impact:
      "92%+ pytest coverage enforced in CI, idempotent evaluations keyed by commit SHA, configurable F1/accuracy/latency/slice regression gates, full Prometheus observability, and a Streamlit operator dashboard.",
    highlightMetrics: [
      { value: "92%+", label: "CI Test Coverage" },
      { value: "Idempotent", label: "Commit-SHA Keyed" },
      { value: "Multi-Slice", label: "Regression Detection" },
      { value: "Automated", label: "Promotion Gate in CI" },
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "Streamlit", "Docker", "GitHub Actions", "DVC"],
    href: "https://github.com/Rytnixx786/Ares",
    challenge:
      "ML teams promoting models without rigorous evidence create silent production regressions: a model with a higher aggregate accuracy score can still fail on critical demographic slices or underperform on latency. Most pipelines lack idempotent evaluation records, champion history, and configurable slice-specific gates — making repeatable and auditable promotion decisions impossible.",
    approach:
      "Built ARES as a full evaluation orchestration system. The core is a configurable `rules_engine` that checks candidate metrics against the active champion across F1, accuracy, precision, recall, critical slice performance, model size, and statistical significance. Evaluations are keyed by `commit_sha + golden_set_version + model_name` for idempotency. Results are persisted via async SQLAlchemy into PostgreSQL, exposed through a FastAPI API with API-key auth and rate limiting, and surfaced in a Streamlit dashboard with leaderboard, drill-down, drift monitor, and promotion workflow pages. GitHub Actions workflows gate every PR with quality and regression checks.",
    architecture: {
      nodes: [
        { id: "ci", label: "GitHub Actions", desc: "quality.yml / regression_gate.yml / drift_monitor.yml trigger evaluations on each PR" },
        { id: "cli", label: "Evaluation CLI", desc: "scripts/run_evaluation.py orchestrates the full evaluation run" },
        { id: "golden", label: "Golden Set Validator", desc: "Validates checksum, row counts, class balance, and slice distributions" },
        { id: "eval", label: "Evaluators", desc: "BaseEvaluator + concrete classification/regression/detection evaluators" },
        { id: "gate", label: "Promotion Gate", desc: "rules_engine applies F1, accuracy, latency, slice, and significance gates" },
        { id: "db", label: "PostgreSQL DB", desc: "SQLAlchemy models store runs, champions, drift reports, audit logs" },
        { id: "api", label: "FastAPI API", desc: "Authenticated endpoints with Prometheus instrumentation and webhooks" },
        { id: "dash", label: "Streamlit Dashboard", desc: "Leaderboard, drill-down, drift monitor, and promotion workflow UI" },
      ],
      connections: [
        { from: "ci", to: "cli" },
        { from: "cli", to: "golden" },
        { from: "golden", to: "eval" },
        { from: "eval", to: "gate" },
        { from: "gate", to: "db", label: "Persist Decision" },
        { from: "db", to: "api" },
        { from: "api", to: "dash" },
        { from: "gate", to: "api", label: "Promoted / Rejected" },
      ]
    },
    lessons: [
      "Aggregate metrics hide slice-level regressions. A model improving overall F1 by 2% can lose 15% on a specific demographic slice. Implementing mandatory critical-slice gates revealed real regressions that were previously invisible.",
      "Idempotent evaluations are non-negotiable in CI. Without commit-SHA + golden-set-version keying, re-running pipelines on the same commit produced duplicated records that corrupted the champion leaderboard."
    ],
    codeLanguage: "python",
    codeSnippet: `# ARES Promotion Gate — rules_engine.py
class RulesEngine:
    def __init__(self, config: GateConfig):
        self.config = config
    
    def evaluate(self, candidate: EvalResult, champion: EvalResult) -> GateDecision:
        failures = []
        
        # Core metric regression gates
        for metric, threshold in self.config.metric_gates.items():
            delta = candidate.metrics[metric] - champion.metrics[metric]
            if delta < -threshold:
                failures.append(
                    f"{metric} regressed {delta:.4f} (gate: {threshold})"
                )
        
        # Critical slice gates (e.g. specific demographics or edge cases)
        for slice_name, min_f1 in self.config.critical_slices.items():
            if candidate.slices[slice_name]["f1"] < min_f1:
                failures.append(
                    f"Critical slice '{slice_name}' failed (f1={candidate.slices[slice_name]['f1']:.3f} < {min_f1})"
                )
        
        # Latency gate
        if candidate.p95_latency_ms > self.config.max_latency_ms:
            failures.append(f"Latency {candidate.p95_latency_ms}ms exceeds gate {self.config.max_latency_ms}ms")
        
        return GateDecision(
            passed=len(failures) == 0,
            failures=failures,
            narrative=self._build_narrative(candidate, champion, failures)
        )`,
  },
  {
    slug: "mindstack",
    name: "MindStack",
    eyebrow: "Production RAG system",
    description:
      "A hybrid BM25 plus ChromaDB retrieval system designed to answer only when supporting evidence is present.",
    impact:
      "Reached 95% groundedness and improved refusal accuracy from 26.67% to 66.67% with CI-backed adversarial tests.",
    highlightMetrics: [
      { value: "95%", label: "QA Groundedness" },
      { value: "66.7%", label: "Adversarial Refusal" },
      { value: "k = 60", label: "RRF Fusion Constant" },
      { value: "Hybrid", label: "BM25 + ChromaDB" },
    ],
    tech: ["FastAPI", "React", "Docker", "ChromaDB", "BM25", "Mistral"],
    href: "https://github.com/Rytnixx786/MindStack",
    challenge:
      "Vector-only retrieval models often return irrelevant results for specific keywords or product codes because semantic searches lack word-level exact matches. In production, this causes the LLM generator to hallucinate answers using out-of-context documents rather than admitting it doesn't know.",
    approach:
      "Implemented a hybrid search pipeline. Combined dense vectors (ChromaDB + OpenAI text-embedding-3-small) with sparse indices (BM25) using Reciprocal Rank Fusion (RRF) with a parameter constant (k=60). Developed a Custom Refusal Classifier. Before passing contexts to the generator, a calibrated evaluation step calculates the overlap and entailment scores. If the context fails to support the query premises, the system refuses to answer, preventing hallucinations at the source.",
    architecture: {
      nodes: [
        { id: "query", label: "User Query", desc: "Incoming search query" },
        { id: "dense", label: "ChromaDB Dense", desc: "Retrieves semantic contexts using cosine distance" },
        { id: "sparse", label: "BM25 Sparse", desc: "Retrieves exact keyword matches from token index" },
        { id: "rrf", label: "RRF Merger", desc: "Combines dense & sparse rankings using Reciprocal Rank Fusion" },
        { id: "filter", label: "Evidence Filter", desc: "Evaluates factual grounding; drops unsupported claims" },
        { id: "generator", label: "LLM Generator", desc: "Formulates final, citation-linked markdown answer" }
      ],
      connections: [
        { from: "query", to: "dense" },
        { from: "query", to: "sparse" },
        { from: "dense", to: "rrf" },
        { from: "sparse", to: "rrf" },
        { from: "rrf", to: "filter" },
        { from: "filter", to: "generator", label: "Evidence Check Pass" },
        { from: "filter", to: "query", label: "Refusal Triggered" }
      ]
    },
    lessons: [
      "Found that simple cosine similarity thresholding was too sensitive to formatting changes in docs. Switching to RRF + NLI (Natural Language Inference) entailment classifier stabilized groundedness scores across unstructured documents.",
      "Chunk size optimization is a balancing act. Small chunks (128 tokens) maximized retrieval precision but deprived the generator of surrounding context. Standardized on parent-child chunking (retrieve small, serve large)."
    ],
    codeLanguage: "python",
    codeSnippet: `def reciprocal_rank_fusion(dense_results, sparse_results, k=60):
    fused_scores = {}
    for rank, doc in enumerate(dense_results):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (rank + k)
    for rank, doc in enumerate(sparse_results):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (rank + k)
    
    # Sort and return combined documents
    sorted_docs = sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_map[doc_id] for doc_id, _ in sorted_docs[:5]]

def check_groundedness(query, retrieved_chunks):
    entailment_score = nli_model.predict(query, retrieved_chunks)
    if entailment_score < 0.70:
        raise RefusalException("Insufficient supporting evidence in database.")
    return True`,
  },
  {
    slug: "offboarder",
    name: "OFFBoarder",
    eyebrow: "Security-first enterprise platform",
    description:
      "A multi-tenant offboarding platform with strict tenant isolation, RBAC, segregation-of-duties controls, and immutable audit packs.",
    impact:
      "Owned the product end to end: data model, API layer, auth flows, dashboard, workflow orchestration, and audit design.",
    highlightMetrics: [
      { value: "SoD Enforced", label: "Creator ≠ Approver" },
      { value: "SHA-256", label: "Chained Audit Ledger" },
      { value: "Postgres RLS", label: "Tenant Isolation" },
      { value: "Zero Leak", label: "Transactional Outbox" },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "RBAC"],
    href: "https://github.com/Rytnixx786/OFF-Boarder",
    challenge:
      "Employee offboarding in large companies creates massive security holes if access revocation is not verified or if admins can act unilaterally. Backdoor accounts are frequently left active, and standard SaaS tools do not provide immutable cryptographic auditing, making tampering easy and breach tracing impossible.",
    approach:
      "Built a secure multi-tenant dashboard. Implemented strict Row-Level Security (RLS) on PostgreSQL via Prisma. Enforced Segregation of Duties (SoD) via middleware: the creator of an offboarding task cannot be the approver. Created a cryptographic ledger using SHA-256 hashing where every access revocation action is appended into an immutable, chained audit table, forming a tamper-proof security log.",
    architecture: {
      nodes: [
        { id: "client", label: "Enterprise Admin UI", desc: "Next.js dashboard with strict RBAC views" },
        { id: "middleware", label: "SoD Middleware", desc: "Validates role and checks for creator/approver collisions" },
        { id: "db_rls", label: "Postgres RLS", desc: "Filters queries dynamically at database level based on Tenant ID" },
        { id: "revoker", label: "API Revoker Agent", desc: "Automates API calls to AD/Okta to terminate accounts" },
        { id: "audit", label: "Cryptographic Ledger", desc: "Hashes actions and links them sequentially in a blockchain-style log" }
      ],
      connections: [
        { from: "client", to: "middleware" },
        { from: "middleware", to: "db_rls", label: "Pass" },
        { from: "db_rls", to: "revoker" },
        { from: "revoker", to: "audit" }
      ]
    },
    lessons: [
      "Learned that multi-tenancy at the application layer is prone to leakage. We solved this by enforcing tenant contexts directly inside database connections using PostgreSQL session variables instead of simple WHERE clauses in Prisma.",
      "External API timeouts (e.g. Okta rate limits) caused audit logs to desync. Re-architected revocation to use transactional outbox patterns with dynamic retries."
    ],
    codeLanguage: "typescript",
    codeSnippet: `// Segregation of Duties Middleware (middleware/sod.ts)
export async function enforceSegregationOfDuties(req: Request) {
  const user = req.user;
  const taskId = req.params.taskId;
  
  const task = await prisma.offboardingTask.findUnique({
    where: { id: taskId }
  });
  
  if (!task) throw new NotFoundException();
  
  // Creator of the task cannot approve or execute it
  if (task.creatorId === user.id) {
    throw new ForbiddenException(
      "Segregation of Duties Enforced: Creators cannot approve their own tasks."
    );
  }
  
  if (!user.roles.includes("SEC_OFFICER")) {
    throw new UnauthorizedException("Security approval credentials required.");
  }
  
  return true;
}`,
  },
  {
    slug: "masheba-ai",
    name: "MaSheba AI",
    eyebrow: "Offline-first healthcare assistant",
    description:
      "A Bangla maternal health platform for mothers and community health workers, built around local persistence and resilient sync.",
    impact:
      "Implemented SQLite sync, Supabase-backed storage, on-device vitals triage, and Bangla clinical chat workflows.",
    highlightMetrics: [
      { value: "Offline-First", label: "Local SQLite Storage" },
      { value: "Resilient", label: "Outbox Sync Queue" },
      { value: "Zero Loss", label: "Microsecond Clock Sync" },
      { value: "Bangla NLP", label: "Clinical Chat & Triage" },
    ],
    tech: ["React Native", "Expo Router", "SQLite", "Supabase", "FastAPI", "PostgreSQL"],
    href: "https://github.com/DigontaDas/MaSheba--AI",
    docs: "https://masheba-docs.vercel.app/docs",
    challenge:
      "Community healthcare workers in rural Bangladesh travel to remote villages with poor or non-existent cellular reception. When offline, medical worker applications often crash or lose vital patient records, while online-only systems prevent record inputs, leaving critical symptoms untriaged.",
    approach:
      "Developed a robust offline-first architecture for React Native using SQLite (via Expo SQLite) for local persistence. Designed a background sync queue that buffers write operations locally with auto-incrementing sequencing. Upon network detection, a sync engine flushes the queue via transactional payloads to Supabase, automatically resolving schema conflicts using last-write-wins and client-side merge policies.",
    architecture: {
      nodes: [
        { id: "mobile_ui", label: "React Native UI", desc: "Bengali interface displaying offline triage widgets" },
        { id: "sqlite", label: "Local SQLite DB", desc: "Instant local reads and writes with zero latency" },
        { id: "queue", label: "Outbox Sync Queue", desc: "Buffers serialized mutations while offline" },
        { id: "sync_engine", label: "Sync Coordinator", desc: "Listens for online states, coordinates batches" },
        { id: "gateway", label: "FastAPI Gateway", desc: "Validates payloads, inserts into centralized Supabase DB" }
      ],
      connections: [
        { from: "mobile_ui", to: "sqlite" },
        { from: "sqlite", to: "queue" },
        { from: "queue", to: "sync_engine" },
        { from: "sync_engine", to: "gateway", label: "Network Restored" }
      ]
    },
    lessons: [
      "UUID collisons and out-of-order execution were common in early sync cycles. We replaced sequential integers with client-side UUID v4s and tracked timestamps down to microseconds, establishing logical clocks to handle conflict resolution.",
      "Large media uploads (e.g. photos of prescriptions) choked cellular connections. Wrote background chunked upload queues that resume from the byte offset on reconnection."
    ],
    codeLanguage: "typescript",
    codeSnippet: `// SQLite Outbox Sync Queue Handler (services/sync.ts)
export async function flushSyncQueue() {
  const pendingMutations = await db.all(
    "SELECT * FROM sync_queue ORDER BY timestamp ASC LIMIT 50"
  );
  
  if (pendingMutations.length === 0) return;
  
  try {
    const response = await fetch("https://api.masheba.ai/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mutations: pendingMutations })
    });
    
    if (response.ok) {
      const idsToDelete = pendingMutations.map(m => m.id);
      await db.run(
        \`DELETE FROM sync_queue WHERE id IN (\${idsToDelete.join(",")})\`
      );
    }
  } catch (error) {
    console.error("Sync batch failed. Will retry on network state change.", error);
  }
}`,
  },
] as const;

export const journey = [
  {
    date: "2022 - 2026",
    title: "BSc in Computer Science",
    org: "BRAC University",
    description:
      "Core computer science foundation focusing on operating systems boundaries, database query optimization, algorithm analysis, and network communication constraints.",
    tags: [
      "Algorithms & Data Structures",
      "Operating Systems",
      "Relational Databases",
      "Artificial Intelligence",
      "Computer Networks",
      "Software Engineering",
    ],
  },
  {
    date: "2025",
    title: "Independent AI Systems Builder",
    org: "Self-Directed Systems Engineering",
    description:
      "Engineered production-minded AI infrastructure: Cinch (quantized serving gateway with 4.12ms cache), Nexus Researcher (stateful LangGraph agent with Postgres checkpointers), and ARES (CI model regression gates). Enforced automated testing and Prometheus observability.",
    tags: [
      "vLLM & Marlin INT4",
      "LangGraph StateGraph",
      "FastAPI & PostgreSQL",
      "CI/CD Regression Gates",
      "Kubernetes & Docker",
    ],
  },
  {
    date: "Now",
    title: "Available for Engineering Roles",
    org: "Remote-first · UTC+6",
    description:
      "Actively seeking AI engineering, backend systems, and full-stack engineering roles, part-time contracts, or internships. Ready to ship reliable, verifiable software.",
    tags: [
      "Full-Time & Part-Time",
      "Internships",
      "AI / Backend Engineering",
      "Contract & Project Work",
    ],
  },
] as const;
