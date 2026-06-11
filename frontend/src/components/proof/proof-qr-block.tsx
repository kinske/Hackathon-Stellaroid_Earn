import { seoCanonicalUrl } from "@/lib/seo";

interface ProofQrBlockProps {
  hash: string;
}

export function ProofQrBlock({ hash }: ProofQrBlockProps) {
  const proofUrl = seoCanonicalUrl(`/proof/${hash}`);

  return (
    <div className="flex items-center gap-4">
      <img
        src={`/proof/${hash}/qr`}
        alt={`QR code linking to ${proofUrl}`}
        width={128}
        height={128}
        loading="lazy"
        decoding="async"
        className="w-32 h-32 rounded shrink-0 bg-[#F8FAFC] p-1.5"
      />
      <div className="text-[0.8125rem] text-text-muted leading-relaxed">
        <strong className="block text-text text-sm mb-0.5">Scan to verify</strong>
        Point a phone camera at the QR to open this Verified Badge without a wallet.
      </div>
    </div>
  );
}

export default ProofQrBlock;
