import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id";

/** Streams a plain-text model answer; errors arrive as a NUL-prefixed safe message tail. */
export function streamPlainAnswer(request: Request, apiKey: string, instructions: string, prompt: string, tag: string) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const enc = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions,
          messages: [{ role: "user", content: prompt }],
          abortSignal: request.signal,
          maxRetries: 0,
          providerOptions: {
            openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
          },
        });
        for await (const part of result.fullStream) {
          if (part.type === "text-delta") controller.enqueue(enc.encode(part.text));
          else if (part.type === "error") throw part.error;
        }
      } catch (error) {
        const e = error as { statusCode?: number };
        const msg =
          e?.statusCode === 429 ? "Lots of requests right now — try again in a minute."
          : e?.statusCode === 402 || e?.statusCode === 403 ? "The AI helper is unavailable right now."
          : "Something went wrong answering that.";
        if (!request.signal.aborted) controller.enqueue(enc.encode(`\u0000${msg}`));
        console.error(`${tag} error`, error);
      }
      controller.close();
    },
  });
  return withLovableAiGatewayRunIdHeader(
    new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } }),
    runIdFetch,
  );
}
