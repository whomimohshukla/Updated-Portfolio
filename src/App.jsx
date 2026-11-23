import { useEffect, useRef, useState } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiNginx,
  SiVercel,
  SiTailwindcss,
  SiPrisma,
  SiNextdotjs,
  SiSupabase,
  SiTimescale,
  SiOpenai,
  SiClaude,
  SiGooglegemini,
  SiApachekafka,
  SiWebrtc,
  SiGithubactions,
  SiAmazonwebservices,
  SiGmail,
  SiGithub,
  SiDiscord,
  SiLinkedin,
  SiPython,
  SiGnubash,
  SiGit,
  SiUbuntu,
  SiLinux,
  SiVite,
  SiGraphql,
  SiDgraph,
  SiLangchain,
} from "react-icons/si";
import {
  FiServer,
  FiGrid,
  FiLock,
  FiKey,
  FiActivity,
  FiDatabase,
  FiZap,
  FiCode,
  FiMousePointer,
  FiRadio,
  FiGitBranch,
  FiTerminal,
  FiShield,
  FiCpu,
  FiStar,
  FiGitCommit,
  FiAlertTriangle,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

const GITHUB_USER = "whomimohshukla";
const EMAIL = "mimohshukla0001@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/mimohshukla00";
const DISCORD = "reboot_life";
const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;

const NAV_ITEMS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "github", label: "github" },
  { id: "contact", label: "contact" },
];
const NAV_IDS = NAV_ITEMS.map((item) => item.id);

const HERO_PRIMARY_LINK =
  "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-white bg-white px-4 py-2 text-[13px] font-bold text-dark transition-all hover:-translate-y-0.5 hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const HERO_SECONDARY_LINK =
  "group inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-white/25 bg-black/40 px-4 py-2 text-[13px] font-bold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* Green is reserved for hover states inside the GitHub section only. */
const NEON = "#00ef68";

/* ------------------------------------------------------------------ *
 * Section labels — tux.rs numbered identifiers
 * ------------------------------------------------------------------ */
function SectionLabel({ n, id, className = "", children }) {
  return (
    <div id={id} className={`pt-10 pb-4 scroll-mt-20 sm:pt-12 ${className}`}>
      <span className="text-white/40">{n}.</span>{" "}
      <span className="font-bold text-white">{children}</span>
    </div>
  );
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.3;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      });
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return active;
}

function Navbar() {
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/15 bg-dark/90 backdrop-blur-md"
          : "border-transparent bg-dark/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5"
      >
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={`relative px-1.5 py-1 text-[12px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white after:absolute after:inset-x-1.5 after:-bottom-0.5 after:h-px after:bg-white ${
                active === item.id
                  ? "text-white after:opacity-100"
                  : "text-white/45 after:opacity-0 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={`mailto:${EMAIL}`}
            className="hidden min-h-8 items-center rounded-sm border border-white/25 px-3 py-1 text-[12px] font-bold text-white/75 transition-colors hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm border border-white/25 text-lg text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          >
            <span aria-hidden="true">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/15 bg-dark/95 px-4 pb-3 pt-2 md:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "location" : undefined}
                className={`rounded-sm border px-3 py-2 text-[12px] transition-colors ${
                  active === item.id
                    ? "border-white bg-white/10 font-bold text-white"
                    : "border-white/15 text-white/55 hover:border-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setOpen(false)}
              className="col-span-2 inline-flex min-h-9 items-center justify-center rounded-sm border border-white bg-white px-3 py-2 text-[12px] font-bold text-dark"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!show) return null;

  return (
    <a
      href="#about"
      aria-label="Back to top"
      title="Back to top"
      className="fixed right-4 bottom-4 z-40 inline-flex size-9 items-center justify-center rounded-sm border border-white/30 bg-dark/90 text-sm font-bold text-white shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span aria-hidden="true">↑</span>
    </a>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const input = document.createElement("textarea");
      input.value = EMAIL;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className={HERO_SECONDARY_LINK}
    >
      {copied ? (
        <FiCheck aria-hidden="true" className="size-3.5" />
      ) : (
        <FiCopy aria-hidden="true" className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * 1. about
 * ------------------------------------------------------------------ */
function HelloWorld() {
  return (
    <>
      <SectionLabel n="01" id="about">
        About
      </SectionLabel>

      <section aria-label="Introduction" className="hero-rise max-w-3xl pb-4">
        <p className="text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
          Hi, I&apos;m <strong className="font-bold text-white">Mimoh Shukla</strong> — an
          AI and full-stack engineer who builds products from the first screen to the
          final deploy.
        </p>

        <div className="mt-4 space-y-3 text-[15px] leading-[1.8] text-white/65">
          <p>
            That means the interface people click through, the APIs and databases behind
            it, and the infrastructure that keeps it running. Lately, a lot of my work
            has been AI features built with LangChain and LangGraph that need to be
            reliable in the real world, not just in a demo.
          </p>
          <p>
            I&apos;m a Software Engineer at{" "}
            <strong className="font-bold text-white">Taurgo</strong> (remote), and before
            that I interned at{" "}
            <strong className="font-bold text-white">SmallFare</strong>, where I worked on
            a ticketing product used by real event organisers.
          </p>
          <p>
            I care about software that is fast, dependable and easy to use — and I like
            being the person who sees it through to the end.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <a href={`mailto:${EMAIL}`} className={HERO_PRIMARY_LINK}>
            Email me
          </a>
          <CopyEmail />
          <a href="#projects" className={HERO_SECONDARY_LINK}>
            View projects
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className={HERO_SECONDARY_LINK}
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 2. skills
 * ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ *
 * Skill glyph — plain monochrome, accent on hover (as before)
 * ------------------------------------------------------------------ */
/* Real brand colours, held in a static map so nothing ships the whole
   simple-icons catalogue. Hues were lifted to a minimum lightness so
   near-black brands (Prisma, Vercel, WebRTC) stay readable on the tile. */
const SKILL_COLORS = {
  "React": "#61DAFB",
  "Next.js": "#FFFFFF",
  "TypeScript": "#3178C6",
  "Tailwind CSS": "#06c0df",
  "JavaScript": "#F7DF1E",
  "Python": "#3878ae",
  "HTML": "#E34F26",
  "CSS": "#7339ac",
  "Node.js": "#5FA04E",
  "Express": "#E5E7EB",
  "Socket.IO": "#E5E7EB",
  "GraphQL": "#e6009b",
  "REST APIs": "#12d393",
  "Microservices": "#0EA5E9",
  "Event-driven systems": "#9b4b5f",
  "Authentication": "#E11D48",
  "Authorization": "#7C3AED",
  "Rate limiting": "#F59E0B",
  "PostgreSQL": "#4169E1",
  "MongoDB": "#47A248",
  "Redis": "#FF4438",
  "Prisma": "#7C9CBF",
  "TimescaleDB": "#FDB515",
  "Supabase": "#3FCF8E",
  "Neon": "#00e699",
  "AWS EC2": "#FF9900",
  "Docker": "#2496ED",
  "Nginx": "#00e657",
  "CI/CD": "#2088FF",
  "GitHub Actions": "#2088FF",
  "PM2": "#4f06e0",
  "SSL/TLS": "#22C55E",
  "Vercel": "#FFFFFF",
  "Vite": "#9135FF",
  "WebSockets": "#17cfbb",
  "WebRTC": "#D1D5DB",
  "Claude API": "#D97757",
  "Gemini API": "#8E75B2",
  "OpenAI API": "#5033b3",
  "LLM apps": "#8B5CF6",
  "LangChain": "#7FC8FF",
  "LangGraph": "#22C55E",
  "RAG": "#6366F1",
  "Agentic workflows": "#D946EF",
  "OpenCode": "#2DD4BF",
  "Codex": "#5033b3",
  "Cursor": "#C084FC",
  "VS Code": "#0089e6",
  "Claude Code": "#D97757",
  "Git": "#F03C2E",
  "Bash": "#56bc29",
  "Ubuntu": "#E95420",
  "Linux": "#FCC624",
};

function SkillGlyph({ skill }) {
  const Glyph = skill.Icon;
  if (!Glyph) return null;
  return (
    <Glyph
      size={16}
      strokeWidth={2.5}
      style={{ color: SKILL_COLORS[skill.name] ?? "#E1E1E1" }}
      className="shrink-0"
    />
  );
}

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss3 },
      { name: "Vite", Icon: SiVite },
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Python", Icon: SiPython },
      { name: "REST APIs", Icon: FiServer },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "WebSockets", Icon: FiRadio },
      { name: "Socket.IO", Icon: SiSocketdotio },
      { name: "WebRTC", Icon: SiWebrtc },
      { name: "Authentication", Icon: FiLock },
      { name: "Authorization", Icon: FiKey },
      { name: "Rate limiting", Icon: FiActivity },
      { name: "Microservices", Icon: FiGrid },
      { name: "Event-driven systems", Icon: SiApachekafka },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Neon", Icon: SiPostgresql },
      { name: "TimescaleDB", Icon: SiTimescale },
    ],
  },
  {
    label: "AI & LLMs",
    skills: [
      { name: "LangChain", Icon: SiLangchain },
      { name: "LangGraph", Icon: SiDgraph },
      { name: "RAG", Icon: FiDatabase },
      { name: "Agentic workflows", Icon: FiZap },
      { name: "OpenAI API", Icon: SiOpenai },
      { name: "Gemini API", Icon: SiGooglegemini },
      { name: "Claude API", Icon: SiClaude },
      { name: "LLM apps", Icon: FiCpu },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS EC2", Icon: SiAmazonwebservices },
      { name: "Docker", Icon: SiDocker },
      { name: "Nginx", Icon: SiNginx },
      { name: "CI/CD", Icon: FiGitBranch },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "Vercel", Icon: SiVercel },
      { name: "PM2", Icon: FiTerminal },
      { name: "SSL/TLS", Icon: FiShield },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "Bash", Icon: SiGnubash },
      { name: "Linux", Icon: SiLinux },
      { name: "Ubuntu", Icon: SiUbuntu },
      { name: "VS Code", Icon: FiCode },
      { name: "Cursor", Icon: FiMousePointer },
      { name: "Claude Code", Icon: SiClaude },
      { name: "OpenCode", Icon: FiTerminal },
      { name: "Codex", Icon: SiOpenai },
    ],
  },
];

function Skills() {
  return (
    <>
      <SectionLabel n="02" id="skills">
        Skills
      </SectionLabel>
      <p className="-mt-1 pb-5 text-sm leading-relaxed text-white/60">
        The tools I use most, grouped by what I use them for.
      </p>
      <div className="space-y-6">
        {SKILL_GROUPS.map((group) => (
          <section key={group.label}>
            <h3 className="mb-2 text-xs font-bold tracking-[0.14em] text-white/45 uppercase">
              {group.label}
            </h3>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex h-full items-center justify-between rounded-sm border border-white/20 bg-dark transition-colors hover:border-accent"
                >
                  <div className="flex h-full items-center justify-center bg-black px-2">
                    <SkillGlyph skill={skill} />
                  </div>
                  <div className="flex-1 bg-white py-1 font-bold text-black group-hover:bg-accent">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 3. projects
 * ------------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "JestBest",
    category: "AI product",
    status: "Live",
    image: "/projects/jestbest.png",
    body: "An AI QA tool that explores a web app, writes test cases, runs them in a real browser and explains why they failed. Built with TypeScript, Express and PostgreSQL, with BullMQ and Redis queueing the Playwright jobs, JWT auth with 2FA, S3 storage and Docker for deployment.",
    tags: [
      "TypeScript",
      "Playwright",
      "Express",
      "PostgreSQL",
      "BullMQ",
      "LangChain",
      "LangGraph",
      "Docker",
    ],
    href: "https://veribot-nine.vercel.app",
    repo: "https://github.com/whomimohshukla/JestBest",
  },
  {
    title: "ClaimWise UK",
    category: "AI product",
    status: "Live",
    image: "/claimwise.png",
    body: "Helps people in the UK find benefits, bill savings and social tariffs they might be missing. I built the frontend and API with authentication, rate limiting and PDF parsing, then deployed it on AWS EC2 with Nginx and automated CI/CD.",
    tags: [
      "Next.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "LangChain",
      "LangGraph",
      "AWS",
    ],
    href: "https://claimwise-six.vercel.app/",
    repo: "https://github.com/whomimohshukla/Savvy-UK",
  },
  {
    title: "BookMyBus",
    category: "Real-time",
    status: "Live",
    image: "/projects/bookmybus.png",
    body: "A real-time bus ticketing platform with seat locking over WebSockets, live GPS tracking and payments. Rate-limited APIs, Docker containers and an AWS EC2 deployment behind Nginx keep it steady under load.",
    tags: ["Node.js", "Express", "MongoDB", "Socket.IO", "Docker", "AWS"],
    href: "https://bookmybus-services247.vercel.app/",
    repo: "https://github.com/whomimohshukla/Book-My-Bus",
  },
  {
    title: "DevSwap",
    category: "Real-time",
    status: "Live",
    image: "/projects/devswap.png",
    body: "A skill-exchange platform where people meet for live lessons with a shared code editor and WebRTC video. Matching runs through Redis and Socket.IO, lesson plans come from the Gemini API, and everything runs in containers on AWS EC2.",
    tags: ["Node.js", "Express", "Socket.IO", "WebRTC", "MongoDB", "Docker"],
    href: "https://dev-swap-live.vercel.app/",
    repo: "https://github.com/whomimohshukla/devSwap.live",
  },
  {
    title: "Chatr",
    category: "Real-time",
    status: "Live",
    image: "/projects/chatrr.png",
    body: "A real-time chat app with rooms, direct messages, presence and typing indicators. Messages sync instantly across clients over WebSockets, with JWT auth and rate-limited Express APIs.",
    tags: ["React", "Socket.IO", "Node.js", "Express", "MongoDB"],
    href: "https://chatr-flame.vercel.app/",
    repo: "https://github.com/whomimohshukla/Chatr-",
  },
  {
    title: "DSA Tracker",
    category: "Web app",
    status: "Live",
    image: "/dsa-tracker.png",
    body: "A home for 300+ curated DSA questions across 13 topics, with hints, full solutions, company tags, search and saved progress. Built because my notes were scattered across too many tabs.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Render"],
    href: "https://mimohdsasheet.onrender.com/",
    repo: "https://github.com/whomimohshukla/dsa-Tracker",
  },
  {
    title: "SkillBridge",
    category: "Web app",
    status: "Live",
    image: "/projects/skillbridge.png",
    body: "A marketplace connecting clients and freelancers through gigs, proposals, real-time messaging and secure Razorpay payments.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Razorpay"],
    href: "https://skill-bridge-frontent-v-1-0-0.vercel.app/",
    repo: "https://github.com/whomimohshukla/-Freelance-Marketplace--Project",
  },
  {
    title: "Weather App",
    category: "Web app",
    status: "Live",
    image: "/projects/weatherAPP.png",
    body: "A small weather dashboard that looks up live conditions by city. Plain HTML, CSS and JavaScript with the OpenWeather API — no build step and no dependencies.",
    tags: ["HTML", "CSS", "JavaScript", "OpenWeather"],
    href: "https://weathercurrenthere.netlify.app",
    repo: "https://github.com/whomimohshukla/Whether-using-javascript",
  },
];

function Projects() {
  return (
    <>
      <SectionLabel n="03" id="projects">
        Projects
      </SectionLabel>
      <p className="-mt-1 pb-5 text-sm leading-relaxed text-white/60">
        A few things I&apos;ve designed, built and shipped. Each one links to the live app
        and the source code.
      </p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="group mr-1 flex flex-col rounded-sm border border-white/20 bg-black/60 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[4px_4px_0px_0px_var(--color-accent)]"
          >
            <div className="flex items-center justify-between border-b border-white/20 bg-black px-4 py-2 transition-colors group-hover:bg-accent group-hover:text-black">
              <span className="truncate font-bold">
                {String(i + 1).padStart(2, "0")} — {p.title}
              </span>
              <span className="shrink-0 pl-2 text-xs text-white/60 group-hover:text-black">
                {p.category}
              </span>
            </div>

            <div className="group/video p-4 pb-0">
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-sm border border-accent/30 bg-black transition-all duration-300 group-hover/video:border-accent"
              />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
              <p className="flex-1 text-sm leading-relaxed text-white/60">{p.body}</p>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-white/70">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-white/15 px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/20 p-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {p.status}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View source code for ${p.title}`}
                  className="inline-block py-0.5 font-bold transition-colors hover:text-white max-sm:py-1.5"
                >
                  Source code
                </a>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${p.title} live demo`}
                  className="inline-block py-0.5 font-bold transition-colors hover:text-white max-sm:py-1.5"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 4. experience
 * ------------------------------------------------------------------ */
const EXPERIENCE = [
  {
    dates: "Jan 2026 – Present",
    role: "Software Engineer",
    company: "Taurgo",
    logo: "/logos/taurgo.png",
    location: "Remote — Cardiff, UK",
    summary:
      "I work across the whole product — from React screens to the systems behind them — with a focus on AI features that hold up outside a demo.",
    body: [
      "Build features in React, Node.js and Supabase, including JWT login, two-factor authentication and role-based access.",
      "Shipped the notification system end to end: in-app feed, unread counts, mark-read and admin broadcasts, with rate limiting and a request queue to keep the API stable under load.",
      "Tuned the PostgreSQL schema behind notifications, surveys, inventory and billing, cutting database load by 40% with better queries and caching.",
      "Added Stripe subscriptions, coupons and tax settings, and hardened the API with validation, Helmet and request throttling.",
      "Built AI features with Gemini and OpenAI — property photo inspections and auto-written report summaries — and automated PDF reports, cutting manual work by 70%.",
      "Made those AI features reusable with LangChain and LangGraph workflows, including tool calls and RAG pipelines.",
      "Own the AWS EC2 setup with Docker, Nginx, SSL and PM2, and ship through a Jenkins CI/CD pipeline — 99.9% uptime at lower hosting cost.",
    ],
  },
  {
    dates: "Sep 2025 – Dec 2025",
    role: "Full Stack Developer Intern",
    company: "SmallFare",
    logo: "/logos/smallfare.png",
    location: "Hyderabad, India",
    summary:
      "I worked on EFOrganize, a ticketing platform used by event organisers, mostly around onboarding and the dashboard.",
    body: [
      "Built onboarding and dashboard features, including authentication and Cashfree document verification, and improved the Prisma schema.",
      "Added Redis caching, request throttling, TimescaleDB analytics and GitHub Actions CI/CD.",
    ],
  },
];

function HireMe() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [note, setNote] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${fields.name}`);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
    );
    window.open(
      `mailto:${EMAIL}?subject=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
    setNote("Your email app should open with the message ready — just hit send.");
    setFields({ name: "", email: "", message: "" });
  };

  const field =
    "w-full rounded-sm border border-solid border-white/20 bg-dark/40 p-1 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent";

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="flex h-full flex-col gap-2 rounded-sm border border-solid border-white/20 bg-dark/40 p-3">
        <legend className="px-1 text-sm font-bold text-white">Get in touch</legend>
        <div>
          <label className="sr-only" htmlFor="hire-name">
            Name
          </label>
          <input
            id="hire-name"
            required
            name="name"
            placeholder="name"
            value={fields.name}
            onChange={onChange}
            className={field}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="hire-email">
            Email
          </label>
          <input
            id="hire-email"
            required
            type="email"
            name="email"
            placeholder="email"
            value={fields.email}
            onChange={onChange}
            className={field}
          />
        </div>
        <textarea
          required
          name="message"
            placeholder="Tell me about your project…"
          value={fields.message}
          onChange={onChange}
          className={`${field} flex-1 resize-none`}
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-sm border border-solid border-white/20 bg-accent p-2 font-bold text-dark transition-colors hover:bg-white"
        >
          Send message
        </button>
        {note && <p className="text-xs text-accent">{note}</p>}
      </fieldset>
    </form>
  );
}

function Experience() {
  return (
    <>
      <SectionLabel n="04" id="experience">
        Experience
      </SectionLabel>
      <p className="-mt-1 pb-5 text-sm leading-relaxed text-white/60">
        Where I&apos;ve worked and what I actually shipped.
      </p>
      <div className="grid gap-6 min-sm:grid-cols-1 md:grid-cols-2">
        <section>
          <div className="terminal-timeline">
            {EXPERIENCE.map((job) => (
              <div
                key={job.company}
                className="flex flex-col rounded-sm border border-white/20"
              >
                <div className="bg-white py-2 text-center font-bold text-black">
                  {job.dates}
                </div>
                <div className="flex-1 space-y-2 bg-black/40 p-4">
                  <div className="flex items-center gap-3">
                    <span className="group/logo flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-white/15 bg-white/5 p-1">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        loading="lazy"
                        width={44}
                        height={44}
                        className="logo-glyph size-full object-contain"
                      />
                    </span>
                    <span>
                      <span className="block font-bold text-white">
                        {job.role}
                      </span>
                      <span className="block text-sm text-white/70">
                        {job.company}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{job.location}</p>
                  <p className="border-l border-white/20 pl-3 text-sm leading-relaxed text-white/70">
                    {job.summary}
                  </p>
                  {job.body.map((line) => (
                    <p
                      key={line}
                      className="flex gap-2 text-sm leading-relaxed text-white/60"
                    >
                      <span aria-hidden="true" className="mt-0.5 text-accent">
                        •
                      </span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <HireMe />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 5. github
 * ------------------------------------------------------------------ */
function useGithub(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com${path}`, {
          headers: {
            Accept: "application/vnd.github+json",
            ...(GH_TOKEN && GH_TOKEN.trim()
              ? { Authorization: `Bearer ${GH_TOKEN.trim()}` }
              : {}),
          },
        });
        if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) {
          setData(null);
          setError(e.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [path, nonce]);

  return { data, loading, error, retry: () => setNonce((n) => n + 1) };
}

/* ------------------------------------------------------------------ *
 * GitHub stats — count-up + monochrome donut. Green appears on hover
 * only, and only inside this section.
 * ------------------------------------------------------------------ */
const GITHUB_STATS = [
  { key: "followers", label: "Followers", color: "#e1e1e1" },
  { key: "following", label: "Following", color: "#adadad" },
  { key: "public_repos", label: "Public repos", color: "#7a7a7a" },
  { key: "public_gists", label: "Public gists", color: "#4d4d4d" },
];

function AnimatedCount({ to, duration = 900, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame;
    const t = setTimeout(() => {
      const origin = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - origin) / duration, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
    };
  }, [started, to, duration, delay]);

  return <span ref={ref}>{val.toLocaleString()}</span>;
}

function StatsDonut({ reposCount, active }) {
  const [go, setGo] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setGo(true), 100);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const SIZE = 180;
  const CX = 90;
  const CY = 90;
  const R = 64;
  const C = 2 * Math.PI * R;
  const ARC = C * 0.215;
  const GAP = 6;

  return (
    <div
      ref={ref}
      className="relative mx-auto inline-flex items-center justify-center"
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="overflow-visible"
        aria-hidden="true"
      >
        <circle
          cx={CX}
          cy={CY}
          r={R + 13}
          fill="none"
          stroke={NEON}
          strokeWidth={1}
          style={{
            opacity: go && active !== null ? 0.28 : 0,
            transition: "opacity 400ms ease",
          }}
        />
        {GITHUB_STATS.map((s, i) => (
          <circle
            key={`track-${s.key}`}
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(225,225,225,0.10)"
            strokeWidth={10}
            strokeDasharray={`${ARC - 4} ${C}`}
            style={{
              transform: `rotate(${-90 + i * 90 + GAP}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}
        {GITHUB_STATS.map((s, i) => {
          const on = active === i;
          return (
            <circle
              key={s.key}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={on ? NEON : s.color}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${ARC - 7} ${C}`}
              strokeDashoffset={go ? 0 : ARC}
              style={{
                transform: `rotate(${-90 + i * 90 + GAP}deg)`,
                transformOrigin: "center",
                transition: `stroke-dashoffset 900ms cubic-bezier(0.34,1.56,0.64,1) ${
                  80 + i * 170
                }ms, stroke 300ms ease, filter 300ms ease`,
                filter: on ? `drop-shadow(0 0 6px ${NEON}99)` : "none",
              }}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
          Public repos
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">
          <AnimatedCount to={reposCount} />
        </span>
        <span className="text-[10px] text-white/40">on GitHub</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Contribution dots — greyscale at rest, green on hover only
 * ------------------------------------------------------------------ */
const DOT_LEVELS = [
  "bg-white/[0.05]",
  "bg-white/15",
  "bg-white/30",
  "bg-white/55",
  "bg-white/85",
];

function ContributionDots() {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [tip, setTip] = useState(null);
  const wrapRef = useRef(null);

  const hasToken = Boolean(GH_TOKEN && GH_TOKEN.trim());

  /* Which years have contributions? Requires the GraphQL token. */
  useEffect(() => {
    let cancelled = false;
    const current = new Date().getFullYear();

    async function loadYears() {
      if (!hasToken) {
        setYears([current]);
        return;
      }
      try {
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${GH_TOKEN.trim()}`,
          },
          body: JSON.stringify({
            query: `query($login: String!) {
              user(login: $login) {
                contributionsCollection { contributionYears }
              }
            }`,
            variables: { login: GITHUB_USER },
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        /* contributionYears is a plain list of ints, newest first. */
        const list = json?.data?.user?.contributionsCollection?.contributionYears;
        const sorted = Array.isArray(list)
          ? [...list].filter((y) => typeof y === "number").sort((a, b) => b - a)
          : [];
        if (cancelled) return;
        setYears(sorted.length ? sorted : [current]);
        setYear(sorted.length ? sorted[0] : current);
      } catch {
        if (!cancelled) setYears([current]);
      }
    }

    loadYears();
    return () => {
      cancelled = true;
    };
  }, [hasToken]);

  /* Calendar for the selected year. */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setFailed(false);
      setTip(null);
      try {
        let grid = [];
        let count = 0;

        if (hasToken) {
          const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${GH_TOKEN.trim()}`,
            },
            body: JSON.stringify({
              query: `query($login: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $login) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      totalContributions
                      weeks { contributionDays { date contributionCount } }
                    }
                  }
                }
              }`,
              variables: {
                login: GITHUB_USER,
                from: `${year}-01-01T00:00:00Z`,
                to: `${year}-12-31T23:59:59Z`,
              },
            }),
          });
          if (!res.ok) throw new Error(String(res.status));
          const json = await res.json();
          const cal =
            json?.data?.user?.contributionsCollection?.contributionCalendar;
          if (!cal) throw new Error("no calendar data");
          count = cal.totalContributions || 0;
          grid = cal.weeks.map((w) =>
            w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
            }))
          );
        } else {
          const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=${year}&ts=${Date.now()}`
          );
          if (!res.ok) throw new Error(String(res.status));
          const json = await res.json();
          count = json.total || 0;
          grid = (json.weeks || []).map((w) =>
            w.days.map((d) => ({ date: d.date, count: d.count }))
          );
        }

        /* Bucket real commit counts into 5 levels via non-zero quantiles. */
        const counts = grid
          .flat()
          .map((d) => d.count)
          .filter((c) => c > 0)
          .sort((a, b) => a - b);
        const q = (p) =>
          counts.length ? counts[Math.floor((counts.length - 1) * p)] : 0;
        const t1 = q(0.25);
        const t2 = q(0.5);
        const t3 = q(0.75);

        if (cancelled) return;
        setWeeks(
          grid.map((week) =>
            week.map((d) => ({
              ...d,
              level:
                d.count === 0
                  ? 0
                  : d.count <= t1
                    ? 1
                    : d.count <= t2
                      ? 2
                      : d.count <= t3
                        ? 3
                        : 4,
            }))
          )
        );
        setTotal(count);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [year, hasToken, nonce]);

  /* Tooltip sits outside the scroll box so it is never clipped. */
  const showTip = (e, day) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const dot = e.currentTarget.getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    setTip({
      count: day.count,
      date: new Date(`${day.date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      x: dot.left - box.left + dot.width / 2,
      y: dot.top - box.top,
    });
  };

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs tracking-[0.14em] text-white/40 uppercase">
          Contributions
          {!loading && !failed && weeks.length > 0 && (
            <span className="ml-2 text-white/60 normal-case tabular-nums">
              {total.toLocaleString()} in {year}
            </span>
          )}
        </p>

        {years.length > 1 && (
          <div className="flex flex-wrap items-center gap-1">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={`rounded-sm border px-2 py-0.5 text-xs transition-colors ${
                  year === y
                    ? "border-accent bg-accent font-bold text-dark"
                    : "border-white/20 text-white/55 hover:border-white/50 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <p className="mt-3 text-xs text-white/30">Loading contributions…</p>
      )}

      {failed && (
        <p className="mt-3 text-xs text-white/40">
          Contribution data unavailable.
          <button
            type="button"
            onClick={() => setNonce((n) => n + 1)}
            className="ml-2 cursor-pointer rounded-sm border border-solid border-white/20 bg-accent px-2 py-0.5 text-xs font-bold text-dark"
          >
            Retry
          </button>
        </p>
      )}

      {!loading && !failed && weeks.length > 0 && (
        <div ref={wrapRef} className="relative mt-3">
          <div className="overflow-x-auto pb-1 sm:overflow-x-visible">
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, minmax(9px, 1fr))`,
                minWidth: `${weeks.length * 12}px`,
                width: "100%",
              }}
            >
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-rows-7 gap-[3px]">
                  {Array.from({ length: 7 }, (_, di) => {
                    const day = week[di];
                    if (!day) return <span key={di} className="aspect-square" />;
                    return (
                      <span
                        key={di}
                        aria-label={`${day.count} commits on ${day.date}`}
                        onMouseEnter={(e) => showTip(e, day)}
                        className={`aspect-square rounded-[2px] ${DOT_LEVELS[day.level]} cursor-default transition-colors duration-100 hover:bg-[#00ef68]`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {tip && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-20 -mt-1.5 -translate-x-1/2 -translate-y-full rounded-sm border border-white/25 bg-black px-2 py-1 text-xs whitespace-nowrap text-white shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              style={{ left: tip.x, top: tip.y }}
            >
              <span className="font-bold tabular-nums">{tip.count}</span>
              <span className="text-white/60">
                {tip.count === 1 ? " commit on " : " commits on "}
              </span>
              <span className="text-white/80">{tip.date}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Github() {
  const profile = useGithub(`/users/${GITHUB_USER}`);
  const repos = useGithub(
    `/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`
  );
  const [active, setActive] = useState(null);

  /* Recent = most recently pushed, forks excluded. */
  const recentRepos = (Array.isArray(repos.data) ? repos.data : [])
    .filter((r) => !r.fork)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 9);

  return (
    <>
      <SectionLabel n="05" id="github">
        GitHub
      </SectionLabel>
      <p className="-mt-1 pb-5 text-sm leading-relaxed text-white/60">
        A live snapshot of my public activity and recent repositories.
      </p>

      <a
        href={`https://github.com/${GITHUB_USER}`}
        target="_blank"
        rel="noreferrer"
        className="text-accent transition-colors before:content-['-'] hover:text-[#00ef68]"
      >
        github.com/{GITHUB_USER}
      </a>

      {profile.data && (
        <div className="mt-5 grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <StatsDonut
            reposCount={profile.data.public_repos ?? 0}
            active={active}
          />
          <div className="space-y-2">
            {GITHUB_STATS.map((s, i) => (
              <div
                key={s.key}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="flex items-center justify-between rounded-sm border border-white/20 bg-black/40 px-3 py-2 transition-all duration-200 hover:border-[#00ef68]/60 hover:bg-[#00ef68]/5"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: active === i ? NEON : s.color }}
                  />
                  <span className="text-xs tracking-wide text-white/60">
                    {s.label}
                  </span>
                </span>
                <span className="text-sm font-bold text-white tabular-nums">
                  <AnimatedCount to={profile.data[s.key] ?? 0} delay={120 + i * 90} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ContributionDots />

      {profile.loading && (
        <p className="mt-4 text-xs text-white/40">Loading profile…</p>
      )}

      {repos.loading && (
        <p className="mt-4 text-xs text-white/40">Loading repositories…</p>
      )}
      {repos.error && (
        <div className="mt-4 flex items-start gap-2 rounded-sm border border-white/20 bg-black/40 p-3">
          <FiAlertTriangle className="mt-0.5 size-4 shrink-0 text-white/40" />
          <div className="flex-1 text-sm text-white/60">
            Could not load repositories ({repos.error}).
            <button
              type="button"
              onClick={repos.retry}
              className="ml-2 cursor-pointer rounded-sm border border-solid border-white/20 bg-accent px-2 py-0.5 text-xs font-bold text-dark"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!repos.loading && !repos.error && recentRepos.length === 0 && (
        <p className="mt-4 text-sm text-white/40">No public repositories yet.</p>
      )}

      {recentRepos.length > 0 && (
        <>
          <p className="mt-7 text-xs tracking-[0.14em] text-white/40 uppercase">
            Recent repositories
          </p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentRepos.map((r, i) => (
              <div
                key={r.id}
                className="group mr-1 flex flex-col rounded-sm border border-white/20 bg-black/60 transition-all hover:-translate-y-1 hover:border-[#00ef68] hover:shadow-[4px_4px_0px_0px_#00ef68]"
              >
                <div className="flex items-center justify-between border-b border-white/20 bg-black px-4 py-2 transition-colors group-hover:bg-[#00ef68] group-hover:text-black">
                  <span className="truncate font-bold">
                    {String(i + 1).padStart(2, "0")} — {r.name}
                  </span>
                  <span className="shrink-0 pl-2 text-xs text-white/60 group-hover:text-black">
                    {r.language || "code"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="text-xs text-white/40">Public repository</div>
                  <p className="flex-1 text-sm leading-relaxed text-white/60">
                    {r.description || "No description yet."}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 p-4 text-xs text-white/60">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <FiStar className="size-3" />
                      {r.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitCommit className="size-3" />
                      {new Date(r.pushed_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${r.name} on GitHub`}
                    className="inline-block py-0.5 font-bold text-white/60 transition-colors hover:text-[#00ef68] max-sm:py-1.5"
                  >
                    View repo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 6. contact
 * ------------------------------------------------------------------ */
const SOCIALS = [
  { label: "Email", Icon: SiGmail, href: `mailto:${EMAIL}` },
  { label: "GitHub", Icon: SiGithub, href: `https://github.com/${GITHUB_USER}` },
  { label: "LinkedIn", Icon: SiLinkedin, href: LINKEDIN },
  { label: "Discord", Icon: SiDiscord, handle: DISCORD },
];

function Socials() {
  return (
    <>
      <SectionLabel n="06" id="contact">
        Contact
      </SectionLabel>
      <p className="-mt-1 pb-5 text-sm leading-relaxed text-white/60">
        The quickest way to reach me is email. You can also find me here:
      </p>
      <section className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIALS.map((s) => {
          const body = (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-black">
                <s.Icon className="size-4 text-white/60 transition-colors duration-200 group-hover:text-accent" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-white transition-colors duration-200 group-hover:text-accent">
                {s.label}
                {s.handle && (
                  <span className="ml-2 font-normal text-white/50 group-hover:text-accent">
                    @{s.handle}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-white/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
              >
                {s.href ? ">>" : ""}
              </span>
            </>
          );
          const cls =
            "group flex items-center gap-3 rounded-sm border border-white/20 bg-dark p-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[3px_3px_0px_0px_var(--color-accent)]";

          /* Discord has no public profile URL, so it renders as a
             read-only tile showing the handle instead of a dead link. */
          if (!s.href) {
            return (
              <div key={s.label} className={cls} title={`${s.label}: @${s.handle}`}>
                {body}
              </div>
            );
          }
          return (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              title={s.label}
              aria-label={s.label}
              className={cls}
            >
              {body}
            </a>
          );
        })}
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * App
 * ------------------------------------------------------------------ */
export default function App() {
  return (
    <>
      <Navbar />

      <div className="synthwave" aria-hidden="true">
        <div className="grid">
          <div className="grid-fade" />
        </div>
        <div className="grid">
          <div className="grid-lines" />
        </div>
      </div>

      <main className="container mx-auto max-w-5xl px-4">
        <HelloWorld />
        <Skills />
        <Projects />
        <Experience />
        <Github />
        <Socials />
      </main>

      <BackToTop />
    </>
  );
}