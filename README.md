# AffixIO Agentic Demo -  Payments for Autonomous AI Agents

Demo showing how AI agents perform payments using eligibility verification and cryptographic proofs with the AffixIO API.

**Agentic AI payments** powered by **zero-knowledge proofs** (ZKPs).  
This demo shows how **autonomous agents**, **multi-agent systems**, and **offline-first** terminals can run secure, verifiable payment flows using the AffixIO API.

All requests go to the live API at [**https://api.affix-io.com**](https://api.affix-io.com) — no mock server or local backend.

---

## Why AffixIO? (Agentic commerce in 2026)

AffixIO provides **stateless ZK-proof verification** for:

- **Autonomous payment decisions** — AI agents and bots can request and submit payment proofs via a single API.
- **Offline-capable POS** — terminals can verify compact proofs without depending on real-time connectivity for verification.
- **Double-spend protection** — cryptographically bound, ultra-compact proofs (under 90 bytes) that POS can verify.
- **Eligibility and proofs** — check eligibility and generate/verify proofs using the same API; no local crypto stack required.

Built for **agentic workflows**, **AI-driven commerce**, and **autonomous systems** that need trustless, verifiable payments.

---

## Quick start

### 1. Clone and run

```bash
git clone https://github.com/AffixIO/affixio-agentic.git
cd affixio-agentic
npm install
node server.js
2. Open in the browser
Open http://localhost:3000 after node server.js is running.

3. Run the Agentic Payments flow
Get a demo key
POST /api/demo-key (instant, no signup; rate-limited per IP).

Generate a ZK proof
POST /api/proof/generate with:

userId

rules

data

transactionAmount

Submit as payment
POST /api/pos/submit-proof with:

proof

publicInputs

transactionId

amount

currency

Everything is stateless and goes to https://api.affix-io.com; no local API or backend is required.

What's in this repo
Agentic Payments (flagship)
End-to-end flow: demo key → generate proof → submit to POS.
Offline-friendly design with double-spend protection and compact proofs (≤ 90 bytes).

Proof generate & verify
Call POST /api/proof/generate and POST /api/proof/verify with your own payloads.

Sandbox circuits
List and inspect circuits via GET /api/sandbox/circuits/<id> (no API key needed for sandbox).

Eligibility
Run POST /api/eligibility/check with identifier, dataSources, and rules.

Tokens
POST /api/tokens/generate and POST /api/tokens/validate for token creation and validation.

Health
GET /api/health — service status (no auth).

All endpoints hit https://api.affix-io.com only.

API reference
Endpoint	Method	Auth	Purpose
/api/health	GET	No	Service health check
/api/demo-key	POST	No	Get a short-lived demo API key (rate-limited)
/api/proof/generate	POST	Bearer	Generate a ZK payment proof
/api/proof/verify	POST	Bearer	Verify a proof and its public inputs
/api/pos/submit-proof	POST	Bearer	Submit a proof as a POS transaction
/api/eligibility/check	POST	Bearer	Run an eligibility check
/api/tokens/generate	POST	Bearer	Generate a token (e.g. with expiration)
/api/tokens/validate	POST	Bearer	Validate a token
/api/sandbox/circuits/<id>	GET	Optional	Sandbox circuit info
Base URL: https://api.affix-io.com
Docs: https://api.affix-io.com/docs 
