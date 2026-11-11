<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep PC pooling calculations in a browser-safe utility with tests; examples must cover the full goal after rounding to cents.
- Show the PC reminder once the marker right after the PC card passes the header; track scrolling with a frame-throttled passive listener and cleanup so anchor jumps also work.
- PC Q&A AI runs in a streaming server route (/api/ask-pc) with prompt and key server-side; it returns plain text with a NUL-prefixed error tail so the client can show safe errors.

- Both AI helpers (/api/ask-pc, /api/recommend) share src/lib/ai/stream-plain.server.ts; AI SDK v7 requires the `instructions` option, never system messages in `messages`.
