import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeSeoPath, seoCanonicalUrl } from "./seo.ts";

test("normalizeSeoPath collapses duplicate slashes and normalizes root", () => {
  assert.equal(normalizeSeoPath("//proof///"), "/proof");
  assert.equal(normalizeSeoPath("/"), "/");
  assert.equal(normalizeSeoPath("proof"), "/proof");
});

test("seoCanonicalUrl builds canonical URLs without trailing slash on root", () => {
  const root = seoCanonicalUrl("/");
  const about = seoCanonicalUrl("/about");

  assert.match(root, /^https:\/\/[^/]+$/);
  assert.equal(about.endsWith("/about"), true);
  assert.equal(new URL(about).pathname.includes("//"), false);
});
