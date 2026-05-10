# stellaroid.tech Cutover Runbook

## Verified Snapshot - 2026-05-10

- `https://stellaroid.tech/` returns `200 OK` and is the canonical public URL.
- `https://www.stellaroid.tech/` redirects to `https://stellaroid.tech/` with `308`.
- `https://earn.stellaroid.tech/` redirects to `https://stellaroid.tech/` with `308`.
- `https://stellaroid-earn-demo.vercel.app/` remains a working Vercel fallback URL.
- Vercel reports `stellaroid.tech`, `www.stellaroid.tech`, and `earn.stellaroid.tech` as verified project domains.
- Current Vercel project link is `iron-marks-projects/stellaroid-earn-demo`, project ID `prj_GNoFcXJpKuwDUz7IeGttAfwCxMFl`, root directory `frontend`.

## Current Safe State

- Use `https://stellaroid.tech/` in public docs, demos, metadata, and social links.
- Keep `https://stellaroid-earn-demo.vercel.app/` available as a fallback.
- `www` and `earn` should redirect to the apex canonical URL to avoid duplicate public surfaces.

## Verification Commands

```powershell
nslookup -type=NS stellaroid.tech 8.8.8.8
nslookup -type=A stellaroid.tech 8.8.8.8
npx vercel domains inspect stellaroid.tech
```

Live checks:

```powershell
curl.exe -I -L --max-redirs 0 https://stellaroid.tech/
curl.exe -I -L --max-redirs 0 https://www.stellaroid.tech/
curl.exe -I -L --max-redirs 0 https://earn.stellaroid.tech/
curl.exe -I -L https://stellaroid.tech/status
curl.exe -sS https://stellaroid.tech/api/health
```

## Pass Criteria

- `https://stellaroid.tech/` returns `200`.
- `https://www.stellaroid.tech/` redirects to `https://stellaroid.tech/`.
- `https://earn.stellaroid.tech/` redirects to `https://stellaroid.tech/`.
- `https://stellaroid.tech/status` renders the status page.
- `https://stellaroid.tech/api/health` returns healthy JSON.
- `https://stellaroid-earn-demo.vercel.app/` remains reachable as fallback.

## Rollback

If the apex domain fails:

1. Keep the Vercel fallback URL serving the app.
2. Revert public links back to `stellaroid-earn-demo.vercel.app`.
3. Re-check registrar nameservers and Vercel project-domain verification.
