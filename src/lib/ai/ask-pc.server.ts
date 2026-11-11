import { streamPlainAnswer } from "./stream-plain.server";

export const SETUP_FACTS = `The build:
- HZG M500 Gaming PC, $809 on Newegg (Ryzen 5 5600, RX 6600 8GB, 16GB RAM, 1TB SSD). #1 goal, pooled by several people; poolers get paid back over time.
- Monitor (highly needed, ~$100–$200 on Amazon; a recommended option and a cheaper one that is harder on the creator's eyes).
- Smaller extras: Logitech LIGHTSPEED wireless mouse, $30. Keyboard already acquired.
- Gift cards: Discord ($25 Walmart, $50 Target), Roblox ($30/$50/$100) — appreciated but do not help make videos and are not part of the payback pool.`;

const SYSTEM = `You are the friendly helper on a small YouTube creator's "PC Fund" page.
Visitors ask about the setup the creator is pooling money for. Explain in plain, short, honest language (max ~150 words, no tables) how each part helps record, stream, and edit YouTube videos.
The build:
- HZG M500 Gaming PC, $809 on Newegg: AMD Ryzen 5 5600 (6 cores/12 threads), AMD Radeon RX 6600 8GB (hardware video encoding for recording/streaming), 16GB DDR4 RAM, 1TB NVMe SSD, Windows 11, Wi-Fi 6. This is the #1 goal.
- Monitor ($100–$200, Amazon), Logitech LIGHTSPEED wireless mouse ($30). The SteelSeries Apex 3 TKL keyboard is already acquired.
People who pool money toward the PC get paid back over time, even before the creator is fully monetized. Never promise specific amounts, dates, or interest. If asked something unrelated, gently steer back to the PC. Don't invent specs beyond those listed.`;

export async function handleAskPc(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });
  let question = "";
  try {
    const body = (await request.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {}
  if (!question || question.length > 500) {
    return Response.json({ error: "Please ask a question under 500 characters." }, { status: 400 });
  }

  return streamPlainAnswer(request, apiKey, SYSTEM, question, "ask-pc");
}
