import { appConfig } from "@/lib/config";
import type { CertificateRecord } from "@/lib/contract-read-server";
import { seoCanonicalUrl } from "@/lib/seo";
import type { IssuerRecord, ProofEvidenceLink, ProofMetadata } from "@/lib/types";

const EXPORT_VERSION = "2026-06-11";

function timestampToIso(value: number): string | null {
  if (!value || value <= 0) return null;
  const millis = value > 9_999_999_999 ? value : value * 1000;
  return new Date(millis).toISOString();
}

function absoluteHref(link: ProofEvidenceLink): ProofEvidenceLink {
  if (link.href.startsWith("/")) {
    return { ...link, href: seoCanonicalUrl(link.href) };
  }
  return link;
}

export function proofExportFilename(hash: string) {
  const clean = hash.trim().replace(/^0x/i, "").toLowerCase();
  return `stellaroid-proof-${clean.slice(0, 12)}-summary.json`;
}

export function buildEmployerVerificationExport({
  hash,
  cert,
  issuer,
  proofMetadata,
}: {
  hash: string;
  cert: CertificateRecord;
  issuer: IssuerRecord | null;
  proofMetadata: ProofMetadata | null;
}) {
  const proofUrl = seoCanonicalUrl(`/proof/${hash}`);
  const verified = cert.status === "verified";

  return {
    type: "stellaroid.employer_verification_summary",
    version: EXPORT_VERSION,
    generatedAt: new Date().toISOString(),
    proofUrl,
    network: appConfig.network,
    contract: {
      id: appConfig.contractId,
      explorerUrl: appConfig.contractId
        ? `${appConfig.explorerUrl}/contract/${appConfig.contractId}`
        : appConfig.explorerUrl,
      eventsUrl: appConfig.contractId
        ? `${appConfig.explorerUrl}/contract/${appConfig.contractId}#events`
        : appConfig.explorerUrl,
    },
    trustSummary: {
      status: cert.status,
      verified,
      employerUse:
        verified
          ? "Eligible for employer review and paid-trial workflows."
          : "Inspect only. Do not treat as verified until the on-chain status is verified.",
      sourceOfTruth: "Stellar testnet contract state plus the public proof page.",
    },
    credential: {
      hash,
      title: proofMetadata?.title ?? cert.title,
      description: proofMetadata?.description ?? null,
      cohort: proofMetadata?.cohort ?? cert.cohort,
      owner: cert.owner,
      issuer: cert.issuer,
      metadataUri: cert.metadataUri || null,
      status: cert.status,
      issuedAt: timestampToIso(cert.issuedAt),
      verifiedAt: timestampToIso(cert.verifiedAt),
      expiresAt: timestampToIso(cert.expiresAt),
      skills: proofMetadata?.skills ?? [],
      evidence: proofMetadata?.evidence.map(absoluteHref) ?? [],
    },
    issuer: issuer
      ? {
          address: issuer.address,
          name: issuer.name,
          website: issuer.website,
          category: issuer.category,
          status: issuer.status,
        }
      : null,
    recruiterChecklist: [
      "Open proofUrl and confirm the status shown on the public proof page.",
      "Open contract.eventsUrl and confirm recent certificate lifecycle events when needed.",
      "Check issuer.status before relying on issuer branding or issuer claims.",
      "Use credential.hash as the immutable lookup key in applicant tracking notes.",
    ],
  };
}
