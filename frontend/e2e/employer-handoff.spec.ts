import { expect, test } from "@playwright/test";

test("employer page normalizes repeated proof handoff query params", async ({ page }) => {
  await page.goto("/employer?hash=abc&hash=def&candidate=first&candidate=second");

  await expect(page.getByRole("heading", { name: "Fund a paid trial" })).toBeVisible();
  await expect(page.getByText("Use a 64-character hex certificate hash.")).toBeVisible();

  const handoff = page.getByRole("region", { name: "Proof handoff" });
  await expect(handoff.getByText("abc", { exact: true })).toBeVisible();
  await expect(handoff.getByText("first", { exact: true })).toBeVisible();
  await expect(handoff.getByText("def", { exact: true })).toHaveCount(0);
  await expect(handoff.getByText("second", { exact: true })).toHaveCount(0);
});
