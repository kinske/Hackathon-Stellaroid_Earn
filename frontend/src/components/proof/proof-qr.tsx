"use client";

import { useEffect, useState } from "react";

interface ProofQrProps {
  url: string;
  size?: number;
}

export function ProofQr({ url, size = 96 }: ProofQrProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function renderQr() {
      try {
        // @ts-expect-error - qrcode ships a browser build without bundled TS declarations.
        const QRCode = await import("qrcode/lib/browser");
        const nextDataUrl = await QRCode.toDataURL(url, {
          margin: 1,
          width: size * 2,
          color: { dark: "#0F172A", light: "#F8FAFC" },
          errorCorrectionLevel: "M",
        });
        if (active) setDataUrl(nextDataUrl);
      } catch {
        if (active) setDataUrl(null);
      }
    }

    setDataUrl(null);
    void renderQr();

    return () => {
      active = false;
    };
  }, [url, size]);

  if (!dataUrl) {
    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          background: "var(--color-surface-2)",
          borderRadius: 6,
        }}
      />
    );
  }

  return (
    <img
      src={dataUrl}
      alt={`QR code linking to ${url}`}
      width={size}
      height={size}
      style={{ borderRadius: 6, background: "#F8FAFC", padding: 6 }}
    />
  );
}

export default ProofQr;
