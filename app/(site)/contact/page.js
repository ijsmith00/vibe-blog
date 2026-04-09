import { SITE_NAME, absolutePageUrl } from "@/lib/site-config";

const CONTACT_EMAIL = "howtovibecoding@gmail.com";

export async function generateMetadata() {
  return {
    title: `문의 | ${SITE_NAME}`,
    description: `${SITE_NAME} 문의 — 방문 감사 인사와 이메일 연락 안내.`,
    alternates: {
      canonical: absolutePageUrl("/contact"),
    },
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl pb-20 pt-8 sm:pt-10">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl">
          문의
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          블로그에 방문해 주셔서 감사합니다. 글과 정보가 조금이나마 도움이 되고
          유익하게 쓰이기를 바랍니다.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          질문·협업·제안이 있으시면 아래 안내에 따라 이메일로 연락하시면
          최대한 신속하게 답변드리겠습니다.
        </p>
      </header>

      <section
        className="rounded-2xl border border-border bg-bg-main px-5 py-8 shadow-sm dark:border-dm-border dark:bg-dm-card sm:px-8 sm:py-10"
        aria-labelledby="contact-email-heading"
      >
        <h2
          id="contact-email-heading"
          className="text-sm font-semibold uppercase tracking-wider text-primary dark:text-blue-400"
        >
          이메일로 보내기
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          사용 중인 메일(웹메일·앱 등)에서 <strong>새 메일 작성</strong>을 연 뒤,
          받는 사람란에 아래 주소를 직접 입력해 보내 주세요.
        </p>
        <p className="mt-6">
          <span className="sr-only">문의 이메일 주소: </span>
          <span
            className="inline-block w-full break-all rounded-lg border border-border bg-secondary/60 px-4 py-3 font-mono text-base font-semibold tracking-tight text-text-main dark:border-dm-border dark:bg-dm-bg dark:text-dm-text sm:text-lg"
            translate="no"
          >
            {CONTACT_EMAIL}
          </span>
        </p>
      </section>
    </div>
  );
}
