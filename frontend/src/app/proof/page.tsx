import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/ui/json-ld";
import { ProofIndexForm } from "@/components/proof/proof-index-form";
import { DEFAULT_SAMPLE_PROOF_HASH } from "@/lib/demo-data";
import { getRecentProofHashes } from "@/lib/events";
import { appConfig } from "@/lib/config";
import { buildPageMetadata, seoCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/proof",
  title: "Look Up a Certificate",
  description:
    "Paste a SHA-256 hash to view its on-chain record, issuer trust status, and any attached credential evidence. No wallet required.",
  keywords:
    "stellar proof lookup, certificate lookup, hash verification, on-chain certificate, proof verification",
});

export default async function ProofIndex() {
  let sampleHashes = [DEFAULT_SAMPLE_PROOF_HASH];

  try {
    const recentHashes = await getRecentProofHashes(appConfig.contractId, 3);
    if (recentHashes.length > 0) {
      sampleHashes = recentHashes;
    }
  } catch {
    // Fall back to the known-good sample hash if the RPC is unavailable.
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Look Up a Certificate",
          url: seoCanonicalUrl("/proof"),
          description:
            "Paste a SHA-256 hash to view its on-chain record, issuer trust status, and any attached credential evidence.",
          isPartOf: {
            "@type": "WebApplication",
            name: "Stellaroid Earn",
            url: seoCanonicalUrl("/"),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: seoCanonicalUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Look Up a Certificate",
              item: seoCanonicalUrl("/proof"),
            },
          ],
        }}
      />
      <SiteNav />
      <main id="main" className="mx-auto max-w-2xl px-6 py-18 text-center text-text">
        <Image
          src="/illust/illust-lookup.svg"
          alt=""
          width={192}
          height={128}
          className="mx-auto mb-5 block h-auto [image-rendering:pixelated]"
          aria-hidden="true"
        />
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/8 px-3 py-1 font-pixel text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Public proof
        </span>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-text">
          Look up any certificate
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-text-muted">
          Paste a 64-character SHA-256 hash to view its on-chain record, issuer
          trust status, and any attached credential evidence. No wallet
          required.
        </p>
        <ProofIndexForm sampleHashes={sampleHashes} />
      </main>
      <SiteFooter />
    </>
  );
}
