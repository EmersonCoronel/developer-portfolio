// pages/api/geopulse/country.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { BigQuery } from "@google-cloud/bigquery";
import OpenAI from "openai";
import lookup from "country-code-lookup";
import { wdiLatest } from "../../../../lib/wdi";
import baseRelations from "../../../../data/relations.json";

// ---------- Config ----------
const BYTES_LIMIT = 200 * 1024 * 1024; // 200 MB
const WINDOW_HOURS = 24;
const ROW_LIMIT = 100;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_TOKENS = 2000; // Increased for longer text

// ---------- BigQuery client ----------
function getBqClient() {
  const b64 = process.env.GCP_CREDENTIALS_B64;
  const projectId = process.env.GCP_PROJECT_ID;
  if (b64 && projectId) {
    const json = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    return new BigQuery({ projectId, credentials: json });
  }
  return new BigQuery({});
}
const bq = getBqClient();

// ---------- OpenAI client ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------- Helpers: indicators ----------
function cameoWeight(code: string | null): number {
  const c = Number(code || 0);
  if (c >= 190) return 3.0; // unconventional mass violence / assassination
  if (c >= 180) return 2.5; // use of force
  if (c >= 170) return 2.0; // threats/coercion
  if (c >= 140) return 1.5; // protests/denunciations
  return 1.0; // diplomacy/cooperation/etc
}

function tierFor(url: string): "A" | "B" | "C" | "U" {
  if (!url) return "U";
  const u = url.toLowerCase();
  const A = [
    "reuters.com",
    "apnews.com",
    "bbc.",
    "nytimes.com",
    "washingtonpost.com",
    "wsj.com",
    "ft.com",
    "bloomberg.com",
    "aljazeera.com",
    "theguardian.com",
    "afp.com"
  ];
  const C = ["press tv", "sana.sy", "tass.ru", "rt.com"];
  if (A.some((d) => u.includes(d))) return "A";
  if (C.some((d) => u.includes(d))) return "C";
  return "B";
}

function indicatorsFromEvents(events: any[]) {
  if (!events.length) {
    return {
      topActors: [] as { pair: string; count: number; severity: number }[],
      topLocations: [] as { name: string; severity: number }[],
      sourceMix: { A: 0, B: 0, C: 0, U: 1 },
      explain: { negContribution: 0, posOffset: 0 }
    };
  }

  // co-occurrence (actor pairs) and location intensity
  const actorMap = new Map<string, { count: number; severity: number }>();
  const locMap = new Map<string, number>();

  // source mix
  let a = 0,
    b = 0,
    c = 0,
    u = 0;

  for (const e of events) {
    const g = Number(e.GoldsteinScale ?? 0);
    const w = cameoWeight(e.EventCode || "");
    const tier = tierFor(e.SourceURL || "");
    if (tier === "A") a++;
    else if (tier === "B") b++;
    else if (tier === "C") c++;
    else u++;

    const a1 = (e.Actor1Name || "").trim() || "UNKNOWN";
    const a2 = (e.Actor2Name || "").trim() || "UNKNOWN";
    const pair = a2 === "UNKNOWN" ? `${a1}` : `${a1}–${a2}`;
    const prev = actorMap.get(pair) || { count: 0, severity: 0 };
    actorMap.set(pair, {
      count: prev.count + 1,
      severity: prev.severity + Math.abs(g) * w
    });

    const loc = (e.Location || "").trim();
    if (loc) locMap.set(loc, (locMap.get(loc) || 0) + Math.abs(g) * w);
  }

  const topActors = [...actorMap.entries()]
    .sort((a, b) => b[1].severity - a[1].severity)
    .slice(0, 5)
    .map(([pair, v]) => ({
      pair,
      count: v.count,
      severity: Number(v.severity.toFixed(1))
    }));

  const topLocations = [...locMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, sev]) => ({ name, severity: Number(sev.toFixed(1)) }));

  // source mix
  const sumMix = a + b + c + u || 1;
  const sourceMix = { A: a / sumMix, B: b / sumMix, C: c / sumMix, U: u / sumMix };

  return {
    topActors,
    topLocations,
    sourceMix,
    explain: { negContribution: 0, posOffset: 0 }
  };
}

// ---------- Diplomatic status from relations.json only ----------
function getDiplomaticStatus(countryName: string): "allied" | "friendly" | "neutral" | "hostile" | "adversarial" {
  return (baseRelations as any)[countryName] || (baseRelations as any)["default"] || "neutral";
}

// ---------- Country name -> FIPS + ISO3 ----------
function toFipsFromName(name: string): string | null {
  const rec = lookup.byCountry(name);
  if (rec?.fips) return rec.fips;
  const alias: Record<string, string> = {
    Czechia: "Czech Republic",
    "Côte d'Ivoire": "Ivory Coast",
    "Cote d'Ivoire": "Ivory Coast",
    "Democratic Republic of the Congo":
      "Congo, the Democratic Republic of the",
    "Republic of the Congo": "Congo",
    Palestine: "Palestinian Territory",
    Russia: "Russian Federation",
    Syria: "Syrian Arab Republic",
    Iran: "Iran, Islamic Republic of"
  };
  if (alias[name]) {
    const alt = lookup.byCountry(alias[name]);
    if (alt?.fips) return alt.fips;
  }
  return null;
}

function iso3FromName(name: string): string | null {
  const rec = lookup.byCountry(name);
  if (rec?.iso3) return rec.iso3;
  const alias: Record<string, string> = {
    Czechia: "Czech Republic",
    "Côte d'Ivoire": "Ivory Coast",
    "Cote d'Ivoire": "Ivory Coast",
    "Democratic Republic of the Congo":
      "Congo, the Democratic Republic of the",
    "Republic of the Congo": "Congo",
    Palestine: "Palestinian Territory",
    Russia: "Russian Federation",
    Syria: "Syrian Arab Republic",
    Iran: "Iran, Islamic Republic of"
  };
  if (alias[name]) {
    const alt = lookup.byCountry(alias[name]);
    if (alt?.iso3) return alt.iso3;
  }
  return null;
}

// ---------- Formatting helpers for profile ----------
function fmtUSD(n: number | null): string {
  if (n == null) return "N/A";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}
function fmtPct(n: number | null): string {
  return n == null ? "N/A" : `${n.toFixed(1)}%`;
}
function fmtInt(n: number | null): string {
  return n == null ? "N/A" : n.toLocaleString();
}

// ---------- WDI indicators we use ----------
const WDI_INDICATORS = [
  "SP.POP.TOTL", // population
  "AG.SRF.TOTL.K2", // surface area
  "NY.GDP.MKTP.CD", // GDP current US$
  "NY.GDP.PCAP.CD", // GDP per capita
  "FP.CPI.TOTL.ZG", // inflation CPI annual %
  "SL.UEM.TOTL.ZS", // unemployment %
  "MS.MIL.TOTL.P1", // armed forces personnel
  "MS.MIL.XPND.CD", // military expenditure US$
  "MS.MIL.XPND.GD.ZS", // military expenditure % GDP
  "SP.DYN.LE00.IN", // life expectancy
  "SE.ADT.LITR.ZS" // literacy rate
] as const;

// ---------- Handler ----------
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const countryName = (req.query.country as string) || "Iran";
    const fips = toFipsFromName(countryName);
    const iso3 = iso3FromName(countryName);
    if (!fips) return res.status(400).json({ error: `Unsupported country: ${countryName}` });
    if (!iso3) return res.status(400).json({ error: `Cannot resolve ISO3 for ${countryName}` });

    // Get diplomatic status from relations.json
    const diplomaticStatus = getDiplomaticStatus(countryName);

    // Fetch authoritative stats in parallel with GDELT
    const wdiPromise = wdiLatest(iso3, [...WDI_INDICATORS]);

    // --- 1) Query GDELT (24h, 100 rows, partition-pruned) ---
    const query = `
      SELECT
        SQLDATE,
        EventCode,
        GoldsteinScale,
        Actor1Name,
        Actor2Name,
        ActionGeo_FullName AS Location,
        SourceURL
      FROM \`gdelt-bq.gdeltv2.events_partitioned\`
      WHERE ActionGeo_CountryCode = @fips
        AND _PARTITIONTIME >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @hours HOUR)
        AND (Actor1Name IS NOT NULL OR Actor2Name IS NOT NULL)
      ORDER BY ABS(GoldsteinScale) DESC, SQLDATE DESC
      LIMIT @limit
    `;
    const params = { fips, hours: WINDOW_HOURS, limit: ROW_LIMIT };

    const [dry] = await bq.createQueryJob({
      query,
      params,
      dryRun: true,
      useQueryCache: true
    });
    const bytes = Number(dry.metadata.statistics?.totalBytesProcessed || 0);
    if (bytes > BYTES_LIMIT)
      return res
        .status(413)
        .json({ error: "Query too large for free tier. Narrow the window." });

    const [rows] = await bq.query({
      query,
      params,
      useQueryCache: true,
      maximumBytesBilled: BYTES_LIMIT.toString()
    });

    const events = rows as any[];

    // Build authoritative profile (WDI)
    const wdi = await wdiPromise;
    const profile = {
      snapshot: {
        population: {
          value: fmtInt(wdi["SP.POP.TOTL"].value),
          year: wdi["SP.POP.TOTL"].year
        },
        surface_km2: {
          value: fmtInt(wdi["AG.SRF.TOTL.K2"].value),
          year: wdi["AG.SRF.TOTL.K2"].year
        },
        life_expectancy: {
          value: wdi["SP.DYN.LE00.IN"].value ? `${wdi["SP.DYN.LE00.IN"].value.toFixed(1)} years` : "N/A",
          year: wdi["SP.DYN.LE00.IN"].year
        },
        literacy_rate: {
          value: wdi["SE.ADT.LITR.ZS"].value ? `${wdi["SE.ADT.LITR.ZS"].value.toFixed(1)}%` : "N/A",
          year: wdi["SE.ADT.LITR.ZS"].year
        }
      },
      economy: {
        gdp: {
          value: fmtUSD(wdi["NY.GDP.MKTP.CD"].value),
          year: wdi["NY.GDP.MKTP.CD"].year
        },
        gdp_per_capita: {
          value: fmtUSD(wdi["NY.GDP.PCAP.CD"].value),
          year: wdi["NY.GDP.PCAP.CD"].year
        },
        inflation_cpi_annual: {
          value: fmtPct(wdi["FP.CPI.TOTL.ZG"].value),
          year: wdi["FP.CPI.TOTL.ZG"].year
        },
        unemployment_rate: {
          value: fmtPct(wdi["SL.UEM.TOTL.ZS"].value),
          year: wdi["SL.UEM.TOTL.ZS"].year
        }
      },
      military: {
        expenditure_usd: {
          value: fmtUSD(wdi["MS.MIL.XPND.CD"].value),
          year: wdi["MS.MIL.XPND.CD"].year
        },
        expenditure_pct_gdp: {
          value: fmtPct(wdi["MS.MIL.XPND.GD.ZS"].value),
          year: wdi["MS.MIL.XPND.GD.ZS"].year
        },
        armed_forces_personnel: {
          value: fmtInt(wdi["MS.MIL.TOTL.P1"].value),
          year: wdi["MS.MIL.TOTL.P1"].year
        }
      }
    };

    // Prepare sources and event lines for LLM
    const uniqueSources: string[] = [];
    const sourceIndex = new Map<string, number>();
    for (const r of events) {
      const url = (r.SourceURL || "").trim();
      if (!url) continue;
      if (!sourceIndex.has(url)) {
        sourceIndex.set(url, uniqueSources.length + 1);
        uniqueSources.push(url);
        if (uniqueSources.length >= 20) break; // cap
      }
    }
    const lines: string[] = events.slice(0, 120).map((e) => {
      const sid =
        e.SourceURL && sourceIndex.get(e.SourceURL)
          ? `[${sourceIndex.get(e.SourceURL)}]`
          : "";
      const date = e.SQLDATE || "";
      const code = e.EventCode || "";
      const gold = (e.GoldsteinScale ?? "").toString();
      const a1 = (e.Actor1Name || "").replace(/\s+/g, " ").trim();
      const a2 = (e.Actor2Name || "").replace(/\s+/g, " ").trim();
      const loc = (e.Location || "").replace(/\s+/g, " ").trim();
      return `${date}|${code}|${gold}|${a1}|${a2}|${loc}|${sid}`;
    });
    const sourcesBlock = uniqueSources.map((u, i) => `[${i + 1}] ${u}`).join("\n");

    // If nothing, short-circuit but still return authoritative profile
    if (!events.length) {
      return res.status(200).json({
        meta: { bytesEstimated: String(bytes), rows: 0 },
        data: [],
        indicators: indicatorsFromEvents([]),
        analysis: {
          relationship_overview:
            "No recent events to analyze relationship status. The relationship between Israel and this country is based on historical diplomatic ties and current geopolitical alignments.",
          diplomatic_status: diplomaticStatus,
          diplomatic_trend: "stable",
          key_events: [],
          geostrategic_impact: "Insufficient recent event data for impact assessment. The strategic relationship remains at its baseline level based on established diplomatic status.",
          country_profile: {
            economic_strength: {
              gdp: profile.economy.gdp.value,
              gdp_per_capita: profile.economy.gdp_per_capita.value,
              score: 0,
              description: "Insufficient data for comprehensive economic assessment"
            },
            military_strength: { score: 0, description: "Insufficient data for comprehensive military assessment" },
            diplomatic_relationships: { description: "Insufficient data for comprehensive diplomatic assessment" },
            regional_influence: { description: "Insufficient data for comprehensive regional influence assessment" }
          }
        },
        profile,
        sources: []
      });
    }

    // ----- LLM prompt (extended for longer text) -----
    if (!process.env.OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY not set on server." });
    }

    const system = [
      "You are a senior geopolitical intelligence analyst for Israeli security decision-makers.",
      "Use ONLY the provided event lines for 24h events.",
      "Do NOT invent statistics; numeric facts are provided in FACTS and must not be altered.",
      "Diplomatic status is determined externally; do not change it.",
      "Provide comprehensive country profile with economic/military scores (1-10) and detailed descriptions.",
      "Return STRICT JSON matching the schema below. No extra text."
    ].join("\n");

    const schema = {
      relationship_overview: "string", // 8-10 sentences on long-term Israel relationship
      diplomatic_status:
        "allied|friendly|neutral|hostile|adversarial", // (will be overwritten by system)
      diplomatic_trend: "improving|deteriorating|stable", // (will be overwritten by system)
      key_events: ["string"], // 3-5 most important events from last 24h with dates and [#] citations
      geostrategic_impact: "string", // 3-4 sentences on impact to Israel's strategic position
      country_profile: {
        economic_strength: {
          gdp: "string",
          gdp_per_capita: "string",
          score: "number",
          description: "string"
        },
        military_strength: { score: "number", description: "string" },
        diplomatic_relationships: { description: "string" },
        regional_influence: { description: "string" }
      }
    };

    const user = [
      `COUNTRY: ${countryName}`,
      `DIPLOMATIC STATUS: ${diplomaticStatus}`,
      `WINDOW: Last ${WINDOW_HOURS} hours`,
      ``,
      `FACTS (authoritative profile; do not change numbers):`,
      JSON.stringify(profile),
      ``,
      `EVENT LINES (date|eventCode|goldstein|actor1|actor2|location|[sourceId?]):`,
      lines.join("\n"),
      ``,
      `SOURCES (map numeric ids to URLs):`,
      sourcesBlock || "(none)",
      ``,
      `SCHEMA (return exactly this shape):`,
      JSON.stringify(schema),
      ``,
      `TASK: Analyze the relationship and events. Make relationship overview 8-10 sentences, key events 3-5 items, and geostrategic impact 3-4 sentences. Provide comprehensive country profile with economic/military scores (1-10) and detailed descriptions for diplomatic relationships and regional influence. Use the provided GDP data to inform economic scoring.`
    ].join("\n");

    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    });

    let analysis: any;
    const text = completion.choices?.[0]?.message?.content?.trim() || "";
    try {
      analysis = JSON.parse(text);
    } catch {
      // fallback: provide better default data
      const gdpValue = profile.economy.gdp.value;
      const gdpPerCapita = profile.economy.gdp_per_capita.value;
      
      // Estimate economic score based on GDP data
      let economicScore = 5; // default neutral score
      if (gdpValue !== "N/A" && gdpPerCapita !== "N/A") {
        const gdpNum = parseFloat(gdpValue.replace(/[^0-9.]/g, ""));
        const gdpPerCapitaNum = parseFloat(gdpPerCapita.replace(/[^0-9.]/g, ""));
        if (gdpNum > 1e12) economicScore = 8; // trillion+ GDP
        else if (gdpNum > 1e11) economicScore = 7; // 100B+ GDP
        else if (gdpNum > 1e10) economicScore = 6; // 10B+ GDP
        else if (gdpNum > 1e9) economicScore = 5; // 1B+ GDP
        else economicScore = 3; // smaller economies
      }

      // Estimate military score based on military data
      let militaryScore = 5; // default neutral score
      const militarySpend = profile.military.expenditure_usd.value;
      const personnel = profile.military.armed_forces_personnel.value;
      if (militarySpend !== "N/A" || personnel !== "N/A") {
        if (militarySpend !== "N/A") {
          const spendNum = parseFloat(militarySpend.replace(/[^0-9.]/g, ""));
          if (spendNum > 1e10) militaryScore = 9; // 10B+ military spend
          else if (spendNum > 1e9) militaryScore = 7; // 1B+ military spend
          else if (spendNum > 1e8) militaryScore = 6; // 100M+ military spend
          else militaryScore = 4; // smaller military
        }
      }

      analysis = {
        relationship_overview: `The relationship between Israel and ${countryName} is characterized by ${diplomaticStatus} diplomatic ties. Historical interactions and current geopolitical alignments shape this bilateral relationship. Economic cooperation and regional security considerations play significant roles in determining the nature of this partnership.`,
        diplomatic_status: diplomaticStatus,
        diplomatic_trend: "stable",
        key_events: [],
        geostrategic_impact: `The current relationship with ${countryName} has moderate implications for Israel's strategic position in the region.`,
        country_profile: {
          economic_strength: {
            gdp: profile.economy.gdp.value,
            gdp_per_capita: profile.economy.gdp_per_capita.value,
            score: economicScore,
            description: `${countryName} has a ${economicScore >= 7 ? 'strong' : economicScore >= 5 ? 'moderate' : 'developing'} economy with significant economic potential and regional trade relationships.`
          },
          military_strength: { 
            score: militaryScore, 
            description: `${countryName} maintains a ${militaryScore >= 7 ? 'substantial' : militaryScore >= 5 ? 'moderate' : 'limited'} military capability with regional security considerations.`
          },
          diplomatic_relationships: { 
            description: `${countryName} maintains diplomatic relations with key regional and international partners, balancing various strategic interests and alliances.`
          },
          regional_influence: { 
            description: `${countryName} plays a ${diplomaticStatus === 'allied' || diplomaticStatus === 'friendly' ? 'constructive' : diplomaticStatus === 'hostile' || diplomaticStatus === 'adversarial' ? 'challenging' : 'neutral'} role in regional dynamics affecting Israel's strategic environment.`
          }
        }
      };
    }

    // Overwrite with authoritative status and numbers
    if (!analysis.country_profile) analysis.country_profile = {};
    if (!analysis.country_profile.economic_strength)
      analysis.country_profile.economic_strength = {
        score: 0,
        description: ""
      };
    if (!analysis.country_profile.military_strength)
      analysis.country_profile.military_strength = { score: 0, description: "" };
    if (!analysis.country_profile.diplomatic_relationships)
      analysis.country_profile.diplomatic_relationships = { description: "" };
    if (!analysis.country_profile.regional_influence)
      analysis.country_profile.regional_influence = { description: "" };

    analysis.diplomatic_status = diplomaticStatus;
    analysis.diplomatic_trend = "stable"; // Always stable since we're not calculating trends
    analysis.country_profile.economic_strength.gdp = profile.economy.gdp.value;
    analysis.country_profile.economic_strength.gdp_per_capita =
      profile.economy.gdp_per_capita.value;

    return res.status(200).json({
      meta: { bytesEstimated: String(bytes), rows: events.length },
      data: events,
      indicators: indicatorsFromEvents(events),
      analysis,
      profile, // authoritative numbers for UI
      sources: uniqueSources.map((url, i) => ({ id: i + 1, url }))
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message || "Internal error" });
  }
}
