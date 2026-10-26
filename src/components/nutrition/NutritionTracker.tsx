import React, { useEffect, useRef, useState } from "react";

const MEALS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snack", label: "Afternoon Snack" },
  { key: "dinner", label: "Dinner" },
  { key: "dessert", label: "Dessert" },
] as const;

type MealKey = (typeof MEALS)[number]["key"];

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

type DayLog = Partial<Record<MealKey, FoodEntry[]>>;
type NutritionLog = Record<string, DayLog>;

const LOG_KEY = "nutrition-log";
const PASSCODE_KEY = "nutrition-passcode";
const MAX_IMAGE_EDGE = 1568;

const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const shiftDate = (dateKey: string, days: number) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  return toDateKey(new Date(y, m - 1, d + days));
};

const formatDate = (dateKey: string) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sum = (entries: FoodEntry[], field: "calories" | "protein" | "carbs" | "fat") =>
  entries.reduce((total, entry) => total + (entry[field] ?? 0), 0);

// Downscale and re-encode as JPEG so phone photos stay small enough to upload
const resizeImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85).split(",")[1]);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't read that image"));
    };
    img.src = url;
  });

const inputClass =
  "w-full bg-transparent border border-transparent hover:border-gray-600 focus:border-secondary rounded px-2 py-1 outline-none";
const numberClass = `${inputClass} text-right`;

const NutritionTracker: React.FC = () => {
  const [log, setLog] = useState<NutritionLog>({});
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState(() => toDateKey(new Date()));
  const [drafts, setDrafts] = useState<Partial<Record<MealKey, { name: string; calories: string }>>>({});
  const [analyzing, setAnalyzing] = useState<MealKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const photoMeal = useRef<MealKey | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOG_KEY);
      if (saved) setLog(JSON.parse(saved));
    } catch {
      // Start with an empty log if storage is unavailable or corrupt
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
    } catch {
      setError("Couldn't save to this browser's storage");
    }
  }, [log, loaded]);

  const day = log[date] ?? {};
  const allEntries = MEALS.flatMap(({ key }) => day[key] ?? []);

  const updateMeal = (meal: MealKey, update: (entries: FoodEntry[]) => FoodEntry[]) => {
    setLog((prev) => ({
      ...prev,
      [date]: { ...prev[date], [meal]: update(prev[date]?.[meal] ?? []) },
    }));
  };

  const updateEntry = (meal: MealKey, id: string, changes: Partial<FoodEntry>) =>
    updateMeal(meal, (entries) => entries.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry)));

  const removeEntry = (meal: MealKey, id: string) =>
    updateMeal(meal, (entries) => entries.filter((entry) => entry.id !== id));

  const addDraft = (meal: MealKey) => {
    const draft = drafts[meal];
    if (!draft?.name.trim()) return;
    updateMeal(meal, (entries) => [
      ...entries,
      { id: newId(), name: draft.name.trim(), calories: Number(draft.calories) || 0 },
    ]);
    setDrafts((prev) => ({ ...prev, [meal]: { name: "", calories: "" } }));
  };

  const openPhotoPicker = (meal: MealKey) => {
    photoMeal.current = meal;
    fileInput.current?.click();
  };

  const handlePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const meal = photoMeal.current;
    event.target.value = "";
    if (!file || !meal) return;

    let passcode = localStorage.getItem(PASSCODE_KEY);
    if (!passcode) {
      passcode = window.prompt("Passcode for photo analysis");
      if (!passcode) return;
    }

    const targetDate = date;
    setAnalyzing(meal);
    setError(null);
    try {
      const image = await resizeImage(file);
      const note = drafts[meal]?.name.trim();
      const response = await fetch("/api/nutrition/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-nutrition-passcode": passcode },
        body: JSON.stringify({ image, mediaType: "image/jpeg", note }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem(PASSCODE_KEY);
        throw new Error("Wrong passcode");
      }
      if (!response.ok) throw new Error(data.error || `Server error: ${response.status}`);

      localStorage.setItem(PASSCODE_KEY, passcode);
      const items: Omit<FoodEntry, "id">[] = data.items ?? [];
      if (items.length === 0) throw new Error("No food found in that photo");

      setLog((prev) => ({
        ...prev,
        [targetDate]: {
          ...prev[targetDate],
          [meal]: [...(prev[targetDate]?.[meal] ?? []), ...items.map((item) => ({ ...item, id: newId() }))],
        },
      }));
      if (note) setDrafts((prev) => ({ ...prev, [meal]: { name: "", calories: "" } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo analysis failed");
    } finally {
      setAnalyzing(null);
    }
  };

  const optionalNumber = (value: string) => (value === "" ? undefined : Number(value));

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 lg:w-3/4 font-montserrat text-gray-100 relative z-10">
      <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDate(shiftDate(date, -1))}
            className="px-3 py-1 rounded border border-gray-600 hover:border-secondary"
            aria-label="Previous day"
          >
            ←
          </button>
          <input
            type="date"
            value={date}
            onChange={(e) => e.target.value && setDate(e.target.value)}
            className="bg-gray-900 border border-gray-600 rounded px-2 py-1 [color-scheme:dark]"
          />
          <button
            onClick={() => setDate(shiftDate(date, 1))}
            className="px-3 py-1 rounded border border-gray-600 hover:border-secondary"
            aria-label="Next day"
          >
            →
          </button>
          {date !== toDateKey(new Date()) && (
            <button onClick={() => setDate(toDateKey(new Date()))} className="ml-2 text-secondary hover:underline">
              Today
            </button>
          )}
        </div>
        <div className="text-right">
          <div className="text-primary text-sm">{formatDate(date)}</div>
          <div className="text-3xl font-semibold">{sum(allEntries, "calories").toLocaleString()} cal</div>
          <div className="text-sm text-gray-400">
            P {sum(allEntries, "protein")}g · C {sum(allEntries, "carbs")}g · F {sum(allEntries, "fat")}g
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-500 bg-red-950/60 px-4 py-2 text-red-200 flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-950/80">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="px-3 py-2 font-medium">Food</th>
              <th className="px-3 py-2 font-medium text-right w-24">Calories</th>
              <th className="px-3 py-2 font-medium text-right w-20">Protein</th>
              <th className="px-3 py-2 font-medium text-right w-20">Carbs</th>
              <th className="px-3 py-2 font-medium text-right w-20">Fat</th>
              <th className="w-10" />
            </tr>
          </thead>
          {MEALS.map(({ key, label }) => {
            const entries = day[key] ?? [];
            const draft = drafts[key] ?? { name: "", calories: "" };
            return (
              <tbody key={key} className="border-b border-gray-700 last:border-b-0">
                <tr className="bg-gray-900/80">
                  <td className="px-3 py-2 font-semibold text-primary">{label}</td>
                  <td className="px-3 py-2 text-right font-semibold">{sum(entries, "calories")}</td>
                  <td colSpan={4} />
                </tr>
                {entries.map((entry) => (
                  <tr key={entry.id} className="group">
                    <td className="px-1 py-1">
                      <input
                        className={inputClass}
                        value={entry.name}
                        onChange={(e) => updateEntry(key, entry.id, { name: e.target.value })}
                      />
                    </td>
                    <td className="px-1 py-1">
                      <input
                        type="number"
                        min={0}
                        className={numberClass}
                        value={entry.calories}
                        onChange={(e) => updateEntry(key, entry.id, { calories: Number(e.target.value) || 0 })}
                      />
                    </td>
                    {(["protein", "carbs", "fat"] as const).map((field) => (
                      <td key={field} className="px-1 py-1">
                        <input
                          type="number"
                          min={0}
                          className={numberClass}
                          value={entry[field] ?? ""}
                          placeholder="–"
                          onChange={(e) => updateEntry(key, entry.id, { [field]: optionalNumber(e.target.value) })}
                        />
                      </td>
                    ))}
                    <td className="px-1 py-1 text-center">
                      <button
                        onClick={() => removeEntry(key, entry.id)}
                        className="text-gray-500 hover:text-red-400 md:opacity-0 group-hover:opacity-100"
                        aria-label={`Remove ${entry.name}`}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-1 py-1">
                    <input
                      className={`${inputClass} border-gray-700`}
                      placeholder="Add food (or a note for the photo)…"
                      value={draft.name}
                      onChange={(e) => setDrafts((prev) => ({ ...prev, [key]: { ...draft, name: e.target.value } }))}
                      onKeyDown={(e) => e.key === "Enter" && addDraft(key)}
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      min={0}
                      className={`${numberClass} border-gray-700`}
                      placeholder="cal"
                      value={draft.calories}
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [key]: { ...draft, calories: e.target.value } }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && addDraft(key)}
                    />
                  </td>
                  <td colSpan={4} className="px-1 py-1">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => addDraft(key)}
                        className="px-3 py-1 rounded bg-secondary hover:bg-blue-500 text-white"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => openPhotoPicker(key)}
                        disabled={analyzing !== null}
                        className="px-3 py-1 rounded border border-secondary text-secondary hover:bg-secondary hover:text-white disabled:opacity-50"
                      >
                        {analyzing === key ? "Analyzing…" : "Photo"}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default NutritionTracker;
