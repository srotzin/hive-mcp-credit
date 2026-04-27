<!-- HIVE_BANNER_V1 -->
<p align="center">
  <a href="https://hive-mcp-gateway.onrender.com/credit/health">
    <img src="https://hive-mcp-gateway.onrender.com/credit/og.svg" alt="HiveCredit · Undercollateralized Agent Credit & Lending MCP" width="100%"/>
  </a>
</p>

<h1 align="center">hive-mcp-credit</h1>

<p align="center"><strong>Undercollateralized credit lines for autonomous agents based on trust scoring.</strong></p>

<p align="center">
  <a href="https://smithery.ai/server/hivecivilization"><img alt="Smithery" src="https://img.shields.io/badge/Smithery-hivecivilization-C08D23?style=flat-square"/></a>
  <a href="https://glama.ai/mcp/servers"><img alt="Glama" src="https://img.shields.io/badge/Glama-pending-C08D23?style=flat-square"/></a>
  <a href="https://hive-mcp-gateway.onrender.com/credit/health"><img alt="Live" src="https://img.shields.io/badge/gateway-live-C08D23?style=flat-square"/></a>
  <a href="https://github.com/srotzin/hive-mcp-credit/releases"><img alt="Release" src="https://img.shields.io/github/v/release/srotzin/hive-mcp-credit?style=flat-square&color=C08D23"/></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-C08D23?style=flat-square"/></a>
</p>

<p align="center">
  <code>https://hive-mcp-gateway.onrender.com/credit/mcp</code>
</p>

---

# HiveCredit

**Undercollateralized credit lines for autonomous agents based on trust scoring.**

MCP server for HiveCredit — undercollateralized agent credit and lending. On-chain credit scoring, agent-to-agent loan requests, repayment recording, and default oracle queries. USDC settlement on Base L2. Scaffold shim — backend pending Q3 2026.

## What this is

`hive-mcp-credit` is a Model Context Protocol (MCP) server that exposes the HiveCredit platform on the Hive Civilization to any MCP-compatible client (Claude Desktop, Cursor, Manus, etc.). The server proxies to the live production gateway at `https://hive-mcp-gateway.onrender.com`.

- **Protocol:** MCP 2024-11-05 over Streamable-HTTP / JSON-RPC 2.0
- **x402 micropayments:** every paid call produces a real on-chain settlement
- **Rails:** USDC on Base L2 — real rails, no mocks
- **Author:** Steve Rotzin · Hive Civilization · brand gold `#C08D23`

## Endpoints

| Path | Purpose |
|------|---------|
| `POST /mcp` | JSON-RPC 2.0 / MCP 2024-11-05 |
| `GET  /` | HTML landing with comprehensive meta tags + JSON-LD |
| `GET  /health` | Health + telemetry |
| `GET  /.well-known/mcp.json` | MCP discovery descriptor |
| `GET  /.well-known/security.txt` | RFC 9116 security contact |
| `GET  /robots.txt` | Allow-all crawl policy |
| `GET  /sitemap.xml` | Crawler sitemap |
| `GET  /og.svg` | 1200×630 Hive-gold OG image |
| `GET  /seo.json` | JSON-LD structured data (SoftwareApplication) |

## License

MIT. © Steve Rotzin / Hive Civilization. Brand gold `#C08D23` (Pantone 1245 C). Never `#f5c518`.
