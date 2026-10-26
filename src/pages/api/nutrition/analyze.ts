import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: {
    bodyParser: { sizeLimit: "8mb" },
  },
};

const MEDIA_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
type MediaType = (typeof MEDIA_TYPES)[number];

const FOOD_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          calories: { type: "integer" },
          protein: { type: "integer" },
          carbs: { type: "integer" },
          fat: { type: "integer" },
        },
        required: ["name", "calories", "protein", "carbs", "fat"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

const SYSTEM_PROMPT =
  "You estimate nutrition from photos of food for a personal calorie log. " +
  "List each distinct food or drink you can see as its own item, with a short name that includes the estimated portion " +
  '(e.g. "Grilled chicken breast, ~6 oz"). Estimate calories and grams of protein, carbs and fat for the portion shown, ' +
  "using visual cues like plate size to judge quantity. If the user adds a note, use it to refine your estimates. " +
  "If the image contains no food, return an empty items list.";

const client = new Anthropic();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const passcode = process.env.NUTRITION_PASSCODE;
  if (!passcode || req.headers["x-nutrition-passcode"] !== passcode) {
    return res.status(401).json({ error: "Invalid passcode" });
  }

  const { image, mediaType, note } = req.body ?? {};
  if (typeof image !== "string" || !MEDIA_TYPES.includes(mediaType)) {
    return res.status(400).json({ error: "Expected a base64 image and a supported media type" });
  }

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: FOOD_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType as MediaType, data: image } },
            {
              type: "text",
              text: typeof note === "string" && note.trim() ? `Note: ${note.trim()}` : "What did I eat?",
            },
          ],
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return res.status(422).json({ error: "The image couldn't be analyzed" });
    }

    const text = response.content.find((block) => block.type === "text");
    if (!text || text.type !== "text") {
      return res.status(502).json({ error: "No result returned" });
    }
    return res.status(200).json(JSON.parse(text.text));
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: "Rate limited, try again in a moment" });
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error", error.status, error.message);
      return res.status(502).json({ error: `Analysis failed (${error.status})` });
    }
    console.error(error);
    return res.status(500).json({ error: "Analysis failed" });
  }
}
