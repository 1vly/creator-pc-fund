import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id";

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

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: question },
    ],
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
    },
  });

  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          if (part.type === "text-delta") controller.enqueue(enc.encode(part.text));
          else if (part.type === "error") throw part.error;
        }
      } catch (error) {
        const e = error as { statusCode?: number };
        const msg =
          e?.statusCode === 429 ? "Lots of questions right now — try again in a minute."
          : e?.statusCode === 402 || e?.statusCode === 403 ? "The AI helper is unavailable right now."
          : "Something went wrong answering that.";
        if (!request.signal.aborted) controller.enqueue(enc.encode(`\u0000${msg}`));
        console.error("ask-pc error", error);
      }
      controller.close();
    },
  });
  return withLovableAiGatewayRunIdHeader(
    new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } }),
    runIdFetch,
  );
}
