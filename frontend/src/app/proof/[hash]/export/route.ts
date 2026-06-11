import { NextResponse } from "next/server";
import {
  getCertificateServer,
  getIssuerServer,
} from "@/lib/contract-read-server";
import {
  buildEmployerVerificationExport,
  proofExportFilename,
} from "@/lib/proof-export";
import { getProofMetadataForCertificate } from "@/lib/proof-metadata";

export const revalidate = 60;

const HASH_RE = /^[0-9a-f]{64}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  const { hash: rawHash } = await params;
  const hash = rawHash.trim().replace(/^0x/i, "").toLowerCase();

  if (!HASH_RE.test(hash)) {
    return NextResponse.json(
      { error: "Certificate hash must be 64 hexadecimal characters." },
      { status: 404 },
    );
  }

  let cert;
  try {
    cert = await getCertificateServer(hash);
  } catch {
    return NextResponse.json(
      { error: "Proof lookup failed. Retry after the Stellar RPC recovers." },
      { status: 502 },
    );
  }

  if (!cert) {
    return NextResponse.json(
      { error: "No on-chain certificate record was found for this hash." },
      { status: 404 },
    );
  }

  let issuer = null;
  try {
    issuer = await getIssuerServer(cert.issuer);
  } catch {
    issuer = null;
  }

  const proofMetadata = await getProofMetadataForCertificate(hash, cert);
  const payload = buildEmployerVerificationExport({
    hash,
    cert,
    issuer,
    proofMetadata,
  });

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
      "Content-Disposition": `attachment; filename="${proofExportFilename(hash)}"`,
    },
  });
}
