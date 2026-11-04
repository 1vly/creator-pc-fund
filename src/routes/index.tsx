import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const NEWEGG =
  "https://www.newegg.com/hzg-gaming-desktop-pcs-amd-radeon-graphics-amd-ryzen-5-5600-16gb-ddr4-1tb-nvme-ssd-m50/p/3D5-006P-00028";
const KB =
  "https://www.walmart.com/ip/Razer-BlackWidow-V3-Full-Size-Mechanical-Gaming-Keyboard-for-PC-Chroma-RGB-Wrist-Rest-Black/606378872";
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

type Part = { id: string; name: string; desc: string; price: string; href: string; store: string; anchor: string };

const PARTS: Part[] = [
  { id: "pc", name: "HZG M500 Gaming PC", desc: "Ryzen 5 5600 + RX 6600 — records and streams cleanly. The main goal.", price: "$809", href: NEWEGG, store: "Newegg", anchor: "#pc" },
  { id: "monitor", name: "Monitor", desc: "A clearer, more comfortable screen for long editing sessions.", price: "$100 – $200", href: MON, store: "Amazon", anchor: "#gift-monitor" },
  { id: "keyboard", name: "Razer BlackWidow V3", desc: "Full-size mechanical keyboard with wrist rest — reliable and responsive.", price: "$70 – $140", href: KB, store: "Walmart", anchor: "#gift-keyboard" },
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

function Index() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
      <section className="fade-up max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Let’s get to the point.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I need a better PC so I can make better videos for YouTube and finally get monetized. Anyone who helps
          pool money toward this PC will receive money back over time — even before I get fully monetized.
        </p>
      </section>

      <section id="pc" className="card-soft fade-up mt-14 p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Primary goal</p>
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
      </section>

      <Diagram />

      <section className="mt-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Too expensive? Here are some cheaper gift options</h2>
        <p className="mt-2 text-muted-foreground">Every button opens that item’s real store page in a new tab.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Gift id="gift-keyboard" label="Keyboard" name="Razer BlackWidow V3 Mechanical" href={KB} store="Walmart" />
          <Gift id="gift-mouse" label="Mouse" name="Logitech LIGHTSPEED Wireless Gaming Mouse" href={MOUSE} store="Amazon" price="$30" />
          <Gift id="gift-monitor" label="Monitor" name="Recommended option" href={MON} store="Amazon" />
          <Gift label="Monitor" name="Cheaper option" href={MON_CHEAP} store="Amazon" note="It is cheaper, but not as easy on my eyes." />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Want to help with something smaller?</h2>
        <p className="mt-2 text-muted-foreground">
          Tap an amount below — it opens the store where you can buy that gift card.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {GIFTCARDS.map((c) => (
            <div key={c.id} id={c.id} className="card-soft scroll-mt-6 p-6">
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
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full px-4 py-3 text-sm">
                Buy on {c.store} →
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Opens {c.store} in a new tab.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        Thank you for reading — every bit of help counts.
      </footer>
    </main>
  );
}

function Gift({ id, label, name, href, store, note, price }: { id?: string; label: string; name: string; href: string; store: string; note?: string; price?: string }) {
  return (
    <div id={id} className="card-soft flex scroll-mt-6 flex-col p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      {price && <p className="mt-2 text-sm"><span className="text-muted-foreground">Price: </span><span className="font-semibold">{price}</span></p>}
      {note && <p className="mt-2 text-sm text-muted-foreground italic">{note}</p>}
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 px-4 py-3 text-sm">
        Buy on {store} →
      </a>
      <p className="mt-3 text-xs text-muted-foreground">Opens {store} in a new tab.</p>
    </div>
  );
}

function Diagram() {
  const [active, setActive] = useState<string>("pc");
  const part = PARTS.find((p) => p.id === active)!;
  const bind = (id: string) => ({
    "data-active": active === id,
    onMouseEnter: () => setActive(id),
    onClick: () => setActive(id),
    className: "part",
  });
  return (
    <section className="mt-20">
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
          <g {...bind("keyboard")}>
            <rect x="100" y="255" width="230" height="38" rx="6" />
          </g>
          <g {...bind("mouse")}>
            <rect x="345" y="255" width="30" height="42" rx="15" />
          </g>
        </svg>
        <div key={part.id} className="card-soft fade-up p-6" style={{ boxShadow: "var(--glow)" }}>
          <h3 className="text-lg font-semibold text-primary">{part.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{part.desc}</p>
          <p className="mt-4 text-sm"><span className="text-muted-foreground">Price: </span><span className="font-semibold">{part.price}</span></p>
          <a href={part.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full px-4 py-2.5 text-sm">
            Buy on {part.store} →
          </a>
          <a href={part.anchor} className="btn-ghost mt-2 w-full px-4 py-2 text-sm">Jump to card ↓</a>
        </div>
      </div>
    </section>
  );
}
