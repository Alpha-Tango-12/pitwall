# /build-ios — Pitwall iOS App Builder

You are building a native SwiftUI iOS app for **Pitwall** — an F1 companion app for casual fans. The iOS app must match the web app's UI look, feel, and functionality. The web source of truth lives at `web/src/`.

---

## Step 1: Read Before You Build

Before writing any code, read these files to understand the existing web app:

**Design System:**
- `web/src/index.css` — Tailwind v4 config, custom colors (especially `--f1-red`)
- `web/src/constants/teams.ts` — All 11 team colors
- `web/src/constants/tire-compounds.ts` — Tire type colors

**Data & Types:**
- `web/src/types/app.ts` — Canonical app types (Race, Stint, DriverStanding, WeatherConditions, etc.)
- `web/src/types/openf1.ts` — Raw OpenF1 API response shapes
- `web/src/types/jolpica.ts` — Raw Jolpica API response shapes
- `web/src/services/api-client.ts` — Rate limiting approach (OpenF1: 3 req/sec, Jolpica: 4 req/sec)
- `web/src/services/openf1.ts` — OpenF1 endpoints
- `web/src/services/jolpica.ts` — Jolpica endpoints

**Screens (read each component to understand UI layout and data requirements):**
- Dashboard: `web/src/components/dashboard/`
- Calendar: `web/src/components/calendar/`
- Standings: `web/src/components/standings/`
- Live Companion: `web/src/components/companion/`
- Learn F1: `web/src/components/learn/`

**Navigation:**
- `web/src/components/layout/BottomNav.tsx` — 5 tabs: Home, Calendar, Standings, Live, Learn
- `web/src/components/layout/Navbar.tsx` — Desktop nav (reference only)

**Mock/Replay Data:**
- `web/src/mocks/` — All mock data (stints, race control events, weather, drivers, schedule)

---

## Step 2: Design the iOS Architecture

Before writing any Swift code, **present a written architecture plan** covering:

### Navigation
- `TabView` with 5 tabs matching the web's BottomNav
- Tab labels and SF Symbols that map to: Home (house.fill), Calendar (calendar), Standings (trophy.fill), Live (radio.fill), Learn (book.fill)

### Swift Package / Project Structure
```
ios/
├── PitwallApp.swift          # App entry point
├── ContentView.swift          # Root TabView
├── Models/                    # Codable Swift structs
│   ├── Race.swift
│   ├── Standing.swift
│   ├── Stint.swift
│   ├── RaceEvent.swift
│   ├── Weather.swift
│   └── ...
├── Services/                  # async/await API clients
│   ├── APIClient.swift        # Base HTTP client with rate limiting
│   ├── OpenF1Service.swift
│   └── JolpicaService.swift
├── ViewModels/                # @MainActor @Observable classes
│   ├── DashboardViewModel.swift
│   ├── CalendarViewModel.swift
│   ├── StandingsViewModel.swift
│   ├── CompanionViewModel.swift
│   └── LearnViewModel.swift
├── Views/                     # SwiftUI views, mirroring web components
│   ├── Dashboard/
│   ├── Calendar/
│   ├── Standings/
│   ├── Companion/
│   └── Learn/
├── Components/                # Shared reusable views
│   ├── Card.swift             # Matches web Card.tsx (rounded-xl, zinc-900 bg)
│   ├── Badge.swift
│   ├── TeamColorBar.swift
│   ├── CountdownView.swift
│   ├── LoadingView.swift
│   └── ErrorView.swift
└── Constants/
    ├── Teams.swift            # Team colors matching web constants/teams.ts
    ├── TireCompounds.swift    # Tire colors matching web constants/tire-compounds.ts
    ├── Glossary.swift         # All 59 terms from web constants/glossary.ts
    └── Design.swift           # Color palette, spacing constants
```

### State Management
- ViewModels: `@MainActor` + `@Observable` (iOS 17+) — equivalent to Zustand + TanStack Query combined
- Simple UI state (active tab, filter selection): `@State` on views
- Polling: `Task { while !Task.isCancelled { await fetch(); try await Task.sleep(for: .seconds(10)) } }`

### Design System (Swift)
Map Tailwind colors to Swift `Color` extensions:
```swift
extension Color {
    static let f1Red = Color(red: 0.882, green: 0.024, blue: 0)       // #E10600
    static let pitwallBase = Color(red: 0.035, green: 0.035, blue: 0.043)   // zinc-950 #09090B
    static let pitwallCard = Color(red: 0.059, green: 0.059, blue: 0.071)   // zinc-900 #18181B
    static let pitwallBorder = Color(red: 0.149, green: 0.149, blue: 0.165) // zinc-800 #27272A
    static let pitwallMuted = Color(red: 0.557, green: 0.557, blue: 0.600)  // zinc-500 #71717A
}
```

### API Rate Limiting
Use `AsyncSemaphore` or `actor`-based token bucket to honor:
- OpenF1: 3 requests/second
- Jolpica: 4 requests/second burst

### Replay Mode
Mirror the web's replay mode: store mock data from `web/src/mocks/` as Swift constants, implement a lap-by-lap timer using `Task.sleep` to simulate playback (same 0.5x/1x/2x/5x speeds).

---

## Step 3: Present the Plan

After exploring the web app and completing Step 2, **stop and present your architecture plan** to the user. Include:

1. A summary of what you read and understood from the web app
2. The complete iOS project structure (folder tree with brief descriptions)
3. How each web screen maps to iOS SwiftUI views
4. Any design or API decisions that differ from the web (and why)
5. The implementation order you recommend (which screen to build first)

**Ask the user:** "Does this architecture look right? Any changes before I start generating code?"

Do NOT write any Swift files until the user approves the plan.

---

## Step 4: Scaffold the iOS App

After approval, implement the iOS app in this order:

1. **Foundation** — `PitwallApp.swift`, `ContentView.swift` (TabView), `Constants/Design.swift`, color extensions, `Components/Card.swift`, `Components/Badge.swift`
2. **Services** — `APIClient.swift` (with rate limiter), `OpenF1Service.swift`, `JolpicaService.swift`, all `Models/`
3. **Dashboard** — `DashboardViewModel` + all Dashboard views (NextRaceCard, StandingsSnapshot, SeasonProgressBar, CountdownView)
4. **Calendar** — `CalendarViewModel` + RaceList, RaceCard (expandable), SessionTimes
5. **Standings** — `StandingsViewModel` + StandingsView with driver/constructor toggle, team color bars
6. **Live Companion** — `CompanionViewModel` (most complex) + RaceEventsPanel, TireStrategyPanel, WeatherPanel, SessionBanner, ReplayControls
7. **Learn F1** — `LearnViewModel` + GlossarySection (searchable), FlagsSection, WeekendSection, StrategySection, PointsSection

For each screen, after implementing, **ask the user** to review before moving to the next.

---

## Critical Design Rules

These rules ensure the iOS app feels like a native Pitwall — not a generic app:

- **Dark background always**: `.background(Color.pitwallBase)` on the root view. Use `.preferredColorScheme(.dark)` on the App.
- **Cards**: `RoundedRectangle(cornerRadius: 12)` filled with `Color.pitwallCard`, stroked with `Color.pitwallBorder` at 1pt
- **F1 Red accent**: Use `Color.f1Red` for active states, live indicators, and highlights — exactly as the web uses `text-f1-red`
- **Team colors**: Always use `Constants/Teams.swift` — never hardcode team colors in views
- **Tire colors**: Always use `Constants/TireCompounds.swift` — never hardcode compound colors in views
- **Live indicator**: Pulsing red dot + "LIVE" text for active sessions (use `withAnimation(.easeInOut.repeatForever())`)
- **Plain language**: Casual fan audience. Race events must include plain-language explanations (same explanations as web's `useRaceControl` hook)
- **No external dependencies**: Apple frameworks only — URLSession, SwiftData (or no persistence), Combine only if necessary
- **Minimum deployment**: iOS 17 (for `@Observable` macro)
- **Sprint badge**: Show "SPRINT WEEKEND" badge on applicable race cards (same as web's orange sprint badge)
- **Tire stint bars**: Horizontal `GeometryReader`-based bars, color = compound color, width proportional to laps driven

---

## Web-to-iOS Component Mapping Reference

| Web Component | iOS Equivalent |
|---|---|
| `Card.tsx` | `CardView` modifier or `GroupBox` with custom style |
| `Badge.tsx` | `Text` in `Capsule` with padding |
| `TeamColorBar.tsx` | `Rectangle().frame(width: 4)` with team color |
| `CountdownView.tsx` → `Countdown.tsx` | `CountdownView` with `Timer.publish` |
| `BottomNav.tsx` | `TabView` with `.tabItem` |
| `PageHeader.tsx` | `VStack(alignment: .leading)` with title + subtitle |
| `LoadingSpinner.tsx` | `ProgressView()` |
| `ErrorCard.tsx` | Custom `ErrorView` with retry button |
| `RaceEventsPanel` severity colors | info → `.blue`, warning → `.yellow`, danger → `.red` |
| `StandingsSnapshot` top-3 highlight | `Color.f1Red` text for positions 1–3 |
| `SeasonProgressBar` | `ProgressView(value:)` with custom tint |
| `ReplayControls` | Custom HStack with `Button` for play/pause, `Slider` for seek |

---

## Output Location

All Swift files go in: `Coder/Pitwall/ios/`

The Xcode project file (`Pitwall.xcodeproj`) goes in: `Coder/Pitwall/ios/`

After scaffolding, update `Coder/Pitwall/CLAUDE.md` to include the iOS stack, commands, and conventions.
