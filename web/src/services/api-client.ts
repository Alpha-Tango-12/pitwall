export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public url: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private maxTokens: number,
    private refillRate: number,
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return;
    }
    const waitMs = (1 / this.refillRate) * 1000;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    this.refill();
    this.tokens--;
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

const openf1Limiter = new RateLimiter(3, 3);
const jolpicaLimiter = new RateLimiter(4, 4);

export async function fetchOpenF1<T>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<T[]> {
  await openf1Limiter.acquire();
  const url = buildUrl("https://api.openf1.org/v1", endpoint, params);
  return fetchJson<T[]>(url);
}

export async function fetchJolpica<T>(path: string): Promise<T> {
  await jolpicaLimiter.acquire();
  const url = `https://api.jolpi.ca/ergast/f1/${path}`;
  return fetchJson<T>(url);
}

function buildUrl(
  base: string,
  endpoint: string,
  params?: Record<string, string | number>,
): string {
  const url = new URL(`${base}/${endpoint}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      url,
    );
  }
  return response.json() as Promise<T>;
}
