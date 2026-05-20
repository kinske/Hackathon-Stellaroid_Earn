import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeOpportunityId,
  opportunityIdToBigInt,
} from "./opportunity-id.ts";

test("opportunity IDs stay lossless as strings or bigint values", () => {
  const largeId = "900719925474099312345";

  assert.equal(normalizeOpportunityId(largeId), largeId);
  assert.equal(normalizeOpportunityId(BigInt(largeId)), largeId);
  assert.equal(opportunityIdToBigInt(largeId), 900719925474099312345n);
});

test("opportunity IDs reject unsafe numbers and malformed strings", () => {
  assert.throws(
    () => normalizeOpportunityId(Number.MAX_SAFE_INTEGER + 1),
    /safe non-negative integer/i,
  );
  assert.throws(() => normalizeOpportunityId("-1"), /unsigned integer/i);
  assert.throws(() => normalizeOpportunityId("12.3"), /unsigned integer/i);
});
