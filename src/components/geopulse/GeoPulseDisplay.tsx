// pages/geopulse.tsx
import React, { useState } from "react";
import WorldPicker from "./WorldPicker";

type ApiRow = {
  SQLDATE: string;
  EventCode: string | null;
  GoldsteinScale: number | null;
  Actor1Name: string | null;
  Actor2Name: string | null;
  Location?: string | null;
  SourceURL?: string | null;
};

type Indicators = {
  topActors: { pair: string; count: number; severity: number }[];
  topLocations: { name: string; severity: number }[];
  sourceMix: { A: number; B: number; C: number; U: number };
  explain: { negContribution: number; posOffset: number };
};

type CountryProfile = {
  economic_strength: {
    gdp: string;
    gdp_per_capita: string;
    score: number;
    description: string;
  };
  military_strength: {
    score: number;
    description: string;
  };
  diplomatic_relationships: {
    description: string;
  };
  regional_influence: {
    description: string;
  };
};

type Analysis = {
  relationship_overview: string;
  diplomatic_status: "allied" | "friendly" | "neutral" | "hostile" | "adversarial";
  diplomatic_trend: "improving" | "deteriorating" | "stable";
  key_events: string[];
  geostrategic_impact: string;
  country_profile: CountryProfile;
};

type ProfileBundle = {
  snapshot: {
    population: { value: string; year: string | null };
    surface_km2: { value: string; year: string | null };
    life_expectancy: { value: string; year: string | null };
    literacy_rate: { value: string; year: string | null };
  };
  economy: {
    gdp: { value: string; year: string | null };
    gdp_per_capita: { value: string; year: string | null };
    inflation_cpi_annual: { value: string; year: string | null };
    unemployment_rate: { value: string; year: string | null };
  };
  military: {
    expenditure_usd: { value: string; year: string | null };
    expenditure_pct_gdp: { value: string; year: string | null };
    armed_forces_personnel: { value: string; year: string | null };
  };
};

type ApiResult = {
  meta: { rows: number; bytesEstimated: string };
  data: ApiRow[];
  indicators: Indicators;
  analysis: Analysis;
  profile?: ProfileBundle;
  sources: Array<{ id: number; url: string }>;
  error?: string;
};

export default function GeoPulsePage() {
  const [selected, setSelected] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const handleSelect = async (c: { name: string }) => {
    setSelected(c);
    setLoading(true);
    setErr(null);
    setResult(null);
    try {
      const resp = await fetch(`/api/geopulse/country?country=${encodeURIComponent(c.name)}`);
      const json: ApiResult = await resp.json();
      if (!resp.ok) throw new Error(json.error || `HTTP ${resp.status}`);
      setResult(json);
    } catch (e: any) {
      setErr(e.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  const getDiplomaticColor = (status: string) => {
    switch (status) {
      case "allied": return "#00ff00";
      case "friendly": return "#90EE90";
      case "neutral": return "#FFD700";
      case "hostile": return "#FF6B6B";
      case "adversarial": return "#FF0000";
      default: return "#FFD700";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "#90EE90";
      case "deteriorating": return "#FF6B6B";
      case "stable": return "#FFD700";
      default: return "#FFD700";
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateRows: "60vh auto", minHeight: "100vh", background: "#0b0f19", color: "#e6e9ef" }}>
      {/* Map */}
      <div style={{ position: "relative" }}>
        <WorldPicker onSelect={handleSelect} />
        <div style={{ position:"absolute", top:16, left:16, background:"#121826", padding:"8px 12px", borderRadius:8, opacity:0.9 }}>
          {selected ? `Selected: ${selected.name}` : "Click a country"}
        </div>
      </div>

      {/* Analysis */}
      <div style={{ padding: "32px 48px", borderTop:"1px solid #1c2233" }}>
        <h2 style={{ marginTop: 0 }}>{selected ? `${selected.name} — Geopolitical Intelligence Analysis` : "Select a country to begin analysis"}</h2>

        {loading && <div style={{ padding: 40, opacity: 0.8 }}>Loading analysis…</div>}
        {err && <div style={{ color: "#ff7a7a", padding: 16, background: "rgba(255,0,0,0.08)", borderRadius: 8 }}>Error: {err}</div>}

        {result && (
          <>
            {/* Key Indicators */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom: 24 }}>
              <Badge 
                label="Diplomatic Status" 
                value={result.analysis.diplomatic_status.toUpperCase()} 
                color={getDiplomaticColor(result.analysis.diplomatic_status)}
                big
              />
              <Badge 
                label="Diplomatic Trend" 
                value={result.analysis.diplomatic_trend.toUpperCase()}
                color={getTrendColor(result.analysis.diplomatic_trend)}
              />
            </div>

            {/* Relationship Overview */}
            <section style={cardStyle}>
              <h3 style={h3}>Israel-{selected?.name} Relationship Overview</h3>
              <p style={{ lineHeight: 1.6, margin: 0 }}>{result.analysis.relationship_overview}</p>
            </section>

            {/* Factual Profile Cards (authoritative numbers) */}
            {result.profile && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24, marginTop:24 }}>
                <section style={cardStyle}>
                  <h3 style={h3}>Country Snapshot</h3>
                  <MetricRow label="Population" value={`${result.profile.snapshot.population.value}${yearTag(result.profile.snapshot.population.year)}`} />
                  <MetricRow label="Surface Area" value={`${result.profile.snapshot.surface_km2.value} km²${yearTag(result.profile.snapshot.surface_km2.year)}`} />
                  <MetricRow label="Life Expectancy" value={`${result.profile.snapshot.life_expectancy.value}${yearTag(result.profile.snapshot.life_expectancy.year)}`} />
                  <MetricRow label="Literacy Rate" value={`${result.profile.snapshot.literacy_rate.value}${yearTag(result.profile.snapshot.literacy_rate.year)}`} />
                </section>

                <section style={cardStyle}>
                  <h3 style={h3}>Economy</h3>
                  <MetricRow label="GDP" value={`${result.profile.economy.gdp.value}${yearTag(result.profile.economy.gdp.year)}`} />
                  <MetricRow label="GDP per capita" value={`${result.profile.economy.gdp_per_capita.value}${yearTag(result.profile.economy.gdp_per_capita.year)}`} />
                  <MetricRow label="Inflation (CPI)" value={`${result.profile.economy.inflation_cpi_annual.value}${yearTag(result.profile.economy.inflation_cpi_annual.year)}`} />
                  <MetricRow label="Unemployment" value={`${result.profile.economy.unemployment_rate.value}${yearTag(result.profile.economy.unemployment_rate.year)}`} />
                </section>

                <section style={cardStyle}>
                  <h3 style={h3}>Military</h3>
                  <MetricRow label="Military Spend" value={`${result.profile.military.expenditure_usd.value}${yearTag(result.profile.military.expenditure_usd.year)}`} />
                  <MetricRow label="Military (% GDP)" value={`${result.profile.military.expenditure_pct_gdp.value}${yearTag(result.profile.military.expenditure_pct_gdp.year)}`} />
                  <MetricRow label="Active Personnel" value={`${result.profile.military.armed_forces_personnel.value}${yearTag(result.profile.military.armed_forces_personnel.year)}`} />
                </section>
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginTop: 24 }}>
              {/* Key Events */}
              <section style={cardStyle}>
                <h3 style={h3}>Key Events (Last 24h)</h3>
                {result.analysis.key_events?.length ? (
                  <ul style={ul}>
                    {result.analysis.key_events.map((line, idx)=> <li key={idx}>{line}</li>)}
                  </ul>
                ) : <Empty>No significant events in last 24 hours.</Empty>}
              </section>

              {/* Geostrategic Impact */}
              <section style={cardStyle}>
                <h3 style={h3}>Impact on Israel's Strategic Position</h3>
                <p style={{ lineHeight: 1.6, margin: 0 }}>{result.analysis.geostrategic_impact}</p>
              </section>
            </div>

            {/* Descriptive Country Profile (narrative + scores from LLM, numbers already enforced) */}
            <section style={{ ...cardStyle, marginTop: 24 }}>
              <h3 style={h3}>{selected?.name} Country Profile (Narrative)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Economic & Military Strength */}
                <div style={profileSectionStyle}>
                  <h4 style={h4}>Economic & Military Strength</h4>
                  <div style={metricStyle}>
                    <span style={labelStyle}>Economic Score:</span>
                    <span style={valueStyle}>{result.analysis.country_profile.economic_strength.score}/10</span>
                  </div>
                  <div style={metricStyle}>
                    <span style={labelStyle}>Military Score:</span>
                    <span style={valueStyle}>{result.analysis.country_profile.military_strength.score}/10</span>
                  </div>
                  <p style={descriptionStyle}>{result.analysis.country_profile.economic_strength.description}</p>
                  <p style={descriptionStyle}>{result.analysis.country_profile.military_strength.description}</p>
                </div>

                {/* Diplomatic Relationships & Regional Influence */}
                <div style={profileSectionStyle}>
                  <h4 style={h4}>Diplomatic Relationships & Regional Influence</h4>
                  <p style={descriptionStyle}>{result.analysis.country_profile.diplomatic_relationships.description}</p>
                  <p style={descriptionStyle}>{result.analysis.country_profile.regional_influence.description}</p>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 24, padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 6 }}>
              Records: {result.meta.rows} · Bytes: {result.meta.bytesEstimated}
            </div>

            {/* Sources */}
            <section style={{ ...cardStyle, marginTop: 24 }}>
              <h3 style={h3}>Sources</h3>
              <div style={{ fontSize: 14 }}>
                {result.sources.length ? (
                  <ol>
                    {result.sources.map(s => (
                      <li key={s.id}>
                        <a href={s.url} target="_blank" rel="noreferrer" style={{ color:"#9ecbff" }}>{s.url}</a>
                      </li>
                    ))}
                  </ol>
                ) : <Empty>None listed.</Empty>}
                <div style={{ opacity: 0.7, marginTop: 8 }}>
                  Stats source: World Bank WDI (population, GDP, inflation, unemployment, surface area, life expectancy, literacy rate) and SIPRI-sourced WDI indicators (military expenditure, personnel).
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Badge({ label, value, big=false, color="#9ecbff" }: { label: string; value: string|number; big?: boolean; color?: string }) {
  return (
    <div style={{ background: "#121826", padding: big? "10px 14px" : "8px 10px", borderRadius: 10, minWidth: big ? 130 : 0 }}>
      <div style={{ fontSize: 11, opacity: 0.75 }}>{label}</div>
      <div style={{ fontSize: big? 22 : 16, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
}

function yearTag(year: string | null) {
  return year ? ` (${year})` : "";
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: 16
};

const profileSectionStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 8,
  padding: 12
};

const h3: React.CSSProperties = { marginTop: 0, color: "#9ecbff" };
const h4: React.CSSProperties = { marginTop: 0, marginBottom: 12, color: "#9ecbff", fontSize: "1rem" };
const ul: React.CSSProperties = { margin: 0, paddingLeft: "1.1rem", lineHeight: 1.6 };
const metricStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", marginBottom: 4 };
const labelStyle: React.CSSProperties = { opacity: 0.8, fontSize: "0.9rem" };
const valueStyle: React.CSSProperties = { fontWeight: 600, color: "#9ecbff" };
const descriptionStyle: React.CSSProperties = { margin: "8px 0 0 0", fontSize: "0.9rem", lineHeight: 1.5, opacity: 0.9 };

function Empty({children}:{children:React.ReactNode}) {
  return <div style={{ opacity: 0.7, fontStyle: "italic" }}>{children}</div>;
}
