import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { shortenAddress } from "@/lib/format";
import type { IssuerRecord } from "@/lib/types";
import type { CertificateRecord } from "@/lib/contract-read-server";
import {
  AlertTriangle,
  BriefcaseBusiness,
  ExternalLink,
  FileSearch,
  ShieldCheck,
} from "lucide-react";

interface TalentPassportProps {
  address: string;
  issuer: IssuerRecord | null;
  credentials: { hash: string; cert: CertificateRecord }[];
  linkedProof?: {
    hash: string;
    status: "loaded" | "invalid" | "not_found" | "mismatch" | "lookup_failed";
    owner?: string;
  };
}

function statusTone(status: string): "success" | "warning" | "danger" | "neutral" {
  switch (status) {
    case "verified":
      return "success";
    case "revoked":
      return "danger";
    case "suspended":
    case "expired":
      return "warning";
    default:
      return "neutral";
  }
}

export function TalentPassport({
  address,
  issuer,
  credentials,
  linkedProof,
}: TalentPassportProps) {
  const linkedProofHref =
    linkedProof?.status === "loaded" ? `/proof/${linkedProof.hash}` : null;
  const employerHref = linkedProof?.status === "loaded"
    ? `/employer?hash=${encodeURIComponent(linkedProof.hash)}&candidate=${encodeURIComponent(address)}`
    : `/employer?candidate=${encodeURIComponent(address)}`;
  const verifiedCount = credentials.filter(
    ({ cert }) => cert.status === "verified",
  ).length;
  const proofNotice = (() => {
    if (!linkedProof) return null;

    switch (linkedProof.status) {
      case "loaded":
        return {
          tone: "success" as const,
          icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
          title: "Known proof attached",
          detail:
            "This passport is showing the proof that opened it. Wallet-wide discovery still needs an indexer.",
        };
      case "mismatch":
        return {
          tone: "danger" as const,
          icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
          title: "Proof owner mismatch",
          detail: `The linked proof belongs to ${linkedProof.owner ?? "another wallet"}, so it is not listed on this passport.`,
        };
      case "invalid":
        return {
          tone: "warning" as const,
          icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
          title: "Proof hash is invalid",
          detail:
            "Use a 64-character certificate hash to attach a known proof to this passport.",
        };
      case "not_found":
        return {
          tone: "warning" as const,
          icon: <FileSearch className="h-4 w-4" aria-hidden="true" />,
          title: "Proof not found",
          detail:
            "No on-chain credential was found for the proof hash in the URL.",
        };
      case "lookup_failed":
      default:
        return {
          tone: "warning" as const,
          icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
          title: "Proof lookup unavailable",
          detail:
            "The proof lookup did not complete. The passport is still limited to known proof links.",
        };
    }
  })();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
          Talent profile
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text">
              Candidate passport
            </h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <code className="font-mono text-sm text-text">
                {shortenAddress(address, 10)}
              </code>
              <CopyButton value={address} ariaLabel="Copy candidate address" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {linkedProofHref ? (
              <Button variant="secondary" href={linkedProofHref} icon={<ExternalLink className="h-4 w-4" />}>
                Back to verified proof
              </Button>
            ) : null}
            <Button variant="primary" href={employerHref} icon={<BriefcaseBusiness className="h-4 w-4" />}>
              Start paid trial
            </Button>
          </div>
        </div>
        {issuer ? (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-text-muted">Issuer:</span>
            <span className="text-sm font-semibold text-text">{issuer.name}</span>
            <Badge
              tone={issuer.status === "approved" ? "success" : "warning"}
              dot
            >
              {issuer.status}
            </Badge>
          </div>
        ) : null}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted/70">
              Known proofs
            </p>
            <p className="mt-1 text-2xl font-semibold text-text">{credentials.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-bg px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted/70">
              Verified proofs
            </p>
            <p className="mt-1 text-2xl font-semibold text-text">{verifiedCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-bg px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted/70">
              Search index
            </p>
            <p className="mt-1 text-sm font-semibold text-warning">Not live yet</p>
          </div>
        </div>
        {proofNotice ? (
          <div className="mt-5 flex gap-3 rounded-xl border border-border bg-bg px-4 py-3">
            <span
              className={
                proofNotice.tone === "success"
                  ? "mt-0.5 text-success"
                  : proofNotice.tone === "danger"
                    ? "mt-0.5 text-danger"
                    : "mt-0.5 text-warning"
              }
            >
              {proofNotice.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-text">{proofNotice.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                {proofNotice.detail}
              </p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold text-text">Credentials</h2>
            <p className="mt-1 text-sm text-text-muted">
              This list only includes proof links that were explicitly opened.
            </p>
          </div>
          <Badge tone={credentials.length > 0 ? "success" : "warning"} dot>
            Known proof links
          </Badge>
        </div>
        {credentials.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border/60 bg-bg/50 px-6 py-8 text-center">
            <Badge tone="warning" dot>
              Index required
            </Badge>
            <p className="text-sm text-text-muted max-w-[42ch] leading-relaxed">
              Stellaroid can verify a known proof hash today, but it cannot automatically enumerate
              every credential for this wallet until the event index/search layer ships.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button variant="secondary" href="/proof">
                Verify a proof
              </Button>
              <Button variant="ghost" href={employerHref}>
                Start employer flow
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {credentials.map(({ hash, cert }) => (
              <a
                key={hash}
                href={`/proof/${hash}`}
                className="rounded-xl border border-border bg-bg p-4 no-underline hover:border-primary/50 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text">
                    {cert.title || "Untitled"}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{cert.cohort}</p>
                  <p className="mt-2 break-all font-mono text-[11px] text-text-muted">
                    {hash}
                  </p>
                </div>
                <Badge tone={statusTone(cert.status)} dot>
                  {cert.status}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold text-text">Opportunity history</h2>
            <p className="mt-1 text-sm text-text-muted">
              Paid-trial history should be grouped here once opportunities can be searched by
              candidate address.
            </p>
          </div>
          <Badge tone="neutral">Indexer backlog</Badge>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-bg/50 px-5 py-4 text-sm text-text-muted">
          No opportunity registry is connected to this passport yet. Direct opportunity pages still
          work when you know the `/opportunity/[id]` URL.
        </div>
      </section>
    </div>
  );
}
