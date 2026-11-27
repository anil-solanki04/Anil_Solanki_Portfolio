import {
  AppWindow,
  Box,
  Boxes,
  Database,
  Github,
  PanelsTopLeft,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import cIcon from "@/assets/tech/c.svg";
import cppIcon from "@/assets/tech/cplusplus.svg";
import cssIcon from "@/assets/tech/css3.svg";
import gitIcon from "@/assets/tech/git.svg";
import htmlIcon from "@/assets/tech/html5.svg";
import javaIcon from "@/assets/tech/java.svg";
import jsIcon from "@/assets/tech/javascript.svg";
import mysqlIcon from "@/assets/tech/mysql.svg";
import pythonIcon from "@/assets/tech/python.svg";
import vscodeIcon from "@/assets/tech/vscode.svg";
import { skillGroups, type TechIconKey } from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { cardBase, Reveal, Section, SectionHeading } from "./ui";

const icons: Record<TechIconKey, { src: string } | { icon: LucideIcon }> = {
  java: { src: javaIcon },
  c: { src: cIcon },
  cplusplus: { src: cppIcon },
  python: { src: pythonIcon },
  html5: { src: htmlIcon },
  css3: { src: cssIcon },
  javascript: { src: jsIcon },
  sql: { icon: Database },
  mysql: { src: mysqlIcon },
  dsa: { icon: Workflow },
  oop: { icon: Boxes },
  git: { src: gitIcon },
  github: { icon: Github },
  vscode: { src: vscodeIcon },
  netbeans: { icon: Box },
  awt: { icon: AppWindow },
  swing: { icon: PanelsTopLeft },
};

function TechIcon({ name }: { name: TechIconKey }) {
  const entry = icons[name];
  if ("src" in entry) {
    return <img src={entry.src} alt="" width={24} height={24} loading="lazy" className="size-6" />;
  }
  const Icon = entry.icon;
  return <Icon aria-hidden="true" className="size-5 text-brand-cyan" />;
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        index="02"
        eyebrow="Skills"
        title="Technical Skills"
        subtitle="Technologies and concepts I have explored through learning and practical development."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={(index % 3) * 80}>
            <article className={`${cardBase} h-full p-6`}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={cn(
                      "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                      skill.primary
                        ? "border-primary/50 bg-primary/10"
                        : "border-transparent bg-secondary/40 hover:border-border hover:bg-secondary/70",
                    )}
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-background">
                      <TechIcon name={skill.icon} />
                    </span>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    {skill.primary ? (
                      <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                        Primary interest
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
