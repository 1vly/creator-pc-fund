import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { ArrowUp, Users } from "lucide-react";
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
  const peripheralsEnd = useRef<HTMLDivElement>(null);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const marker = peripheralsEnd.current;
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
            <a href="#setup" className="hidden hover:text-foreground sm:inline">Setup</a>
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
                <li key={s} className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium">{s}</li>
              ))}
            </ul>
            <a href={NEWEGG} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full px-6 py-4 text-lg">
              View & Buy on Newegg →
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              This is the one I need most. It will let me record and stream cleanly so I can start earning and pay people back.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
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

        <div id="setup" className="scroll-mt-20"><Diagram /></div>

        <section className="fade-up mt-24">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Too expensive? Cheaper gift options</h2>
            <span className="text-sm text-muted-foreground">Peripherals</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Gift id="gift-keyboard" label="Keyboard" name="SteelSeries Apex 3 TKL RGB" href={KB} store="Walmart" acquired />
            <Gift id="gift-mouse" label="Mouse" name="Logitech LIGHTSPEED Wireless Gaming Mouse" href={MOUSE} store="Amazon" price="$30" />
            <Gift id="gift-monitor" label="Monitor" name="Recommended option" href={MON} store="Amazon" />
            <Gift label="Monitor" name="Cheaper option" href={MON_CHEAP} store="Amazon" note="It is cheaper, but not as easy on my eyes." />
          </div>
        </section>

        <div ref={peripheralsEnd} className="h-px" aria-hidden="true" />

        <section id="gifts" className="fade-up mt-24 scroll-mt-20">
          <div className="mb-10 border-y border-border py-8 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The goal hasn’t changed</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">The PC makes better videos possible.</h2>
            <p className="mt-2 text-lg text-muted-foreground">Everything below is nice-to-have.</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">A gift card is a thoughtful extra, but it doesn’t replace the PC I need to record, stream, and work toward monetization.</p>
            <Button asChild variant="link" className="mt-4 h-auto px-0"><a href="#pc">Put the PC first <ArrowUp aria-hidden="true" /></a></Button>
          </div>
          <Warn strong>
            <p className="font-semibold text-foreground">Before you scroll further — the PC is what really matters.</p>
            <p className="mt-1">Gift cards are appreciated, but they don’t help me make better videos. If you can, put money toward the <a href="#pc" className="underline underline-offset-2 text-foreground">PC pool</a> instead.</p>
          </Warn>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Want to help with something smaller?</h2>
            <span className="text-sm text-muted-foreground">Gift cards</span>
          </div>
          <div className="mt-6"><Warn>Heads up: without the PC, nothing else on this page gets me monetized. Even $10 toward the PC goes further than a gift card.</Warn></div>
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
                <p className="mt-4 text-xs text-muted-foreground">⚠ Reminder: the PC is the #1 priority.</p>
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
      {showReminder && (
        <aside aria-label="PC goal reminder" className="pc-reminder fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Still scrolling? The PC is the goal.</p>
              <p className="mt-1 text-xs text-muted-foreground">$809, pooled together. Extras can wait.</p>
            </div>
            <Button asChild className="shrink-0"><a href="#pc">Back to PC <ArrowUp aria-hidden="true" /></a></Button>
          </div>
        </aside>
      )}
    </>
  );
}

function Gift({ id, label, name, href, store, note, price, acquired }: { id?: string; label: string; name: string; href: string; store: string; note?: string; price?: string; acquired?: boolean }) {
  return (
    <div id={id} className={`${acquired ? "card-done" : "card-soft"} flex scroll-mt-6 flex-col p-6`}>
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        {price && <p className="mt-2 text-sm"><span className="text-muted-foreground">Price: </span><span className="font-semibold">{price}</span></p>}
        {note && <p className="mt-2 text-sm text-muted-foreground italic">{note}</p>}
      </div>
      {acquired ? (
        <div className="mt-auto rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-muted-foreground">Already acquired ✓</div>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-auto px-4 py-3 text-sm">
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
