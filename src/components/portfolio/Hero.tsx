import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { profile } from "@/data/portfolio";

import { btnOutline, btnPrimary } from "./ui";

const phrases = profile.typingPhrases;

function TypedRole() {
  const first = phrases[0] ?? "";
  const [text, setText] = useState(first);
  const [playing, setPlaying] = useState(false);
  const state = useRef({ text: first, index: 0, deleting: false });

  // Decided after load: only then is the visitor's motion setting known.
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = state.current;
      const full = phrases[s.index] ?? "";
      let delay = 80;
      if (s.deleting) {
        if (s.text.length === 0) {
          s.deleting = false;
          s.index = (s.index + 1) % phrases.length;
          delay = 350;
        } else {
          s.text = s.text.slice(0, -1);
          delay = 40;
        }
      } else if (s.text === full) {
        s.deleting = true;
        delay = 1800;
      } else {
        s.text = full.slice(0, s.text.length + 1);
      }
      setText(s.text);
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [playing]);

  const toggle = () => {
    if (playing) {
      const s = state.current;
      s.text = phrases[s.index] ?? "";
      s.deleting = false;
      setText(s.text);
    }
    setPlaying((value) => !value);
  };

  return (
    <div className="mt-5 flex min-h-9 items-center gap-3">
      <p className="font-mono text-base text-brand-cyan sm:text-lg">
        <span className="text-muted-foreground">&gt; </span>
        <span aria-hidden="true" data-testid="typed-role">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="caret ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-brand-cyan"
        />
        <span className="sr-only">{phrases.join(", ")}</span>
      </p>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
      >
        {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
        <span className="sr-only">
          {playing ? "Pause typing animation" : "Play typing animation"}
        </span>
      </button>
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
      <div aria-hidden="true" className="dot-grid absolute -right-6 -top-6 size-40 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-8 size-56 rounded-full bg-primary/25 blur-3xl"
      />
      <div className="relative rounded-[2rem] bg-brand-gradient p-[1.5px] shadow-glow">
        <div className="overflow-hidden rounded-[calc(2rem-1.5px)] bg-card">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Portrait of Anil Solanki"
              width={1200}
              height={1200}
              fetchPriority="high"
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-surface">
              <span className="font-display text-7xl font-bold text-brand-gradient">
                {profile.initials}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Photo coming soon
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute -bottom-5 right-4 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-card backdrop-blur-md sm:right-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          B.Tech CSE
        </p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">Class of 2028</p>
      </div>
    </div>
  );
}

const socials = [
  { label: "GitHub", href: profile.github, icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[min(100svh,56rem)] flex-col overflow-hidden bg-background pt-16"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl"
      />
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:py-20">
        <div className="min-w-0">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">Hello, I'm</p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Anil <span className="text-brand-gradient">Solanki</span>
          </h1>
          <p className="mt-5 text-lg font-medium text-foreground/90 sm:text-xl">{profile.title}</p>
          <TypedRole />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-brand-cyan" />
            {profile.location}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className={btnPrimary}>
              Explore My Projects
              <ArrowRight className="size-4" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutline}
            >
              <FileText className="size-4" />
              View Resume
            </a>
          </div>

          <ul className="mt-8 flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Portrait />
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="mx-auto mb-8 hidden h-10 w-6 justify-center rounded-full border border-border pt-2 lg:flex"
      >
        <span className="scroll-hint-dot size-1.5 rounded-full bg-primary" />
      </a>
    </section>
  );
}
