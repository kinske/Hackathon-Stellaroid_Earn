import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { shortenAddress } from "@/lib/format";
import type { IssuerRecord } from "@/lib/types";
import type { CertificateRecord } from "@/lib/contract-read-server";

interface TalentPassportProps {
  address: string;
  issuer: IssuerRecord | null;
  credentials: { hash: string; cert: CertificateRecord }[];
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
}: TalentPassportProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
          Candidate passport
        </p>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <code className="font-mono text-sm text-text">
            {shortenAddress(address, 10)}
          </code>
          <CopyButton value={address} ariaLabel="Copy candidate address" />
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
              Search index
            </p>
            <p className="mt-1 text-sm font-semibold text-warning">Not live yet</p>
          </div>
          <div className="rounded-xl border border-border bg-bg px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted/70">
              Share mode
            </p>
            <p className="mt-1 text-sm font-semibold text-text">Known proof links</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-semibold text-text mb-4">Credentials</h2>
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
              <Button variant="ghost" href={`/employer?candidate=${encodeURIComponent(address)}`}>
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
                <div>
                  <p className="text-sm font-semibold text-text">
                    {cert.title || "Untitled"}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{cert.cohort}</p>
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
