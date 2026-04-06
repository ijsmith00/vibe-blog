import { SITE_NAME, absolutePageUrl } from "@/lib/site-config";

const CONTACT_EMAIL = "howtovibecoding@gmail.com";

export async function generateMetadata() {
  return {
    title: `문의 | ${SITE_NAME}`,
    description: `${SITE_NAME} 문의 — 질문·협업·제안은 이메일로 연락해 주세요.`,
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
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          질문·협업·제안이 있으시면 아래 메일로 편하게 보내 주세요. 가능한 빨리
          확인해 답변드리겠습니다.
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
          이메일
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          메일 앱이 열리면 제목과 내용을 적어 보내 주시면 됩니다.
        </p>
        <p className="mt-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="break-all text-lg font-semibold text-primary underline decoration-1 underline-offset-2 transition hover:text-primary/90 dark:text-blue-400 dark:hover:text-blue-300 sm:text-xl"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>
    </div>
  );
}
