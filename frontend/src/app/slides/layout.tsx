import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/slides",
  title: "Demo Presentation",
  description:
    "Stellaroid Earn Demo Day presentation - on-chain credential trust for Stellar testnet. Top 5 / 105 in the Stellar PH Bootcamp 2026.",
});

export default function SlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
