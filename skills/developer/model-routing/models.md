# Model registry (canonical)

**Policy:** Published defaults use **Anthropic, OpenAI, and Google** providers only. Local overrides may add other providers; do not commit non-allowlist IDs as shipped defaults.

Last reviewed: 2026-08-22

## Tier matrix

| Tier | Role shape | Default provider family | Notes |
|------|------------|-------------------------|-------|
| orchestrator | Loop/graph routing, consequential decisions | OpenAI | Escalate effort on challenge paths |
| worker-fast | Bounded implementation, small diffs | Anthropic | Single writer per work item |
| worker-deep | Multi-file features, refactors | Anthropic | Pair with verifier |
| verifier | Read-only cross-check | Anthropic | Different family from implementer when possible |
| architect | Cross-cutting design, ADRs | Anthropic | Critical review tier optional |
| security | Threat modeling, hardening | OpenAI | Critical review tier optional |
| quality-operate | Release readiness, SLO work | OpenAI | Cost-balanced |
| research | Docs, recon synthesis | OpenAI | Not for authoritative registry edits |
| long-context-worker | Broad-repository, million-token workloads | OpenAI | See `long-context-worker` note below |
| small | Titles, summaries | Anthropic | Haiku-class |

## Role → default mapping (published)

| Role | Model ID | Effort |
|------|----------|--------|
| Global / UI | `claude-sonnet-5` | standard |
| SDLC orchestrator | `gpt-5.6-sol` | high |
| SDLC orchestrator challenge | `gpt-5.6-sol` | xhigh |
| SDLC workers — sonnet, long-context, model-diverse roles | `claude-sonnet-5` | high |
| SDLC worker (luna, cost-efficient) | `gpt-5.6-luna` | medium |
| SDLC verifier | `claude-opus-4.8` | xhigh |
| Architect | `claude-opus-4.8` | xhigh |
| Security assessor | `gpt-5.6-sol` | xhigh |
| Quality / operate | `gpt-5.6-terra` | high |
| Research / review | `gpt-5.6-terra` | standard |

> Adapter files map host-specific IDs (Copilot display names, Cursor `auto`, etc.) to these tiers. Amp binds a tier to one of its modes (`low`, `medium`, `high`, `ultra`) and chooses the model behind the mode itself; no model ID is pinned there.

## `long-context-worker` note

`work-k3` and `work-glm` are long-standing role names for the broad-repository / model-diverse worker character. Their shipped default is now `claude-sonnet-5`, same as every other bounded worker — the distinctive long-context or open-model behavior they used to carry by default is available only as a documented user override (below), never as a shipped default. This is a deliberate re-tiering, not a placeholder: the role stays available for parallel-pod work; only the binding changed.

## User override examples (not shipped defaults)

| Role | Example override | When |
|------|------------------|------|
| `work-k3` | Kimi K3 via OpenCode Go (`opencode-go/kimi-k3`) | User-enabled long-context economy runs |
| `work-glm` | GLM 5.2 via OpenCode Go (`opencode-go/glm-5.2`) | User-enabled cost/model-diversity experiments |

## Machine registry

```json
{
  "policy": { "allowed_providers": ["anthropic", "openai", "google"] },
  "published_ids": ["claude-sonnet-5", "claude-opus-4.8", "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"],
  "roles": {
    "orchestrator": "gpt-5.6-sol",
    "worker-fast": "claude-sonnet-5",
    "worker-deep": "claude-sonnet-5",
    "verifier": "claude-opus-4.8",
    "architect": "claude-opus-4.8",
    "security": "gpt-5.6-sol",
    "quality-operate": "gpt-5.6-terra",
    "research": "gpt-5.6-terra",
    "ui": "claude-sonnet-5",
    "long-context-worker": "gpt-5.6-luna"
  }
}
```

Gemini remains allowlisted but currently unbound in the published defaults; a Gemini candidate enters via `update-models` with catalog evidence, never by hand-editing this block.

## Sources

- Provider model list APIs (Anthropic, OpenAI, Google)
- `update-models/RESEARCH.md` after each curation run

## Review triggers

- Deprecation or material price/capability change
- Regression in role-fit benchmarks or production evidence
- New flagship model with better task fit (not merely newer version number)
