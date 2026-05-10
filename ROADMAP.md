# Stellaroid Earn Roadmap

Stellaroid Earn is no longer just a bootcamp submission. The project should stay alive as a small, credible credential verification product on Stellar testnet first, with a path to real issuer pilots later.

## Current Position

- Live fallback demo: https://stellaroid-earn-demo.vercel.app/
- Current verified contract: `CA7P5EPYKC2IW4PCMAH6NRBLHH3WP7AN6WWC3QDRWO4HLE47FAGO6TET`
- Custom domain target: `stellaroid.tech`, not live until DNS passes the cutover runbook.
- Product wedge: public credential proof pages plus issuer trust and employer-to-graduate payment flow.

## Phase 1 - Keep It Reliable

- Keep the fallback Vercel demo healthy until `stellaroid.tech` is DNS-ready.
- Run the weekly maintenance checks in `MAINTENANCE.md`.
- Keep Playwright E2E green for register, approve, pay, and public proof.
- Keep docs clear that all examples run on Stellar testnet.
- Avoid adding mainnet, NFT, marketplace, or backend scope until the core proof loop is stable.

## Phase 2 - Make It Useful After The Event

- Improve issuer onboarding so pending, approved, and suspended states are obvious.
- Make the employer flow start cleanly from a proof page with hash and candidate context.
- Turn candidate pages into honest talent passports, without pretending wallet-wide credential discovery exists before an indexer is built.
- Keep `/status` current for demo health, contract ID, proof links, and domain state.
- Document a pilot workflow for one real issuer and a small batch of graduates.

## Phase 3 - Pilot With Real Users

- Pick one issuer: bootcamp, student org, campus group, or small training provider.
- Issue 5-10 real testnet credentials with stable metadata URLs.
- Collect feedback from one employer/recruiter persona on proof clarity and trust.
- Decide whether the next real milestone is a better testnet pilot or a mainnet feasibility study.

## Phase 4 - Product Decisions

- Mainnet: only after issuer workflow, key custody, privacy, support, and revocation policy are written down.
- Metadata hosting: use stable HTTPS JSON first; add pinning/storage only when the issuer workflow needs it.
- Indexing: add only when candidate passports must list credentials automatically.
- NFT badge layer: optional presentation layer only. The credential source of truth should remain the Stellar proof record.
- Payments: keep XLM on testnet for the demo; treat USDC or production payment rails as a separate compliance decision.

## Not Now

- No marketplace mechanics.
- No broad learning platform rebuild.
- No mainnet deploy from examples.
- No claim that `stellaroid.tech` is live until DNS and HTTP checks pass.
- No claim that talent pages automatically discover every wallet credential until an indexer exists.
