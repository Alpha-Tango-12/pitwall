import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }

            CalendarView()
                .tabItem {
                    Label("Calendar", systemImage: "calendar")
                }

            StandingsView()
                .tabItem {
                    Label("Standings", systemImage: "trophy.fill")
                }

            CompanionView()
                .tabItem {
                    Label("Live", systemImage: "dot.radiowaves.left.and.right")
                }

            LearnView()
                .tabItem {
                    Label("Learn", systemImage: "book.fill")
                }
        }
        .tint(Color.f1Red)
    }
}
