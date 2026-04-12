/**
 * ads.txt — IAB Authorized Digital Sellers (구글 애드센스)
 * @see https://support.google.com/adsense/answer/12171612
 *
 * `NEXT_PUBLIC_ADSENSE_ID`는 `ca-pub-xxxxxxxxxxxxxxxx` 형식.
 * ads.txt 한 줄에는 `ca-`를 뺀 `pub-xxxxxxxxxxxxxxxx`만 사용합니다.
 */

const GOOGLE_ADS_TXT_CERT = "f08c47fec0942fa0";

/**
 * @param {string | undefined} raw
 * @returns {string | null}
 */
function toPubIdForAdsTxt(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  if (!t) return null;
  const pub = t.startsWith("ca-") ? t.slice(3) : t;
  if (!/^pub-\d{16}$/.test(pub)) return null;
  return pub;
}

export function GET() {
  const pub = toPubIdForAdsTxt(process.env.NEXT_PUBLIC_ADSENSE_ID);
  if (!pub) {
    return new Response(
      [
        "# ads.txt — NEXT_PUBLIC_ADSENSE_ID가 없거나 형식이 올바르지 않습니다.",
        "# .env.local 예: NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx",
        "",
      ].join("\n"),
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  }

  const body = `google.com, ${pub}, DIRECT, ${GOOGLE_ADS_TXT_CERT}\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
