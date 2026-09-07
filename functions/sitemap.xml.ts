const SUPABASE_URL = "https://usmoljkvqcuwwypqlrbd.supabase.co";
const SUPABASE_KEY = "sb_publishable_d1x5A9cNt1dZc_qjnNH7PQ_CIDzMzzl";
const SITE = "https://collifi.eu.cc";

const staticPaths = ["/", "/resources", "/exams", "/contact", "/about", "/privacy", "/terms"];

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function onRequest({ request }: { request: Request }) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/catalogue_published_resources?select=slug,updated_at,published_at,created_at&status=eq.published&slug=not.is.null&order=updated_at.desc&limit=5000`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
  const rows = response.ok ? await response.json() as Array<{ slug?: string; updated_at?: string; published_at?: string; created_at?: string }> : [];
  const entries = new Map<string, string>();
  for (const path of staticPaths) entries.set(`${SITE}${path}`, "2026-09-07");
  for (const row of rows) {
    if (!row.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(row.slug)) continue;
    const url = `${SITE}/paper/${encodeURIComponent(row.slug)}`;
    if (!entries.has(url)) entries.set(url, (row.updated_at || row.published_at || row.created_at || "2026-09-07").slice(0, 10));
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(entries, ([url, lastmod]) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
  return new Response(request.method === "HEAD" ? null : body, { status: 200, headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "no-store, no-cache, must-revalidate", "x-robots-tag": "all" } });
}
