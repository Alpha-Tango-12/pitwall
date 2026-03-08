import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const STRATEGY_SCHEMA = {
  type: "object",
  properties: {
    strategies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          constructorId: { type: "string" },
          teamName: { type: "string" },
          stops: { type: "integer" },
          compounds: { type: "array", items: { type: "string" } },
          pitWindows: { type: "array", items: { type: "string" } },
          prediction: { type: "string" },
        },
        required: ["constructorId", "teamName", "stops", "compounds", "pitWindows", "prediction"],
        additionalProperties: false,
      },
    },
  },
  required: ["strategies"],
  additionalProperties: false,
} as const;

const TEAMS = [
  { constructorId: "red_bull", name: "Red Bull Racing", drivers: "Max Verstappen & Isack Hadjar" },
  { constructorId: "ferrari", name: "Ferrari", drivers: "Charles Leclerc & Lewis Hamilton" },
  { constructorId: "mclaren", name: "McLaren", drivers: "Lando Norris & Oscar Piastri" },
  { constructorId: "mercedes", name: "Mercedes", drivers: "George Russell & Kimi Antonelli" },
  { constructorId: "aston_martin", name: "Aston Martin", drivers: "Fernando Alonso & Lance Stroll" },
  { constructorId: "alpine", name: "Alpine", drivers: "Pierre Gasly & Franco Colapinto" },
  { constructorId: "williams", name: "Williams", drivers: "Alex Albon & Carlos Sainz" },
  { constructorId: "rb", name: "Racing Bulls", drivers: "Liam Lawson & Arvid Lindblad" },
  { constructorId: "haas", name: "Haas", drivers: "Esteban Ocon & Oliver Bearman" },
  { constructorId: "sauber", name: "Audi", drivers: "Nico Hülkenberg & Gabriel Bortoleto" },
  { constructorId: "cadillac", name: "Cadillac", drivers: "Valtteri Bottas & Sergio Pérez" },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { raceName, circuitName } = req.body as { raceName?: string; circuitName?: string };

  if (!raceName || !circuitName) {
    return res.status(400).json({ error: "raceName and circuitName are required" });
  }

  const teamList = TEAMS.map((t) => `- ${t.name} (${t.constructorId}): ${t.drivers}`).join("\n");

  const prompt = `You are an expert F1 strategy analyst. Predict the most likely race strategy for each team at the ${raceName} (${circuitName}) in the 2026 Formula 1 season.

Teams and drivers:
${teamList}

For each team, provide:
- constructorId: the exact ID from the list above (e.g. "red_bull", "ferrari")
- teamName: team display name
- stops: number of pit stops (1 or 2, occasionally 3 for struggling teams)
- compounds: ordered array of tire compounds used (e.g. ["SOFT", "MEDIUM", "HARD"]). Valid values: SOFT, MEDIUM, HARD, INTERMEDIATE, WET
- pitWindows: predicted pit stop laps (e.g. ["Lap 18-22", "Lap 40-45"])
- prediction: 2-3 sentence plain-language explanation of the strategy, written for a casual fan. Mention why the team chose this approach, any undercut/overcut opportunities, and what to watch for.

Base your predictions on:
- The circuit characteristics of ${circuitName} (tire deg, overtaking difficulty, pit lane delta)
- Each team's typical strategic approach in 2026
- The starting grid positions (front runners have more strategic flexibility)
- General 2026 Pirelli compound behavior

Return strategies for all 11 teams.`;

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: prompt }],
      output_config: {
        format: {
          type: "json_schema",
          name: "race_strategies",
          schema: STRATEGY_SCHEMA,
        },
      },
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return res.status(500).json({ error: "No text response from Claude" });
    }

    const data = JSON.parse(textBlock.text) as { strategies: unknown[] };
    return res.status(200).json(data);
  } catch (err) {
    console.error("Claude API error:", err);
    return res.status(500).json({ error: "Failed to generate strategies" });
  }
}
