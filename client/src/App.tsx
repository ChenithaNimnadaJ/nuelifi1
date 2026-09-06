import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Atom,
  BookOpen,
  BrainCircuit,
  Calculator,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  Globe2,
  GraduationCap,
  History,
  Languages,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type Subject = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  icon: typeof Calculator;
};

type Resource = {
  slug: string;
  title: string;
  subject: string;
  exam: string;
  type: string;
  year: string;
  difficulty: string;
  description: string;
};

type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  time: string;
  accent: string;
};

const subjects: Subject[] = [
  { slug: "mathematics", name: "Mathematics", eyebrow: "01 / logic", description: "Build the reasoning skills behind every solution.", accent: "#c7e6df", icon: Calculator },
  { slug: "science", name: "Science", eyebrow: "02 / discovery", description: "Connect the evidence, ideas, and world around you.", accent: "#d9e4f5", icon: Atom },
  { slug: "english", name: "English", eyebrow: "03 / expression", description: "Read critically. Write clearly. Communicate with intent.", accent: "#f0e2c9", icon: Languages },
  { slug: "history", name: "History", eyebrow: "04 / perspective", description: "Understand the forces that shape people and places.", accent: "#e6dff0", icon: History },
  { slug: "ict", name: "ICT", eyebrow: "05 / systems", description: "Learn how digital systems work — and how to think in them.", accent: "#d4ead6", icon: Code2 },
  { slug: "commerce", name: "Commerce", eyebrow: "06 / decisions", description: "Make sense of markets, money, and modern organisations.", accent: "#f1dccd", icon: Globe2 },
  { slug: "buddhism", name: "Buddhism", eyebrow: "07 / reflection", description: "Explore ideas of mind, ethics, and the path to wisdom.", accent: "#e8e0cf", icon: Sparkles },
];

const resources: Resource[] = [];

const articles: Article[] = [];

const articleBody: Record<string, string[]> = {};

const resourceTypes = ["All types", "Notes", "MCQs", "Short Questions", "Past Papers"];
const exams = ["All exams", "G.C.E. O/L", "G.C.E. A/L", "GCSE", "IGCSE", "IB", "A/L"];

function routeFor(pathname = window.location.pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  if (!parts.length) return { page: "home", slug: "" };
  if (parts[0] === "subjects" && parts[1]) return { page: "subject", slug: parts[1] };
  if (parts[0] === "resources") return { page: "resources", slug: parts[1] || "" };
  if (parts[0] === "articles") return { page: "article", slug: parts[1] || "" };
  if (["exams", "about", "contact", "privacy", "terms"].includes(parts[0])) return { page: parts[0], slug: "" };
  return { page: "home", slug: "" };
}

function go(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Logo() {
  return <button className="logo" onClick={() => go("/")} aria-label="Collifi home"><span className="logo-mark"><span /></span><span>COLLIFI</span></button>;
}

function Header({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [["Subjects", "#subjects"], ["Resources", "/resources"], ["Exams", "/exams"], ["Articles", "#articles"]];
  const navigate = (href: string) => { setOpen(false); if (href.startsWith("#")) { if (window.location.pathname !== "/") go(`/${href}`); else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); } else go(href); };
  return <header className="site-header"><div className="header-inner"><Logo /><nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">{links.map(([label, href]) => <button key={label} onClick={() => navigate(href)}>{label}</button>)}<button className="nav-mobile-search" onClick={() => { setOpen(false); onSearch(); }}><Search size={15} /> Search</button></nav><div className="header-actions"><button className="search-trigger" onClick={onSearch}><Search size={16} /><span>Search</span><kbd>⌘ K</kbd></button><button className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Logo /><p className="footer-note">Understanding, made practical.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => go("/subjects/mathematics")}>Subjects</button><button onClick={() => go("/resources")}>Resources</button><button onClick={() => go("/exams")}>Exams</button><button onClick={() => go("/#articles")}>Articles</button></div><div><span>Collifi</span><button onClick={() => go("/about")}>About</button><button onClick={() => go("/contact")}>Contact</button><button onClick={() => go("/privacy")}>Privacy</button><button onClick={() => go("/terms")}>Terms</button></div></div></div><div className="footer-bottom"><span>© 2026 Collifi Learning</span><span>Built for curious minds, everywhere.</span></div></footer>;
}

function SectionHeading({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow || "COLLIFI"}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{action}</div>;
}

function ComingSoon({ title, copy, action }: { title: string; copy: string; action?: React.ReactNode }) {
  return <div className="empty-state coming-soon-state"><Sparkles size={24} /><span className="eyebrow">COMING SOON</span><h3>{title}</h3><p>{copy}</p>{action}</div>;
}

function SubjectCard({ subject, compact = false }: { subject: Subject; compact?: boolean }) {
  const Icon = subject.icon;
  return <button className={`subject-card ${compact ? "compact" : ""}`} onClick={() => go(`/subjects/${subject.slug}`)} style={{ "--card-accent": subject.accent } as React.CSSProperties}><div className="card-top"><span className="subject-number">{subject.eyebrow}</span><span className="card-arrow"><ArrowUpRight size={17} /></span></div><span className="subject-icon"><Icon size={compact ? 18 : 22} strokeWidth={1.7} /></span><strong>{subject.name}</strong><p>{subject.description}</p></button>;
}

function ResourceCard({ resource }: { resource: Resource }) {
  return <button className="resource-card" onClick={() => go(`/resources/${resource.slug}`)}><div className="resource-meta"><span>{resource.type}</span><span>{resource.subject}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-bottom"><span>{resource.exam} · {resource.year}</span><ChevronRight size={16} /></div></button>;
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <button className={`article-card ${featured ? "featured" : ""}`} onClick={() => go(`/articles/${article.slug}`)} style={{ "--article-accent": article.accent } as React.CSSProperties}><div className="article-visual"><span>{article.category}</span><span className="article-visual-mark">↗</span></div><div className="article-copy"><div className="article-meta"><span>{article.date}</span><span>{article.time}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="read-link">Read article <ArrowUpRight size={14} /></span></div></button>;
}

function Home() {
  const featured = resources.slice(0, 3);
  return <><main><section className="hero"><div className="hero-grid"><div className="hero-copy"><span className="eyebrow">A BETTER WAY TO LEARN</span><h1>Learn better.<br /><em>Understand more.</em></h1><p>A smarter place to study, practise, and build real understanding — wherever you are in the world.</p><div className="hero-actions"><button className="button button-dark" onClick={() => document.querySelector("#subjects")?.scrollIntoView({ behavior: "smooth" })}>Explore subjects <ArrowUpRight size={16} /></button><button className="text-button" onClick={() => go("/resources")}>Browse resources <ChevronRight size={16} /></button></div><div className="hero-proof"><span className="proof-dots"><i /><i /><i /></span><span>Clear explanations · focused practice · useful progress</span></div></div><div className="hero-art" aria-label="Collifi learning interface preview"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-panel"><div className="hero-panel-top"><span><i /> Collifi / study space</span><span>Today <ChevronDown size={13} /></span></div><div className="hero-panel-body"><div className="hero-panel-intro"><span>YOUR NEXT SESSION</span><strong>Make one idea clearer.</strong><p>Start with a concept. Leave with a connection.</p></div><div className="hero-progress"><div><span>Resource library</span><strong>In progress</strong></div><div className="progress-line"><i style={{ width: "38%" }} /></div><small>Thoughtful learning content is being prepared.</small></div><div className="hero-mini-grid"><div><BookOpen size={16} /><span>Notes soon</span></div><div><BrainCircuit size={16} /><span>Practice soon</span></div></div></div></div><div className="floating-note"><span className="floating-icon"><Check size={13} /></span><div><strong>Good question.</strong><small>Keep going from here.</small></div></div><div className="hero-stamp"><span>01</span><small>curiosity<br />over cramming</small></div></div></div></section>

<section className="marquee"><div><span>LEARN WITH INTENT</span><i /> <span>PRACTISE WITH PURPOSE</span><i /> <span>UNDERSTAND FOR YOURSELF</span><i /> <span>LEARN WITH INTENT</span></div></section>

<section className="section subjects-section" id="subjects"><div className="container"><SectionHeading eyebrow="YOUR STARTING POINT" title="Explore your subjects" copy="Build a stronger foundation across the subjects that matter to you." action={<button className="section-link" onClick={() => go("/subjects/mathematics")}>View all subjects <ArrowUpRight size={16} /></button>} /><div className="subject-grid">{subjects.map((subject) => <SubjectCard key={subject.slug} subject={subject} />)}</div></div></section>

<section className="section resources-section"><div className="container"><SectionHeading eyebrow="STUDY, YOUR WAY" title="Everything you need to study" copy="Go at your own pace with resources designed to make the next step obvious." /><div className="resource-type-grid">{[["Notes", "Build a clear mental model before you practise.", BookOpen], ["MCQs", "Test what you really know, quickly.", Check], ["Short Questions", "Turn half-formed ideas into confident answers.", BrainCircuit], ["Past Papers", "Meet the format. Find your rhythm.", GraduationCap]].map(([title, copy, Icon]) => { const Comp = Icon as typeof BookOpen; return <button className="resource-type-card" key={title as string} onClick={() => go(`/resources?type=${encodeURIComponent(title as string)}`)}><span><Comp size={18} /></span><strong>{title as string}</strong><p>{copy as string}</p><ArrowUpRight size={16} className="resource-type-arrow" /></button>; })}</div></div></section>

<section className="section exams-section"><div className="container exams-layout"><div className="exams-copy"><span className="eyebrow">BUILT TO TRAVEL</span><h2>One foundation.<br /><em>Every curriculum.</em></h2><p>Whether you are preparing for Sri Lankan exams or an international pathway, Collifi helps you focus on the learning underneath the label.</p><button className="button button-outline" onClick={() => go("/exams")}>Explore exam pathways <ArrowUpRight size={16} /></button></div><div className="exam-map"><div className="map-lines"><i /><i /><i /></div><div className="exam-region region-sl"><span>01</span><strong>Sri Lanka</strong><small>G.C.E. O/L · G.C.E. A/L</small></div><div className="exam-region region-int"><span>02</span><strong>International</strong><small>GCSE · IGCSE · IB</small></div><div className="exam-center"><Globe2 size={24} /><span>Learn<br />anywhere</span></div></div></div></section>

<section className="section latest-section" id="articles"><div className="container"><SectionHeading eyebrow="IDEAS FOR THE JOURNEY" title="From Collifi" copy="Thoughtful notes on learning, practice, and making progress that lasts." action={<button className="section-link" onClick={() => go("/#articles")}>All articles <ArrowUpRight size={16} /></button>} /><div className="articles-grid">{articles.length ? articles.map((article, index) => <ArticleCard key={article.slug} article={article} featured={index === 0} />) : <ComingSoon title="The Collifi article library is being developed." copy="We are preparing thoughtful notes on learning, practice, and making progress that lasts." action={<button className="text-button" onClick={() => go("/subjects/mathematics")}>Explore subjects <ArrowUpRight size={16} /></button>} />}</div></div></section>

<section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow">START WHERE YOU ARE</span><h2>Make your next study<br /><em>session count.</em></h2></div><button className="button button-light" onClick={() => go("/resources")}>Start learning <ArrowUpRight size={16} /></button></div></section></main><Footer /></>;
}

function PageShell({ children }: { children: React.ReactNode }) { return <main className="inner-page"><div className="container">{children}</div></main>; }

function SubjectPage({ slug }: { slug: string }) {
  const subject = subjects.find((item) => item.slug === slug) || subjects[0];
  const related = resources.filter((resource) => resource.subject === subject.name);
  const Icon = subject.icon;
  return <PageShell><div className="page-intro subject-intro"><button className="back-link" onClick={() => go("/")}><ChevronRight size={15} className="back-chevron" /> Back home</button><div className="subject-intro-grid"><div><span className="eyebrow">{subject.eyebrow}</span><h1>{subject.name}</h1><p>Understand the concepts, practise effectively, and prepare with confidence.</p></div><div className="subject-intro-icon" style={{ background: subject.accent }}><Icon size={54} strokeWidth={1.25} /></div></div></div><div className="subject-tabs">{["Notes", "MCQs", "Short Questions", "Past Papers", "Articles"].map((tab) => <button key={tab} onClick={() => go(`/resources?subject=${encodeURIComponent(subject.name)}&type=${encodeURIComponent(tab)}`)}>{tab}<ArrowUpRight size={14} /></button>)}</div><SectionHeading eyebrow="THE NEXT STEP" title={`Build your ${subject.name} foundation`} copy={`Notes, practice, and exam materials for ${subject.name} are being prepared with care.`} />{related.length ? <div className="resource-grid subject-resources">{related.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div> : <ComingSoon title={`${subject.name} resources are coming soon.`} copy="The subject structure is ready. Genuine learning materials will appear here as they are published." action={<button className="text-button" onClick={() => go("/resources")}>Browse the library <ArrowUpRight size={16} /></button>} />}<div className="subject-callout"><Sparkles size={20} /><div><strong>Good learning is cumulative.</strong><p>Come back to the same idea in a new context. That is where understanding starts to stick.</p></div></div></PageShell>;
}

function ResourcesPage({ slug }: { slug: string }) {
  const query = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(slug ? resources.find((item) => item.slug === slug)?.title || "" : "");
  const [type, setType] = useState(query.get("type") || "All types");
  const [exam, setExam] = useState(query.get("exam") || "All exams");
  const [subject, setSubject] = useState(query.get("subject") || "All subjects");
  const filtered = useMemo(() => resources.filter((resource) => [resource.title, resource.description, resource.subject].join(" ").toLowerCase().includes(search.toLowerCase()) && (type === "All types" || resource.type === type) && (exam === "All exams" || resource.exam === exam) && (subject === "All subjects" || resource.subject === subject)), [search, type, exam, subject]);
  return <PageShell><div className="page-intro"><span className="eyebrow">THE RESOURCE LIBRARY</span><h1>Study with a<br /><em>clear next step.</em></h1><p>Find notes, practice, and papers that help you understand the idea — not just finish the task.</p></div><div className="resource-toolbar"><label className="resource-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the library" /></label><label><span>Subject</span><select value={subject} onChange={(event) => setSubject(event.target.value)}><option>All subjects</option>{subjects.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label><span>Type</span><select value={type} onChange={(event) => setType(event.target.value)}>{resourceTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Exam</span><select value={exam} onChange={(event) => setExam(event.target.value)}>{exams.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="library-result-line"><span><strong>{filtered.length}</strong> resources available</span><span>Genuine learning materials will be added here</span></div>{filtered.length ? <div className="resource-grid">{filtered.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div> : <ComingSoon title="The resource library is being built." copy="Notes, MCQs, short questions, and past papers will appear here once genuine materials are ready. No placeholder downloads, just useful learning." action={<button className="text-button" onClick={() => go("/exams")}>Explore exam pathways <ArrowUpRight size={16} /></button>} />}</PageShell>;
}

function ExamsPage() {
  return <PageShell><div className="page-intro"><span className="eyebrow">PATHWAYS, NOT BOXES</span><h1>Prepare for the<br /><em>way you learn.</em></h1><p>Choose the curriculum that fits your goals. The learning underneath stays connected.</p></div><div className="exam-pathways"><div className="pathway-card"><div className="pathway-label"><span>01</span><span>SRI LANKA</span></div><h2>National pathways</h2><p>Build a strong foundation for the G.C.E. Ordinary Level and Advanced Level examinations.</p><div className="pathway-links"><button onClick={() => go("/resources?exam=G.C.E.%20O%2FL")}>G.C.E. O/L <ArrowUpRight size={15} /></button><button onClick={() => go("/resources?exam=G.C.E.%20A%2FL")}>G.C.E. A/L <ArrowUpRight size={15} /></button></div></div><div className="pathway-card pathway-international"><div className="pathway-label"><span>02</span><span>INTERNATIONAL</span></div><h2>Global pathways</h2><p>Explore resources aligned with the GCSE, IGCSE, and IB ways of thinking.</p><div className="pathway-links"><button onClick={() => go("/resources?exam=GCSE")}>GCSE <ArrowUpRight size={15} /></button><button onClick={() => go("/resources?exam=IGCSE")}>IGCSE <ArrowUpRight size={15} /></button><button onClick={() => go("/resources?exam=IB")}>IB <ArrowUpRight size={15} /></button></div></div></div><div className="future-note"><Globe2 size={20} /><p><strong>More places, same purpose.</strong> Collifi’s content structure is designed to grow with students and curricula around the world.</p></div></PageShell>;
}

function ArticlePage() {
  return <PageShell><div className="simple-page"><span className="eyebrow">IDEAS FOR THE JOURNEY</span><h1>The Collifi article library is being developed.</h1><p className="simple-lede">We are preparing clear, useful writing on learning, practice, and understanding.</p><ComingSoon title="Thoughtful articles are coming soon." copy="There are no invented authors, dates, or filler posts here. We will publish when each article is ready to be useful." action={<button className="button button-dark" onClick={() => go("/subjects/mathematics")}>Explore subjects <ArrowUpRight size={16} /></button>} /></div></PageShell>;
}

function SimplePage({ kind }: { kind: string }) {
  const content: Record<string, { eyebrow: string; title: string; copy: string; body: string[] }> = {
    about: { eyebrow: "A PLATFORM FOR UNDERSTANDING", title: "Learning should lead to understanding, not merely memorization.", copy: "Collifi is an independent learning platform for students who want to make sense of what they study.", body: ["We are building a calmer, clearer way to learn — one that respects the work students put in and helps them see the connections behind the syllabus.", "Our starting point is school-level academic learning. Our ambition is broader: to make high-quality explanations and useful practice available to students wherever they are.", "No noise. No shortcuts disguised as progress. Just thoughtful content, practical tools, and a place to keep going."] },
    contact: { eyebrow: "WE’D LIKE TO HEAR FROM YOU", title: "Questions, ideas, or a resource we should build next?", copy: "Send a note and the Collifi team will get back to you.", body: ["For general questions, content suggestions, accessibility feedback, or partnership enquiries, email hello@collifi.org.", "We are a small team and read every message. Please include the subject or exam pathway your message relates to so we can respond usefully."] },
    privacy: { eyebrow: "YOUR PRIVACY", title: "A simple, respectful approach to privacy.", copy: "This starter policy explains how Collifi approaches information on the public website.", body: ["Collifi is designed as a public learning platform. We do not require an account to browse lessons, articles, or resources. We may use essential technical information to keep the site secure and functional.", "If we add analytics or optional communications in the future, we will explain what they do and why they are useful. We will not sell personal information.", "For privacy questions, contact hello@collifi.org."] },
    terms: { eyebrow: "THE BASICS", title: "Use Collifi to learn, practise, and keep moving.", copy: "A plain-language summary of the terms for using this public learning platform.", body: ["Collifi’s content is provided for educational and informational purposes. It is not a substitute for official curriculum documents, teacher guidance, or examination-board instructions.", "You may use and share links to Collifi for personal and educational use. Please do not copy, resell, or present our content as your own.", "We will keep improving the platform and may update content, links, and these terms as the service grows."] },
  };
  const item = content[kind] || content.about;
  return <PageShell><div className="simple-page"><span className="eyebrow">{item.eyebrow}</span><h1>{item.title}</h1><p className="simple-lede">{item.copy}</p><div className="simple-body">{item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{kind === "contact" && <a className="button button-dark" href="mailto:hello@collifi.org">Email Collifi <ArrowUpRight size={16} /></a>}</div></PageShell>;
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = query.trim() ? [...subjects.map((item) => ({ title: item.name, detail: "Subject", path: `/subjects/${item.slug}` })), ...resources.map((item) => ({ title: item.title, detail: `${item.subject} · ${item.type}`, path: `/resources/${item.slug}` })), ...articles.map((item) => ({ title: item.title, detail: `Article · ${item.category}`, path: `/articles/${item.slug}` }))].filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase())).slice(0, 7) : [];
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Collifi" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="search-dialog"><div className="search-dialog-top"><Search size={19} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subjects, resources, articles..." /><button onClick={onClose} aria-label="Close search"><X size={18} /></button></div>{query && <div className="search-results">{results.length ? results.map((result) => <button key={result.path} onClick={() => { onClose(); go(result.path); }}><span><strong>{result.title}</strong><small>{result.detail}</small></span><ArrowUpRight size={16} /></button>) : <p className="search-empty">No results yet. Try “mathematics”, “notes”, or “understanding”.</p>}</div>}<div className="search-hint"><span>Search Collifi</span><kbd>ESC</kbd></div></div></div>;
}

export default function App() {
  const [route, setRoute] = useState(routeFor());
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { const onPop = () => setRoute(routeFor()); const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } if (event.key === "Escape") setSearchOpen(false); }; window.addEventListener("popstate", onPop); window.addEventListener("keydown", onKey); return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("keydown", onKey); }; }, []);
  useEffect(() => { document.title = route.page === "home" ? "Collifi — Learn better. Understand more." : `${route.page[0].toUpperCase()}${route.page.slice(1)} — Collifi`; }, [route]);
  const content = route.page === "home" ? <Home /> : route.page === "subject" ? <SubjectPage slug={route.slug} /> : route.page === "resources" ? <ResourcesPage slug={route.slug} /> : route.page === "article" ? <ArticlePage /> : route.page === "exams" ? <ExamsPage /> : <SimplePage kind={route.page} />;
  return <div className="app-shell"><Header onSearch={() => setSearchOpen(true)} />{content}{searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}</div>;
}

export { subjects, resources, articles };

// React's CSSProperties type is used for the small set of custom design tokens above.
