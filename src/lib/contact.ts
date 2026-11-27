import { z } from "zod";

// The contact form has no server behind it: a valid message opens the visitor's
// own email app with everything filled in (see buildMailto).
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name.").max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(255, "Email is too long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email address."),
  subject: z.string().trim().min(1, "Please enter a subject.").max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message.")
    .max(2000, "Message must be under 2000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(
  input: Record<keyof ContactValues, string>,
): { ok: true; values: ContactValues } | { ok: false; errors: ContactErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { ok: true, values: result.data };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactValues | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}

export function buildMailto(to: string, values: ContactValues): string {
  const body = `${values.message}\n\n— ${values.name}\n${values.email}`;
  return `mailto:${to}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
}
