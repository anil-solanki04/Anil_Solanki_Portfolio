import type { ReactNode } from "react";

import type { ProjectVisualKind } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Original CSS illustrations shown until a real screenshot is supplied.
 * They suggest the kind of application only; they are not screenshots.
 */

function Frame({ title, mono, children }: { title: string; mono?: boolean; children: ReactNode }) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-xl border border-border bg-background shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-3 py-2">
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{title}</span>
      </div>
      <div className={cn("p-4", mono && "font-mono text-xs leading-relaxed text-foreground/80")}>
        {children}
      </div>
    </div>
  );
}

const Field = ({ label }: { label: string }) => (
  <div>
    <div className="text-[10px] text-muted-foreground">{label}</div>
    <div className="mt-1 h-6 rounded-md border border-border bg-secondary/40" />
  </div>
);

const Btn = ({ label, solid }: { label: string; solid?: boolean }) => (
  <span
    className={cn(
      "rounded-md px-2.5 py-1 text-[10px] font-semibold",
      solid
        ? "bg-brand-gradient text-primary-foreground"
        : "border border-border text-foreground/80",
    )}
  >
    {label}
  </span>
);

const Prompt = ({ command }: { command: string }) => (
  <p>
    <span className="text-brand-cyan">C:\&gt;</span> {command}
  </p>
);

const Cursor = () => (
  <span className="caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-foreground/70" />
);

const visuals: Record<ProjectVisualKind, ReactNode> = {
  fees: (
    <Frame title="Institute Fees Management System">
      <div className="space-y-3">
        <Field label="Username" />
        <Field label="Password" />
        <div className="flex flex-wrap gap-2 pt-1">
          <Btn label="Sign Up" solid />
          <Btn label="Clear" />
          <Btn label="Login" />
        </div>
      </div>
    </Frame>
  ),
  python: (
    <Frame title="game.py" mono>
      <p>
        <span className="text-brand-cyan">&gt;&gt;&gt;</span> python game.py
      </p>
      <p className="mt-2 text-muted-foreground"># Python Game</p>
      <p>
        <Cursor />
      </p>
    </Frame>
  ),
  tictactoe: (
    <Frame title="Command Prompt" mono>
      <Prompt command="tictactoe.exe" />
      <pre className="mt-3 text-center text-sm leading-snug text-foreground">
        {" X | O | X \n---+---+---\n O | X |   \n---+---+---\n   |   | O "}
      </pre>
    </Frame>
  ),
  parking: (
    <Frame title="Command Prompt" mono>
      <Prompt command="parking.exe" />
      <p className="mt-2 text-foreground">Parking Management System</p>
      <p>
        <Cursor />
      </p>
    </Frame>
  ),
  "clock-c": (
    <Frame title="Command Prompt" mono>
      <Prompt command="clock.exe" />
      <p className="mt-3 text-center text-2xl tracking-widest text-foreground">10 : 24 : 36</p>
    </Frame>
  ),
  signup: (
    <Frame title="Sign Up">
      <div className="space-y-3">
        <Field label="Name" />
        <Field label="Email" />
        <div className="pt-1">
          <Btn label="Sign Up" solid />
        </div>
      </div>
    </Frame>
  ),
  "clock-java": (
    <Frame title="Digital Clock">
      <p className="py-3 text-center font-mono text-3xl font-medium tracking-wider text-brand-gradient">
        10:24:36
      </p>
    </Frame>
  ),
};

export function ProjectVisual({
  kind,
  screenshot,
  title,
  className,
}: {
  kind: ProjectVisualKind;
  screenshot: string | null;
  title: string;
  className?: string;
}) {
  if (screenshot) {
    return (
      <img
        src={screenshot}
        alt={`Screenshot of ${title}`}
        loading="lazy"
        className={cn("aspect-[16/10] w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Illustration for ${title} (not a screenshot)`}
      className={cn(
        "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-surface p-6",
        className,
      )}
    >
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="relative flex w-full justify-center">
        {visuals[kind]}
      </div>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Illustration
      </span>
    </div>
  );
}
