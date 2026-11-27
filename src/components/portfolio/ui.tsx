import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200";
export const btnPrimary = cn(
  btnBase,
  "bg-brand-gradient text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110",
);
export const btnOutline = cn(
  btnBase,
  "border border-border bg-card/60 text-foreground hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent",
);
export const cardBase = "rounded-2xl border border-border bg-card shadow-card";

/** Fades content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Section({
  id,
  tone = "base",
  children,
}: {
  id: string;
  tone?: "base" | "surface";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("py-20 sm:py-28", tone === "surface" ? "bg-surface" : "bg-background")}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  subtitle,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span>{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={`${id}-heading`} className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-foreground/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
