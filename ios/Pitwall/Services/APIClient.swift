import Foundation

// MARK: - Rate limiter (actor for thread safety)

actor RateLimiter {
    private var tokens: Double
    private let maxTokens: Double
    private let refillRate: Double  // tokens per second
    private var lastRefill: Date = .now

    init(maxTokens: Double, refillRate: Double) {
        self.maxTokens = maxTokens
        self.refillRate = refillRate
        self.tokens = maxTokens
    }

    func acquire() async {
        refill()
        if tokens >= 1 {
            tokens -= 1
            return
        }
        let waitSeconds = 1.0 / refillRate
        let waitNanos = UInt64(waitSeconds * 1_000_000_000)
        try? await Task.sleep(nanoseconds: waitNanos)
        refill()
        tokens -= 1
    }

    private func refill() {
        let now = Date()
        let elapsed = now.timeIntervalSince(lastRefill)
        tokens = min(maxTokens, tokens + elapsed * refillRate)
        lastRefill = now
    }
}

// MARK: - Shared limiters

let openF1Limiter = RateLimiter(maxTokens: 3, refillRate: 3)
let jolpicaLimiter = RateLimiter(maxTokens: 4, refillRate: 4)

// MARK: - API error

enum APIError: LocalizedError {
    case httpError(Int, String)
    case decodingError(Error)
    case invalidURL

    var errorDescription: String? {
        switch self {
        case .httpError(let code, let url): return "HTTP \(code) for \(url)"
        case .decodingError(let e): return "Decoding error: \(e.localizedDescription)"
        case .invalidURL: return "Invalid URL"
        }
    }
}

// MARK: - Fetch helpers

func fetchOpenF1<T: Decodable>(_ endpoint: String, params: [String: String] = [:]) async throws -> [T] {
    await openF1Limiter.acquire()
    var components = URLComponents(string: "https://api.openf1.org/v1/\(endpoint)")!
    components.queryItems = params.map { URLQueryItem(name: $0.key, value: $0.value) }
    guard let url = components.url else { throw APIError.invalidURL }
    return try await fetchJSON([T].self, from: url)
}

func fetchJolpica<T: Decodable>(_ path: String) async throws -> T {
    await jolpicaLimiter.acquire()
    guard let url = URL(string: "https://api.jolpi.ca/ergast/f1/\(path)") else {
        throw APIError.invalidURL
    }
    return try await fetchJSON(T.self, from: url)
}

private func fetchJSON<T: Decodable>(_ type: T.Type, from url: URL) async throws -> T {
    let (data, response) = try await URLSession.shared.data(from: url)
    if let http = response as? HTTPURLResponse, http.statusCode != 200 {
        throw APIError.httpError(http.statusCode, url.absoluteString)
    }
    do {
        return try JSONDecoder().decode(type, from: data)
    } catch {
        throw APIError.decodingError(error)
    }
}
