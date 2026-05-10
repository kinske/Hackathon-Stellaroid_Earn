# Web3 NFT Badge System — Spec + Roadmap

## One-Line Positioning

> A verification-first application with optional NFT badge minting, turning real achievements into collectible pixel-art proof.

---

## Overview

This project includes an optional Web3 layer that allows users to mint **pixel-based NFT badges** tied to verified achievements inside the app.

The goal is not to build a full NFT platform, but to demonstrate:

- on-chain ownership
- wallet-based interactions
- smart contract integration
- verifiable achievement linking
- collectible visual identity through pixel assets

This acts as a **portfolio-grade Web3 extension** on top of the core system.

---

## Why NFT Minting Exists Here

NFT minting is used as a **proof + collectible layer**, not as the main product.

It solves:

- verifiable ownership of achievements
- portable credentials (wallet-based)
- visual representation of milestones
- shareable proof outside the platform

It does NOT try to solve:

- trading
- speculation
- marketplace mechanics
- token economies

---

## Core Concept

> Complete → Verify → Mint → Own

1. User completes a verified milestone inside the app
2. System validates achievement
3. User unlocks mint eligibility
4. User mints a badge NFT
5. NFT links back to a public proof page

---

## NFT Type

**Verified Achievement Badge**

Each NFT represents:

- a completed milestone
- a verified accomplishment
- a collectible pixel-art badge

---

## Pixel Asset Integration

Pixel assets are not decorative. They are core to the NFT identity.

Each NFT uses:

- pixel-art badge or trophy
- distinct visual tier (if extended later)
- clean, readable design at small sizes

---

## Architecture

### High-Level Flow

```
Frontend (Next.js)
     ↓
Backend (API / verification logic)
     ↓
Smart Contract (ERC-721 on Polygon)
     ↓
IPFS (metadata + image)
```

### Detailed Flow

```
[User Action]
     ↓
[App Verification Logic]
     ↓
[Eligibility Unlocked]
     ↓
[Wallet Connect]
     ↓
[Mint Request]
     ↓
[Smart Contract]
     ↓
[NFT Minted]
     ↓
[Metadata → Proof Page]
```

---

## Tech Stack (Web3 Layer)

### Wallet Connection
- MetaMask
- WalletConnect

### Blockchain (Recommended)
- Polygon

Reason:
- low gas fees
- widely supported
- strong portfolio signal

### Storage
- IPFS for metadata and images

---

## Smart Contract Scope

Keep it minimal.

- Standard ERC-721 NFT
- Single collection
- Basic mint function
- Token URI support

No:
- royalties complexity
- marketplace logic
- advanced token mechanics

---

## Metadata Structure

Each NFT includes:

```json
{
  "name": "Execution Badge #001",
  "description": "Awarded for completing a verified milestone.",
  "image": "ipfs://<pixel-asset>",
  "external_url": "https://your-app/proof/<id>",
  "attributes": [
    { "trait_type": "Badge", "value": "Milestone Completion" },
    { "trait_type": "Level", "value": "Gold" },
    { "trait_type": "Verified", "value": "True" },
    { "trait_type": "Date", "value": "2026-04-21" }
  ]
}
```

---

## Proof Page Integration

Each NFT links to a **proof page** inside the app.

The page should display:

- achievement details
- verification status
- mint status
- wallet address (optional)
- NFT reference

This creates a bridge between:
- off-chain logic (your app)
- on-chain ownership (NFT)

---

## MVP Scope (Version 1 — Strict)

- single wallet connect flow
- single NFT collection
- one badge type
- one mint button
- one metadata template
- one pixel asset style
- proof page linking

That's it.

---

## Implementation Roadmap

### Phase 0 — Scope Lock + Asset Finalization

**Deliverables:** 1 PNG pixel badge (512x512), finalized project scope doc

**Acceptance:** No additional features added, asset finalized and ready for upload

**Prompt:** "Create a minimal project scope for an NFT badge system with only one badge type, one mint function, and one verification condition. No marketplace or tokenomics."

---

### Phase 1 — Smart Contract + Basic Mint

**Spec:** ERC-721 contract, public mint function, tokenURI support

**Deliverables:** Deployed contract address, working mint function

**Acceptance:** User can mint NFT, transaction confirmed on-chain, NFT visible in wallet

**Prompt:** "Generate a minimal ERC-721 smart contract with a mint function and tokenURI support. Keep it simple and secure."

---

### Phase 2 — Wallet Integration

**Spec:** Connect wallet, detect account, trigger mint from UI

**Deliverables:** Connect button, wallet address display, mint button linked to contract

**Acceptance:** Wallet connects successfully, mint triggered from frontend

**Prompt:** "Create a React component that connects to MetaMask and allows calling a smart contract mint function."

---

### Phase 3 — Metadata + IPFS

**Spec:** Upload image to IPFS, create metadata JSON, link metadata to tokenURI

**Deliverables:** IPFS image CID, IPFS metadata CID

**Acceptance:** NFT displays correct image and attributes, metadata resolves properly

**Prompt:** "Generate NFT metadata JSON with attributes, image link, and external_url pointing to a proof page."

---

### Phase 4 — Verification Layer

**Spec:** User must complete action before minting, backend verifies eligibility

**Deliverables:** Verification flag in DB, gated mint button

**Acceptance:** Mint blocked if not verified, mint enabled if verified

**Prompt:** "Implement a backend check that only allows NFT minting if a user has completed a specific action."

---

### Phase 5 — Proof Page

**Spec:** Dynamic route `/proof/[id]`, display achievement data, link NFT to proof page

**Deliverables:** Proof UI page, metadata external_url linking here

**Acceptance:** NFT opens proof page, proof page shows correct data

**Prompt:** "Create a dynamic Next.js page that displays proof of achievement using an ID."

---

### Phase 6 — Advanced Feature (Choose ONE)

**Option A — Gasless Mint**
- EIP-712 signature, backend relayer sends transaction
- Acceptance: user signs only, backend mints NFT

**Option B — NFT Gallery**
- Fetch NFTs by wallet, display UI grid
- Acceptance: NFTs displayed correctly

---

### Phase 7 — Security + Validation

**Spec:** Basic access control, input validation

**Acceptance:** No unauthorized minting, contract follows safe patterns

**Prompt:** "Add basic security practices to an ERC-721 contract, including access control and safe minting."

---

### Phase 8 — README + Portfolio Polish

**Spec:** Clear explanation, architecture diagram, demo flow

**Acceptance:** Project understandable in <30 seconds

---

## Final Deliverable

A working system where:

1. User completes action
2. Unlocks NFT
3. Connects wallet
4. Mints badge
5. Views NFT
6. Opens proof page

---

## Future Extensions (Optional)

Only after core works:

- multiple badge tiers (bronze, silver, gold)
- user profile gallery
- dynamic metadata updates
- limited edition badges
- cohort-based drops

---

## What This Project Is NOT

- not an NFT marketplace
- not a trading platform
- not a token economy
- not a speculative system

---

## Final Rule

If you are not deploying by Phase 3, you are stuck in fake productivity.

Ship. Iterate later.
