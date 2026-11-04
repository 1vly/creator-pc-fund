import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const NEWEGG =
  "https://www.newegg.com/hzg-gaming-desktop-pcs-amd-radeon-graphics-amd-ryzen-5-5600-16gb-ddr4-1tb-nvme-ssd-m50/p/3D5-006P-00028";

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

type Part = { id: string; name: string; desc: string; price: string };
const PARTS: Part[] = [
  { id: "case", name: "Case", desc: "Airflow-focused mid tower that keeps everything cool and quiet.", price: "$50 – $90" },
  { id: "mobo", name: "Motherboard", desc: "AM4 board tying it all together, with Wi‑Fi 6 built in.", price: "$80 – $130" },
  { id: "cpu", name: "CPU · Ryzen 5 5600", desc: "6 cores / 12 threads — smooth gaming while recording and encoding.", price: "$110 – $140" },
  { id: "ram", name: "RAM · 16GB DDR4", desc: "Enough memory to run games, OBS and editing tools at once.", price: "$35 – $55" },
  { id: "gpu", name: "GPU · RX 6600 8GB", desc: "Solid 1080p performance and hardware encoding for clean streams.", price: "$190 – $230" },
  { id: "storage", name: "Storage · 1TB NVMe", desc: "Fast SSD for quick loads and room for raw video footage.", price: "$50 – $75" },
  { id: "psu", name: "PSU", desc: "Reliable power supply that keeps the system stable under load.", price: "$45 – $80" },
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Gift label="Keyboard" name="Razer BlackWidow V3 Mechanical" href="https://www.walmart.com/ip/Razer-BlackWidow-V3-Full-Size-Mechanical-Gaming-Keyboard-for-PC-Chroma-RGB-Wrist-Rest-Black/606378872" />
          <Gift label="Mouse" name="Logitech LIGHTSPEED Wireless Gaming Mouse" href="https://www.amazon.com/Logitech-LIGHTSPEED-Wireless-Gaming-Mouse/dp/B07CMS5Q6P" />
          <Gift label="Monitor" name="Recommended option" href="https://a.co/d/0ba15Nwm" />
          <Gift label="Monitor" name="Cheaper option" href="https://a.co/d/0fpgdMh4" note="It is cheaper, but not as easy on my eyes." />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Want to help with something smaller?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {["Discord Nitro Gift Cards", "Roblox Gift Cards"].map((n) => (
            <div key={n} className="card-soft p-6">
              <h3 className="text-lg font-semibold">{n}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Digital gift card · starting at $30</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["$30", "$50", "$100"].map((p) => (
                  <span key={p} className="btn-ghost py-3 text-sm">{p}</span>
                ))}
              </div>
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

function Gift({ label, name, href, note }: { label: string; name: string; href: string; note?: string }) {
  return (
    <div className="card-soft flex flex-col p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      {note && <p className="mt-2 text-sm text-muted-foreground italic">{note}</p>}
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-5 px-4 py-2.5 text-sm">View item →</a>
    </div>
  );
}

function Diagram() {
  const [active, setActive] = useState<string>("gpu");
  const part = PARTS.find((p) => p.id === active)!;
  const bind = (id: string) => ({
    "data-active": active === id,
    onMouseEnter: () => setActive(id),
    onClick: () => setActive(id),
    className: "part",
  });
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold sm:text-3xl">What’s inside</h2>
      <p className="mt-2 text-muted-foreground">Hover or tap a part to see what it does.</p>
      <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_320px]">
        <svg viewBox="0 0 400 460" className="mx-auto w-full max-w-md">
          <rect x="10" y="10" width="380" height="440" rx="18" {...bind("case")} />
          <rect x="40" y="40" width="250" height="280" rx="8" {...bind("mobo")} />
          <rect x="130" y="70" width="70" height="70" rx="6" {...bind("cpu")} />
          <rect x="225" y="60" width="12" height="100" rx="3" {...bind("ram")} />
          <rect x="245" y="60" width="12" height="100" rx="3" {...bind("ram")} />
          <rect x="60" y="200" width="290" height="50" rx="6" {...bind("gpu")} />
          <rect x="70" y="160" width="90" height="18" rx="4" {...bind("storage")} />
          <rect x="40" y="350" width="150" height="80" rx="8" {...bind("psu")} />
          <circle cx="345" cy="100" r="30" className="fill-none stroke-border" strokeWidth="1.5" />
          <circle cx="345" cy="180" r="30" className="fill-none stroke-border" strokeWidth="1.5" />
        </svg>
        <div key={part.id} className="card-soft fade-up p-6" style={{ boxShadow: "var(--glow)" }}>
          <h3 className="text-lg font-semibold text-primary">{part.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{part.desc}</p>
          <p className="mt-4 text-sm"><span className="text-muted-foreground">Price range: </span><span className="font-semibold">{part.price}</span></p>
          <a href="#pc" className="btn-primary mt-5 w-full px-4 py-2.5 text-sm">Buy</a>
        </div>
      </div>
    </section>
  );
}
