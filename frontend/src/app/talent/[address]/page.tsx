import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { TalentPassport } from "@/components/talent/talent-passport";
import { getCertificateServer } from "@/lib/contract-read-server";
import { shortenAddress } from "@/lib/format";
import { buildPageMetadata, normalizeSeoPath } from "@/lib/seo";

const STELLAR_ADDRESS_RE = /^G[A-Z2-7]{55}$/;
const HASH_RE = /^[0-9a-f]{64}$/i;

interface PageProps {
  params: Promise<{ address: string }>;
  searchParams?: Promise<{ proof?: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { address } = await params;
  const safePath = normalizeSeoPath(`/talent/${address}`);
  const short = shortenAddress(address, 6);
  return buildPageMetadata({
    path: safePath,
    title: `Talent · ${short} · Stellaroid Earn`,
    description: `Candidate passport for ${short} on Stellar testnet.`,
    openGraphType: "profile",
    robots: {
      index: false,
      follow: false,
    },
  });
}

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TalentPage({ params, searchParams }: PageProps) {
  const { address } = await params;
  if (!STELLAR_ADDRESS_RE.test(address)) notFound();

  // Note: Without a backend index, we cannot enumerate all credentials for an address.
  // This page serves as the passport shell — credentials are linked from proof pages.
  // Future: add an event-indexing layer to populate this automatically.
  const query = await searchParams;
  const proofHash = firstSearchParam(query?.proof)?.trim().toLowerCase();
  const credentials = [];
  let linkedProof:
    | {
        hash: string;
        status: "loaded" | "invalid" | "not_found" | "mismatch" | "lookup_failed";
        owner?: string;
      }
    | undefined;

  if (proofHash) {
    if (!HASH_RE.test(proofHash)) {
      linkedProof = { hash: proofHash, status: "invalid" };
    } else {
      try {
        const cert = await getCertificateServer(proofHash);
        if (!cert) {
          linkedProof = { hash: proofHash, status: "not_found" };
        } else if (cert.owner.toUpperCase() !== address.toUpperCase()) {
          linkedProof = { hash: proofHash, status: "mismatch", owner: cert.owner };
        } else {
          credentials.push({ hash: proofHash, cert });
          linkedProof = { hash: proofHash, status: "loaded", owner: cert.owner };
        }
      } catch {
        linkedProof = { hash: proofHash, status: "lookup_failed" };
      }
    }
  }

  return (
    <>
      <SiteNav />
      <main
        id="main"
        style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}
      >
        <TalentPassport
          address={address}
          issuer={null}
          credentials={credentials}
          linkedProof={linkedProof}
        />
      </main>
      <SiteFooter />
    </>
  );
}
