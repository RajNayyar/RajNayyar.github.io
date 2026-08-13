const API_BASE = "https://freehoroscopeapi.com/api/v1/get-horoscope/daily";
const SIGNS = new Set(["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/horoscope") {
      const sign = (url.searchParams.get("sign") || "").toLowerCase();
      if (!SIGNS.has(sign)) {
        return Response.json({ error: "Unsupported zodiac sign" }, { status: 400 });
      }

      try {
        const upstream = await fetch(`${API_BASE}?sign=${encodeURIComponent(sign)}`, {
          headers: { Accept: "application/json" },
          cf: { cacheTtl: 21600, cacheEverything: true }
        });
        if (!upstream.ok) throw new Error(`Upstream returned ${upstream.status}`);
        const payload = await upstream.json();
        return Response.json(payload, {
          headers: { "Cache-Control": "public, max-age=3600, s-maxage=21600" }
        });
      } catch {
        return Response.json({ error: "Daily reading is temporarily unavailable" }, { status: 503 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
