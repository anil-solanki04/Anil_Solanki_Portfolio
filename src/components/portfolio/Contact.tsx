import { Github, Linkedin, Mail, MapPin, Send, type LucideIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

import { profile } from "@/data/portfolio";
import {
  buildMailto,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

import { btnPrimary, cardBase, Reveal, Section, SectionHeading } from "./ui";

const details: { label: string; value: string; href: string | null; icon: LucideIcon }[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Location", value: profile.location, href: null, icon: MapPin },
  { label: "GitHub", value: "github.com/anil-solanki04", href: profile.github, icon: Github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/anil-solanki-b87921316",
    href: profile.linkedin,
    icon: Linkedin,
  },
];

const fields: { name: keyof ContactValues; label: string; type: string; autoComplete: string }[] = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
];

const empty: Record<keyof ContactValues, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const inputClass =
  "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-ring/30";

export function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [opened, setOpened] = useState(false);

  const update = (name: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setOpened(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setOpened(false);
      return;
    }
    setErrors({});
    setOpened(true);
    window.location.href = buildMailto(profile.email, result.values);
  };

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        index="06"
        eyebrow="Contact"
        title="Let's Connect"
        subtitle="Have a question or want to connect? Feel free to reach out."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal className="min-w-0">
          <ul className="space-y-3">
            {details.map(({ label, value, href, icon: Icon }) => {
              const body = (
                <>
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-foreground [overflow-wrap:anywhere]">
                      {value}
                    </span>
                  </span>
                </>
              );
              const rowClass = `${cardBase} grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-4`;
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(rowClass, "transition hover:border-primary/50")}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={rowClass}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <form onSubmit={onSubmit} noValidate className={`${cardBase} p-6 sm:p-8`}>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => {
                const error = errors[field.name];
                return (
                  <div key={field.name} className={field.name === "subject" ? "sm:col-span-2" : ""}>
                    <label
                      htmlFor={`contact-${field.name}`}
                      className="text-sm font-medium text-foreground"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={(event) => update(field.name, event.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `contact-${field.name}-error` : undefined}
                      className={cn(inputClass, error ? "border-destructive" : "border-border")}
                    />
                    {error ? (
                      <p
                        id={`contact-${field.name}-error`}
                        className="mt-1.5 text-sm text-destructive"
                      >
                        {error}
                      </p>
                    ) : null}
                  </div>
                );
              })}
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={cn(
                    inputClass,
                    "resize-y",
                    errors.message ? "border-destructive" : "border-border",
                  )}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-1.5 text-sm text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className={btnPrimary}>
                <Send className="size-4" />
                Send Message
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                This opens your email app with the message ready to send.
              </p>
            </div>

            <div role="status" aria-live="polite">
              {opened ? (
                <p className="mt-5 rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 p-4 text-sm leading-relaxed text-foreground">
                  Your email app should now be open with your message filled in — press send there
                  to deliver it. If nothing opened, email me directly at{" "}
                  <a href={`mailto:${profile.email}`} className="font-semibold underline">
                    {profile.email}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
