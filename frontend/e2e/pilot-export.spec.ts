import { expect, test } from "@playwright/test";

const SAMPLE_PROOF_HASH =
  "c02ce1602d5bbb6ddfe93c6603d7f4e3dae3b2fb571ea4e70669ccd5a359aea3";

test("pilot intake page exposes issuer and employer paths", async ({ page }) => {
  await page.goto("/pilot");

  await expect(
    page.getByRole("heading", { name: /run a narrow credential pilot/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /book an issuer pilot/i })).toHaveAttribute(
    "href",
    /linkedin\.com\/in\/mark-siazon/,
  );
  await expect(page.getByRole("link", { name: /review proof workflow/i })).toHaveAttribute(
    "href",
    "/proof",
  );
});

test("verified proof exposes an employer summary export", async ({ page, request }) => {
  await page.goto(`/proof/${SAMPLE_PROOF_HASH}`);

  const exportLink = page.getByRole("link", { name: /download proof pack/i });
  await expect(exportLink).toHaveAttribute("href", `/proof/${SAMPLE_PROOF_HASH}/export`);

  const response = await request.get(`/proof/${SAMPLE_PROOF_HASH}/export`);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-disposition"]).toContain(
    "stellaroid-proof-c02ce1602d5b-summary.json",
  );

  const body = await response.json();
  expect(body.type).toBe("stellaroid.employer_verification_summary");
  expect(body.proofUrl).toBe(`https://stellaroid.tech/proof/${SAMPLE_PROOF_HASH}`);
  expect(body.trustSummary.status).toBe("verified");
  expect(body.trustSummary.verified).toBe(true);
  expect(body.credential.hash).toBe(SAMPLE_PROOF_HASH);
  expect(body.standardsAlignment.status).toBe("unsigned_preview");
  expect(body.standardsAlignment.warning).toContain("not a signed Verifiable Credential");
  expect(body.standardsAlignment.w3cVerifiableCredential2Preview.type).toContain(
    "VerifiableCredential",
  );
  expect(body.recruiterChecklist).toContain(
    "Read standardsAlignment.warning before treating this export as a standards credential.",
  );
});
