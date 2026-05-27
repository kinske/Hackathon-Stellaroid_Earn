import type { CertificateRecord } from "./contract-read-server.ts";
import type { ProofMetadata } from "./types.ts";
import {
  SITE_AUTHOR_LINKEDIN,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
  SITE_CANONICAL_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  seoCanonicalUrl,
} from "./seo.ts";

type JsonLdObject = Record<string, unknown>;

const AUTHOR_SCHEMA = {
  "@type": "Person",
  name: SITE_AUTHOR_NAME,
  url: SITE_AUTHOR_URL,
  sameAs: [SITE_AUTHOR_URL, SITE_AUTHOR_LINKEDIN],
};

const PUBLISHER_SCHEMA = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_CANONICAL_URL,
  founder: AUTHOR_SCHEMA,
};

function secondsToIso(seconds: number | undefined): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  return new Date(seconds * 1000).toISOString();
}

function proofDocumentFallbackDescription(cert: CertificateRecord): string {
  if (cert.status === "verified") {
    return "Verified, on-chain proof of completed work. Anchored on Stellar with SHA-256. Paid atomically on verification.";
  }

  return `This credential is anchored on Stellar and its current status is ${cert.status}. Inspect the proof page before trusting or sharing this record.`;
}

export function buildAboutSoftwareProductSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "SoftwareApplication"],
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: seoCanonicalUrl("/about"),
    image: seoCanonicalUrl("/opengraph-image"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    creator: AUTHOR_SCHEMA,
    author: AUTHOR_SCHEMA,
    publisher: PUBLISHER_SCHEMA,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: seoCanonicalUrl("/app"),
    },
  };
}

export function buildProofDigitalDocumentSchema({
  hash,
  cert,
  proofMetadata,
}: {
  hash: string;
  cert: CertificateRecord | null;
  proofMetadata: ProofMetadata | null;
}): JsonLdObject {
  const proofUrl = seoCanonicalUrl(`/proof/${hash}`);
  const shortHash = `${hash.slice(0, 10)}...${hash.slice(-10)}`;

  if (!cert) {
    return {
      "@context": "https://schema.org",
      "@type": "DigitalDocument",
      name: `Proof lookup · ${shortHash}`,
      description: "No on-chain certificate record was found for this hash.",
      identifier: hash,
      url: proofUrl,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: proofMetadata?.title ?? `Proof of Work · ${shortHash}`,
    description: proofMetadata?.description ?? proofDocumentFallbackDescription(cert),
    identifier: hash,
    url: proofUrl,
    keywords: proofMetadata?.skills,
  };
}

export function buildProofArticleSchema({
  hash,
  cert,
  proofMetadata,
}: {
  hash: string;
  cert: CertificateRecord | null;
  proofMetadata: ProofMetadata | null;
}): JsonLdObject | null {
  if (!cert) return null;

  const proofUrl = seoCanonicalUrl(`/proof/${hash}`);
  const datePublished = secondsToIso(cert.issuedAt);
  const dateModified = secondsToIso(cert.verifiedAt) ?? datePublished;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: (proofMetadata?.title ?? cert.title) || "On-chain credential proof",
    description:
      proofMetadata?.description ??
      "Public credential proof report anchored on Stellar testnet.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": proofUrl,
    },
    image: seoCanonicalUrl(`/proof/${hash}/opengraph-image`),
    author: AUTHOR_SCHEMA,
    creator: AUTHOR_SCHEMA,
    publisher: PUBLISHER_SCHEMA,
    datePublished,
    dateModified,
    about: {
      "@type": "DigitalDocument",
      name: (proofMetadata?.title ?? cert.title) || "On-chain credential",
      identifier: hash,
      url: proofUrl,
    },
    mainEntity: {
      "@type": "DigitalDocument",
      identifier: hash,
      url: proofUrl,
    },
  };
}
