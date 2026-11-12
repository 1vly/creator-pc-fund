import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { ArrowUp, Users, X, MessageCircleQuestion, Send, Square } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { POOLING_EXAMPLES } from "@/lib/pc-pooling";

const NEWEGG =
  "https://www.newegg.com/hzg-gaming-desktop-pcs-amd-radeon-graphics-amd-ryzen-5-5600-16gb-ddr4-1tb-nvme-ssd-m50/p/3D5-006P-00028";
const KB =
  "https://www.walmart.com/ip/SteelSeries-Apex-3-TKL-RGB-Gaming-Keyboard-Tenkeyless-Water-Dust-Resistant-PC-and-USB-A/996783321";
const MOUSE = "https://www.amazon.com/Logitech-LIGHTSPEED-Wireless-Gaming-Mouse/dp/B07CMS5Q6P";
const MON = "https://www.amazon.com/dp/B0CWCWL81G";
const MON_CHEAP = "https://www.amazon.com/dp/B0F9TK1RFC";
const WMT_DISCORD_25 =
  "https://www.walmart.com/ip/Discord-25-Gift-Card-Digital/20844423221?classType=REGULAR";
const TGT_DISCORD_50 = "https://www.target.com/p/50-discord-gift-card-email-delivery/-/A-1013327745";
const ROBLOX = "https://www.roblox.com/giftcards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Help Me Build a Better YouTube PC" },
      { name: "description", content: "Pool money toward a gaming PC for better YouTube videos — contributors get paid back over time." },
      { property: "og:title", content: "Help Me Build a Better YouTube PC" },
      { property: "og:description", content: "Pool money toward a gaming PC for better YouTube videos — contributors get paid back over time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Part = { id: string; name: string; desc: string; price: string; href: string; store: string; anchor: string; acquired?: boolean };

const PARTS: Part[] = [
  { id: "pc", name: "HZG M500 Gaming PC", desc: "Ryzen 5 5600 + RX 6600 — records and streams cleanly. The main goal.", price: "$809", href: NEWEGG, store: "Newegg", anchor: "#pc" },
  { id: "monitor", name: "Monitor", desc: "A clearer, more comfortable screen for long editing sessions.", price: "$100 – $200", href: MON, store: "Amazon", anchor: "#gift-monitor" },
  { id: "keyboard", name: "SteelSeries Apex 3 TKL", desc: "Tenkeyless RGB gaming keyboard — water and dust resistant.", price: "$70 – $140", href: KB, store: "Walmart", anchor: "#gift-keyboard", acquired: true },
  { id: "mouse", name: "Logitech LIGHTSPEED Mouse", desc: "Low-latency wireless gaming mouse with long battery life.", price: "$30", href: MOUSE, store: "Amazon", anchor: "#gift-mouse" },
];

type Amount = { label: string; href: string; store: string };
const GIFTCARDS: { id: string; name: string; store: string; href: string; amounts: Amount[] }[] = [
  {
    id: "gift-discord",
    name: "Discord Nitro Gift Cards",
    store: "Walmart",
    href: WMT_DISCORD_25,
    amounts: [
      { label: "$25", href: WMT_DISCORD_25, store: "Walmart" },
      { label: "$50", href: TGT_DISCORD_50, store: "Target" },
    ],
  },
  {
    id: "gift-roblox",
    name: "Roblox Gift Cards",
    store: "Roblox",
    href: ROBLOX,
    amounts: [
      { label: "$30", href: ROBLOX, store: "Roblox" },
      { label: "$50", href: ROBLOX, store: "Roblox" },
      { label: "$100", href: ROBLOX, store: "Roblox" },
    ],
  },
];

function Warn({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <div role="note" className={`warn ${strong ? "warn-strong" : ""} flex items-start gap-3 p-4 text-sm leading-relaxed`}>
      <span aria-hidden className="mt-0.5 text-base">⚠</span>
      <div>{children}</div>
    </div>
  );
}

function Index() {
  const pcEnd = useRef<HTMLDivElement>(null);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderDismissed, setReminderDismissed] = useState(false);

  useEffect(() => {
    const marker = pcEnd.current;
    if (!marker) return;
    let frame = 0;
    const update = () => {
      setShowReminder(marker.getBoundingClientRect().top < 64);
      frame = 0;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 text-sm">
          <span className="font-display font-bold tracking-tight">PC Fund</span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#payback" className="hidden hover:text-foreground sm:inline">Payback</a>
            <a href="#needed" className="hidden hover:text-foreground sm:inline">Monitor</a>
            <a href="#ask" className="hidden hover:text-foreground sm:inline">Ask</a>
                        <a href="#gifts" className="hidden hover:text-foreground sm:inline">Gifts</a>
            <a href="#pc" className="btn-primary px-3 py-1.5 text-xs">Fund the PC</a>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 pt-10 pb-32 sm:pt-16 sm:pb-36">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <section className="lg:sticky lg:top-24">
            <p className="fade-up text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">YouTube PC Fund</p>
            <h1 className="fade-up mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Let’s get to the point.</h1>
            <p className="fade-up-1 mt-5 text-lg leading-relaxed text-muted-foreground">
              I need a better PC so I can make better videos for YouTube and finally get monetized. Anyone who helps
              pool money toward this PC will receive money back over time — even before I get fully monetized.
            </p>
            <ol className="fade-up-2 mt-8 space-y-3 text-sm">
              {["Pool money toward the PC", "I record & upload better videos", "Everyone who pooled gets paid back over time"].map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold">{i + 1}</span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="pc" className="card-soft fade-up-2 scroll-mt-24 p-6 sm:p-10" style={{ boxShadow: "var(--glow)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">#1 Priority — the main goal</p>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-bold sm:text-3xl">HZG M500 Gaming PC</h2>
              <span className="text-3xl font-bold text-primary">$809</span>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["Ryzen 5 5600", "RX 6600 8GB", "16GB RAM", "1TB SSD", "Windows 11", "Wi‑Fi 6"].map((s) => (
                <li key={s} className="rounded-xl border border-border bg-secondary/40 backdrop-blur px-4 py-3 text-sm font-medium">{s}</li>
              ))}
            </ul>
            <a href={NEWEGG} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full px-6 py-4 text-lg">
              View & Buy on Newegg →
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              This is the one I need most. It will let me record and stream cleanly so I can start earning and pay people back.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Real talk: </span>
              one person isn’t going to buy this for me. This is meant to be pooled — a few people putting their money
              together to get it. Everyone who is part of pooling gets money back over time, even before I’m fully monetized.
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="flex items-center gap-2 text-base font-semibold"><Users className="size-4" aria-hidden="true" />One goal. Shared together.</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The $809 goal gets smaller when more people chip in.</p>
              <div className="mt-4 divide-y divide-border">
                {POOLING_EXAMPLES.map(({ people, amount }) => (
                  <a key={people} href={NEWEGG} target="_blank" rel="noopener noreferrer" aria-label={`${people} people at $${amount.toFixed(2)} each — view the PC on Newegg`} className="group flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-primary">
                    <span className="text-muted-foreground">{people} people</span>
                    <span><strong className="text-lg font-semibold">${amount.toFixed(2)}</strong><span className="ml-1 text-muted-foreground">each</span><span className="ml-3" aria-hidden="true">↗</span></span>
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Examples only, not money already raised. Shares are rounded up to the nearest cent; any amount toward the PC helps.</p>
            </div>
          </section>
        </div>

        <div ref={pcEnd} className="h-px" aria-hidden="true" />

        <section aria-label="Ways to help" className="fade-up mt-12 grid gap-3 sm:grid-cols-3">
          {[
            { n: "1", t: "Chip in toward the PC", d: "$809 goal · gets you paid back", href: "#pc", primary: true },
            { n: "2", t: "Get the monitor", d: "Highly needed · $100 – $200", href: "#needed" },
            { n: "3", t: "Smaller extras", d: "Mouse $30 · gift cards", href: "#extras" },
          ].map((o) => (
            <a key={o.n} href={o.href} className={`card-soft group flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5 ${o.primary ? "border-primary/40" : ""}`} style={o.primary ? { boxShadow: "var(--glow)" } : undefined}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${o.primary ? "bg-primary text-primary-foreground" : "border border-border"}`}>{o.n}</span>
              <span className="min-w-0">
                <span className="block font-semibold">{o.t}</span>
                <span className="block text-xs text-muted-foreground">{o.d}</span>
              </span>
              <span aria-hidden="true" className="ml-auto text-muted-foreground transition-colors group-hover:text-foreground">→</span>
            </a>
          ))}
        </section>

        <Payback />

        <section id="needed" className="fade-up mt-24 scroll-mt-24">
          <SectionHead eyebrow="Step 2 · Highly needed" title="The monitor" sub="After the PC, this matters most." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Gift id="gift-monitor" label="Recommended" name="Recommended monitor" href={MON} store="Amazon" needed />
            <Gift label="Budget pick" name="Cheaper monitor" href={MON_CHEAP} store="Amazon" note="It is cheaper, but not as easy on my eyes." unavailable />
          </div>
        </section>

        <section id="extras" className="fade-up mt-24 scroll-mt-24">
          <SectionHead eyebrow="Step 3 · Smaller extras" title="Peripherals" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Gift id="gift-mouse" label="Mouse" name="Logitech LIGHTSPEED Wireless Gaming Mouse" href={MOUSE} store="Amazon" price="$30" />
            <Gift id="gift-keyboard" label="Keyboard" name="SteelSeries Apex 3 TKL RGB" href={KB} store="Walmart" acquired />
          </div>
        </section>

        <div id="setup" className="scroll-mt-20"><Diagram /></div>

        <AskPc />

        <section id="gifts" className="fade-up mt-24 scroll-mt-20">
          <Warn strong>
            <p className="font-semibold text-foreground">Before you scroll further — the PC is what really matters.</p>
            <p className="mt-1">Gift cards are appreciated, but they don’t help me make better videos. If you can, put money toward the <a href="#pc" className="underline underline-offset-2 text-foreground">PC pool</a> instead.</p>
          </Warn>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Want to help with something smaller?</h2>
            <span className="text-sm text-muted-foreground">Gift cards</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {GIFTCARDS.map((c) => (
              <div key={c.id} id={c.id} className="card-soft scroll-mt-24 p-6">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Digital gift card · tap an amount to open its store page</p>
                <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${c.amounts.length}, minmax(0, 1fr))` }}>
                  {c.amounts.map((a) => (
                    <a key={a.label + a.store} href={a.href} target="_blank" rel="noopener noreferrer" className="btn-ghost flex flex-col items-center gap-1 py-3 text-sm">
                      <span className="text-base font-bold">{a.label}</span>
                      <span className="text-xs font-normal text-muted-foreground">{a.store}</span>
                    </a>
                  ))}
                </div>
                              </div>
            ))}
          </div>
          <div className="mt-8"><Warn strong>
            <p className="font-semibold text-foreground">Last reminder: the PC is the whole point.</p>
            <p className="mt-1">Everyone who helps pool toward it gets money back over time. <a href="#pc" className="underline underline-offset-2 text-foreground">Go back to the PC ↑</a></p>
          </Warn></div>
        </section>

        <footer className="mt-24 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          Thank you for reading — every bit of help counts.
        </footer>
      </main>
      {showReminder && !reminderDismissed && (
        <aside
          aria-label="PC goal reminder"
          className="pc-reminder fixed inset-x-4 bottom-4 z-30 mx-auto max-w-md rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-2xl backdrop-saturate-150 sm:inset-x-6 sm:bottom-6"
          style={{ boxShadow: "var(--glow), 0 24px 60px -20px rgb(0 0 0 / 60%)" }}
        >
          <button
            type="button"
            onClick={() => setReminderDismissed(true)}
            aria-label="Dismiss reminder"
            className="absolute top-3 right-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">#1 Priority</p>
          <p className="mt-2 text-lg font-bold">Don’t forget — the PC is the goal.</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            $809, pooled together — everyone who chips in gets money back over time. Everything else can wait.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="#pc">Back to the PC <ArrowUp aria-hidden="true" /></a>
          </Button>
        </aside>
      )}
    </>
  );
}

function Gift({ id, label, name, href, store, note, price, acquired, needed, unavailable }: { id?: string; label: string; name: string; href: string; store: string; note?: string; price?: string; acquired?: boolean; needed?: boolean; unavailable?: boolean }) {
  const muted = acquired || unavailable;
  return (
    <div id={id} className={`${muted ? "card-done" : "card-soft"} flex scroll-mt-24 flex-col p-6 ${needed && !muted ? "border-primary/40" : ""}`} style={needed && !muted ? { boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 18%, transparent), 0 18px 40px -24px color-mix(in oklab, var(--primary) 40%, transparent)" } : undefined}>
      <div className="mb-5">
        <p className={`text-xs font-semibold uppercase tracking-widest ${needed && !muted ? "text-primary" : "text-muted-foreground"}`}>{label}</p>
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        {price && <p className="mt-2 text-sm"><span className="text-muted-foreground">Price: </span><span className="font-semibold">{price}</span></p>}
        {note && <p className="mt-2 text-sm text-muted-foreground italic">{note}</p>}
      </div>
      {acquired ? (
        <div className="mt-auto rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-muted-foreground">Already acquired ✓</div>
      ) : unavailable ? (
        <div className="mt-auto rounded-lg border border-border px-4 py-3 text-center">
          <span className="block text-sm font-semibold text-muted-foreground">Currently unavailable</span>
          <span className="mt-1 block text-xs font-normal text-muted-foreground">This one isn't sold at that link anymore.</span>
        </div>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${needed ? "btn-primary" : "btn-ghost"} mt-auto px-4 py-3 text-sm`}>
          Buy on {store} →
        </a>
      )}
    </div>
  );
}

function Diagram() {
  const [active, setActive] = useState<string>("pc");
  const part = PARTS.find((p) => p.id === active);
  if (!part) return null;
  const bind = (id: string, acquired = false) => ({
    "data-active": active === id,
    "data-acquired": acquired || undefined,
    onMouseEnter: () => setActive(id),
    onClick: () => setActive(id),
    className: "part",
  });
  return (
    <section className="fade-up mt-20">
      <h2 className="text-2xl font-bold sm:text-3xl">The full setup</h2>
      <p className="mt-2 text-muted-foreground">Hover or tap any item to see details.</p>
      <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_320px]">
        <svg viewBox="0 0 520 340" className="mx-auto w-full max-w-xl">
          <line x1="10" y1="300" x2="510" y2="300" className="stroke-border" strokeWidth="2" />
          <g {...bind("monitor")}>
            <rect x="110" y="30" width="250" height="150" rx="10" />
            <rect x="222" y="180" width="26" height="50" rx="3" />
            <rect x="180" y="228" width="110" height="10" rx="4" />
          </g>
          <g {...bind("pc")}>
            <rect x="400" y="100" width="100" height="200" rx="10" />
            <circle cx="450" cy="150" r="22" className="fill-none" />
            <circle cx="450" cy="210" r="22" className="fill-none" />
          </g>
          <g {...bind("keyboard", true)}>
            <rect x="100" y="255" width="230" height="38" rx="6" />
            <text x="215" y="279" textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold">Already acquired</text>
          </g>
          <g {...bind("mouse")}>
            <rect x="345" y="255" width="30" height="42" rx="15" />
          </g>
        </svg>
        <div key={part.id} className="card-soft fade-up p-6" style={{ boxShadow: "var(--glow)" }}>
          <h3 className="text-lg font-semibold text-primary">{part.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{part.desc}</p>
          {!part.acquired && <p className="mt-4 text-sm"><span className="text-muted-foreground">Price: </span><span className="font-semibold">{part.price}</span></p>}
          {part.acquired ? (
            <div className="mt-5 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold text-muted-foreground">Already acquired ✓</div>
          ) : (
            <a href={part.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full px-4 py-2.5 text-sm">
              Buy on {part.store} →
            </a>
          )}
          {!part.acquired && <a href={part.anchor} className="btn-ghost mt-2 w-full px-4 py-2 text-sm">Jump to card ↓</a>}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-3 leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

const PAYBACK_STEPS = [
  { t: "You chip in", d: "Put any amount toward the $809 PC. I keep a record of who pooled and how much." },
  { t: "I start creating", d: "The PC lets me record, stream, and edit better videos consistently." },
  { t: "Paybacks start early", d: "I begin paying people back in small amounts over time — even before I’m fully monetized." },
  { t: "It grows with the channel", d: "As the channel earns more, paybacks get bigger and faster until everyone is covered." },
];

function Payback() {
  return (
    <section id="payback" className="fade-up mt-24 scroll-mt-24">
      <SectionHead eyebrow="How you get paid back" title="Helping with the PC isn’t just a gift." sub="It’s a shared bet on the channel. The PC is what makes the videos — and the videos are what pay everyone back." />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PAYBACK_STEPS.map((s, i) => (
          <li key={s.t} className="card-soft p-6">
            <span className="text-sm font-semibold text-muted-foreground">0{i + 1}</span>
            <h3 className="mt-3 font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground">Gift cards and peripherals are appreciated, but only money toward the PC is part of the payback pool.</p>
    </section>
  );
}

const SUGGESTED = ["Is the RX 6600 good for recording?", "Why does 16GB RAM matter for editing?", "Can this PC stream and record at once?"];

function AskPc() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setBusy(true); setAnswer(""); setError("");
    const ac = new AbortController(); ctrl.current = ac;
    try {
      const res = await fetch("/api/ask-pc", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }), signal: ac.signal });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Something went wrong."); return;
      }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let text = "";
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        text += dec.decode(value, { stream: true });
        const i = text.indexOf("\u0000");
        if (i >= 0) { setAnswer(text.slice(0, i)); setError(text.slice(i + 1)); } else setAnswer(text);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError("Couldn’t reach the helper. Try again.");
    } finally { setBusy(false); ctrl.current = null; }
  }

  return (
    <section id="ask" className="fade-up mt-24 scroll-mt-24">
      <SectionHead eyebrow="Ask about the build" title="Curious what the parts actually do?" sub="Ask anything about the PC and setup — the AI helper explains how each part helps make better videos." />
      <div className="card-soft mt-8 p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button key={s} type="button" disabled={busy} onClick={() => { setQ(s); ask(s); }} className="btn-ghost px-3 py-1.5 text-xs">{s}</button>
          ))}
        </div>
        <form className="mt-4 flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
          <Textarea value={q} onChange={(e) => setQ(e.target.value)} maxLength={500} rows={2} placeholder="e.g. Will this handle 1080p editing?" aria-label="Your question about the PC"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(q); } }} className="min-h-12 resize-none" />
          {busy ? (
            <Button type="button" size="icon" variant="secondary" aria-label="Stop" onClick={() => ctrl.current?.abort()}><Square /></Button>
          ) : (
            <Button type="submit" size="icon" aria-label="Ask" disabled={!q.trim()}><Send /></Button>
          )}
        </form>
        {(answer || busy || error) && (
          <div className="mt-6 flex gap-3 border-t border-border pt-6" aria-live="polite">
            <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 text-sm leading-relaxed">
              {answer && <p className="whitespace-pre-wrap">{answer}</p>}
              {busy && !answer && <p className="animate-pulse text-muted-foreground">Thinking about your question…</p>}
              {error && <p className="mt-2 text-destructive">{error}</p>}
            </div>
          </div>
        )}
        <p className="mt-5 text-xs text-muted-foreground">AI answers can be wrong — check the store page for exact specs.</p>
      </div>
    </section>
  );
}

function Bolded({ text }: { text: string }) {
  return <>{text.split("**").map((t, i) => (i % 2 ? <strong key={i} className="font-semibold text-foreground">{t}</strong> : <span key={i}>{t}</span>))}</>;
}

const BUDGETS = [10, 30, 50, 100];
const GOALS = ["Whatever helps most", "The PC", "The monitor", "Something small"];

// Temporarily hidden until the creator asks to bring it back.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BudgetHelper() {
  const [budget, setBudget] = useState("30");
  const [goal, setGoal] = useState<string>(GOALS[0] ?? "Whatever helps most");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  async function run() {
    const n = Number(budget);
    if (!Number.isFinite(n) || n < 1 || n > 5000) { setError("Enter a budget between $1 and $5,000."); return; }
    if (busy) return;
    setBusy(true); setAnswer(""); setError("");
    const ac = new AbortController(); ctrl.current = ac;
    try {
      const res = await fetch("/api/recommend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ budget: n, goal: goal.slice(0, 300) }), signal: ac.signal });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Something went wrong."); return;
      }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let text = "";
      for (;;) {
        const { done, value } = await reader.read(); if (done) break;
        text += dec.decode(value, { stream: true });
        const i = text.indexOf("\u0000");
        if (i >= 0) { setAnswer(text.slice(0, i)); setError(text.slice(i + 1)); } else setAnswer(text);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError("Couldn’t reach the helper. Try again.");
    } finally { setBusy(false); ctrl.current = null; }
  }

  return (
    <section id="match" className="fade-up mt-24 scroll-mt-24">
      <SectionHead eyebrow="Find your best fit" title="What can you put in?" sub="Share your budget and what you'd like to support — the AI helper picks the most useful option for you." />
      <form className="card-soft mt-8 p-5 sm:p-8" onSubmit={(e) => { e.preventDefault(); run(); }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your budget</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {BUDGETS.map((b) => (
            <button key={b} type="button" onClick={() => setBudget(String(b))} aria-pressed={budget === String(b)}
              className={`btn-ghost px-4 py-2 text-sm ${budget === String(b) ? "border-primary bg-accent" : ""}`}>${b}</button>
          ))}
          <label className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm focus-within:border-primary">
            <span className="text-muted-foreground">$</span>
            <input type="number" min={1} max={5000} inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} aria-label="Custom budget in dollars" className="w-20 bg-transparent outline-none" />
          </label>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">I'd like to support</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <button key={g} type="button" onClick={() => setGoal(g)} aria-pressed={goal === g}
              className={`btn-ghost px-4 py-2 text-sm ${goal === g ? "border-primary bg-accent" : ""}`}>{g}</button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          {busy ? (
            <Button type="button" variant="secondary" onClick={() => ctrl.current?.abort()}><Square /> Stop</Button>
          ) : (
            <Button type="submit">Get my recommendation</Button>
          )}
        </div>
        {(answer || busy || error) && (
          <div className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground" aria-live="polite">
            {answer && <p className="whitespace-pre-wrap"><Bolded text={answer} /></p>}
            {busy && !answer && <p className="animate-pulse">Finding the best fit…</p>}
            {error && <p className="mt-2 text-destructive">{error}</p>}
            {answer && !busy && <a href="#pc" className="btn-ghost mt-4 px-4 py-2 text-sm">See the PC ↑</a>}
          </div>
        )}
        <p className="mt-5 text-xs text-muted-foreground">Suggestions only — AI can be wrong. Only money toward the PC counts for payback.</p>
      </form>
    </section>
  );
}
