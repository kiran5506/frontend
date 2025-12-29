export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).end("Missing url query param");
  }

  try {
    // Validate allowed host(s) to avoid open proxy abuse
    const allowedHosts = ["localhost:5004", "localhost:5002"];
    const parsed = new URL(url);
    if (!allowedHosts.includes(parsed.host)) {
      return res.status(403).end("Host not allowed");
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).end(`Remote fetch failed: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");
    return res.status(200).send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error("image-proxy error:", err);
    return res.status(500).end("Proxy error");
  }
}
