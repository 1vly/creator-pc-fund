import { createFileRoute } from "@tanstack/react-router";
import { handleRecommend } from "@/lib/ai/recommend.server";

export const Route = createFileRoute("/api/recommend")({
  server: { handlers: { POST: ({ request }) => handleRecommend(request) } },
});
