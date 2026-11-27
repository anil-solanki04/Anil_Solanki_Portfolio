import { Award } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { certificates, type Certificate } from "@/data/portfolio";

import { cardBase, Reveal, Section, SectionHeading } from "./ui";

export function Certifications() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <Section id="certifications" tone="surface">
      <SectionHeading
        id="certifications"
        index="05"
        eyebrow="Certifications"
        title="Certifications & Learning"
        subtitle="Continuous learning and expanding my technical knowledge."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <li key={certificate.id}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <article
                className={`${cardBase} flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/50`}
              >
                {certificate.image ? (
                  <img
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    loading="lazy"
                    className="aspect-[4/3] w-full border-b border-border object-cover object-top"
                  />
                ) : (
                  <div className="relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden border-b border-border bg-surface p-6">
                    <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-40" />
                    <p className="relative font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Certificate
                    </p>
                    <p className="relative font-display text-2xl font-semibold leading-tight text-foreground/90">
                      {certificate.issuer}
                    </p>
                    <p className="relative font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Image to be added
                    </p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Award className="size-5" />
                    </span>
                    <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                    {certificate.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{certificate.issuer}</p>
                  {certificate.note ? (
                    <p className="mt-1 text-sm text-muted-foreground">{certificate.note}</p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <span className="font-mono text-xs text-foreground/80">
                      {certificate.date ?? ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelected(certificate)}
                      aria-label={`${certificate.image ? "View certificate" : "View details"}: ${certificate.title}`}
                      className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-accent"
                    >
                      {certificate.image ? "View Certificate" : "View Details"}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[92svh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border-border bg-card p-5 sm:p-6">
          {selected ? (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="font-display text-xl">{selected.title}</DialogTitle>
                <DialogDescription>
                  {[selected.issuer, selected.note, selected.date].filter(Boolean).join(" · ")}
                </DialogDescription>
              </DialogHeader>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={`${selected.title} certificate issued by ${selected.issuer}`}
                  className="max-h-[70svh] w-full rounded-lg border border-border object-contain"
                />
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
                  The certificate image has not been added yet. It will appear here once it is
                  available.
                </p>
              )}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
