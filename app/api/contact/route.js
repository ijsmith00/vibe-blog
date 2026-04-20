import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const MAX = {
  name: 200,
  email: 320,
  subject: 300,
  message: 8000,
};

function getAccessKey() {
  const primary =
    typeof process.env.WEB3FORMS_ACCESS_KEY === "string"
      ? process.env.WEB3FORMS_ACCESS_KEY.trim()
      : "";
  if (primary) return primary;
  const legacy =
    typeof process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY === "string"
      ? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.trim()
      : "";
  return legacy;
}

function clamp(str, max) {
  if (typeof str !== "string") return "";
  const t = str.trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function POST(request) {
  const accessKey = getAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      {
        success: false,
        message:
          "문의 폼이 서버에 연결되지 않았습니다. WEB3FORMS_ACCESS_KEY 환경 변수를 확인해 주세요.",
      },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const name = clamp(body?.name, MAX.name);
  const email = clamp(body?.email, MAX.email);
  const subject = clamp(body?.subject, MAX.subject);
  const message = clamp(body?.message, MAX.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: "필수 항목을 모두 입력해 주세요." },
      { status: 400 },
    );
  }

  const upstream = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject,
      message,
    }),
  });

  const data = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status });
}
