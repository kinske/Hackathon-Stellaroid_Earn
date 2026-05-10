import type { Metadata } from "next";
import {
  FreighterWalletProvider,
} from "@/hooks/use-freighter-wallet";
import { IssuerDashboard } from "@/components/issuer/issuer-dashboard";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata: Metadata = {
  title: "Issuer",
  description:
    "Inspect or register an issuer wallet in the new on-chain trust registry for Stellaroid Earn.",
  alternates: { canonical: "/issuer" },
};

export default function IssuerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Issuer Dashboard",
          url: "https://stellaroid.tech/issuer",
          description:
            "Inspect or register an issuer wallet in the on-chain trust registry for Stellaroid Earn.",
          isPartOf: {
            "@type": "WebApplication",
            name: "Stellaroid Earn",
            url: "https://stellaroid.tech",
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
              item: "https://stellaroid.tech",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Issuer",
              item: "https://stellaroid.tech/issuer",
            },
          ],
        }}
      />
      <FreighterWalletProvider>
        <IssuerDashboard />
      </FreighterWalletProvider>
    </>
  );
}
