import { describe, expect, it } from "vitest";

import { filterProjects, projects, profile } from "@/data/portfolio";
import { buildMailto, validateContact } from "@/lib/contact";

const valid = {
  name: "Priya Sharma",
  email: "priya@example.com",
  subject: "Hello",
  message: "I would like to connect.",
};

describe("project filters", () => {
  it("shows all seven projects, and the right ones per language", () => {
    expect(filterProjects(projects, "all")).toHaveLength(7);
    expect(filterProjects(projects, "java").map((p) => p.number)).toEqual(["01", "06", "07"]);
    expect(filterProjects(projects, "c").map((p) => p.number)).toEqual(["03", "04", "05"]);
    expect(filterProjects(projects, "python").map((p) => p.number)).toEqual(["02"]);
  });
});

describe("contact form", () => {
  it("requires every field", () => {
    const result = validateContact({ name: " ", email: "", subject: "", message: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name", "subject"]);
    }
  });

  it("rejects an invalid email address", () => {
    const result = validateContact({ ...valid, email: "priya@example" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBe("Please enter a valid email address.");
  });

  it("opens an email addressed to Anil with the subject and message filled in", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = buildMailto(profile.email, result.values);
      expect(url.startsWith("mailto:anilsolanki10460@gmail.com?subject=Hello&body=")).toBe(true);
      expect(decodeURIComponent(url)).toContain("I would like to connect.");
    }
  });
});
