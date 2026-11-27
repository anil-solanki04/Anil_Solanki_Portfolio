import { GraduationCap, School } from "lucide-react";

import { education } from "@/data/portfolio";

import { cardBase, Reveal, Section, SectionHeading } from "./ui";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education" index="04" eyebrow="Education" title="Education" />
      <ol className="relative ml-5 space-y-6 border-l border-border pl-10 sm:pl-12">
        {education.map((entry, index) => {
          const Icon = index === 0 ? GraduationCap : School;
          return (
            <li key={entry.title} className="relative">
              <Reveal delay={index * 80}>
                <span
                  aria-hidden="true"
                  className={
                    index === 0
                      ? "absolute -left-[3.75rem] top-6 inline-flex size-10 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-glow sm:-left-[4.25rem]"
                      : "absolute -left-[3.75rem] top-6 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary sm:-left-[4.25rem]"
                  }
                >
                  <Icon className="size-5" />
                </span>
                <article className={`${cardBase} max-w-3xl p-6 sm:p-8`}>
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="min-w-0">
                      {entry.period ? (
                        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                          {entry.period}
                        </p>
                      ) : null}
                      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                        {entry.title}
                      </h3>
                      {entry.subtitle ? (
                        <p className="mt-1 text-base text-foreground/90">{entry.subtitle}</p>
                      ) : null}
                      <p className="mt-1 text-sm text-muted-foreground">{entry.institution}</p>
                    </div>
                    <dl className="rounded-xl border border-border bg-secondary/40 px-4 py-3 sm:text-right">
                      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {entry.result.label}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-semibold text-foreground">
                        {entry.result.value}
                      </dd>
                    </dl>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
