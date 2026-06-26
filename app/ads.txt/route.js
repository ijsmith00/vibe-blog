/**
 * ads.txt — IAB Authorized Digital Sellers (구글 애드센스)
 * @see https://support.google.com/adsense/answer/12171612
 *
 * 퍼블리셔 ID는 `lib/config.js`의 `ADSENSE_PUBLISHER_ID`와 동일합니다.
 */

import { getAdsensePubIdForAdsTxt } from "@/lib/config";

const GOOGLE_ADS_TXT_CERT = "f08c47fec0942fa0";

export function GET() {
  const pub = getAdsensePubIdForAdsTxt();
  if (!pub) {
    return new Response(
      [
        "# ads.txt — lib/config.js ADSENSE_PUBLISHER_ID 형식이 올바르지 않습니다.",
        "# 예: ADSENSE_PUBLISHER_ID = \"ca-pub-xxxxxxxxxxxxxxxx\"",
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
      "Cache-Control": "public, max-age=3600",
    },
  });
}
