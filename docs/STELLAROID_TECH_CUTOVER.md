# stellaroid.tech Cutover Runbook

## Verified Snapshot - 2026-05-10

- `https://stellaroid-earn-demo.vercel.app/` returns `200 OK` and remains the canonical fallback.
- Public DNS is not ready: Google DNS returns `Server failed` for `stellaroid.tech`, `www.stellaroid.tech`, and `earn.stellaroid.tech`.
- Live HTTPS is not ready: all three custom-domain URLs fail with `No such host is known`.
- Vercel still sees the domain records under `iron-marks-projects`, but marks them as not configured properly.
- Current Vercel project link is `iron-marks-projects/stellaroid-earn-demo`, project ID `prj_GNoFcXJpKuwDUz7IeGttAfwCxMFl`, root directory `frontend`.
- Do not migrate README/demo links or redirect the demo URL until the pass criteria below succeed.

## Current Safe State

- `https://stellaroid-earn-demo.vercel.app/` remains the submission-safe URL.
- `stellaroid.tech` and `www.stellaroid.tech` are attached to the Vercel project but are not DNS-configured publicly.
- `earn.stellaroid.tech` is visible to Vercel domain inspection, but still needs final project/domain verification before relying on it.
- Do not redirect `stellaroid-earn-demo.vercel.app` until `https://stellaroid.tech/` is live.

## DNS Target

Preferred nameserver setup at get.tech:

```txt
ns1.vercel-dns.com
ns2.vercel-dns.com
```

If using get.tech/OrderBox DNS records instead of Vercel nameservers:

```txt
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
CNAME  earn   cname.vercel-dns.com
```

If Vercel CLI recommends A records for the subdomains during the final check, prefer the exact Vercel output from that run over this fallback example.

## Verification Commands

```powershell
nslookup -type=NS stellaroid.tech 8.8.8.8
nslookup -type=A stellaroid.tech 8.8.8.8
nslookup -type=CNAME www.stellaroid.tech 8.8.8.8
nslookup -type=CNAME earn.stellaroid.tech 8.8.8.8
npx vercel domains inspect stellaroid.tech
```

Live checks:

```powershell
Invoke-WebRequest -Uri "https://stellaroid.tech/" -Method Get -TimeoutSec 30
Invoke-WebRequest -Uri "https://www.stellaroid.tech/" -Method Get -MaximumRedirection 0 -TimeoutSec 30
Invoke-WebRequest -Uri "https://earn.stellaroid.tech/" -Method Get -MaximumRedirection 0 -TimeoutSec 30
Invoke-WebRequest -Uri "https://stellaroid-earn-demo.vercel.app/" -Method Get -TimeoutSec 30
```

## Cutover Pass Criteria

Proceed only when:

- `https://stellaroid.tech/` returns `200`.
- Vercel reports `stellaroid.tech` as configured.
- `www.stellaroid.tech` redirects to `https://stellaroid.tech/`.
- `earn.stellaroid.tech` redirects to `https://stellaroid.tech/`.
- `https://stellaroid-earn-demo.vercel.app/` still returns `200`.

## Cutover Actions

1. Update app metadata and docs from `stellaroid-earn-demo.vercel.app` to `stellaroid.tech`.
2. Run `npm run build` in `frontend/`.
3. Deploy production with `npx vercel --prod --yes` from the repo root.
4. Verify live app, `/api/health`, and `/sitemap.xml` on `stellaroid.tech`.
5. Set `stellaroid-earn-demo.vercel.app` to `308` redirect to `stellaroid.tech`.
6. Verify old submission links redirect correctly.

## Rollback

If `stellaroid.tech` fails after cutover:

1. Remove the redirect from `stellaroid-earn-demo.vercel.app`.
2. Keep the demo URL serving the app.
3. Revert public links back to `stellaroid-earn-demo.vercel.app` until DNS is stable.
