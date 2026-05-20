import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOpportunityServer } from "@/lib/contract-read-server";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { FreighterWalletProvider } from "@/hooks/use-freighter-wallet";
import { OpportunityCard } from "@/components/opportunity/opportunity-card";
import { normalizeOpportunityId } from "@/lib/opportunity-id";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Opportunity #${id} · Stellaroid Earn`,
    description: "Escrowed paid trial on Stellar testnet.",
  };
}

export default async function OpportunityPage({ params }: PageProps) {
  const { id } = await params;
  let opportunityId: string;
  try {
    opportunityId = normalizeOpportunityId(id);
  } catch {
    notFound();
  }

  let opportunity;
  try {
    opportunity = await getOpportunityServer(opportunityId);
  } catch {
    opportunity = null;
  }

  if (!opportunity) notFound();

  return (
    <FreighterWalletProvider>
      <SiteNav />
      <main
        id="main"
        style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}
      >
        <OpportunityCard opportunity={opportunity} />
      </main>
      <SiteFooter />
    </FreighterWalletProvider>
  );
}
