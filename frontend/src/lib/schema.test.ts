import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildAboutSoftwareProductSchema,
  buildProofArticleSchema,
  buildProofDigitalDocumentSchema,
} from "./schema.ts";

const SAMPLE_HASH =
  "c02ce1602d5bbb6ddfe93c6603d7f4e3dae3b2fb571ea4e70669ccd5a359aea3";

test("about schema describes Stellaroid Earn as a free software product without fake review data", () => {
  const schema = buildAboutSoftwareProductSchema();

  assert.deepEqual(schema["@type"], ["Product", "SoftwareApplication"]);
  assert.equal(schema.url, "https://stellaroid.tech/about");
  assert.equal(schema.creator.name, "Mark Siazon");
  assert.equal(schema.creator.url, "https://marksiazon.dev");
  assert.equal(schema.offers.price, "0");
  assert.equal(schema.offers.priceCurrency, "USD");
  assert.equal(schema.aggregateRating, undefined);
  assert.equal(schema.review, undefined);
  assert.equal(schema.reviews, undefined);
});

test("proof article schema is only emitted for real certificate records", () => {
  const absent = buildProofArticleSchema({
    hash: SAMPLE_HASH,
    cert: null,
    proofMetadata: null,
  });

  assert.equal(absent, null);
});

test("unknown proof document schema uses neutral lookup wording", () => {
  const schema = buildProofDigitalDocumentSchema({
    hash: SAMPLE_HASH,
    cert: null,
    proofMetadata: null,
  });
  const serialized = JSON.stringify(schema);

  assert.equal(schema["@type"], "DigitalDocument");
  assert.equal(schema.identifier, SAMPLE_HASH);
  assert.equal(schema.url, `https://stellaroid.tech/proof/${SAMPLE_HASH}`);
  assert.match(String(schema.name), /^Proof lookup/);
  assert.doesNotMatch(serialized, /Verified|Payment|Paid/i);
});

test("non-verified proof document schema does not claim verified payment status", () => {
  const schema = buildProofDigitalDocumentSchema({
    hash: SAMPLE_HASH,
    cert: {
      owner: "GAWIOVGFSPJDEIJJZUSVRFPVP3D5VNO2LGCU47KEHJD6MV277QKNR34D",
      issuer: "GBAKLRUJEOZGWKSHJFFWJ4DINXQZEJBT7JQTR5T4GATQU2SNO4ZFHZQ4",
      title: "Stellar Smart Contract Bootcamp Completion",
      cohort: "Stellar PH Bootcamp 2026",
      metadataUri: "",
      status: "issued",
      issuedAt: 1_765_000_000,
      verifiedAt: 0,
      expiresAt: 0,
      verified: false,
    },
    proofMetadata: null,
  });
  const serialized = JSON.stringify(schema);

  assert.equal(schema["@type"], "DigitalDocument");
  assert.equal(schema.identifier, SAMPLE_HASH);
  assert.doesNotMatch(serialized, /Verified|Payment|Paid/i);
  assert.match(String(schema.description), /current status is issued/i);
});

test("proof article schema uses absolute canonical URLs and certificate dates", () => {
  const schema = buildProofArticleSchema({
    hash: SAMPLE_HASH,
    cert: {
      owner: "GAWIOVGFSPJDEIJJZUSVRFPVP3D5VNO2LGCU47KEHJD6MV277QKNR34D",
      issuer: "GBAKLRUJEOZGWKSHJFFWJ4DINXQZEJBT7JQTR5T4GATQU2SNO4ZFHZQ4",
      title: "Stellar Smart Contract Bootcamp Completion",
      cohort: "Stellar PH Bootcamp 2026",
      metadataUri: "",
      status: "verified",
      issuedAt: 1_765_000_000,
      verifiedAt: 1_765_000_300,
      expiresAt: 0,
      verified: true,
    },
    proofMetadata: {
      title: "Stellar Smart Contract Bootcamp Completion",
      description: "Awarded after shipping a working Soroban contract.",
      cohort: "Stellar PH Bootcamp 2026",
      criteria: "Complete the bootcamp proof flow.",
      skills: ["Soroban smart contracts"],
      evidence: [],
    },
  });

  assert.ok(schema);
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.mainEntityOfPage["@id"], `https://stellaroid.tech/proof/${SAMPLE_HASH}`);
  assert.equal(schema.image, `https://stellaroid.tech/proof/${SAMPLE_HASH}/opengraph-image`);
  assert.equal(schema.author.name, "Mark Siazon");
  assert.equal(schema.about.identifier, SAMPLE_HASH);
  assert.ok(schema.datePublished);
  assert.ok(schema.dateModified);
  assert.match(schema.datePublished, /^2025-12-06T/);
  assert.match(schema.dateModified, /^2025-12-06T/);
});
