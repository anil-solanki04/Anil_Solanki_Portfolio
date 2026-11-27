/**
 * Single source of content for the portfolio.
 * Update details, add projects, repository links and certificate images here.
 * Use null for anything that does not exist yet: the site then shows an honest
 * "coming soon" state instead of a broken link or image.
 */
import photoAsset from "@/assets/anil-solanki.jpg.asset.json";
import cyberCert from "@/assets/cisco-introduction-to-cybersecurity.png.asset.json";
import pythonCert from "@/assets/cisco-python-essentials-1.png.asset.json";

export const profile = {
  name: "Anil Solanki",
  initials: "AS",
  title: "Java Developer | Aspiring Software Engineer",
  typingPhrases: [
    "Java Developer",
    "Computer Science Student",
    "Aspiring Software Engineer",
    "Problem Solver",
  ],
  intro:
    "Building my foundation in software development through programming, problem-solving and practical projects.",
  tagline: "Building my journey in technology, one project at a time.",
  location: "Indore, Madhya Pradesh, India",
  email: "anilsolanki10460@gmail.com",
  github: "https://github.com/anil-solanki04",
  linkedin: "https://www.linkedin.com/in/anil-solanki-b87921316/",
  resumeUrl:
    "https://drive.google.com/file/d/1SFwbfh7aWvAtVnFDYgBNT0YMI7wCrYM-/view?usp=drive_link",
  /** Image URL of the portrait, or null to show the placeholder frame. */
  photo: photoAsset.url as string | null,
};

export const about = {
  paragraphs: [
    "I am pursuing my Bachelor of Technology in Computer Science and Engineering at Indore Institute of Science and Technology.",
    "My primary area of interest is Java development, along with programming fundamentals, problem-solving and software engineering.",
    "Throughout my learning journey, I have independently developed projects using C, Python and Java. These experiences have helped me understand how programming concepts can be translated into practical applications.",
    "I am currently working on a Java-based Institute Fees Management System using MySQL and continuously improving my development skills through practical implementation.",
  ],
  facts: [
    { label: "Degree", value: "B.Tech CSE" },
    { label: "College", value: "Indore Institute of Science and Technology" },
    { label: "Graduation", value: "2028" },
    { label: "CGPA", value: "7.6" },
    { label: "Location", value: "Indore, India" },
  ],
};

export type TechIconKey =
  | "java"
  | "c"
  | "cplusplus"
  | "python"
  | "html5"
  | "css3"
  | "javascript"
  | "sql"
  | "mysql"
  | "dsa"
  | "oop"
  | "git"
  | "github"
  | "vscode"
  | "netbeans"
  | "awt"
  | "swing";

export type Skill = { name: string; icon: TechIconKey; primary?: true };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: "java", primary: true },
      { name: "C", icon: "c" },
      { name: "C++", icon: "cplusplus" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "SQL", icon: "sql" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Core Computer Science",
    skills: [
      { name: "Data Structures and Algorithms", icon: "dsa" },
      { name: "Object-Oriented Programming", icon: "oop" },
    ],
  },
  {
    title: "Development Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Visual Studio Code", icon: "vscode" },
      { name: "Apache NetBeans IDE", icon: "netbeans" },
    ],
  },
  {
    title: "Java GUI Technologies",
    skills: [
      { name: "Java AWT", icon: "awt" },
      { name: "Java Swing", icon: "swing" },
    ],
  },
];

export type ProjectLanguage = "java" | "c" | "python";
export type ProjectFilter = "all" | ProjectLanguage;
export type ProjectVisualKind =
  | "fees"
  | "python"
  | "tictactoe"
  | "parking"
  | "clock-c"
  | "signup"
  | "clock-java";

export type Project = {
  id: string;
  number: string;
  title: string;
  description: string[];
  language: ProjectLanguage;
  category: string;
  tech: string[];
  /** CSS illustration used until a real screenshot is supplied. */
  visual: ProjectVisualKind;
  /** Real screenshot URL, or null to show the illustration. */
  screenshot: string | null;
  /** Real GitHub repository URL, or null to show "Repository Coming Soon". */
  repoUrl: string | null;
  /** Real live deployment URL, or null to hide the Live Demo button. */
  liveUrl: string | null;
  status: { label: string; progress: number } | null;
  implemented: string[];
  featured: boolean;
};

export const projectFilters: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "python", label: "Python" },
];

const base = {
  screenshot: null,
  repoUrl: null,
  liveUrl: null,
  status: null,
  implemented: [] as string[],
  featured: false,
};

export const projects: Project[] = [
  {
    ...base,
    id: "institute-fees-management",
    number: "01",
    title: "Institute Fees Management System",
    description: [
      "An ongoing Java-based Institute Fees Management System developed using Apache NetBeans IDE, with MySQL serving as the database for storing application data.",
      "The project involves implementing Java event handling, interactive user interface controls and application functionality through buttons such as Sign Up, Clear and Login.",
    ],
    language: "java",
    category: "Java Application Development",
    tech: ["Java", "MySQL", "Apache NetBeans IDE"],
    visual: "fees",
    status: { label: "In Progress", progress: 50 },
    implemented: [
      "Sign-Up button actions",
      "Login button actions",
      "Clear button functionality",
      "Java event handling",
      "MySQL database usage for data storage",
    ],
    featured: true,
  },
  {
    ...base,
    id: "python-game",
    number: "02",
    title: "Python Game",
    description: [
      "An independently developed game using Python programming concepts, representing practical exploration of programming logic and game development fundamentals.",
    ],
    language: "python",
    category: "Python Development",
    tech: ["Python"],
    visual: "python",
  },
  {
    ...base,
    id: "tic-tac-toe",
    number: "03",
    title: "Tic Tac Toe",
    description: [
      "An independently developed command-line Tic Tac Toe game using C programming.",
    ],
    language: "c",
    category: "Console-Based Application",
    tech: ["C Programming"],
    visual: "tictactoe",
  },
  {
    ...base,
    id: "parking-management",
    number: "04",
    title: "Parking Management System",
    description: [
      "A console-based parking management application developed independently using C programming.",
    ],
    language: "c",
    category: "Console-Based Application",
    tech: ["C Programming"],
    visual: "parking",
  },
  {
    ...base,
    id: "digital-clock-c",
    number: "05",
    title: "Digital Clock in C",
    description: [
      "A command-line digital clock application developed using C programming and operated through the Windows command prompt.",
    ],
    language: "c",
    category: "Console-Based Application",
    tech: ["C Programming"],
    visual: "clock-c",
  },
  {
    ...base,
    id: "java-signup-page",
    number: "06",
    title: "Java Sign-Up Page GUI",
    description: [
      "An independently developed graphical sign-up interface using Java AWT and Swing, demonstrating desktop GUI design and event-driven programming.",
    ],
    language: "java",
    category: "Desktop GUI Application",
    tech: ["Java", "AWT", "Swing"],
    visual: "signup",
  },
  {
    ...base,
    id: "java-digital-clock",
    number: "07",
    title: "Java Digital Live Clock",
    description: [
      "A graphical digital clock application developed using Java AWT and Swing, demonstrating desktop GUI development and live clock presentation.",
    ],
    language: "java",
    category: "Desktop GUI Application",
    tech: ["Java", "AWT", "Swing"],
    visual: "clock-java",
  },
];

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  return filter === "all" ? list : list.filter((project) => project.language === filter);
}

export type EducationEntry = {
  title: string;
  subtitle: string | null;
  institution: string;
  /** Study years, or null when not supplied. */
  period: string | null;
  /** Label and value of the result, e.g. CGPA or Percentage. */
  result: { label: string; value: string };
};

/** Newest first. */
export const education: EducationEntry[] = [
  {
    title: "Bachelor of Technology",
    subtitle: "Computer Science and Engineering",
    institution: "Indore Institute of Science and Technology",
    period: "2024 – 2028",
    result: { label: "CGPA", value: "7.6" },
  },
  {
    title: "Higher Secondary (Class 12)",
    subtitle: null,
    institution: "Garha Public Higher Secondary School",
    period: null,
    result: { label: "Percentage", value: "86%" },
  },
  {
    title: "High School (Class 10)",
    subtitle: null,
    institution: "Garha Public Higher Secondary School",
    period: null,
    result: { label: "Percentage", value: "89%" },
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** e.g. "Issued 15 October 2026", or null when the date is not known. */
  date: string | null;
  note: string | null;
  /** Real certificate image URL, or null to show a text-only card. */
  image: string | null;
};

export const certificates: Certificate[] = [
  {
    id: "ibm-sql",
    title: "SQL and Relational Databases 101",
    issuer: "IBM Skills Network through Cognitive Class",
    date: null,
    note: null,
    image: null,
  },
  {
    id: "infosys-java",
    title: "Programming Using Java",
    issuer: "Infosys Springboard",
    date: null,
    note: null,
    image: null,
  },
  {
    id: "be10x-ai",
    title: "AI Tools Workshop",
    issuer: "Be10x",
    date: null,
    note: null,
    image: null,
  },
  {
    id: "gdg-cloud-ai",
    title: "AI Workshop",
    issuer: "GDG Cloud",
    date: null,
    note: null,
    image: null,
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Issued 15 October 2026",
    note: null,
    image: cyberCert.url,
  },
  {
    id: "cisco-python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Completed 21 October 2026",
    note: "Offered through Indore Institute of Science & Technology",
    image: pythonCert.url,
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;
