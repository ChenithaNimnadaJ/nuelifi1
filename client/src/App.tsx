import { useEffect, useMemo, useState } from "react";
import { supabase, type CollifiResourceRow } from "./lib/supabase";
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
  country?: string;
  url?: string;
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

let subjects: Subject[] = [];
let resourceTypes = ["All types"];
let exams = ["All exams"];

let resources: Resource[] = [];

const articles: Article[] = [];

const articleBody: Record<string, string[]> = {};


function routeFor(pathname = window.location.pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  if (!parts.length) return { page: "home", slug: "" };
  if (parts[0] === "subjects" && parts[1]) return { page: "subject", slug: parts[1] };
  if (parts[0] === "resources") return { page: "resources", slug: parts[1] || "" };
  if (parts[0] === "articles") return { page: "article", slug: parts[1] || "" };
  if (["exams", "about", "contact", "privacy", "terms", "admin"].includes(parts[0])) return { page: parts[0], slug: "" };
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
  return <footer className="site-footer"><div className="footer-top"><div><Logo /><p className="footer-note">Understanding, made practical.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => go("/resources")}>Subjects</button><button onClick={() => go("/resources")}>Resources</button><button onClick={() => go("/exams")}>Exams</button><button onClick={() => go("/#articles")}>Articles</button></div><div><span>Collifi</span><button onClick={() => go("/about")}>About</button><button onClick={() => go("/contact")}>Contact</button><button onClick={() => go("/privacy")}>Privacy</button><button onClick={() => go("/terms")}>Terms</button></div></div></div><div className="footer-bottom"><span>© 2026 Collifi Learning</span><span>Built for curious minds, everywhere.</span></div></footer>;
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
  return <a className="resource-card" href={(resource as any).url || `/resources/${resource.slug}`} target={(resource as any).url ? "_blank" : undefined} rel={(resource as any).url ? "noreferrer" : undefined}><div className="resource-meta"><span>{resource.type}</span><span>{resource.subject}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-bottom"><span>{resource.exam} · {resource.year}</span><ChevronRight size={16} /></div></a>;
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <button className={`article-card ${featured ? "featured" : ""}`} onClick={() => go(`/articles/${article.slug}`)} style={{ "--article-accent": article.accent } as React.CSSProperties}><div className="article-visual"><span>{article.category}</span><span className="article-visual-mark">↗</span></div><div className="article-copy"><div className="article-meta"><span>{article.date}</span><span>{article.time}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="read-link">Read article <ArrowUpRight size={14} /></span></div></button>;
}

function Home() {
  const featured = resources.slice(0, 3);
  return <><main><section className="hero"><div className="hero-grid"><div className="hero-copy"><span className="eyebrow">A BETTER WAY TO LEARN</span><h1>Learn better.<br /><em>Understand more.</em></h1><p>A smarter place to study, practise, and build real understanding — wherever you are in the world.</p><div className="hero-actions"><button className="button button-dark" onClick={() => document.querySelector("#subjects")?.scrollIntoView({ behavior: "smooth" })}>Explore subjects <ArrowUpRight size={16} /></button><button className="text-button" onClick={() => go("/resources")}>Browse resources <ChevronRight size={16} /></button></div><div className="hero-proof"><span className="proof-dots"><i /><i /><i /></span><span>Clear explanations · focused practice · useful progress</span></div></div><div className="hero-art" aria-label="Collifi learning interface preview"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-panel"><div className="hero-panel-top"><span><i /> Collifi / study space</span><span>Today <ChevronDown size={13} /></span></div><div className="hero-panel-body"><div className="hero-panel-intro"><span>YOUR NEXT SESSION</span><strong>Make one idea clearer.</strong><p>Start with a concept. Leave with a connection.</p></div><div className="hero-progress"><div><span>Resource library</span><strong>In progress</strong></div><div className="progress-line"><i style={{ width: "38%" }} /></div><small>Thoughtful learning content is being prepared.</small></div><div className="hero-mini-grid"><div><BookOpen size={16} /><span>Notes soon</span></div><div><BrainCircuit size={16} /><span>Practice soon</span></div></div></div></div><div className="floating-note"><span className="floating-icon"><Check size={13} /></span><div><strong>Good question.</strong><small>Keep going from here.</small></div></div><div className="hero-stamp"><span>01</span><small>curiosity<br />over cramming</small></div></div></div></section>

<section className="marquee"><div><span>LEARN WITH INTENT</span><i /> <span>PRACTISE WITH PURPOSE</span><i /> <span>UNDERSTAND FOR YOURSELF</span><i /> <span>LEARN WITH INTENT</span></div></section>

<section className="section subjects-section" id="subjects"><div className="container"><SectionHeading eyebrow="YOUR STARTING POINT" title="Explore your subjects" copy="Build a stronger foundation across the subjects that matter to you." action={<button className="section-link" onClick={() => go("/resources")}>View all subjects <ArrowUpRight size={16} /></button>} /><div className="subject-grid">{subjects.map((subject) => <SubjectCard key={subject.slug} subject={subject} />)}</div></div></section>

<section className="section resources-section"><div className="container"><SectionHeading eyebrow="STUDY, YOUR WAY" title="Everything you need to study" copy="Go at your own pace with resources designed to make the next step obvious." /><div className="resource-type-grid">{resourceTypes.filter((title) => title !== "All types").slice(0, 4).map((title, index) => { const icons = [BookOpen, Check, BrainCircuit, GraduationCap]; const Comp = icons[index % icons.length]; return <button className="resource-type-card" key={title} onClick={() => go(`/resources?type=${encodeURIComponent(title)}`)}><span><Comp size={18} /></span><strong>{title}</strong><p>Explore published resources in this catalogue category.</p><ArrowUpRight size={16} className="resource-type-arrow" /></button>; })}</div></div></section>

<section className="section exams-section"><div className="container exams-layout"><div className="exams-copy"><span className="eyebrow">BUILT TO TRAVEL</span><h2>One foundation.<br /><em>Every curriculum.</em></h2><p>Browse the countries and examination systems currently available in the live Collifi catalogue.</p><button className="button button-outline" onClick={() => go("/exams")}>Explore exam pathways <ArrowUpRight size={16} /></button></div><div className="exam-map"><div className="map-lines"><i /><i /><i /></div><div className="exam-region region-sl"><span>{new Set(resources.map((resource) => resource.country)).size}</span><strong>Countries</strong><small>{new Set(resources.map((resource) => resource.country)).size ? "Loaded from Supabase" : "Awaiting catalogue data"}</small></div><div className="exam-region region-int"><span>{new Set(resources.map((resource) => resource.exam)).size}</span><strong>Systems</strong><small>{new Set(resources.map((resource) => resource.exam)).size ? "Available to explore" : "Awaiting catalogue data"}</small></div><div className="exam-center"><Globe2 size={24} /><span>Learn<br />anywhere</span></div></div></div></section>

<section className="section latest-section" id="articles"><div className="container"><SectionHeading eyebrow="IDEAS FOR THE JOURNEY" title="From Collifi" copy="Thoughtful notes on learning, practice, and making progress that lasts." action={<button className="section-link" onClick={() => go("/#articles")}>All articles <ArrowUpRight size={16} /></button>} /><div className="articles-grid">{articles.length ? articles.map((article, index) => <ArticleCard key={article.slug} article={article} featured={index === 0} />) : <ComingSoon title="The Collifi article library is being developed." copy="We are preparing thoughtful notes on learning, practice, and making progress that lasts." action={<button className="text-button" onClick={() => go("/resources")}>Explore subjects <ArrowUpRight size={16} /></button>} />}</div></div></section>

<section className="closing-cta"><div className="container closing-inner"><div><span className="eyebrow">START WHERE YOU ARE</span><h2>Make your next study<br /><em>session count.</em></h2></div><button className="button button-light" onClick={() => go("/resources")}>Start learning <ArrowUpRight size={16} /></button></div></section></main><Footer /></>;
}

function PageShell({ children }: { children: React.ReactNode }) { return <main className="inner-page"><div className="container">{children}</div></main>; }

function SubjectPage({ slug }: { slug: string }) {
  const subject = subjects.find((item) => item.slug === slug) || subjects[0];
  const related = resources.filter((resource) => resource.subject === subject.name);
  const Icon = subject.icon;
  return <PageShell><div className="page-intro subject-intro"><button className="back-link" onClick={() => go("/")}><ChevronRight size={15} className="back-chevron" /> Back home</button><div className="subject-intro-grid"><div><span className="eyebrow">{subject.eyebrow}</span><h1>{subject.name}</h1><p>Understand the concepts, practise effectively, and prepare with confidence.</p></div><div className="subject-intro-icon" style={{ background: subject.accent }}><Icon size={54} strokeWidth={1.25} /></div></div></div><div className="subject-tabs">{resourceTypes.filter((tab) => tab !== "All types").map((tab) => <button key={tab} onClick={() => go(`/resources?subject=${encodeURIComponent(subject.name)}&type=${encodeURIComponent(tab)}`)}>{tab}<ArrowUpRight size={14} /></button>)}</div><SectionHeading eyebrow="THE NEXT STEP" title={`Build your ${subject.name} foundation`} copy={`Notes, practice, and exam materials for ${subject.name} are being prepared with care.`} />{related.length ? <div className="resource-grid subject-resources">{related.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div> : <ComingSoon title={`${subject.name} resources are coming soon.`} copy="The subject structure is ready. Genuine learning materials will appear here as they are published." action={<button className="text-button" onClick={() => go("/resources")}>Browse the library <ArrowUpRight size={16} /></button>} />}<div className="subject-callout"><Sparkles size={20} /><div><strong>Good learning is cumulative.</strong><p>Come back to the same idea in a new context. That is where understanding starts to stick.</p></div></div></PageShell>;
}

function ResourcesPage({ slug }: { slug: string }) {
  const query = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(slug ? resources.find((item) => item.slug === slug)?.title || "" : "");
  const [type, setType] = useState(query.get("type") || "All types");
  const [exam, setExam] = useState(query.get("exam") || "All exams");
  const [subject, setSubject] = useState(query.get("subject") || "All subjects");
  const filtered = useMemo(() => resources.filter((resource) => [resource.title, resource.description, resource.subject, resource.exam, resource.year, resource.type, resource.country].join(" ").toLowerCase().includes(search.toLowerCase()) && (type === "All types" || resource.type === type) && (exam === "All exams" || resource.exam === exam) && (subject === "All subjects" || resource.subject === subject)), [search, type, exam, subject, resources.length]);
  return <PageShell><div className="page-intro"><span className="eyebrow">THE RESOURCE LIBRARY</span><h1>Study with a<br /><em>clear next step.</em></h1><p>Find notes, practice, and papers that help you understand the idea — not just finish the task.</p></div><div className="resource-toolbar"><label className="resource-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the library" /></label><label><span>Subject</span><select value={subject} onChange={(event) => setSubject(event.target.value)}><option>All subjects</option>{subjects.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label><span>Type</span><select value={type} onChange={(event) => setType(event.target.value)}>{resourceTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Exam</span><select value={exam} onChange={(event) => setExam(event.target.value)}>{exams.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="library-result-line"><span><strong>{filtered.length}</strong> resources available</span><span>Genuine learning materials will be added here</span></div>{filtered.length ? <div className="resource-grid">{filtered.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div> : <ComingSoon title="The resource library is being built." copy="Notes, MCQs, short questions, and past papers will appear here once genuine materials are ready. No placeholder downloads, just useful learning." action={<button className="text-button" onClick={() => go("/exams")}>Explore exam pathways <ArrowUpRight size={16} /></button>} />}</PageShell>;
}

function ExamsPage() {
  const pathways = Array.from(new Map(resources.map((resource) => [resource.country + " / " + resource.exam, { country: resource.country || "Catalogue", exam: resource.exam }])).values());
  return <PageShell><div className="page-intro"><span className="eyebrow">CATALOGUE PATHWAYS</span><h1>Explore the<br /><em>available systems.</em></h1><p>These pathways are loaded from the active Supabase catalogue.</p></div><div className="exam-pathways">{pathways.length ? pathways.map((pathway, index) => <div className="pathway-card" key={`${pathway.country}-${pathway.exam}`}><div className="pathway-label"><span>{String(index + 1).padStart(2, "0")}</span><span>{pathway.country}</span></div><h2>{pathway.exam}</h2><p>Browse published resources in this examination system.</p><div className="pathway-links"><button onClick={() => go(`/resources?exam=${encodeURIComponent(pathway.exam)}`)}>Browse resources <ArrowUpRight size={15} /></button></div></div>) : <ComingSoon title="Catalogue pathways are being prepared." copy="Add a country and examination system in Supabase and it will appear here automatically." />}</div></PageShell>;
}
function ArticlePage() {
  return <PageShell><div className="simple-page"><span className="eyebrow">IDEAS FOR THE JOURNEY</span><h1>The Collifi article library is being developed.</h1><p className="simple-lede">We are preparing clear, useful writing on learning, practice, and understanding.</p><ComingSoon title="Thoughtful articles are coming soon." copy="There are no invented authors, dates, or filler posts here. We will publish when each article is ready to be useful." action={<button className="button button-dark" onClick={() => go("/resources")}>Explore subjects <ArrowUpRight size={16} /></button>} /></div></PageShell>;
}

function SimplePage({ kind }: { kind: string }) {
  const content: Record<string, { eyebrow: string; title: string; copy: string; body: string[] }> = {
    about: { eyebrow: "A PLATFORM FOR UNDERSTANDING", title: "Learning should lead to understanding, not merely memorization.", copy: "Collifi is an independent learning platform for students who want to make sense of what they study.", body: ["We are building a calmer, clearer way to learn — one that respects the work students put in and helps them see the connections behind the syllabus.", "Our starting point is school-level academic learning. Our ambition is broader: to make high-quality explanations and useful practice available to students wherever they are.", "No noise. No shortcuts disguised as progress. Just thoughtful content, practical tools, and a place to keep going."] },
    contact: { eyebrow: "WE’D LIKE TO HEAR FROM YOU", title: "Questions, ideas, or a resource we should build next?", copy: "Send a note and the Collifi team will get back to you.", body: ["For general questions, content suggestions, accessibility feedback, or partnership enquiries, email hello@collifi.eu.cc. For technical support, email support@collifi.eu.cc.", "We are a small team and read every message. Please include the subject or exam pathway your message relates to so we can respond usefully."] },
    privacy: { eyebrow: "YOUR PRIVACY", title: "A simple, respectful approach to privacy.", copy: "This starter policy explains how Collifi approaches information on the public website.", body: ["Collifi is designed as a public learning platform. We do not require an account to browse lessons, articles, or resources. We may use essential technical information to keep the site secure and functional.", "If we add analytics or optional communications in the future, we will explain what they do and why they are useful. We will not sell personal information.", "For privacy questions, contact support@collifi.eu.cc."] },
    terms: { eyebrow: "THE BASICS", title: "Use Collifi to learn, practise, and keep moving.", copy: "A plain-language summary of the terms for using this public learning platform.", body: ["Collifi’s content is provided for educational and informational purposes. It is not a substitute for official curriculum documents, teacher guidance, or examination-board instructions.", "You may use and share links to Collifi for personal and educational use. Please do not copy, resell, or present our content as your own.", "We will keep improving the platform and may update content, links, and these terms as the service grows."] },
  };
  const item = content[kind] || content.about;
  return <PageShell><div className="simple-page"><span className="eyebrow">{item.eyebrow}</span><h1>{item.title}</h1><p className="simple-lede">{item.copy}</p><div className="simple-body">{item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{kind === "contact" && <a className="button button-dark" href="mailto:hello@collifi.eu.cc">Email Collifi <ArrowUpRight size={16} /></a>}</div></PageShell>;
}

function AdminPage({ onPublished }: { onPublished: () => void }) {
  const [session, setSession] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [systems, setSystems] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ country_id: "", exam_system_id: "", level_id: "", subject_id: "", resource_type_id: "", source_id: "", title: "", year: "", language: "English", resource_url: "", description: "", tags: "" });
  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data } = supabase.auth.onAuthStateChange((_e, next) => setSession(next)); Promise.all([supabase.from("catalogue_countries").select("id,name").eq("active", true).order("name"), supabase.from("catalogue_resource_types").select("id,label").eq("active", true).order("label"), supabase.from("catalogue_sources").select("id,name").eq("enabled", true).order("name")]).then(([c, t, s]) => { setCountries(c.data || []); setTypes(t.data || []); setSources(s.data || []); }); return () => data.subscription.unsubscribe(); }, []);
  useEffect(() => { if (!form.country_id) { setSystems([]); return; } supabase.from("catalogue_exam_systems").select("id,name").eq("country_id", form.country_id).eq("active", true).order("name").then(({ data }) => setSystems(data || [])); }, [form.country_id]);
  useEffect(() => { if (!form.exam_system_id) { setLevels([]); return; } supabase.from("catalogue_levels").select("id,name").eq("exam_system_id", form.exam_system_id).eq("active", true).order("sort_order").order("name").then(({ data }) => setLevels(data || [])); }, [form.exam_system_id]);
  useEffect(() => { if (!form.level_id) { setSubjectsList([]); return; } supabase.from("catalogue_subjects").select("id,name").eq("level_id", form.level_id).eq("active", true).order("name").then(({ data }) => setSubjectsList(data || [])); }, [form.level_id]);
  const auth = async () => { const email = window.prompt("Admin email"); const password = window.prompt("Password"); if (!email || !password) return; const { data, error } = await supabase.auth.signInWithPassword({ email, password }); setSession(data.session); setMessage(error?.message || "Signed in."); };
  const publish = async (event: React.FormEvent) => { event.preventDefault(); setMessage(""); if (!session) { setMessage("Sign in before publishing."); return; } const payload = { subject_id: form.subject_id, resource_type_id: form.resource_type_id, source_id: form.source_id || null, title: form.title, normalized_title: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), resource_url: form.resource_url, year: form.year ? Number(form.year) : null, language: form.language || null, description: form.description || null, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), status: "published", published_at: new Date().toISOString(), created_by: session.user.id }; const { error } = await supabase.from("catalogue_resources").insert(payload); setMessage(error?.message || "Published and searchable immediately."); if (!error) onPublished(); };
  return <PageShell><div className="simple-page admin-page"><span className="eyebrow">RESOURCE ADMIN</span><h1>Publish from the catalogue.</h1><p className="simple-lede">All selectors come from Supabase. Add catalogue data once; no frontend code change is required.</p>{!session ? <div className="admin-form"><button className="button button-dark" onClick={auth}>Sign in to publish</button>{message && <p className="admin-message">{message}</p>}</div> : <form className="admin-form" onSubmit={publish}><select required value={form.country_id} onChange={e => setForm({ ...form, country_id: e.target.value, exam_system_id: "", level_id: "", subject_id: "" })}><option value="">Country</option>{countries.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select><select required value={form.exam_system_id} onChange={e => setForm({ ...form, exam_system_id: e.target.value, level_id: "", subject_id: "" })}><option value="">Examination system</option>{systems.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select><select required value={form.level_id} onChange={e => setForm({ ...form, level_id: e.target.value, subject_id: "" })}><option value="">Level</option>{levels.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select><select required value={form.subject_id} onChange={e => setForm({ ...form, subject_id: e.target.value })}><option value="">Subject</option>{subjectsList.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select><select required value={form.resource_type_id} onChange={e => setForm({ ...form, resource_type_id: e.target.value })}><option value="">Resource type</option>{types.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}</select><select value={form.source_id} onChange={e => setForm({ ...form, source_id: e.target.value })}><option value="">Source (optional)</option>{sources.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select><input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" /><input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="Year" inputMode="numeric" /><input value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} placeholder="Language" /><input required type="url" value={form.resource_url} onChange={e => setForm({ ...form, resource_url: e.target.value })} placeholder="External resource URL" /><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Tags, comma separated" /><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" /><button className="button button-dark" type="submit">Publish resource</button><button className="text-button" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>{message && <p className="admin-message">{message}</p>}</form>}</div></PageShell>;
}
function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = query.trim() ? [...subjects.map((item) => ({ title: item.name, detail: "Subject", path: `/subjects/${item.slug}` })), ...resources.map((item) => ({ title: item.title, detail: `${item.subject} · ${item.type}`, path: `/resources/${item.slug}` })), ...articles.map((item) => ({ title: item.title, detail: `Article · ${item.category}`, path: `/articles/${item.slug}` }))].filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase())).slice(0, 7) : [];
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search Collifi" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="search-dialog"><div className="search-dialog-top"><Search size={19} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subjects, resources, articles..." /><button onClick={onClose} aria-label="Close search"><X size={18} /></button></div>{query && <div className="search-results">{results.length ? results.map((result) => <button key={result.path} onClick={() => { onClose(); go(result.path); }}><span><strong>{result.title}</strong><small>{result.detail}</small></span><ArrowUpRight size={16} /></button>) : <p className="search-empty">No results yet. Try “mathematics”, “notes”, or “understanding”.</p>}</div>}<div className="search-hint"><span>Search Collifi</span><kbd>ESC</kbd></div></div></div>;
}

export default function App() {
  const [route, setRoute] = useState(routeFor());
  const [searchOpen, setSearchOpen] = useState(false);
  const [liveResources, setLiveResources] = useState<Resource[]>([]);
  useEffect(() => { Promise.all([supabase.from("catalogue_published_resources").select("*").order("created_at", { ascending: false }), supabase.from("catalogue_subject_directory").select("*").order("country").order("name"), supabase.from("catalogue_exam_directory").select("*").order("country").order("name"), supabase.from("catalogue_type_directory").select("*").order("label")]).then(([resourceResult, subjectResult, examResult, typeResult]) => { const rows = resourceResult.data || []; const mapped = rows.map((row: any) => ({ slug: row.id, title: row.title, subject: row.subject, exam: row.examination, type: row.resource_type_label, year: row.year ? String(row.year) : "", difficulty: row.level || "", description: row.description || [row.country, row.language].filter(Boolean).join(" · ") || "Published Collifi resource.", country: row.country, url: row.resource_url } as Resource)); setLiveResources(mapped); subjects = (subjectResult.data || []).map((row: any) => ({ slug: row.slug, name: row.name, eyebrow: `${row.country} / ${row.examination}`, description: `${row.examination} · ${row.level}`, accent: "#d9e4f5", icon: BookOpen })) as Subject[]; resourceTypes = ["All types", ...(typeResult.data || []).map((row: any) => row.label)]; exams = ["All exams", ...(examResult.data || []).map((row: any) => row.name)]; }); }, []);
  resources = liveResources;
  useEffect(() => { const onPop = () => setRoute(routeFor()); const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } if (event.key === "Escape") setSearchOpen(false); }; window.addEventListener("popstate", onPop); window.addEventListener("keydown", onKey); return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("keydown", onKey); }; }, []);
  useEffect(() => { document.title = route.page === "home" ? "Collifi — Learn better. Understand more." : `${route.page[0].toUpperCase()}${route.page.slice(1)} — Collifi`; }, [route]);
  useEffect(() => { const existing = document.getElementById("collifi-route-ad"); if (route.page === "home") { existing?.remove(); return; } if (!existing) { const script = document.createElement("script"); script.id = "collifi-route-ad"; script.dataset.zone = "11743539"; script.src = "https://n6wxm.com/vignette.min.js"; document.body.appendChild(script); } }, [route]);
  const content = route.page === "home" ? <Home /> : route.page === "subject" ? <SubjectPage slug={route.slug} /> : route.page === "resources" ? <ResourcesPage slug={route.slug} /> : route.page === "article" ? <ArticlePage /> : route.page === "exams" ? <ExamsPage /> : route.page === "admin" ? <AdminPage onPublished={() => window.location.reload()} /> : <SimplePage kind={route.page} />;
  return <div className="app-shell"><Header onSearch={() => setSearchOpen(true)} />{content}{searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}</div>;
}

export { subjects, resources, articles };

// React's CSSProperties type is used for the small set of custom design tokens above.
