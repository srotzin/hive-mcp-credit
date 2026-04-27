# HiveCredit MCP Server — v1.0.0

## Overview

Initial scaffold for `hive-mcp-credit`. The MCP server is structurally complete: `tools/list`, `/health`, and `/.well-known/mcp.json` are operational. The hivemorph backend for this vertical is not yet built. All `tools/call` requests return HTTP 503 — no mock data, no simulated responses.

---

## Tools

| Tool | Description |
|---|---|
| `get_score` | Returns the on-chain credit score (0-100) for a given DID or wallet address. Factors: repayment history, on-chain activity, Hive trust graph. Backend pending (Q3 2026). |
| `request_loan` | Requests an agent-to-agent loan. Returns a quote including APR, required collateral, and settlement currency. USDC settlement on Base, Ethereum, or Solana. Backend pending (Q3 2026). |
| `repay` | Records a repayment for an active loan by submitting the on-chain transaction hash. Updates credit score upon confirmation. Backend pending (Q3 2026). |
| `default_oracle` | Returns whether a loan has been flagged as defaulted by the Hive credit oracle. Returns boolean. Backend pending (Q3 2026). |

---

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/v1/credit/score` | On-chain credit score (0-100) for DID or address |
| `POST` | `/v1/credit/loans` | Request A2A loan — USDC settlement |
| `POST` | `/v1/credit/loans/{id}/repay` | Record repayment via tx hash |
| `GET` | `/v1/credit/loans/{id}/default` | Default oracle query |

---

## Settlement

USDC on Base, Ethereum, or Solana. No mock, no simulated settlement.

---

## Status

- **Backend:** v0.1 — pending hivemorph build (Q3 2026 spec)
- **Council:** R4
- **`tools/list`:** operational
- **`/health`:** operational
- **`/.well-known/mcp.json`:** operational
- **`tools/call`:** returns HTTP 503

```json
{
  "error": "feature gating: backend pending; submit interest at hive-mcp-connector",
  "backend_status": "v0.1 — pending hivemorph backend build (Q3 2026 spec)",
  "service": "hive-mcp-credit",
  "interest_url": "https://hive-mcp-connector.thehiveryiq.com"
}
```

---

## Constraints

- No mock data, no simulated settlement at any point
- Brand gold: Pantone 1245 C / `#C08D23`
- No energy futures, GAS-PERP, GPU-PERP, or HASHRATE-PERP
- LLM calls route only through `https://hivecompute-g2g7.onrender.com/v1/compute/chat/completions`
- hivemorph remains private; this repository is the public surface
