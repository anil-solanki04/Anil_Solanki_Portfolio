import { Check, ExternalLink, GitBranch, Github } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  filterProjects,
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

import { ProjectVisual } from "./ProjectVisual";
import { btnOutline, cardBase, Reveal, Section, SectionHeading, Tag } from "./ui";

function RepoLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(btnOutline, "min-h-10 px-4")}
        >
          <Github className="size-4" />
          GitHub
        </a>
      ) : (
        <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-dashed border-border px-4 text-xs font-medium text-muted-foreground">
          <GitBranch className="size-3.5" />
          Repository Coming Soon
        </span>
      )}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(btnOutline, "min-h-10 px-4")}
        >
          <ExternalLink className="size-4" />
          Live Demo
        </a>
      ) : null}
    </div>
  );
}

function StatusBar({ status }: { status: NonNullable<Project["status"]> }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
        <span className="font-medium text-foreground">Progress</span>
        <span className="font-mono text-muted-foreground">
          Approximately {status.progress}% completed
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={status.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Project progress"
        className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
      >
        <div
          className="h-full rounded-full bg-brand-gradient"
          style={{ width: `${status.progress}%` }}
        />
      </div>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        cardBase,
        "grid overflow-hidden border-primary/40 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
      )}
    >
      <ProjectVisual
        kind={project.visual}
        screenshot={project.screenshot}
        title={project.title}
        className="h-full min-h-64 lg:aspect-auto"
      />
      <div className="min-w-0 p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">
            Featured Project
          </span>
          {project.status ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan">
              <span className="size-1.5 rounded-full bg-brand-cyan" />
              {project.status.label}
            </span>
          ) : null}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {project.number} · {project.category}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{project.title}</h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {project.status ? (
          <div className="mt-6">
            <StatusBar status={project.status} />
          </div>
        ) : null}

        {project.implemented.length > 0 ? (
          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Implemented so far
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.implemented.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="mt-6">
          <RepoLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article
      className={cn(
        cardBase,
        "flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/50",
        project.language === "java" && "border-t-2 border-t-primary/70",
      )}
    >
      <ProjectVisual kind={project.visual} screenshot={project.screenshot} title={project.title} />
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {project.number} · {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description[0]}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <RepoLinks project={project} />
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View details: ${project.title}`}
            className="inline-flex min-h-10 items-center rounded-full px-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = filterProjects(projects, filter);
  const featured = visible.filter((project) => project.featured);
  const rest = visible.filter((project) => !project.featured);

  return (
    <Section id="projects" tone="surface">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Projects"
        title="Projects & Development"
        subtitle="Practical projects developed through independent learning and implementation."
      />

      <Reveal>
        <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((option) => {
            const count = filterProjects(projects, option.value).length;
            const isActive = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition",
                  isActive
                    ? "border-transparent bg-brand-gradient text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {option.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-xs",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="space-y-6">
        {featured.map((project) => (
          <Reveal key={project.id}>
            <FeaturedProject project={project} />
          </Reveal>
        ))}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] max-w-xl gap-0 overflow-y-auto rounded-2xl border-border bg-card p-0">
          {selected ? (
            <>
              <ProjectVisual
                kind={selected.visual}
                screenshot={selected.screenshot}
                title={selected.title}
              />
              <div className="space-y-5 p-6">
                <DialogHeader className="text-left">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {selected.number} · {selected.category}
                  </p>
                  <DialogTitle className="font-display text-2xl">{selected.title}</DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed">
                    {selected.description.join(" ")}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
                <RepoLinks project={selected} />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
