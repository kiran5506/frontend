export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).end("Missing url query param");
  }

  try {
    // The frontend may pass either a full URL (https://...) or a plain
    // filename/key stored in S3 (e.g. "1764854832023_cw6y1t35esd.jpg").
    // If a plain filename is passed, prefix it with the configured S3 base URL.
    const s3Base = process.env.NEXT_PUBLIC_S3_BASE || process.env.S3_BASE_URL || 'https://bsfye-bucket.s3.us-east-1.amazonaws.com/';

    // Build the final URL. If `url` is not a fully-qualified URL, assume it's a key and prefix s3Base.
    let finalUrl = '';
    try {
      // try parsing as absolute URL
      const p = new URL(url);
      finalUrl = p.toString();
    } catch (e) {
      // treat as S3 key/path
      const key = String(url).replace(/^\/+/, '');
      finalUrl = s3Base.endsWith('/') ? s3Base + key : s3Base + '/' + key;
    }

    // Validate allowed host(s) to avoid open proxy abuse. Allow localhost (for dev),
    // the S3 base host from config, and the API/backend host configured for the frontend.
    const parsed = new URL(finalUrl);
    const allowedHosts = new Set(["localhost:5004", "localhost:5002"]);
    try {
      const s3Host = new URL(s3Base).host;
      allowedHosts.add(s3Host);
    } catch (e) {
      // ignore if s3Base isn't a URL — default s3Base above is a URL so this rarely hits
    }

    // Also allow the configured frontend API host (NEXT_PUBLIC_API_URL) so images served
    // by the backend (including numeric IPs) are allowed through the proxy.
    const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (apiBase) {
      try {
        const apiHost = new URL(apiBase).host;
        allowedHosts.add(apiHost);
      } catch (e) {
        // ignore parse errors
      }
    }

    if (!allowedHosts.has(parsed.host)) {
      return res.status(403).end("Host not allowed");
    }

    let response = await fetch(finalUrl);

    // If S3 returns 403 (AccessDenied) and we have server-side AWS credentials,
    // attempt a signed request using the AWS SDK so private objects can be fetched.
    if (response.status === 403) {
      const AWS_REGION = process.env.AWS_REGION || process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';
      const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
      const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

      if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
        try {
          const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
          const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

          const s3Client = new S3Client({
            region: AWS_REGION,
            credentials: {
              accessKeyId: AWS_ACCESS_KEY_ID,
              secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
          });

          // If finalUrl is an S3 URL, extract bucket and key; otherwise assume s3Base + key used earlier.
          const parsedFinal = new URL(finalUrl);
          let bucket = '';
          let key = '';
          if (parsedFinal.host.endsWith('amazonaws.com')) {
            // bucket.s3.region.amazonaws.com or s3.region.amazonaws.com/bucket
            const hostParts = parsedFinal.host.split('.');
            if (hostParts[1] === 's3') {
              bucket = hostParts[0];
              key = parsedFinal.pathname.replace(/^\/+/, '');
            } else {
              // fallback: assume path like /bucket/key
              const parts = parsedFinal.pathname.replace(/^\/+/, '').split('/');
              bucket = parts.shift();
              key = parts.join('/');
            }
          }

          if (bucket && key) {
            const command = new GetObjectCommand({ Bucket: bucket, Key: key });
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
            response = await fetch(signedUrl);
          }
        } catch (err) {
          console.error('signed-s3 fetch failed:', err);
        }
      }
    }

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
