# Stellaroid Earn Maintenance

Use this runbook to keep the project credible after the event. Evidence matters more than optimistic status labels.

## Weekly Smoke Check

Run from the repo root:

```powershell
git status --short --branch
```

Frontend checks:

```powershell
cd frontend
npm run lint
npm run build
npm run test:e2e
```

Live fallback checks:

```powershell
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/" -Method Get -TimeoutSec 30
# Include this after the `/status` route has been deployed.
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/status" -Method Get -TimeoutSec 30
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/api/health" -Method Get -TimeoutSec 30
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/sitemap.xml" -Method Get -TimeoutSec 30
```

Proof sample checks:

```powershell
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/proof/c02ce1602d5bbb6ddfe93c6603d7f4e3dae3b2fb571ea4e70669ccd5a359aea3" -Method Get -TimeoutSec 30
Invoke-WebRequest -Uri "https://stellar.expert/explorer/testnet/contract/CA7P5EPYKC2IW4PCMAH6NRBLHH3WP7AN6WWC3QDRWO4HLE47FAGO6TET" -Method Get -TimeoutSec 30
```

## Domain Continuity Check

Do not switch public docs to `stellaroid.tech` unless these checks pass:

```powershell
nslookup -type=NS stellaroid.tech 8.8.8.8
nslookup -type=A stellaroid.tech 8.8.8.8
nslookup -type=CNAME www.stellaroid.tech 8.8.8.8
nslookup -type=CNAME earn.stellaroid.tech 8.8.8.8
npx vercel domains inspect stellaroid.tech
npx vercel domains inspect www.stellaroid.tech
npx vercel domains inspect earn.stellaroid.tech
```

Then verify HTTP:

```powershell
Invoke-WebRequest -Uri "https://stellaroid.tech/" -Method Get -TimeoutSec 30
Invoke-WebRequest -Uri "https://www.stellaroid.tech/" -Method Get -MaximumRedirection 0 -TimeoutSec 30
Invoke-WebRequest -Uri "https://earn.stellaroid.tech/" -Method Get -MaximumRedirection 0 -TimeoutSec 30
```

Pass criteria are in `docs/STELLAROID_TECH_CUTOVER.md`.

## Release Discipline

- Run lint, build, E2E, and `git diff --check` before any checkpoint commit.
- Keep `docs-new/research/` out of canonical claims unless citations are normalized and claims are reverified.
- Never paste raw secrets into issues, commits, docs, or chat.
- Keep generated Playwright artifacts out of git.
- Commit only when the user explicitly asks for a checkpoint commit.
- Push only when the user explicitly asks for a push.

## Monthly Product Review

Answer these in a short issue or note:

- Is the fallback demo still live?
- Is the verified proof page still readable without a wallet?
- Are issuer pending/approved/locked states clear?
- Can the employer flow still start from a proof page?
- Is the custom domain ready, blocked, or intentionally deferred?
- What is the next single feature that makes this more useful to a real issuer or employer?
