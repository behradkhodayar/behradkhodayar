/*
 * taxonomy.data.ts — SINGLE SOURCE OF TRUTH
 * ------------------------------------------
 * Ported from the original vanilla `taxonomy.data.js` (v0.1), itself
 * transcribed from agentic-coding-stack-taxonomy.md.
 * Per §5.1: "Render the chart FROM this ontology, not the reverse."
 * The view is a projection over the addressed nodes — edit this file,
 * the views regenerate.
 */

export type Stage =
  | "intent"
  | "client"
  | "harness"
  | "api"
  | "engine"
  | "world";

export type TaxNode = {
  id: string;
  title: string;
  tag?: string;
  summary?: string;
  note?: string;
  desc?: string;
  boundary?: boolean;
  fractal?: boolean;
  recurses?: boolean;
  children?: TaxNode[];
  // lifecycle-phase fields
  layers?: string[];
  stage?: Stage;
  loopStart?: boolean;
  loopEnd?: boolean;
  external?: boolean;
};

export type EdgeType =
  | "impl"
  | "provenance"
  | "concern"
  | "recursion"
  | "routing";

export type Edge = { from: string; to: string; type: EdgeType; label: string };

export type Taxonomy = {
  meta: { version: string; title: string; subtitle: string; blurb: string };
  lifecycle: TaxNode[];
  crosscutThread: { id: string; label: string }[];
  layers: TaxNode[];
  planes: TaxNode[];
  provenance: TaxNode[];
  edges: Edge[];
};

export const TAXONOMY: Taxonomy = {
  meta: {
    version: "0.1",
    title: "The Agentic Coding Stack",
    subtitle: "UI to UI — User Intent to User Interface",
    blurb:
      "What actually happens between a user pressing Enter on a prompt and a " +
      "rendered result landing back on their screen. Four orthogonal projections " +
      "of one system: the journey a request takes (Axis B), the layers it is built " +
      "on (Axis A), the concerns that cut across them (Axis C), and where every " +
      "runtime artifact came from (Axis D).",
  },

  lifecycle: [
    {
      id: "Φ0",
      title: "Intent formation",
      desc:
        "A goal forms in the user's head — typically underspecified and revisable. " +
        "This is the true origin of the request; everything downstream is an attempt " +
        "to faithfully serve an intent that was never fully written down.",
      layers: ["L0"],
      stage: "intent",
    },
    {
      id: "Φ1",
      title: "Input capture",
      desc:
        "Keystrokes become a prompt: line editing, multiline, paste handling, history, " +
        "IME, keybindings. The articulation of intent into text.",
      layers: ["L1.b"],
      stage: "client",
    },
    {
      id: "Φ2",
      title: "Prompt preprocessing",
      desc:
        "Slash commands and @-file references are resolved; special syntax expanded " +
        "before the prompt is handed to the agent.",
      layers: ["L1.b", "L2.j"],
      stage: "client",
    },
    {
      id: "Φ3",
      title: "Context assembly",
      desc:
        "'Context engineering': system prompt + tool schemas + memory + conversation " +
        "history + retrieval + budgeting are stitched into one request. The loop re-enters " +
        "here every turn with appended context.",
      layers: ["L2.b"],
      stage: "harness",
      loopStart: true,
    },
    {
      id: "Φ4",
      title: "Request construction & tokenization",
      desc:
        "The assembled context is serialized into the API's message schema and tokenized " +
        "at the boundary (chat template, special tokens).",
      layers: ["L2.i", "L3.1", "L3.4"],
      stage: "api",
    },
    {
      id: "Φ5",
      title: "Transport to engine",
      desc: "The request travels the literal pipes (HTTP/2, SSE, TLS) to the serving engine.",
      layers: ["L3.3", "C9"],
      stage: "api",
    },
    {
      id: "Φ6",
      title: "Admission · scheduling · batching",
      desc:
        "The engine admits and queues the request, schedules it (priority, fairness, " +
        "preemption) and folds it into a continuous in-flight batch.",
      layers: ["L4.a"],
      stage: "engine",
    },
    {
      id: "Φ7",
      title: "Prefill",
      desc:
        "A single parallel forward pass over the whole prompt — the compute-heavy phase. " +
        "FLOPs flow all the way down to the silicon.",
      layers: ["L5.d", "L6", "L7", "L8"],
      stage: "engine",
    },
    {
      id: "Φ8",
      title: "Decode loop",
      desc:
        "Token-by-token generation: sampling, KV-cache growth, one forward step per token. " +
        "An autoregressive loop nested inside the agent loop.",
      layers: ["L4.c", "L4.b", "L5", "L7"],
      stage: "engine",
    },
    {
      id: "Φ9",
      title: "Stream back",
      desc: "Generated tokens stream back over SSE/chunked transport to the harness.",
      layers: ["L3.3", "L2.i"],
      stage: "api",
    },
    {
      id: "Φ10",
      title: "Incremental parse",
      desc:
        "The harness classifies the incoming token stream on the fly: visible text vs. " +
        "tool-call vs. thinking — extracting structured intent from a flat stream.",
      layers: ["L2.i.3"],
      stage: "harness",
    },
    {
      id: "Φ11",
      title: "Tool dispatch & execution",
      desc:
        "The agent acts on the world: filesystem edits, shell, search, git, web, MCP servers. " +
        "MAY RECURSE — a sub-agent or MCP sampling re-enters the entire loop at Φ3.",
      layers: ["L2.c", "L2.f"],
      stage: "harness",
      recurses: true,
    },
    {
      id: "Φ12",
      title: "Tool-result capture",
      desc: "Tool output is captured, formatted and truncated back into context-ready form.",
      layers: ["L2.c.4"],
      stage: "harness",
    },
    {
      id: "Φ13",
      title: "Loop decision",
      desc:
        "Continue, spawn a sub-agent, or finish? If not done, loop back to Φ3 with the " +
        "appended context. This is the hinge of the agent loop.",
      layers: ["L2.a", "L2.d", "L2.e"],
      stage: "harness",
      loopEnd: true,
    },
    {
      id: "Φ14",
      title: "Final synthesis",
      desc: "Once the done-signal fires, the agent composes its final answer.",
      layers: ["L2.a.4"],
      stage: "harness",
    },
    {
      id: "Φ15",
      title: "Output rendering",
      desc:
        "The result becomes the User Interface: streamed Markdown, syntax-highlighted diffs, " +
        "tables, files written. Intent has become interface.",
      layers: ["L1.c"],
      stage: "client",
    },
    {
      id: "Φ16",
      title: "State persistence",
      desc: "Session, transcript, checkpoints and artifacts are durably stored for resume.",
      layers: ["L2.h"],
      stage: "harness",
    },
    {
      id: "Φ17",
      title: "Side effects on the world",
      desc:
        "Files on disk, git commits, processes spawned — the irreversible footprint the " +
        "request leaves outside the system.",
      layers: [],
      stage: "world",
      external: true,
    },
  ],

  crosscutThread: [
    { id: "C1", label: "tracing" },
    { id: "C3", label: "permission checks" },
    { id: "C4", label: "cost accounting" },
    { id: "C5", label: "cache reads/writes" },
  ],

  layers: [
    {
      id: "L0",
      title: "Human / Intent",
      tag: "top boundary",
      summary: "The human and the intent we model the interface to — not the psychology of it.",
      children: [
        { id: "L0.1", title: "Goal / intent", note: "typically underspecified, revisable" },
        { id: "L0.2", title: "Mental model of the tool's capabilities & limits" },
        { id: "L0.3", title: "Prompt as the encoding of intent", note: "articulation" },
        { id: "L0.4", title: "Gulf of execution / evaluation", note: "Norman; intent→articulation→interpretation→evaluation" },
        { id: "L0.5", title: "Human cognition, prompting skill", note: "boundary — named, out of internal scope", boundary: true },
      ],
    },
    {
      id: "L1",
      title: "Interface / Client",
      tag: "UI in → UI out",
      summary: "Where intent enters as text and the result leaves as a rendered interface.",
      children: [
        { id: "L1.a", title: "Modality & shell", note: "TUI / CLI / IDE extension / web / desktop app" },
        { id: "L1.b", title: "Input subsystem", note: "line editing, multiline, paste, history, IME, keybindings (vi/emacs), autocomplete, slash commands, @-file refs, #/special syntax, drag-drop" },
        { id: "L1.c", title: "Output / rendering", note: "token streaming, Markdown, syntax highlighting, diff rendering, tables, spinners/progress, status line (model / tokens / cost / context %)" },
        { id: "L1.d", title: "Interaction control", note: "approval/permission prompts, interrupts (Ctrl-C/Esc), confirmations, mode switches (plan / auto-accept / edit)" },
        { id: "L1.e", title: "Session UX", note: "scrollback, transcript, resume, branch navigation" },
        { id: "L1.f", title: "Local config surface", note: "settings files, themes, profiles, keymaps" },
        { id: "L1.g", title: "OS integration", note: "notifications, clipboard, terminal capabilities, ANSI" },
      ],
    },
    {
      id: "L2",
      title: "Agent / Harness / Orchestration",
      tag: "the brain stem",
      summary: "The largest layer — the agent runtime. Distinct responsibilities, each its own subsystem.",
      children: [
        {
          id: "L2.a", title: "Control loop / runtime", children: [
            { id: "L2.a.1", title: "Core loop", note: "perceive→reason→act→observe; ReAct, Yao et al. 2022" },
            { id: "L2.a.2", title: "Turn management", note: "single vs multi-turn agentic" },
            { id: "L2.a.3", title: "Termination conditions", note: "done signal, max steps, budget, user stop" },
            { id: "L2.a.4", title: "Step typing", note: "reasoning / tool-call / final-answer" },
            { id: "L2.a.5", title: "Reasoning↔action interleaving policy" },
          ],
        },
        {
          id: "L2.b", title: "Context / prompt assembly", note: "context engineering", children: [
            { id: "L2.b.1", title: "System prompt", note: "identity, instructions, policies" },
            { id: "L2.b.2", title: "Tool/function schema injection" },
            { id: "L2.b.3", title: "Memory injection", note: "project memory (CLAUDE.md / AGENTS.md), user memory, layered/hierarchical memory" },
            { id: "L2.b.4", title: "Conversation-history serialization" },
            { id: "L2.b.5", title: "Working set / open files / environment snapshot" },
            { id: "L2.b.6", title: "Retrieved context", note: "RAG over codebase/docs — see C6" },
            { id: "L2.b.7", title: "Context-window budgeting & truncation policy" },
            { id: "L2.b.8", title: "Compaction / summarization / rolling memory", note: "overflow handling" },
            { id: "L2.b.9", title: "Prompt templates & chat-template formatting", note: "special tokens" },
            { id: "L2.b.10", title: "Few-shot / dynamic exemplar selection" },
          ],
        },
        {
          id: "L2.c", title: "Tooling subsystem", note: "the agent's hands", children: [
            { id: "L2.c.1", title: "Tool registry & schema", note: "JSON-Schema params" },
            { id: "L2.c.2", title: "Tool selection / dispatch" },
            { id: "L2.c.3", title: "Execution", note: "sync/async, parallel tool calls" },
            { id: "L2.c.4", title: "Result formatting & truncation" },
            {
              id: "L2.c.5", title: "Built-in tool families", children: [
                { id: "L2.c.5.fs", title: "Filesystem", note: "read / write / create / edit (search-replace, patch/diff apply) / multi-edit / list / glob" },
                { id: "L2.c.5.search", title: "Search & nav", note: "grep/ripgrep, glob, semantic/code search, symbol search" },
                { id: "L2.c.5.shell", title: "Shell/exec", note: "command run, background processes, REPL" },
                { id: "L2.c.5.vcs", title: "VCS", note: "git" },
                { id: "L2.c.5.web", title: "Web", note: "search, fetch/scrape" },
                { id: "L2.c.5.ci", title: "Code intelligence", note: "LSP, AST/refactor, linter/formatter/type-checker, test runner, build/compile" },
                { id: "L2.c.5.data", title: "Data/notebook tools" },
                { id: "L2.c.5.task", title: "Task mgmt", note: "todo / plan tracking" },
              ],
            },
            { id: "L2.c.6", title: "Tool error handling & retries" },
          ],
        },
        {
          id: "L2.d", title: "Planning & decomposition", children: [
            { id: "L2.d.1", title: "Task/goal decomposition" },
            { id: "L2.d.2", title: "To-do / plan representation & tracking" },
            { id: "L2.d.3", title: "Plan-then-execute vs interleaved" },
            { id: "L2.d.4", title: "Reflection / self-critique / verification loops" },
            { id: "L2.d.5", title: "Backtracking / replanning" },
          ],
        },
        {
          id: "L2.e", title: "Multi-agent / sub-agent orchestration", children: [
            { id: "L2.e.1", title: "Sub-agent spawning & delegation" },
            { id: "L2.e.2", title: "Orchestrator/worker (supervisor) patterns" },
            { id: "L2.e.3", title: "Inter-agent messaging" },
            { id: "L2.e.4", title: "Role specialization", note: "planner / coder / reviewer / tester" },
            { id: "L2.e.5", title: "Shared state / blackboard" },
            { id: "L2.e.6", title: "Result aggregation" },
            { id: "L2.e.7", title: "Agent-to-agent protocols", note: "e.g. A2A" },
          ],
        },
        {
          id: "L2.f", title: "External-capability protocol: MCP", note: "client side", children: [
            { id: "L2.f.1", title: "MCP client" },
            { id: "L2.f.2", title: "Transports", note: "stdio, HTTP+SSE, streamable HTTP" },
            { id: "L2.f.3", title: "Capability negotiation / discovery" },
            { id: "L2.f.4", title: "Primitives", note: "resources, tools, prompts" },
            { id: "L2.f.5", title: "Server lifecycle & config management" },
            { id: "L2.f.6", title: "Sampling", note: "server-initiated LLM calls — fractal recursion point", fractal: true },
            { id: "L2.f.7", title: "Security surface → C3" },
          ],
        },
        {
          id: "L2.g", title: "Permissions / safety / sandboxing", note: "agent-local enforcement", children: [
            { id: "L2.g.1", title: "Permission model", note: "allow/deny/ask, scopes" },
            { id: "L2.g.2", title: "Approval gates / human-in-the-loop" },
            { id: "L2.g.3", title: "Sandboxing", note: "containers, microVMs, seccomp/landlock, FS jail, network egress control" },
            { id: "L2.g.4", title: "Secret detection / redaction" },
            { id: "L2.g.5", title: "Command-risk classification" },
            { id: "L2.g.6", title: "Audit log" },
          ],
        },
        {
          id: "L2.h", title: "State & persistence", children: [
            { id: "L2.h.1", title: "Conversation/session store" },
            { id: "L2.h.2", title: "Checkpointing / resume / time-travel" },
            { id: "L2.h.3", title: "Thread / branch management" },
            { id: "L2.h.4", title: "Artifact store", note: "generated files, diffs" },
            { id: "L2.h.5", title: "Durable execution", note: "crash recovery" },
          ],
        },
        {
          id: "L2.i", title: "Model-interaction management", note: "bridge to L3", children: [
            { id: "L2.i.1", title: "Provider abstraction / model routing", note: "cost-/capability-aware" },
            { id: "L2.i.2", title: "Prompt-caching strategy", note: "what to cache" },
            { id: "L2.i.3", title: "Streaming response parsing", note: "incremental tool-call extraction from token stream" },
            { id: "L2.i.4", title: "Retry / backoff / fallback models" },
            { id: "L2.i.5", title: "Token & cost accounting" },
            { id: "L2.i.6", title: "Output validation / repair", note: "malformed tool calls, JSON repair" },
            { id: "L2.i.7", title: "Rate-limit handling" },
          ],
        },
        {
          id: "L2.j", title: "Extensibility", children: [
            { id: "L2.j.1", title: "Hooks", note: "pre/post tool, lifecycle events" },
            { id: "L2.j.2", title: "Plugins / extensions" },
            { id: "L2.j.3", title: "Custom commands / skills" },
            { id: "L2.j.4", title: "Layered configuration system" },
          ],
        },
        { id: "L2.k", title: "Instrumentation hooks", note: "→ C1 (spans, events, metrics emitted from here)" },
      ],
    },
    {
      id: "L3",
      title: "Model-serving interface / API",
      tag: "harness ↔ model contract",
      summary: "The contract between the harness and the model: protocol, auth, tokenization, tool-calling.",
      children: [
        { id: "L3.1", title: "API protocol", note: "endpoints, messages schema, roles, content blocks (text / tool_use / tool_result / image / thinking)" },
        { id: "L3.2", title: "Auth", note: "API keys, OAuth; org/project scoping" },
        { id: "L3.3", title: "Streaming transport", note: "SSE / chunked" },
        { id: "L3.4", title: "Tokenization at the boundary", note: "tokenizer (byte-level BPE / Unigram / SentencePiece), special tokens, chat-template application, vocab" },
        { id: "L3.5", title: "Function/tool-calling protocol", note: "schema, forced tool use, parallel calls" },
        { id: "L3.6", title: "Structured output / JSON mode", note: "constrained-decoding contract" },
        { id: "L3.7", title: "Prompt-caching protocol", note: "cache breakpoints, TTL" },
        { id: "L3.8", title: "Sampling params exposed", note: "temp, top-p/k, max tokens, stop seqs, seed, penalties, logit bias" },
        { id: "L3.9", title: "Rate limits / quotas / usage metering / billing" },
        { id: "L3.10", title: "Safety/moderation classifiers", note: "input/output" },
        { id: "L3.11", title: "Provider gateway / proxy", note: "LiteLLM, OpenRouter — multi-provider routing" },
        { id: "L3.12", title: "Versioning", note: "model versions, API versions" },
      ],
    },
    {
      id: "L4",
      title: "Inference serving / runtime",
      tag: "the engine",
      summary: "The engine that actually runs the model: scheduling, KV memory, decoding, parallelism, quant.",
      children: [
        { id: "L4.a", title: "Request lifecycle in engine", note: "admission/queueing; scheduler (priority/fairness/preemption); continuous/in-flight batching; iteration-level scheduling; chunked prefill; prefill/decode disaggregation" },
        { id: "L4.b", title: "Memory management", note: "KV cache (central data structure); PagedAttention (vLLM); prefix caching / RadixAttention (SGLang); KV offload; KV quant/compression; allocator/pooling; weight vs activation budgeting" },
        {
          id: "L4.c", title: "Decoding / generation strategies", children: [
            { id: "L4.c.1", title: "Autoregressive decode loop" },
            { id: "L4.c.2", title: "Sampling impl", note: "greedy, temperature, top-k, top-p/nucleus, min-p, typical, beam, contrastive, penalties, logit bias, banned tokens" },
            { id: "L4.c.3", title: "Speculative decoding", note: "draft model; self-speculation (Medusa, EAGLE, lookahead); n-gram/prompt-lookahead; verification" },
            { id: "L4.c.4", title: "Constrained / guided decoding", note: "CFG grammar, regex, JSON-schema (Outlines, XGrammar, llguidance); FSM compilation; logit masking" },
            { id: "L4.c.5", title: "Structured generation / tool-call enforcement" },
            { id: "L4.c.6", title: "Stop criteria / EOS / max-length" },
          ],
        },
        { id: "L4.d", title: "Parallelism / distribution", note: "tensor (intra-layer); pipeline (inter-layer); expert (MoE); sequence/context; data/replica; sharding; collective-comm patterns; cross-node disaggregation" },
        { id: "L4.e", title: "Runtime quantization & optimization", note: "weight quant at load (INT8/INT4, GPTQ, AWQ, FP8, GGUF Q-types, bitsandbytes, Marlin kernels); activation quant; KV-cache quant; mixed precision" },
        { id: "L4.f", title: "Adapter / multi-model serving", note: "multi-LoRA (S-LoRA), adapter hot-swap; multiple models per server; load/unload" },
        { id: "L4.g", title: "Engines (instances)", note: "vLLM, SGLang, TensorRT-LLM, TGI, llama.cpp / GGML, Ollama, LMDeploy, MLC-LLM, ExLlama, DeepSpeed-Inference, Triton, Ray Serve" },
        { id: "L4.h", title: "Serving control plane", note: "→ C10; replica load balancing, autoscaling, KV-aware routing, multi-tenancy/fairness/quotas, health checks" },
        { id: "L4.i", title: "Model loading & formats", note: "safetensors, GGUF, PyTorch (.pt/.bin/pickle), ONNX; mmap/sharded/lazy loading; HF Hub, Ollama registry, model cards" },
      ],
    },
    {
      id: "L5",
      title: "Model / neural network",
      tag: "the LLM as a mathematical object",
      summary: "The transformer itself: architecture, weights, encoded capabilities, inference-time numerics.",
      children: [
        {
          id: "L5.a", title: "Architecture (forward-pass structure)", children: [
            { id: "L5.a.1", title: "Embedding layer", note: "token embeddings; tied/untied" },
            { id: "L5.a.2", title: "Positional encoding", note: "absolute/learned/sinusoidal, RoPE, ALiBi, NoPE; RoPE scaling (linear, NTK, YaRN, dynamic)" },
            { id: "L5.a.3", title: "Transformer block (decoder-only)", note: "attention + FFN sublayers; normalization (LayerNorm, RMSNorm; pre/post-norm; QK-norm); residual connections" },
            { id: "L5.a.4", title: "Attention mechanism", note: "MHA, MQA, GQA, MLA (latent), sliding-window, sparse, local/global, linear; causal masking (impl = FlashAttention, L7)" },
            { id: "L5.a.5", title: "FFN/MLP", note: "dense; gated GLU family (SwiGLU, GeGLU, ReGLU); activations (ReLU, GeLU, SiLU/Swish)" },
            { id: "L5.a.6", title: "MoE", note: "router/gating (top-k), experts, shared experts, load balancing (aux-loss / loss-free), expert capacity, token dropping, fine-grained experts" },
            { id: "L5.a.7", title: "Output head", note: "final norm, LM head (unembedding), logits, optional tying" },
            { id: "L5.a.8", title: "Architecture families", note: "dense Transformer, MoE Transformer, SSM (Mamba), hybrid (Jamba), RWKV, RetNet, diffusion LLMs, encoder-decoder" },
          ],
        },
        { id: "L5.b", title: "Parameters / weights", note: "learned content; per-layer matrices (Q/K/V/O, gate/up/down, embeddings, norms); native dtype (FP32/FP16/BF16); quantized forms (→L4.e); provenance → D1" },
        { id: "L5.c", title: "Capabilities encoded in weights", note: "behavioral, not mechanical: world & code knowledge; in-context learning; instruction following; trained tool-use; reasoning/CoT; long-context; alignment/safety" },
        { id: "L5.d", title: "Inference-time computation (numerics)", note: "forward pass as op sequence (matmul/attention/norm/activation/softmax); prefill (parallel over prompt) vs decode (one token/step) → bridges to L7" },
      ],
    },
    {
      id: "L6",
      title: "Compute framework / backend",
      tag: "how tensors get computed",
      summary: "Tensor frameworks, graph compilers, compute APIs and device runtimes.",
      children: [
        { id: "L6.1", title: "Tensor framework", note: "PyTorch (eager + compile), JAX, TensorFlow, ggml (C tensor lib)" },
        { id: "L6.2", title: "Graph capture/compile", note: "torch.compile (Dynamo/Inductor), XLA, TVM, ONNX export, TensorRT engine build" },
        { id: "L6.3", title: "Compute API / programming model", note: "CUDA, ROCm/HIP, Metal (MPS), Vulkan compute, SYCL/oneAPI, OpenCL, WebGPU" },
        { id: "L6.4", title: "Device runtime", note: "driver, memory allocator, stream/queue mgmt, CUDA graphs" },
        { id: "L6.5", title: "Alt inference runtimes", note: "TensorRT, ONNX Runtime, OpenVINO, CoreML, TFLite, GGML, TVM" },
        { id: "L6.6", title: "Dispatch", note: "operator dispatch, kernel selection, autotuning" },
      ],
    },
    {
      id: "L7",
      title: "Kernel / numerical primitives",
      tag: "the actual math on the metal",
      summary: "The GPU kernels: GEMM, attention, norms, sampling, collectives — and how they're authored.",
      children: [
        { id: "L7.1", title: "GEMM/matmul", note: "the workhorse: tiled, mixed-precision, Tensor-Core/WGMMA, split-K" },
        { id: "L7.2", title: "Attention kernels", note: "FlashAttention (1/2/3), FlashInfer, PagedAttention kernel, fused MHA, memory-efficient attention" },
        { id: "L7.3", title: "Norm kernels", note: "fused RMSNorm/LayerNorm; softmax (online/safe)" },
        { id: "L7.4", title: "Activation kernels", note: "fused SwiGLU…" },
        { id: "L7.5", title: "Elementwise/pointwise; reductions" },
        { id: "L7.6", title: "Sampling kernels", note: "top-k/p on GPU; embedding gather" },
        { id: "L7.7", title: "Quant/dequant kernels", note: "Marlin, Machete, FP8 GEMM" },
        { id: "L7.8", title: "Collective-comm kernels", note: "all-reduce, all-gather, reduce-scatter, all-to-all (MoE)" },
        { id: "L7.9", title: "Kernel libraries", note: "cuBLAS(Lt), cuDNN, CUTLASS, cuSPARSE, NCCL/RCCL, FlashAttention, FlashInfer" },
        { id: "L7.10", title: "Kernel authoring", note: "CUDA C++, Triton, ThunderKittens, CuTe/CUTLASS DSL, Mojo, hand-tuned PTX/SASS" },
        { id: "L7.11", title: "Optimizations", note: "operator fusion, autotuning, persistent kernels, warp specialization, async copy (TMA), double buffering" },
        { id: "L7.12", title: "Memory-hierarchy use", note: "register / shared(SRAM) / L2 / HBM, coalescing, bank-conflict avoidance, occupancy" },
      ],
    },
    {
      id: "L8",
      title: "Hardware / silicon",
      tag: "bottom boundary",
      summary: "The accelerators, memory, interconnect and datacenter substrate the FLOPs run on.",
      children: [
        { id: "L8.1", title: "Accelerators", note: "NVIDIA GPU (Hopper, Blackwell), AMD GPU (CDNA: MI300X+), Google TPU, AWS Trainium/Inferentia, Apple Silicon, specialized (Groq LPU, Cerebras WSE, SambaNova, Tenstorrent, Etched), FPGA" },
        { id: "L8.2", title: "Compute units", note: "tensor/matrix cores, vector, scalar" },
        { id: "L8.3", title: "Memory", note: "HBM (2e/3/3e), GDDR, unified, on-chip SRAM, cache hierarchy" },
        { id: "L8.4", title: "Interconnect (intra-node)", note: "NVLink, NVSwitch, Infinity Fabric, PCIe, CXL" },
        { id: "L8.5", title: "Interconnect (inter-node)", note: "InfiniBand, RoCE/Ethernet, optical" },
        { id: "L8.6", title: "Host", note: "CPU, system RAM, NUMA" },
        { id: "L8.7", title: "Datacenter substrate", note: "edge of scope: racks, power delivery, cooling, network topology (fat-tree, rail-optimized)" },
        { id: "L8.8", title: "Semiconductor microarch → transistor → lithography → physics", note: "boundary — named, out of scope", boundary: true },
      ],
    },
  ],

  planes: [
    { id: "C1", title: "Observability & telemetry", note: "structured logs; tracing (spans across agent steps + tool calls); metrics (latency, TTFT/TPOT, throughput, tokens, cost); LLM tracing (LangSmith, Langfuse, OpenLLMetry/OTel, Phoenix); replay/debug; dashboards" },
    { id: "C2", title: "Evaluation & quality", note: "offline evals (golden sets); prompt unit/regression tests; LLM-as-judge; rubric grading; eval harnesses; online eval / A-B; guardrail checks; benchmarks (SWE-bench, HumanEval, Aider Polyglot); eval-driven dev" },
    { id: "C3", title: "Security & trust", note: "prompt-injection / jailbreak defense; tool sandboxing; secrets mgmt; supply-chain provenance; data-exfiltration prevention; MCP-server trust; output sanitization; authN/authZ; multi-tenant isolation; red-teaming; audit trails" },
    { id: "C4", title: "Cost / FinOps / efficiency", note: "token accounting; model routing for cost; cache-for-cost; batch-for-throughput; quant-for-cost; budget enforcement; cost attribution" },
    { id: "C5", title: "Caching (multi-level)", note: "provider prompt/context cache (L3.7); engine KV cache (L4.b); engine prefix cache; semantic/response cache; tool-result cache; embedding cache; HTTP cache — spans L2/L3/L4" },
    { id: "C6", title: "State, memory & knowledge", note: "short-term (context window); working (scratchpad); long-term (vector DB / memory store / KG); episodic vs semantic; RAG (chunking, embedding, HNSW/IVF, pgvector, reranking); write/update/forget policies; project knowledge (CLAUDE.md); citations" },
    { id: "C7", title: "Configuration & reproducibility", note: "layered config; env mgmt; model/version pinning; determinism caveat (inference non-deterministic from batching + floating-point even with fixed seed); prompt versioning; experiment tracking" },
    { id: "C8", title: "Concurrency, reliability & lifecycle", note: "async/parallel exec; rate-limit & backpressure; retries/idempotency; circuit breakers; graceful degradation/fallbacks; durable execution / crash recovery; timeouts; cancellation" },
    { id: "C9", title: "Networking & transport", note: "literal pipes: HTTP/2, SSE, WebSocket, gRPC, TLS, load balancers, CDNs, API gateways — between client ↔ API ↔ engine" },
    { id: "C10", title: "Deployment & infra / control plane", note: "containerization; orchestration (K8s); autoscaling; GPU scheduling; model registry/serving infra; CI/CD for models & prompts; IaC; multi-region — collapses to process management for local tools" },
  ],

  provenance: [
    {
      id: "D1", title: "Model production (training)", note: "produces: weights (L5.b)", children: [
        { id: "D1.data", title: "Data", note: "collection, web/code corpora, filtering, dedup, mixing, synthetic data" },
        { id: "D1.pre", title: "Pretraining", note: "objective (causal LM / next-token); curriculum; scaling laws; distributed training (FSDP/ZeRO, 3D parallelism); optimizer (AdamW); checkpoints; clusters" },
        { id: "D1.mid", title: "Mid-training", note: "continued pretraining; long-context extension; domain adaptation" },
        { id: "D1.post", title: "Post-training / alignment", note: "SFT; preference optimization (RLHF/PPO, DPO, IPO/KTO/ORPO, GRPO); RLAIF / Constitutional AI; RLVR (verifiable rewards); reasoning training (long-CoT RL); reward models; tool-use / agentic training" },
        { id: "D1.distill", title: "Distillation", note: "teacher→student" },
        { id: "D1.quant", title: "Quantization", note: "PTQ/QAT — produces quantized artifacts (L4.e)" },
        { id: "D1.release", title: "Eval & release", note: "model cards, safety evals, red-teaming" },
      ],
    },
    { id: "D2", title: "Tokenizer production", note: "produces: tokenizer (L3.4): corpus, algorithm (BPE/Unigram), vocab size, special tokens, merges" },
    { id: "D3", title: "Inference-engine & kernel production", note: "produces: engine binaries (L4.g), kernels (L7): kernel authoring/tuning, compiler toolchains, per-GPU engine compilation (TensorRT), benchmarking" },
    { id: "D4", title: "Harness / tool production", note: "produces: the agent software (L2): prompt engineering, tool design, system-prompt authoring, eval suites, the harness codebase" },
    { id: "D5", title: "Distribution & packaging", note: "model hubs, registries, package managers, container images, release pipelines" },
  ],

  edges: [
    { from: "L5.a.4", to: "L7.2", type: "impl", label: "attention → FlashAttention kernel" },
    { from: "L5.b", to: "D1", type: "provenance", label: "weights ← training" },
    { from: "L5.b", to: "L4.e", type: "impl", label: "weights → runtime quant" },
    { from: "L5.d", to: "L7", type: "impl", label: "numerics → kernels" },
    { from: "L4.b", to: "C5", type: "concern", label: "KV cache is a caching concern" },
    { from: "L3.7", to: "C5", type: "concern", label: "prompt cache is a caching concern" },
    { from: "L2.i.2", to: "C5", type: "concern", label: "caching strategy" },
    { from: "L2.g", to: "C3", type: "concern", label: "sandboxing enforces security" },
    { from: "L2.f.7", to: "C3", type: "concern", label: "MCP security surface" },
    { from: "L2.b.6", to: "C6", type: "concern", label: "retrieved context = RAG/memory" },
    { from: "L2.b.3", to: "C6", type: "concern", label: "memory injection" },
    { from: "L2.f.6", to: "L2", type: "recursion", label: "MCP sampling re-enters the loop" },
    { from: "L2.e.1", to: "L2", type: "recursion", label: "sub-agent re-enters the loop" },
    { from: "L2.k", to: "C1", type: "concern", label: "instrumentation → observability" },
    { from: "L4.h", to: "C10", type: "concern", label: "serving control plane → infra" },
    { from: "L2.i.1", to: "C4", type: "routing", label: "model routing for cost" },
    { from: "L3.11", to: "C4", type: "routing", label: "provider gateway routing" },
    { from: "L2.i.5", to: "C4", type: "concern", label: "token & cost accounting" },
    { from: "L3.4", to: "D2", type: "provenance", label: "tokenizer ← tokenizer production" },
    { from: "L4.g", to: "D3", type: "provenance", label: "engine ← engine production" },
    { from: "L7", to: "D3", type: "provenance", label: "kernels ← kernel production" },
    { from: "L2", to: "D4", type: "provenance", label: "harness ← harness production" },
    { from: "L4.e", to: "D1.quant", type: "provenance", label: "quantized weights ← quantization" },
    { from: "L5.b", to: "C7", type: "concern", label: "model/version pinning" },
    { from: "L5.d", to: "L6", type: "impl", label: "numerics run on the framework" },
  ],
};
