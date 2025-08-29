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
  SiGit,
  SiGithub,
  SiCplusplus,
  SiUbuntu,
  SiVercel,
  SiTailwindcss,
  SiRazorpay,
} from "react-icons/si";
import { FiCode, FiStar, FiAlertTriangle } from "react-icons/fi";

function TerminalCard() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "✔ https://mimohshukla.vercel.app/",
    "type help to see commands",
  ]);

  const append = (line) => setHistory((h) => [...h, line]);

  const scrollToSection = (id) => {
    const el =
      document.getElementById(id) ||
      document.querySelector(`[data-section="${id}"]`);
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  const commands = {
    help: () => {
      append(
        "Available: projects, skills, contact, about, github, linkedin, top, clear, help"
      );
    },
    projects: () => {
      if (!scrollToSection("projects"))
        append("Could not find section: projects");
    },
    skills: () => {
      if (!scrollToSection("skills")) append("Could not find section: skills");
    },
    contact: () => {
      if (!scrollToSection("contact"))
        append("Could not find section: contact");
    },
    about: () => {
      if (!scrollToSection("about")) append("Could not find section: about");
    },
    top: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    github: () => {
      window.open(
        "https://github.com/whomimohshukla",
        "_blank",
        "noopener,noreferrer"
      );
    },
    linkedin: () => {
      window.open(
        "https://www.linkedin.com/in/mimohshukla00/",
        "_blank",
        "noopener,noreferrer"
      );
    },
    clear: () => setHistory([]),
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      append(`mimoh@portfolio:~$ ${cmd || ""}`);
      if (cmd in commands) {
        commands[cmd]();
      } else if (cmd) {
        append(`Command not found: ${cmd}. Try 'help'.`);
      }
      setInput("");
    }
  };

  useEffect(() => {
    // auto-focus input after mount
    const t = setTimeout(() => {
      const node = document.getElementById("terminal-input");
      node?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-mono text-[12px] sm:text-[13px] leading-6">
      {history.map((line, i) => (
        <div key={i} className="text-gray-300/90">
          {line}
        </div>
      ))}
      <div className="flex items-center text-[#00ef68] mt-1">
        <span>mimoh@portfolio:~$</span>
        <input
          id="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-500 text-[#00ef68]"
          placeholder="type a command... (help)"
          aria-label="terminal input"
        />
        <span
          className="ml-1 h-4 w-[2px] bg-[#00ef68]"
          style={{ animation: "caret 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}

function Logo({ size = 28 }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: px, height: px }}
      aria-label="m logo"
      title="m"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M3.5 16V8.8c0-1 .8-1.8 1.8-1.8.8 0 1.5.5 1.7 1.3L8.9 13c.2.6 1 .6 1.3 0l1.9-4.7c.3-.8 1-1.3 1.8-1.3 1 0 1.8.8 1.8 1.8V16"
          stroke="#00ef68"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-20 px-6 sm:px-8 md:px-12 lg:px-20">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-white">
          {title}
        </h2>
        <div className="text-gray-300 leading-relaxed max-w-3xl">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 16,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: `translateY(${shown ? 0 : y}px)`,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

function ContributionsCalendar({ username }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearRange, setYearRange] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const ghToken = import.meta.env.VITE_GH_TOKEN;

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        let weeksArr = [];
        let totalCount = 0;
        if (ghToken) {
          // Use GitHub GraphQL for accurate per-year data
          const from = `${selectedYear}-01-01T00:00:00Z`;
          const to = `${selectedYear}-12-31T23:59:59Z`;
          const gql = {
            query: `query($login: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $login) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays { date contributionCount }
                    }
                  }
                }
              }
            }`,
            variables: { login: username, from, to },
          };
          const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${ghToken}`,
            },
            body: JSON.stringify(gql),
          });
          if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
          const json = await res.json();
          const cal =
            json?.data?.user?.contributionsCollection?.contributionCalendar;
          if (!cal) throw new Error("No calendar data");
          totalCount = cal.totalContributions || 0;
          weeksArr = (cal.weeks || []).map((w) => ({
            days: w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
              level: 0,
            })),
          }));
          // compute levels 0-4 from counts (quantiles)
          const counts = weeksArr.flatMap((w) => w.days.map((d) => d.count));
          const nonZero = counts.filter((c) => c > 0).sort((a, b) => a - b);
          const q = (p) =>
            nonZero.length ? nonZero[Math.floor((nonZero.length - 1) * p)] : 0;
          const t1 = q(0.25),
            t2 = q(0.5),
            t3 = q(0.75);
          weeksArr = weeksArr.map((w) => ({
            days: w.days.map((d) => ({
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
            })),
          }));
        } else {
          // Public API with cache-busting to avoid stale/cached content
          const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}&ts=${Date.now()}`
          );
          if (!res.ok) throw new Error(`Contrib API error: ${res.status}`);
          const data = await res.json();
          weeksArr = data.weeks || [];
          totalCount = typeof data.total === "number" ? data.total : 0;
        }
        if (!ignore) {
          setWeeks(weeksArr);
          setTotal(totalCount);
          setStartYear(selectedYear);
          setEndYear(selectedYear);
          setYearRange(String(selectedYear));
          setError(null);
        }
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [username, selectedYear]);

  const levelToClass = (lv) => {
    // Themed green scale around #00ef68 (darker -> lighter)
    switch (lv) {
      case 1:
        return "bg-[#005b32]";
      case 2:
        return "bg-[#00a24e]";
      case 3:
        return "bg-[#00c95e]";
      case 4:
        return "bg-[#00ef68]";
      default:
        return "bg-[#0f0f0f]";
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Contributions · {yearRange || selectedYear}
        </h3>
        <div className="flex items-center gap-3">
          {weeks.length > 0 && (
            <span className="text-sm text-gray-400">
              {(typeof total === "number" && !Number.isNaN(total)
                ? total
                : weeks.reduce(
                    (acc, w) =>
                      acc + w.days.reduce((a, d) => a + (d.count || 0), 0),
                    0
                  )
              ).toLocaleString()}{" "}
              contributions
            </span>
          )}
          <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
            {[currentYear - 1, currentYear].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 text-xs sm:text-sm transition-colors ${
                  selectedYear === y
                    ? "bg-[#00ef68] text-black"
                    : "bg-transparent text-gray-300 hover:bg-white/10"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
      {loading && <p className="text-gray-400">Loading contribution graph…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && weeks.length > 0 && (
        <div className="overflow-x-auto">
          <Reveal className="inline-grid grid-rows-7 grid-flow-col auto-cols-[12px] gap-[3px] p-2 rounded-lg border border-white/10 bg-[#0f0f0f]">
            {weeks.map((w, wi) => (
              <div key={wi} className="contents">
                {w.days.map((d, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`h-[10px] w-[10px] rounded-full ${levelToClass(
                      d.level
                    )}`}
                    title={`${d.count} contributions on ${d.date}`}
                  />
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      )}
      {!loading && (error || weeks.length === 0) && (
        <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-3">
          <Reveal>
            <img
              className="w-full h-auto rounded-lg"
              alt="GitHub contributions chart"
              src={`https://ghchart.rshah.org/00ef68/${username}`}
              loading="lazy"
            />
          </Reveal>
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-2 px-1">
            <span>{startYear ?? new Date().getFullYear() - 1}</span>
            <span>{endYear ?? new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function GithubStats({ username }) {
  const cardClass =
    "rounded-xl border border-white/10 bg-[#0f0f0f] p-3 hover:border-white/20 transition-colors";
  const imgClass = "w-full h-auto rounded-lg";

  return (
    <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
      <Reveal as="div" className={cardClass}>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <img
            className={imgClass}
            alt="GitHub stats"
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&bg_color=0f0f0f&title_color=ffffff&text_color=c9d1d9&icon_color=58a6ff&hide_border=true`}
            loading="lazy"
          />
        </a>
        <div className="mt-4">
          <LanguagesSummary username={username} />
        </div>
      </Reveal>
      <div className="grid gap-4">
        <Reveal
          as="a"
          delay={80}
          className={cardClass}
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={imgClass}
            alt="GitHub Streak"
            src={`https://streak-stats.demolab.com?user=${username}&theme=dark&hide_border=true&background=0F0F0F&ring=00ef68&fire=00ef68&currStreakNum=FFFFFF`}
            loading="lazy"
          />
        </Reveal>
        <Reveal
          as="a"
          delay={140}
          className={cardClass}
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={imgClass}
            alt="Contribution Graph"
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=0F0F0F&color=c9d1d9&line=00ef68&point=00ef68&area=true&hide_border=true`}
            loading="lazy"
          />
        </Reveal>
      </div>
    </div>
  );
}

function RepoGrid({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // {status, message}
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
        );
        if (!res.ok) {
          const err = new Error(`GitHub API error: ${res.status}`);
          err.status = res.status;
          throw err;
        }
        const data = await res.json();
        if (!ignore) setRepos(data);
      } catch (e) {
        if (!ignore)
          setError({
            status: e.status || 0,
            message: e.message || "Request failed",
          });
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [username, refreshKey]);

  if (loading)
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4">
        <p className="text-gray-400">Loading repositories…</p>
      </div>
    );
  if (error)
    return (
      <ErrorCard
        title="Failed to load repositories"
        status={error.status}
        onRetry={() => setRefreshKey((k) => k + 1)}
      />
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <a
          key={r.id}
          href={r.html_url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-xl border border-white/10 bg-[#0f0f0f] p-4 hover:border-white/20 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium group-hover:underline">
              {r.name}
            </h4>
            <span className="inline-flex items-center gap-1 text-sm text-gray-400">
              <FiStar /> {r.stargazers_count}
            </span>
          </div>
          {r.description && (
            <p className="mt-2 text-sm text-gray-300 line-clamp-2">
              {r.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
            {r.language && (
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-white/50" />{" "}
                {r.language}
              </span>
            )}
            {r.fork && (
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                fork
              </span>
            )}
            <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function ErrorCard({ title = "Something went wrong", status, onRetry }) {
  const isRateLimit = status === 403;
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <div className="flex items-start gap-3">
        <FiAlertTriangle className="text-red-400 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="text-white font-medium">{title}</h4>
          <p className="text-sm text-gray-300 mt-1">
            {isRateLimit
              ? "GitHub rate limit reached. Please try again later or add a GitHub token to increase limits."
              : "Please check your connection and try again."}
          </p>
          {isRateLimit && (
            <p className="text-xs text-gray-400 mt-1">
              Tip: create a personal access token and add it to your .env.local
              as VITE_GH_TOKEN.
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-white text-black px-3 py-1.5 text-xs font-medium hover:bg-white/90 transition"
            >
              Retry
            </button>
          )}
        </div>
        {status ? (
          <span className="text-xs text-gray-400">HTTP {status}</span>
        ) : null}
      </div>
    </div>
  );
}

// Simple color palette for common languages (fallbacks to green)
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#00599C",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Vue: "#41B883",
  Svelte: "#FF3E00",
  "Jupyter Notebook": "#DA5B0B",
  "Objective-C": "#438eff",
};

function LanguagesSummary({ username }) {
  const [stats, setStats] = useState([]); // [{name, bytes, pct}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // {status, message}
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const token = import.meta?.env?.VITE_GH_TOKEN;
    const headers = {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    async function fetchAllReposAndLanguages() {
      try {
        setLoading(true);
        setError(null);

        // Fetch public repos (cap pages to limit rate usage)
        const perPage = 100;
        let page = 1;
        let repos = [];
        while (true) {
          const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&type=public&sort=pushed`;
          const res = await fetch(url, { headers });
          if (!res.ok) {
            const err = new Error(`GitHub API error: ${res.status}`);
            err.status = res.status;
            throw err;
          }
          const batch = await res.json();
          repos = repos.concat(batch);
          if (batch.length < perPage) break;
          page += 1;
          if (page > 2) break; // cap to ~200 repos
        }

        // Only consider non-fork, non-archived repos
        const filtered = repos.filter((r) => !r.fork && !r.archived);
        // Limit languages requests (e.g., most recently pushed 40)
        const limited = filtered.slice(0, 40);

        // Fetch languages per repo
        const langMaps = await Promise.all(
          limited.map(async (r) => {
            try {
              const res = await fetch(r.languages_url, { headers });
              if (!res.ok) {
                // propagate a synthetic error for rate limit to show proper UI
                const err = new Error(`GitHub API error: ${res.status}`);
                err.status = res.status;
                throw err;
              }
              return await res.json();
            } catch (e) {
              // If any language request fails with 403, bubble up a single 403
              if (e && e.status) throw e;
              return {};
            }
          })
        );

        // Aggregate bytes per language
        const totals = new Map();
        for (const lm of langMaps) {
          for (const [lang, bytes] of Object.entries(lm)) {
            totals.set(
              lang,
              (totals.get(lang) || 0) + (typeof bytes === "number" ? bytes : 0)
            );
          }
        }

        // Prepare sorted list
        const grand = Array.from(totals.values()).reduce((a, b) => a + b, 0);
        const list = Array.from(totals.entries())
          .map(([name, bytes]) => ({
            name,
            bytes,
            pct: grand ? (bytes / grand) * 100 : 0,
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .filter((x) => x.pct > 0.1) // drop tiny slivers
          .slice(0, 12);

        if (!cancelled) setStats(list);
      } catch (e) {
        if (!cancelled)
          setError({
            status: e.status || 0,
            message: e.message || String(e),
          });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAllReposAndLanguages();
    return () => {
      cancelled = true;
    };
  }, [username, refreshKey]);

  const cardClass =
    "rounded-xl border border-white/10 bg-[#0f0f0f] p-4 hover:border-white/20 transition-colors";

  if (loading)
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4">
        <p className="text-gray-400">Loading languages…</p>
      </div>
    );
  if (error)
    return (
      <ErrorCard
        title="Failed to load languages"
        status={error.status}
        onRetry={() => setRefreshKey((k) => k + 1)}
      />
    );
  if (!stats.length)
    return (
      <div className={cardClass}>
        <h4 className="text-white font-medium mb-2">Languages</h4>
        <p className="text-sm text-gray-400">No language data found.</p>
      </div>
    );

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-medium">Languages</h4>
        <FiCode className="text-gray-400" />
      </div>
      {/* Stacked bar */}
      <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden flex">
        {stats.map((it) => {
          const color = LANG_COLORS[it.name] || "#00ef68";
          return (
            <div
              key={it.name}
              title={`${it.name}: ${it.pct.toFixed(1)}%`}
              style={{
                width: `${Math.max(1.5, it.pct)}%`,
                backgroundColor: color,
              }}
            />
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        {stats.map((it) => {
          const color = LANG_COLORS[it.name] || "#00ef68";
          return (
            <div
              key={it.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-200">{it.name}</span>
              </span>
              <span className="text-gray-400">{it.pct.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkillsGrid() {
  const skills = [
    { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", Icon: SiCss3, color: "#1572B6" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
    { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
    { name: "Socket.io", Icon: SiSocketdotio, color: "#010101" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Postgres", Icon: SiPostgresql, color: "#336791" },
    { name: "Redis", Icon: SiRedis, color: "#DC382D" },
    { name: "BullMQ", Icon: SiRedis, color: "#DC382D" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "Nginx", Icon: SiNginx, color: "#009639" },
    { name: "Razorpay", Icon: SiRazorpay, color: "#0C2E8A" },
    { name: "Git", Icon: SiGit, color: "#F05032" },
    { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
    { name: "C++", Icon: SiCplusplus, color: "#00599C" },
    { name: "Ubuntu", Icon: SiUbuntu, color: "#E95420" },
    { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
  ];

  return (
    <div className="max-w-6xl mx-auto grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skills.map(({ name, Icon, color }) => (
        <div
          key={name}
          className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 hover:border-white/20 transition-colors hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-6 w-1 rounded-full"
              style={{ backgroundColor: color }}
            />
            <Icon className="shrink-0" size={18} style={{ color }} />
            <span className="text-gray-200">{name}</span>
          </div>
          <svg
            className="size-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function App() {
  const projects = [
    {
      title: "Book My Bus",
      desc: "Full‑stack bus ticketing platform with searchable routes, seat selection, authentication, and admin tools.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "TailwindCSS"],
      github: "https://github.com/whomimohshukla/Book-My-Bus",
      live: "https://book-my-bus-qnm6.vercel.app/",
      image: "/projects/bookmybus.png",
    },

    {
      title: "DevSwap",
      desc: "A platform for developers to connect and swap skills/projects with a clean, fast experience.",
      tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
      github: "https://github.com/whomimohshukla/devSwap.live",
      live: "https://devswap.live",
      image: "/projects/devswap.png",
    },
    {
      title: "SkillBridge",
      desc: "Marketplace for clients and freelancers: post gigs, proposals, messaging, and secure payments flow.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Razorpay"],
      github:
        "https://github.com/whomimohshukla/-Freelance-Marketplace--Project",
      live: "https://skill-bridge-frontent-v-1-0-0.vercel.app/",
      image: "/projects/skillbridge.png",
    },
    {
      title: "Chatr — Realtime Chat",
      desc: "Realtime chat application with rooms/DMs, presence, and typing indicators powered by websockets.",
      tech: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/whomimohshukla/Chatr-",
      image: "https://picsum.photos/seed/chatr/800/450",
    },
    {
      title: "Weather App (JavaScript)",
      desc: "Lightweight weather dashboard that fetches live conditions by city with clean, responsive UI.",
      tech: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
      github: "https://github.com/whomimohshukla/Whether-using-javascript",
      live: "https://weathercurrenthere.netlify.app",
      image: "/projects/weatherAPP.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/50">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-20 h-16">
          <a href="#home" className="group inline-flex items-center gap-0">
            <Logo size={26} />
            <span className="text-white font-medium tracking-tighter leading-none hidden sm:inline -ml-2 -mt-px">
              imoh
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-8 text-sm">
            <a
              href="#about"
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#00ef68] after:transition-all hover:after:w-full"
            >
              About
            </a>
            <a
              href="#skills"
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#00ef68] after:transition-all hover:after:w-full"
            >
              Skills
            </a>
            <a
              href="#github"
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#00ef68] after:transition-all hover:after:w-full"
            >
              GitHub
            </a>
            <a
              href="#projects"
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#00ef68] after:transition-all hover:after:w-full"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="relative text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#00ef68] after:transition-all hover:after:w-full"
            >
              Contact
            </a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-brownBlack text-white px-4 py-2 text-sm hover:bg-brownBlack/90 border border-white/10 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ef68]/60"
          >
            Hire Me
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden px-6 sm:px-8 md:px-12 lg:px-20 pt-20 pb-36 md:pb-28 bg-gradient-to-b from-black to-[#0b0b0b]"
      >
        {/* Animated background blobs (slower, softer) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#00ef68]/12 blur-3xl animate-[blob_28s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#00ef68]/8 blur-3xl animate-[blob_32s_ease-in-out_infinite_reverse]" />
          <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#00ef68]/8 blur-3xl animate-[blob_30s_ease-in-out_infinite]" />
        </div>
        <div className="max-w-6xl mx-auto animate-[fadeInUp_0.7s_ease-out_both]">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* Left: content */}
            <div className="text-center md:text-left">
              <p className="inline-flex items-center gap-2 text-xs mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-200">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00ef68]" />
                Full‑Stack Developer
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white">
                Hi, I’m Mimoh Shukla
              </h1>
              {/* Removed typewriter line per request */}
              <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
                I design, build, and ship robust web apps end‑to‑end — from
                fast, accessible React UIs
                <br className="hidden sm:block" />
                to secure, scalable APIs and data layers.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <a
                  href="/newMIMOH.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="rounded-md bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  className="rounded-md bg-brownBlack text-white px-5 py-3 text-sm font-medium border border-white/10 hover:bg-brownBlack/90 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Me
                </a>
              </div>
            </div>
            {/* Right: code terminal card (replaces penguin) */}
            <div className="flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg rounded-xl border border-white/10 bg-[#0f0f0f] backdrop-blur p-3 sm:p-5 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center gap-1 mb-3 opacity-70">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-auto text-[10px] text-gray-400">
                    terminal
                  </span>
                </div>
                <TerminalCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me">
        <p>
          I’m <strong className="text-white">Mimoh Shukla</strong>, a full stack
          developer. I enjoy shipping polished user experiences, designing clean
          APIs, and tuning performance. I work across the stack with React,
          Node.js, TypeScript, databases, and DevOps tooling to deliver
          production‑ready features quickly.
        </p>
      </Section>

      {/* Skills */}
      <section id="skills" className="py-16 px-6 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-white">
          Skills
        </h2>
        <SkillsGrid />
      </section>

      {/* GitHub */}
      <section id="github" className="py-16 px-6 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
          GitHub
        </h2>
        <div className="mb-6">
          <a
            href="https://github.com/whomimohshukla"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Visit Mimoh's GitHub profile"
            title="Visit GitHub Profile"
          >
            <span>View GitHub Profile</span>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.07 11.07 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.23 2.87.11 3.17.75.81 1.2 1.85 1.2 3.11 0 4.45-2.71 5.44-5.29 5.72.41.35.77 1.04.77 2.11v3.13c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
              />
            </svg>
          </a>
        </div>
        <GithubStats username="whomimohshukla" />
        <ContributionsCalendar username="whomimohshukla" />
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Public Repositories
          </h3>
          <RepoGrid username="whomimohshukla" />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 text-white">
          Projects
        </h2>
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-2xl border border-white/10 bg-[#0f0f0f] overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl bg-[#0c0c0c] ring-1 ring-white/10">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm bg-gradient-to-br from-brownBlack/70 to-black">
                    No preview
                  </div>
                )}
                {/* subtle vignette overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.25)_100%)]" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-white text-black px-3 py-2 text-xs border border-white/10 hover:bg-white/90 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                      aria-label={`${p.title} live demo`}
                      title="Live Demo"
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-brownBlack text-white px-3 py-2 text-xs border border-white/10 hover:bg-brownBlack/90 transition duration-200 will-change-transform shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                    aria-label={`${p.title} on GitHub`}
                    title="GitHub repository"
                  >
                    <span className="text-gray-100">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.07 11.07 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.23 2.87.11 3.17.75.81 1.2 1.85 1.2 3.11 0 4.45-2.71 5.44-5.29 5.72.41.35.77 1.04.77 2.11v3.13c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
                        />
                      </svg>
                    </span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <Section id="contact" title="Get In Touch">
        <p>
          Have a project in mind or just want to say hi? Drop me a line and I’ll
          get back to you.
        </p>
        <form className="mt-6 grid gap-4 max-w-xl">
          <input
            className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brownBlack"
            placeholder="Your name"
          />
          <input
            className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brownBlack"
            type="email"
            placeholder="Email"
          />
          <textarea
            className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brownBlack"
            rows="4"
            placeholder="Message"
          />
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-brownBlack px-5 py-3 text-sm font-medium text-white border border-white/10 hover:bg-brownBlack/90"
          >
            Send Message
          </button>
        </form>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 bg-black">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            {/* GitHub */}
            <a
              href="https://github.com/whomimohshukla"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.07 11.07 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.23 2.87.11 3.17.75.81 1.2 1.85 1.2 3.11 0 4.45-2.71 5.44-5.29 5.72.41.35.77 1.04.77 2.11v3.13c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
                />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mimohshukla00/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7.5 0h3.83v1.98h.05c.53-1 1.83-2.06 3.77-2.06C19.84 8.42 23 10.47 23 15.3V23h-4v-6.64c0-1.58-.03-3.6-2.19-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8.5Z" />
              </svg>
            </a>
            {/* LeetCode (simplified mark) */}
            <a
              href="https://leetcode.com/whomimohshukla"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
                aria-hidden="true"
              >
                <path d="M14.2 3.5a1.5 1.5 0 0 1 2.12 0l3.68 3.68a1.5 1.5 0 0 1 0 2.12l-1.58 1.58a1.5 1.5 0 0 1-2.12 0l-3.68-3.68a1.5 1.5 0 0 1 0-2.12L14.2 3.5Zm-8.1 8.8 4.5-4.5a1.5 1.5 0 0 1 2.12 2.12l-3.44 3.44L12.7 17a3.8 3.8 0 0 0 5.37 0l.53-.53a1.5 1.5 0 1 1 2.12 2.12l-.53.53a6.8 6.8 0 0 1-9.6 0l-4.99-5a1.5 1.5 0 0 1 0-2.12Z" />
              </svg>
            </a>
          </div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} mimohshukla — Full Stack Developer.
            Built with React, Vite, and Tailwind.
          </p>
          <p className="text-center text-sm">
            <a
              href="mailto:mimohshukl0001@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              mimohshukl0001@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
