# AffixIO Demo — Agentic Payments & AI Agents

**Agentic payments** for **AI agents**, **autonomous systems**, and **offline-first** terminals. Run the demo locally; all API calls use **https://api.affix-io.com**.

## Quick start

```bash
git clone <this-repo>
cd demo
node server.js
```

Open **http://localhost:3000** and try **Agentic Payments** first. Get a demo key → generate a proof → submit as POS payment. No local API; everything hits https://api.affix-io.com.

## What’s inside

- **Agentic Payments** (flagship) — Proof-based payments for AI agents and POS. Offline-capable, double-spend prevention, &lt;90-byte proofs.
- Proof Generate & Verify, Sandbox Circuits, Eligibility, Tokens, Health — all call https://api.affix-io.com.

## API

- **Base:** https://api.affix-io.com  
- **Docs:** https://api.affix-io.com/docs  
- **Demo key:** `POST /api/demo-key` (rate-limited, no account).

Production: use the **affixiomerchant** SDK for offline agentic payments (Node, browser, Deno).
