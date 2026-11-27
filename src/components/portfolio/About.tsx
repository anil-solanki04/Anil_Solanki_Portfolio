import { FileText } from "lucide-react";

import { about, profile } from "@/data/portfolio";

import { btnOutline, cardBase, Reveal, Section, SectionHeading } from "./ui";

export function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <Section id="about" tone="surface">
      <SectionHeading
        id="about"
        index="01"
        eyebrow="About"
        title="About Me"
        subtitle="A little introduction about my journey."
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="min-w-0">
          <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed">
            {lead}
          </p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnOutline} mt-8`}
          >
            <FileText className="size-4" />
            View Resume
          </a>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <dl className={`${cardBase} divide-y divide-border px-6`}>
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
