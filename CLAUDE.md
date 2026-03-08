# CLAUDE.md - Pitwall

## What is Pitwall?
F1 companion app for casual fans. Track the 2026 season, understand what's happening during races, follow your favorite drivers/teams.

## Tech Stack
- **Web:** React 19 + TypeScript + Vite 6 + Tailwind CSS v4
- **State:** Zustand 5 (UI state) + TanStack Query 5 (server state)
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **Dates:** date-fns 4
- **Testing:** Vitest + React Testing Library + MSW

## Data Sources
- **OpenF1 API** (`api.openf1.org`) — Live timing, stints, race control, weather. 3 req/sec.
- **Jolpica-F1 API** (`api.jolpi.ca/ergast/f1`) — Schedule, standings, driver/constructor info. 4 req/sec burst.

## Architecture
```
types/ → constants/ → mocks/ → services/ → hooks/ → components/ → routes/
```
- Components never import services directly — always go through hooks
- Hooks transform raw API types into normalized app types (`types/app.ts`)
- Zustand store holds UI-only state (active tabs, filters, favorites)
- TanStack Query handles all server state (caching, refetching, stale times)

## Platforms

| Platform | Stack | Location |
|----------|-------|----------|
| Web | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 | `web/` |
| iOS | Swift 5.9+ + SwiftUI + @Observable | `ios/` |

## Custom Commands
- `/build-ios` — Architecture-first iOS app builder. Explores the web app, presents a SwiftUI architecture plan, then scaffolds the full native app with parity to the web.

## Web Commands
```bash
cd web
npm run dev          # Dev server on :5173
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
npm run build        # Production build
npx tsc --noEmit     # Type check
```

## iOS Stack
- **Language:** Swift 5.9+ (iOS 17+ minimum)
- **UI:** SwiftUI + `@Observable` macro (replaces `@ObservedObject`)
- **State:** `@Observable` ViewModels on `@MainActor` (combines Zustand + TanStack Query)
- **Networking:** `URLSession` with `actor`-based rate limiter
- **No external dependencies** — Apple frameworks only

## iOS Project Structure
```
ios/Pitwall/
├── PitwallApp.swift        # @main, .preferredColorScheme(.dark)
├── ContentView.swift       # TabView (5 tabs)
├── Constants/              # Design, Teams, TireCompounds, Glossary, Flags, WeekendFormat
├── Models/                 # Race, Standing, Stint, RaceEvent, Weather, Session (+ raw Codable)
├── Services/               # APIClient (rate limiter), OpenF1Service, JolpicaService
├── ViewModels/             # Dashboard, Calendar, Standings, Companion, Learn
├── Views/                  # Dashboard/, Calendar/, Standings/, Companion/, Learn/
└── Components/             # CardView, BadgeView, TeamColorBarView, CountdownView, LoadingView, ErrorView
```

## iOS Commands
```bash
# Open in Xcode
open ios/Pitwall.xcodeproj

# Build from CLI
xcodebuild -project ios/Pitwall.xcodeproj -scheme Pitwall -destination 'platform=iOS Simulator,name=iPhone 16'
```

## iOS Conventions
- Conventional commits: `feat(ios): ...`, `fix(ios): ...`
- ViewModels are `@MainActor @Observable final class` — never use `@Published`
- Rate limiters: `openF1Limiter` (3/sec), `jolpicaLimiter` (4/sec) — always await before fetching
- Never hardcode team colors — always use `teamColor(for: constructorId)` from `Constants/Teams.swift`
- Never hardcode tire colors — always use `tireColor(for: compound)` from `Constants/TireCompounds.swift`
- Dark theme enforced app-wide via `.preferredColorScheme(.dark)` on root + `Color.pitwallBase` backgrounds
- Replay mode fetches 2025 Australian GP from live OpenF1 API (same as web's `useReplaySession`)
- Plain language required for all race events — explanations live in `OpenF1Service.transformRaceControl()`

## Conventions (both platforms)
- Conventional commits: `feat(web): ...`, `fix(web): ...`, `test(web): ...`
- Dark theme: zinc-950 base, F1 red (#E10600) accent
- Team colors from platform-specific constants — never hardcode team colors elsewhere
- Plain language for casual fans — no jargon without explanation

## Web Conventions
- TDD: write failing tests first, then implement
- Mobile-first: all styles start at 375px, scale up with Tailwind breakpoints

## File Naming
**Web:**
- Components: PascalCase (`NextRaceCard.tsx`)
- Hooks: camelCase with `use` prefix (`useRaceSchedule.ts`)
- Types/constants/services: kebab-case or camelCase (`api-client.ts`, `teams.ts`)
- Tests: same name as source with `.test.ts(x)` suffix, in `__tests__/` directories

**iOS:**
- All Swift files: PascalCase (`DashboardView.swift`, `RaceCardView.swift`)
- ViewModels: `<Screen>ViewModel.swift`
- Constants: single concept per file (`Teams.swift`, `TireCompounds.swift`)
