import SwiftUI

struct WeatherPanelView: View {
    let weather: WeatherConditions

    private var isRaining: Bool { weather.rainfall > 0 }

    private func windDirection(_ degrees: Double) -> String {
        let dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let index = Int(((degrees + 22.5) / 45).truncatingRemainder(dividingBy: 8))
        return dirs[index]
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Rain alert
            if isRaining {
                HStack(spacing: 8) {
                    Image(systemName: "cloud.rain.fill")
                        .font(.system(size: 13))
                        .foregroundStyle(Color(hex: "#93C5FD"))  // blue-300
                    Text("Rain detected on track")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundStyle(Color(hex: "#93C5FD"))
                    Text("— tire strategy may change")
                        .font(.system(size: 13))
                        .foregroundStyle(Color(hex: "#60A5FA"))  // blue-400
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(Color(hex: "#0C1220"))
                .clipShape(RoundedRectangle(cornerRadius: 8))
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color(hex: "#1E3A5F"), lineWidth: 1)
                )
            }

            // Stats grid (2 columns)
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                WeatherStatView(icon: "thermometer", label: "Air Temp",   value: String(format: "%.1f", weather.airTemp),   unit: "°C")
                WeatherStatView(icon: "thermometer.high", label: "Track Temp", value: String(format: "%.1f", weather.trackTemp), unit: "°C")
                WeatherStatView(icon: "humidity",      label: "Humidity", value: String(format: "%.0f", weather.humidity),  unit: "%")
                WeatherStatView(icon: "wind",          label: "Wind (\(windDirection(weather.windDirection)))", value: String(format: "%.1f", weather.windSpeed), unit: "m/s")
                WeatherStatView(icon: "gauge",         label: "Pressure", value: String(format: "%.0f", weather.pressure),  unit: "hPa")
                WeatherStatView(icon: "cloud.rain",    label: "Rainfall", value: String(format: "%.1f", weather.rainfall),  unit: "mm", highlight: isRaining)
            }

            // Tire wear note
            let deltaDiff = weather.trackTemp - weather.airTemp
            Text("Track is \(deltaDiff > 10 ? "much " : "")warmer than air — tires will degrade \(weather.trackTemp > 45 ? "quickly" : "at a normal rate").")
                .font(.system(size: 11))
                .foregroundStyle(Color.pitwallMuted)
        }
        .cardStyle()
    }
}

private struct WeatherStatView: View {
    let icon: String
    let label: String
    let value: String
    let unit: String
    var highlight: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 11))
                    .foregroundStyle(highlight ? Color(hex: "#60A5FA") : Color.pitwallMuted)
                Text(label)
                    .font(.system(size: 11))
                    .foregroundStyle(highlight ? Color(hex: "#60A5FA") : Color.pitwallMuted)
            }
            HStack(alignment: .lastTextBaseline, spacing: 2) {
                Text(value)
                    .font(.system(size: 20, weight: .bold))
                    .foregroundStyle(highlight ? Color(hex: "#93C5FD") : .white)
                Text(unit)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.pitwallMuted)
            }
        }
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(highlight ? Color(hex: "#0C1220") : Color.pitwallBorder)
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(highlight ? Color(hex: "#1E3A5F") : Color.clear, lineWidth: 1)
        )
    }
}
