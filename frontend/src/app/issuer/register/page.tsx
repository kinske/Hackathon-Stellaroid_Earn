import type { Metadata } from "next";
import { FreighterWalletProvider } from "@/hooks/use-freighter-wallet";
import { RegisterIssuerExperience } from "./register-experience";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/issuer/register",
  title: "Register Issuer",
  description:
    "Create an on-chain issuer profile for the Phase 1 trust registry in Stellaroid Earn.",
  openGraphType: "article",
});

export default function RegisterIssuerPage() {
  return (
    <FreighterWalletProvider>
      <RegisterIssuerExperience />
    </FreighterWalletProvider>
  );
}
