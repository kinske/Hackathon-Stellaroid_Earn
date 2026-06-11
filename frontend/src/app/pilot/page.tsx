import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { JsonLd } from "@/components/ui/json-ld";
import {
  SITE_AUTHOR_LINKEDIN,
  SITE_AUTHOR_URL,
  SITE_CANONICAL_URL,
  SITE_NAME,
  buildPageMetadata,
  seoCanonicalUrl,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/pilot",
  title: "Pilot Stellaroid Earn",
  description:
    "Request an issuer pilot or employer verification integration for Stellaroid Earn on Stellar testnet.",
  keywords:
    "stellar credential pilot, issuer pilot, employer verification integration, on-chain certificate verification",
});

const pilotJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pilot Stellaroid Earn",
  url: seoCanonicalUrl("/pilot"),
  description:
    "Request an issuer pilot or employer verification integration for Stellaroid Earn on Stellar testnet.",
  isPartOf: {
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_CANONICAL_URL,
  },
};

const intakeItems = [
  "Issuer name, website, and approval contact",
  "Expected credential volume and certificate format",
  "Graduate wallet readiness and support needs",
  "Employer verification or paid-trial workflow",
  "Pilot success metric and rollback plan",
];

export default function PilotPage() {
  return (
    <>
      <JsonLd data={pilotJsonLd} />
      <SiteNav />
      <main id="main" className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <section className="grid gap-5">
          <span className="font-pixel text-xs font-medium uppercase tracking-widest text-primary">
            Pilot intake
          </span>
          <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-end">
            <div>
              <h1 className="m-0 text-4xl font-bold tracking-tight text-text sm:text-5xl">
                Run a narrow credential pilot before expanding scope.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
                Stellaroid is strongest when one real issuer proves the issue,
                verify, revoke, and employer review loop on testnet. The pilot
                path below keeps NFT, marketplace, and mainnet work out of the
                way until the proof workflow is trusted.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="m-0 text-sm font-semibold text-text">
                Current pilot boundary
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Testnet only, public proof pages, employer summary export, and
                manual issuer approval. No production payroll or mainnet claims.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2" aria-label="Pilot request paths">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="m-0 text-xl font-semibold text-text">Issuer pilot</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              For a bootcamp, campus group, or training provider that wants to
              issue 5 to 10 verifiable testnet credentials and review the public
              proof experience with graduates.
            </p>
            <a
              href={SITE_AUTHOR_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover"
            >
              Book an issuer pilot
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="m-0 text-xl font-semibold text-text">Employer integration</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              For a recruiter or employer who wants a no-login proof URL,
              summary export, and paid-trial path tied to a verified credential.
            </p>
            <Link
              href="/proof"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface-2 px-4 text-sm font-semibold text-text no-underline transition-colors hover:border-primary"
            >
              Review proof workflow
            </Link>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="m-0 text-xl font-semibold text-text">What the pilot captures</h2>
          <ul className="mt-4 grid gap-3 p-0 sm:grid-cols-2" role="list">
            {intakeItems.map((item) => (
              <li
                key={item}
                className="list-none rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-text-muted">
            For anything outside that boundary, use the portfolio contact route
            first:{" "}
            <a
              href={SITE_AUTHOR_URL}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              marksiazon.dev
            </a>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
