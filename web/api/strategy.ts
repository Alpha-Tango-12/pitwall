import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

export const config = { maxDuration: 60 };

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

  const prompt = `You are an expert F1 analyst writing for casual fans. Respond with a single valid JSON object — no markdown, no code fences, just raw JSON.

Generate a track profile and team strategy predictions for the ${raceName} (${circuitName}) in the 2026 Formula 1 season.

Teams and drivers:
${teamList}

TRACK PROFILE — provide:
- laps: number of race laps
- length: circuit length in km (e.g. "5.513 km")
- lapRecord: fastest lap record (driver, team, time, year — e.g. "Charles Leclerc, Ferrari, 1:19.813, 2022")
- drsZones: number of DRS detection/activation zones
- tireDegradation: "low", "medium", or "high" — how hard the circuit is on tires
- overtakingDifficulty: "easy", "medium", or "hard" — how hard it is to pass
- characteristics: 3–5 short tags that capture the circuit's feel (e.g. "High-speed", "Street circuit", "Heavy braking zones", "Lots of slow corners")
- whatMakesItUnique: 2–3 sentences written for a casual fan. Explain the personality of this circuit — what separates it from every other race on the calendar, what atmosphere or challenge defines it.
- keyCorners: 2–3 named corners that are iconic or strategically important, with a short reason each (e.g. "Turn 8 — high-speed sweep, crucial for traction onto the back straight")

TEAM STRATEGIES — for each team provide:
- constructorId: exact ID from the list above
- teamName: display name
- stops: number of pit stops
- compounds: ordered tire compound array. Valid values: SOFT, MEDIUM, HARD, INTERMEDIATE, WET
- pitWindows: predicted pit lap ranges (e.g. ["Lap 18-22", "Lap 40-45"])
- prediction: 2–3 sentences for a casual fan. Why this strategy, what to watch for, any undercut/overcut opportunity.

Return strategies for all 11 teams.

Respond with this exact JSON shape:
{
  "trackProfile": {
    "laps": <integer>,
    "length": "<e.g. 5.513 km>",
    "lapRecord": "<Driver, Team, Time, Year>",
    "drsZones": <integer>,
    "tireDegradation": "<low|medium|high>",
    "overtakingDifficulty": "<easy|medium|hard>",
    "characteristics": ["<tag>", ...],
    "whatMakesItUnique": "<2-3 sentences for a casual fan>",
    "keyCorners": ["<Corner name — reason>", ...]
  },
  "strategies": [
    {
      "constructorId": "<id>",
      "teamName": "<name>",
      "stops": <integer>,
      "compounds": ["SOFT|MEDIUM|HARD|INTERMEDIATE|WET", ...],
      "pitWindows": ["Lap X-Y", ...],
      "prediction": "<2-3 sentences for a casual fan>"
    }
  ]
}`;

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 5000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return res.status(500).json({ error: "No text response from Claude" });
    }

    const data = JSON.parse(textBlock.text);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Claude API error:", err);
    return res.status(500).json({ error: "Failed to generate strategies" });
  }
}
