import { createFileRoute } from "@tanstack/react-router";
import { handleAskPc } from "@/lib/ai/ask-pc.server";

export const Route = createFileRoute("/api/ask-pc")({
  server: { handlers: { POST: ({ request }) => handleAskPc(request) } },
});
