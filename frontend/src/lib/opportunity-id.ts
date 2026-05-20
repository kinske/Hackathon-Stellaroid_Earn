export type OpportunityIdInput = string | number | bigint;

export function normalizeOpportunityId(value: OpportunityIdInput): string {
  if (typeof value === "bigint") {
    if (value < 0n) throw new Error("Opportunity ID must be non-negative.");
    return value.toString();
  }

  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error("Opportunity ID must be a safe non-negative integer.");
    }
    return String(value);
  }

  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    throw new Error("Opportunity ID must be an unsigned integer string.");
  }
  return BigInt(trimmed).toString();
}

export function opportunityIdToBigInt(value: OpportunityIdInput): bigint {
  return BigInt(normalizeOpportunityId(value));
}
