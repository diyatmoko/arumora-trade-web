# TradeHub

**TradeHub** is a professional trading intelligence platform UI — a unified terminal for monitoring portfolios, markets, trading bots, strategies, positions, and trading history.

Dark-first, information-dense, and built to feel like a serious trading operating system rather than a generic admin dashboard.

> All market data is **simulated locally** for demonstration purposes. No exchange connections or real funds are involved.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | WindiCSS with a custom semantic design-token theme |
| Animation | GSAP + ScrollTrigger (scroll-driven storytelling) |
| Charts | [lightweight-charts](https://tradingview.github.io/lightweight-charts/) (candles, volume, equity) + custom SVG sparklines |
| Routing | React Router v7 (`createBrowserRouter`) |
| State | Zustand (UI state, live market feed, bot controls) |
| Icons | lucide-react |

## Getting Started

```bash
npm install

# start the dev server
npm run dev
```

If the dev server exits unexpectedly in background/non-interactive terminals (Vite closes when stdin closes), use the stdin-independent runner instead:

```bash
node scripts/dev.mjs
```

Then open http://localhost:5173.

### Other scripts

```bash
npm run build     # typecheck (tsc -b) + production build
npm run lint      # ESLint
npm run preview   # preview the production build
```

## Features

### Landing page (`/`)
- Hero with live simulated price ticker and animated dashboard preview
- Market intelligence cards with SVG sparklines that draw on scroll
- Portfolio section with a scroll-scrubbed equity curve, count-up metrics, and allocation bars
- Bot cards with working start/pause/stop controls
- **Pinned strategies section** — scroll drives through Momentum, Mean Reversion, Liquidation Sweep, and Breakout
- Feature grid and final CTA
- All scroll animation is built on GSAP ScrollTrigger with `gsap.context()` cleanup and full `prefers-reduced-motion` fallbacks

### Trading workspace (`/app`)
| Route | Description |
| --- | --- |
| `/app` | Overview: stat tiles, candlestick + volume chart, watchlist, positions, activity feed, running bots |
| `/app/portfolio` | Equity curve with range selector, allocation, key metrics, monthly returns |
| `/app/markets` | Live market table with filtering and top movers |
| `/app/positions` | Positions table with side filters (responsive: table → cards) |
| `/app/orders` | Order history + empty-state open orders tab |
| `/app/transactions` | Deposits, withdrawals, fees, and funding history |
| `/app/bots` | Bot fleet with status pills, win-rate rings, and controls |
| `/app/strategies` | Strategy library with action menus and a create-strategy modal |
| `/app/analytics` | Performance metrics, execution quality, strategy contribution |
| `/app/settings` | Profile, preference toggles, API keys |

Extras: collapsible sidebar with mobile drawer, **Ctrl/⌘ K command palette** for navigation, `● Live` connection badge, skeleton/empty/error states.

## Project Structure

```text
src/
├── app/               # App entry, router, scroll manager
├── components/
│   ├── charts/        # Sparkline, PriceChart/EquityCurve, WinRateRing, ReturnBars
│   ├── landing/       # Hero, Markets, Portfolio, Bots, Strategies (pinned), Features, CTA
│   ├── navigation/    # Logo, Sidebar, Topbar, PublicNav, Footer, CommandPalette
│   ├── trading/       # StatTile, MarketList, PositionsTable, ActivityFeed, Bot/StrategyCard
│   └── ui/            # Button, Panel, Badge, Modal, SegmentedControl, Skeleton, EmptyState
├── data/              # Simulated markets, portfolio, bots, strategies, trading data
├── hooks/             # useGsap, useScrollFx (reveal/parallax/pin), useCountUp, useDrawPath
├── layouts/           # Route pages (Landing, Login, AppLayout, dashboard pages)
├── lib/               # GSAP registration, formatting, seeded series generators, chart theme
└── store/             # Zustand stores: ui, live market feed, bots
```

## Design System

Semantic tokens are defined in `windi.config.js` and used consistently across the app:

| Token | Purpose |
| --- | --- |
| `bg` / `surface` / `surface-raised` / `surface-overlay` | Layered dark backgrounds |
| `line` / `line-strong` | Borders and dividers |
| `content` / `content-secondary` / `content-muted` / `content-faint` | Text hierarchy |
| `accent` (cyan) | Brand, focus, interactive highlights |
| `profit` / `loss` / `warn` / `info` | Semantic trading states — never used decoratively |

Typography: **Inter** for UI, **JetBrains Mono** for numeric/trading data (tabular numerals via the `.num` utility).

## Implementation Notes

- **GSAP cleanup**: every animation runs inside `gsap.context()` scoped to its section and is reverted on unmount; reduced-motion users get instantly-visible final states.
- **Performance**: charts are lazy-loaded (separate chunk), animations only touch `transform`/`opacity`, and the live feed ticks a small seeded random walk.
- **Deterministic demo data**: candle/equity series are generated from seeded PRNGs so charts look realistic and stable across reloads.
