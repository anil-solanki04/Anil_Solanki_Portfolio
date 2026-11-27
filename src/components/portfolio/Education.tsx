import { GraduationCap } from "lucide-react";

import { education } from "@/data/portfolio";

import { cardBase, Reveal, Section, SectionHeading } from "./ui";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education" index="04" eyebrow="Education" title="Education" />
      <Reveal>
        <ol className="relative ml-5 border-l border-border pl-10 sm:pl-12">
          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[3.75rem] top-6 inline-flex size-10 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-glow sm:-left-[4.25rem]"
            >
              <GraduationCap className="size-5" />
            </span>
            <article className={`${cardBase} max-w-3xl p-6 sm:p-8`}>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                {education.period}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                {education.degree}
              </h3>
              <p className="mt-1 text-base text-foreground/90">{education.branch}</p>
              <p className="mt-1 text-sm text-muted-foreground">{education.institution}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-5">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Study period
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{education.period}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    CGPA
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{education.cgpa}</dd>
                </div>
              </dl>
            </article>
          </li>
        </ol>
      </Reveal>
    </Section>
  );
}
