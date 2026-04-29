#!/usr/bin/env node
/**
 * HiveCredit MCP Server
 * On-chain credit scoring and agent-to-agent lending with counterparty risk tracking
 *
 * Backend  : https://hivemorph.onrender.com
 * Status   : v0.1 — pending hivemorph backend build (Q3 2026 spec)
 * Spec     : MCP 2024-11-05 / Streamable-HTTP / JSON-RPC 2.0
 * Brand    : Hive Civilization gold #C08D23 (Pantone 1245 C)
 *
 * RAILS RULE 1 — NO MOCK RESPONSES.
 * All tool calls return HTTP 503 until the backend is live.
 * Agents receive: { "error": "feature gating: backend pending; submit interest at hive-mcp-connector" }
 */

import express from 'express';
import { renderLanding, renderRobots, renderSitemap, renderSecurity, renderOgImage, seoJson, BRAND_GOLD } from './meta.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HIVE_BASE = process.env.HIVE_BASE || 'https://hivemorph.onrender.com';

// ─── Tool definitions ────────────────────────────────────────────────────────
const TOOLS = [
    {
      name: 'get_score',
      description: 'Retrieve the on-chain credit score (0-100) for a given DID or wallet address. Factors include repayment history, on-chain activity, and Hive trust graph. Backend pending (Q3 2026).',
      inputSchema: {
        type: 'object',
        required: ["did_or_address"],
properties: {
          did_or_address: { type: 'string', description: 'DID or wallet address to score' }
        },
      },
    },    {
      name: 'request_loan',
      description: 'Request an agent-to-agent loan. Returns a loan quote including APR, required collateral, and settlement currency. Settlement in USDC on Base, Ethereum, or Solana. Backend pending (Q3 2026).',
      inputSchema: {
        type: 'object',
        required: ["borrower_did", "amount_usd", "term_days"],
properties: {
          borrower_did: { type: 'string', description: 'DID of the borrowing agent' },
  amount_usd: { type: 'number', description: 'Loan amount in USD' },
  term_days: { type: 'number', description: 'Loan term in days' }
        },
      },
    },    {
      name: 'repay',
      description: 'Record a repayment for an active loan by submitting the on-chain transaction hash. Updates credit score upon confirmation. Backend pending (Q3 2026).',
      inputSchema: {
        type: 'object',
        required: ["loan_id", "tx_hash"],
properties: {
          loan_id: { type: 'string', description: 'Loan ID from request_loan' },
  tx_hash: { type: 'string', description: 'On-chain transaction hash for the repayment' }
        },
      },
    },    {
      name: 'default_oracle',
      description: 'Query whether a loan has been flagged as defaulted by the Hive credit oracle. Returns boolean. Backend pending (Q3 2026).',
      inputSchema: {
        type: 'object',
        required: ["loan_id"],
properties: {
          loan_id: { type: 'string', description: 'Loan ID to check for default status' }
        },
      },
    }
];


const SERVICE_CFG = {
  service: "hive-mcp-credit",
  shortName: "HiveCredit",
  title: "HiveCredit \u00b7 Undercollateralized Agent Credit & Lending MCP",
  tagline: "Undercollateralized credit lines for autonomous agents based on trust scoring.",
  description: "MCP server for HiveCredit \u2014 undercollateralized agent credit and lending on the Hive Civilization. Score \u2192 credit line for autonomous agents. Brokering layer today; lender-of-record partner pending. USDC settlement on Base L2. Real rails.",
  keywords: ["mcp", "model-context-protocol", "x402", "agentic", "ai-agent", "ai-agents", "llm", "hive", "hive-civilization", "credit", "lending", "undercollateralized-credit", "agent-credit", "trust-scoring", "usdc", "base", "base-l2", "agent-economy", "a2a"],
  externalUrl: "https://hive-mcp-credit.onrender.com",
  gatewayMount: "/credit",
  version: "1.0.1",
  pricing: [
    { name: "credit_get_score", priceUsd: 0, label: "Get score \u2014 free" },
    { name: "credit_request_line", priceUsd: 0.05, label: "Request line (Tier 3)" },
    { name: "credit_repay", priceUsd: 0.005, label: "Repay (Tier 2)" }
  ],
};
SERVICE_CFG.tools = (typeof TOOLS !== 'undefined' ? TOOLS : []).map(t => ({ name: t.name, description: t.description }));
// ─── Feature-gate response (Rails Rule 1 — no mock) ──────────────────────────
function featureGate(res) {
  return res.status(503).json({
    error: 'feature gating: backend pending; submit interest at hive-mcp-connector',
    backend_status: 'v0.1 — pending hivemorph backend build (Q3 2026 spec)',
    service: 'hive-mcp-credit',
    interest_url: 'https://hive-mcp-connector.thehiveryiq.com',
  });
}

// ─── MCP JSON-RPC handler ────────────────────────────────────────────────────
app.post('/mcp', async (req, res) => {
  const { jsonrpc, id, method, params } = req.body || {};
  if (jsonrpc !== '2.0') {
    return res.json({ jsonrpc: '2.0', id, error: { code: -32600, message: 'Invalid JSON-RPC' } });
  }
  try {
    switch (method) {
      case 'initialize':
        return res.json({ jsonrpc: '2.0', id, result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: { listChanged: false } },
          serverInfo: {
            name: 'hive-mcp-credit',
            version: '1.0.0',
            description: 'On-chain credit scoring and agent-to-agent lending with counterparty risk tracking',
            backendStatus: 'v0.1 — pending hivemorph backend build (Q3 2026 spec)',
          },
        } });
      case 'tools/list':
        return res.json({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
      case 'tools/call':
        // Rails Rule 1: backend not yet live — return honest 503, no mock data.
        return featureGate(res);
      case 'ping':
        return res.json({ jsonrpc: '2.0', id, result: {} });
      default:
        return res.json({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
    }
  } catch (err) {
    return res.json({ jsonrpc: '2.0', id, error: { code: -32000, message: err.message } });
  }
});

// ─── Discovery + health ──────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({
  status: 'ok',
  service: 'hive-mcp-credit',
  version: '1.0.0',
  backend: HIVE_BASE,
  backendStatus: 'v0.1 — pending hivemorph backend build (Q3 2026 spec)',
  toolCount: TOOLS.length,
  brand: '#C08D23',
}));

app.get('/.well-known/mcp.json', (req, res) => res.json({
  name: 'hive-mcp-credit',
  endpoint: '/mcp',
  transport: 'streamable-http',
  protocol: '2024-11-05',
  backendStatus: 'v0.1 — pending hivemorph backend build (Q3 2026 spec)',
  tools: TOOLS.map(t => ({ name: t.name, description: t.description })),
}));


// HIVE_META_BLOCK_v1 — comprehensive meta tags + JSON-LD + crawler discovery
app.get('/', (req, res) => {
  res.type('text/html; charset=utf-8').send(renderLanding(SERVICE_CFG));
});
app.get('/og.svg', (req, res) => {
  res.type('image/svg+xml').send(renderOgImage(SERVICE_CFG));
});
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(renderRobots(SERVICE_CFG));
});
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(renderSitemap(SERVICE_CFG));
});
app.get('/.well-known/security.txt', (req, res) => {
  res.type('text/plain').send(renderSecurity());
});
app.get('/seo.json', (req, res) => res.json(seoJson(SERVICE_CFG)));

// ─── Schema constants (auto-injected to fix deploy) ─────
const SERVICE = 'hive-mcp-credit';
const VERSION = '1.0.2';


// ─── Schema discoverability ────────────────────────────────────────────────
const AGENT_CARD = {
  name: SERVICE,
  description: 'MCP server for HiveCredit — undercollateralized agent credit and lending. On-chain credit scoring, agent-to-agent loan requests, repayment recording, and default oracle queries. USDC settlement on Base L2. New agents: first call free. Loyalty: every 6th paid call is free. Pay in USDC on Base L2.',
  url: `https://${SERVICE}.onrender.com`,
  provider: {
    organization: 'Hive Civilization',
    url: 'https://www.thehiveryiq.com',
    contact: 'steve@thehiveryiq.com',
  },
  version: VERSION,
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
  },
  authentication: {
    schemes: ['x402'],
    credentials: {
      type: 'x402',
      asset: 'USDC',
      network: 'base',
      asset_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      recipient: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
    },
  },
  defaultInputModes: ['application/json'],
  defaultOutputModes: ['application/json'],
  skills: [
    { name: 'get_score', description: 'Retrieve the on-chain credit score (0-100) for a given DID or wallet address. Factors include repayment history, on-chain activity, and Hive trust graph. Backend pending (Q3 2026).' },
    { name: 'request_loan', description: 'Request an agent-to-agent loan. Returns a loan quote including APR, required collateral, and settlement currency. Settlement in USDC on Base, Ethereum, or Solana. Backend pending (Q3 2026).' },
    { name: 'repay', description: 'Record a repayment for an active loan by submitting the on-chain transaction hash. Updates credit score upon confirmation. Backend pending (Q3 2026).' },
    { name: 'default_oracle', description: 'Query whether a loan has been flagged as defaulted by the Hive credit oracle. Returns boolean. Backend pending (Q3 2026).' },
  ],
  extensions: {
    hive_pricing: {
      currency: 'USDC',
      network: 'base',
      model: 'per_call',
      first_call_free: true,
      loyalty_threshold: 6,
      loyalty_message: 'Every 6th paid call is free',
    },
  },
};

const AP2 = {
  ap2_version: '1',
  agent: {
    name: SERVICE,
    did: `did:web:${SERVICE}.onrender.com`,
    description: 'MCP server for HiveCredit — undercollateralized agent credit and lending. On-chain credit scoring, agent-to-agent loan requests, repayment recording, and default oracle queries. USDC settlement on Base L2. New agents: first call free. Loyalty: every 6th paid call is free. Pay in USDC on Base L2.',
  },
  endpoints: {
    mcp: `https://${SERVICE}.onrender.com/mcp`,
    agent_card: `https://${SERVICE}.onrender.com/.well-known/agent-card.json`,
  },
  payments: {
    schemes: ['x402'],
    primary: {
      scheme: 'x402',
      network: 'base',
      asset: 'USDC',
      asset_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      recipient: '0x15184bf50b3d3f52b60434f8942b7d52f2eb436e',
    },
  },
  brand: { color: '#C08D23', name: 'Hive Civilization' },
};

app.get('/.well-known/agent-card.json', (req, res) => res.json(AGENT_CARD));
app.get('/.well-known/ap2.json',         (req, res) => res.json(AP2));


app.listen(PORT, () => {
  console.log('HiveCredit MCP Server running on :' + PORT);
  console.log('  Backend : ' + HIVE_BASE);
  console.log('  Status  : v0.1 — pending hivemorph backend build (Q3 2026 spec)');
  console.log('  Tools   : ' + TOOLS.length + ' (get_score, request_loan, repay, default_oracle)');
  console.log('  Rails   : tool calls return 503 until backend is live (no mock)');
});
