import { SETUP_FACTS } from "./ask-pc.server";
import { streamPlainAnswer } from "./stream-plain.server";

const INSTRUCTIONS = `You help visitors of a small YouTube creator's "PC Fund" page decide where their money helps most.
${SETUP_FACTS}
Given the visitor's budget and what they want to support, recommend ONE most useful option and say why in plain, warm, honest language (max ~120 words, no tables).
Priority: PC first (any amount can go toward the PC pool and counts for payback), then the monitor, then the mouse. Only suggest gift cards if the visitor specifically wants a gift card.
Start with a bold one-line pick like "**Best pick: put $X toward the PC pool.**" Then 2–3 short sentences. Never promise payback amounts, dates or interest. Don't invent prices beyond those listed.`;

export async function handleRecommend(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });
  let budget = NaN;
  let goal = "";
  try {
    const b = (await request.json()) as { budget?: unknown; goal?: unknown };
    budget = typeof b.budget === "number" ? b.budget : Number(b.budget);
    goal = typeof b.goal === "string" ? b.goal.trim() : "";
  } catch {}
  if (!Number.isFinite(budget) || budget < 1 || budget > 5000) {
    return Response.json({ error: "Enter a budget between $1 and $5,000." }, { status: 400 });
  }
  if (goal.length > 300) return Response.json({ error: "Keep your note under 300 characters." }, { status: 400 });
  const prompt = `Budget: $${budget.toFixed(2)}\nWhat I want to support: ${goal || "Whatever helps most"}`;
  return streamPlainAnswer(request, apiKey, INSTRUCTIONS, prompt, "recommend");
}
