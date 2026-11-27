import { Github, Linkedin, Mail } from "lucide-react";

import { navLinks, profile } from "@/data/portfolio";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-primary-foreground">
                {profile.initials}
              </span>
              <span className="font-display text-lg font-semibold text-foreground">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Quick links
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex min-h-9 items-center text-sm text-foreground/85 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
