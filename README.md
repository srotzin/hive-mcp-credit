# HiveCredit

**On-chain credit scoring and agent-to-agent lending on Hive Civilization rails**

`hive-mcp-credit` is an MCP server for the Hive Credit platform. Agents retrieve on-chain credit scores (0-100) for any DID or wallet address, request agent-to-agent loans with USDC settlement, record repayments via transaction hash, and query default status from the Hive credit oracle. Counterparty risk and repayment history are tracked on-chain.

> **Backend status:** The hivemorph backend for this vertical is not yet built. All `tools/call` requests return HTTP 503 — no mock data is returned. Backend target: Q3 2026.

> Council R4 — staged for Q3 2026 backend build

---

## Backend Status

All `tools/call` requests return HTTP 503:
```json
{ "error": "feature gating: backend pending; submit interest at hive-mcp-connector" }
```
`tools/list`, `/health`, and `/.well-known/mcp.json` are operational and return the full tool catalog.
No mock data is returned at any point.

---

## Protocol

- **Spec:** MCP 2024-11-05 over Streamable-HTTP / JSON-RPC 2.0
- **Transport:** `POST /mcp`
- **Discovery:** `GET /.well-known/mcp.json`
- **Health:** `GET /health`
- **Settlement:** USDC on Base, Ethereum, Solana (real rails only)
- **Brand gold:** Pantone 1245 C / `#C08D23`
- **Tools:** 4

---

## Tools

| Tool | Description |
|---|---|
| `get_score` | Returns the on-chain credit score (0-100) for a given DID or wallet address. Factors: repayment history, on-chain activity, Hive trust graph. Backend pending (Q3 2026). |
| `request_loan` | Requests an agent-to-agent loan. Returns a quote including APR, required collateral, and settlement currency. USDC settlement on Base, Ethereum, or Solana. Backend pending (Q3 2026). |
| `repay` | Records a repayment for an active loan by submitting the on-chain transaction hash. Updates credit score upon confirmation. Backend pending (Q3 2026). |
| `default_oracle` | Returns whether a loan has been flagged as defaulted by the Hive credit oracle. Returns boolean. Backend pending (Q3 2026). |

---

## Backend Endpoints (pending Q3 2026)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/v1/credit/score` | On-chain credit score (0-100) for DID or address |
| `POST` | `/v1/credit/loans` | Request A2A loan — USDC settlement |
| `POST` | `/v1/credit/loans/{id}/repay` | Record repayment via tx hash |
| `GET` | `/v1/credit/loans/{id}/default` | Default oracle query |

---

## Run Locally

```bash
git clone https://github.com/srotzin/hive-mcp-credit.git
cd hive-mcp-credit
npm install
npm start
# Server on http://localhost:3000
# tools/list returns tool catalog; tools/call returns 503 (backend pending)
curl http://localhost:3000/health
curl http://localhost:3000/.well-known/mcp.json
curl -s -X POST http://localhost:3000/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | jq .result.tools[].name
```

---

## Connect from an MCP Client

Add to your `mcp.json`:

```json
{
  "mcpServers": {
    "hive_mcp_credit": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://your-deployed-host/mcp"]
    }
  }
}
```

---

## Hive Civilization

Part of the [Hive Civilization](https://www.thehiveryiq.com) — sovereign DID, USDC settlement, HAHS legal contracts, agent-to-agent rails.

## License

MIT (c) 2026 Steve Rotzin / Hive Civilization
