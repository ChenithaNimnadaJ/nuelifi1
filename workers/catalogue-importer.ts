type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  IMPORTER_ENABLED?: string;
  IMPORTER_DRY_RUN?: string;
};

type Source = {
  id: string;
  name: string;
  base_url: string;
  enabled: boolean;
};

type Candidate = {
  title: string;
  resource_url: string;
  year?: number;
  language?: string;
  description?: string;
  tags?: string[];
  source_id: string;
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

async function supabase(env: Env, path: string, init: RequestInit = {}) {
  return fetch(`${env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, "content-type": "application/json", ...(init.headers || {}) },
  });
}

// Add approved source adapters here. The empty registry keeps the importer safe until
// each source has been reviewed for robots.txt, terms, rate limits, and metadata shape.
const adapters: Record<string, (source: Source) => Promise<Candidate[]>> = {};

async function runImport(env: Env, dryRun = true) {
  if (env.IMPORTER_ENABLED !== "true") return { enabled: false, inserted: 0, skipped: 0, errors: [] };
  const sourceResponse = await supabase(env, "catalogue_sources?select=id,name,base_url,enabled&enabled=eq.true");
  if (!sourceResponse.ok) throw new Error(`source query failed: ${sourceResponse.status}`);
  const sources = (await sourceResponse.json()) as Source[];
  const summary = { enabled: true, dryRun, sources: sources.length, inserted: 0, skipped: 0, errors: [] as string[] };
  for (const source of sources) {
    const adapter = adapters[source.id];
    if (!adapter) { summary.skipped += 1; continue; }
    try {
      for (const candidate of await adapter(source)) {
        const normalized = candidate.resource_url.trim().toLowerCase();
        const duplicate = await supabase(env, `catalogue_resources?select=id&source_id=eq.${source.id}&resource_url=eq.${encodeURIComponent(candidate.resource_url)}&limit=1`);
        if (!duplicate.ok) throw new Error(`duplicate check failed: ${duplicate.status}`);
        if ((await duplicate.json()).length) { summary.skipped += 1; continue; }
        if (dryRun) { summary.skipped += 1; continue; }
        const insert = await supabase(env, "catalogue_import_items", { method: "POST", body: JSON.stringify({ source_id: source.id, normalized_url: normalized, title: candidate.title, metadata: candidate }) });
        if (!insert.ok) throw new Error(`import item insert failed: ${insert.status}`);
        summary.inserted += 1;
      }
    } catch (error) { summary.errors.push(`${source.name}: ${error instanceof Error ? error.message : String(error)}`); }
  }
  return summary;
}

export default {
  async fetch(request: Request, env: Env) {
    if (new URL(request.url).pathname !== "/health") return json({ service: "collifi-catalogue-importer", importer: "disabled-by-default" });
    return json({ ok: true, enabled: env.IMPORTER_ENABLED === "true", dryRun: env.IMPORTER_DRY_RUN !== "false" });
  },
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runImport(env, env.IMPORTER_DRY_RUN !== "false"));
  },
};
