# Cleaner, more polished page

Goal: make the page feel calmer, tighter and more "finished", without changing prices, links, the PC-first message, or the liquid glass look.

## What I'd change

1. **Shorter page, fewer repeats.** Merge the remaining amber warnings into one strong "PC first" note plus the floating reminder. Fold "How you get paid back" into a compact 3-step strip next to the PC card instead of a full section.
2. **A real hero.** Big headline on the left, the PC card on the right with a large price, the four key specs as small icon tiles, and one main "Chip in on Newegg" button. Pooling examples (8 / 16 / 32 people) become a neat row of small tiles under it.
3. **Consistent spacing and type.** One spacing scale for all sections, same heading style everywhere, narrower text width so lines are easier to read, softer muted text.
4. **Tidier product cards.** Same height cards, product label at top, price on the right, one button at the bottom. Dimmed cards (keyboard, unavailable monitor) get a small status badge instead of a big block.
5. **Sticky top bar upgrade.** Slimmer bar that highlights which section you're in, and a small "$809 goal" pill that always links to the PC.
6. **Smoother motion.** Sections fade in as you scroll to them (not all at page open), gentle card lift on hover, nothing on reduced-motion settings.
7. **Better phone layout.** Bottom-fixed "Fund the PC" button on phones instead of the floating card covering content; larger tap areas.
8. **Ask box polish.** Cleaner chat-style box with suggested questions as pills and a typing indicator.

## Not changing
- All store links, prices, the keyboard "acquired" and cheaper monitor "unavailable" states.
- The hidden budget helper stays hidden.

## Technical details
- Edits limited to `src/routes/index.tsx` and `src/styles.css`; may split sections into small components under `src/components/` for readability.
- Scroll-reveal via a small IntersectionObserver hook (reveal only; the PC reminder keeps its existing scroll listener).
- Keep pooling utility and its tests untouched; re-run tests and check desktop + phone screenshots afterward.
