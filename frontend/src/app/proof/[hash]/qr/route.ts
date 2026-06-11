import QRCode from "qrcode";
import { seoCanonicalUrl } from "@/lib/seo";

export const revalidate = 86_400;

const HASH_RE = /^[0-9a-f]{64}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  const { hash: rawHash } = await params;
  const hash = rawHash.trim().replace(/^0x/i, "").toLowerCase();

  if (!HASH_RE.test(hash)) {
    return new Response("Certificate hash must be 64 hexadecimal characters.", {
      status: 404,
    });
  }

  const svg = await QRCode.toString(seoCanonicalUrl(`/proof/${hash}`), {
    type: "svg",
    margin: 1,
    width: 256,
    color: { dark: "#0F172A", light: "#F8FAFC" },
    errorCorrectionLevel: "M",
  });

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
