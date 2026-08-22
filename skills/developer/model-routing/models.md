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
| small | Titles, summaries | Anthropic | Haiku-class |

## Role → default mapping (published)

| Role | Model ID (example) | Effort |
|------|-------------------|--------|
| Global / UI | `claude-sonnet-4-20250514` | standard |
| SDLC orchestrator | `gpt-4.1` | high |
| SDLC orchestrator challenge | `gpt-4.1` | xhigh |
| SDLC workers | `claude-sonnet-4-20250514` | high |
| SDLC verifier | `claude-opus-4-20250514` | xhigh |
| Architect | `claude-opus-4-20250514` | xhigh |
| Security assessor | `gpt-4.1` | xhigh |
| Quality / operate | `gpt-4.1-mini` | high |
| Research / review | `gemini-2.5-pro` | standard |
| Small / system | `claude-3-5-haiku-20241022` | low |

> Adapter files map host-specific IDs (Copilot display names, Cursor `auto`, etc.) to these tiers.

## User override examples (not shipped defaults)

| Role | Example override | When |
|------|------------------|------|
| Worker economy | Kimi K3 via OpenCode Go | User-enabled multimodal long context |
| Worker alt | GLM 5.x | User-enabled cost experiments |

## Sources

- Provider model list APIs (Anthropic, OpenAI, Google)
- `update-models/RESEARCH.md` after each curation run

## Review triggers

- Deprecation or material price/capability change
- Regression in role-fit benchmarks or production evidence
- New flagship model with better task fit (not merely newer version number)
