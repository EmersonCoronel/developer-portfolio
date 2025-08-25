// lib/wdi.ts
// Tiny World Bank WDI client for authoritative stats.
// Uses the open REST API; consider adding server-side caching if desired.

type WdiPoint = { date: string; value: number | null };

async function fetchWdiSeries(
  iso3: string,
  indicator: string,
  perPage = 80
): Promise<WdiPoint[]> {
  const url = `https://api.worldbank.org/v2/country/${iso3}/indicator/${indicator}?format=json&per_page=${perPage}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`WDI ${indicator} HTTP ${r.status}`);
  const j = await r.json();
  const rows = (j?.[1] || []) as Array<{ date: string; value: number | null }>;
  return rows.map((d) => ({ date: d.date, value: d.value }));
}

export async function wdiLatest(
  iso3: string,
  indicators: string[]
): Promise<Record<string, { value: number | null; year: string | null }>> {
  const out: Record<
    string,
    { value: number | null; year: string | null }
  > = {};
  await Promise.all(
    indicators.map(async (ind) => {
      try {
        const series = await fetchWdiSeries(iso3, ind);
        const first = series.find((p) => p.value !== null);
        out[ind] = first
          ? { value: first.value, year: first.date }
          : { value: null, year: null };
      } catch {
        out[ind] = { value: null, year: null };
      }
    })
  );
  return out;
}
