import MaskedEmailLink from "@/app/components/MaskedEmailLink";
import {
  CONTACT_MAIL_DOMAIN,
  CONTACT_MAIL_LOCAL,
  SITE_NAME,
  absolutePageUrl,
} from "@/lib/site-config";

export async function generateMetadata() {
  return {
    title: `문의 | ${SITE_NAME}`,
    description: `${SITE_NAME} 문의 — 아래 이메일로 연락해 주세요.`,
    alternates: {
      canonical: absolutePageUrl("/contact"),
    },
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl pb-20 pt-8 sm:pt-10">
      <header className="mb-10 sm:mb-12">
        <div
          aria-hidden="true"
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-text-main/5 ring-1 ring-text-main/10 dark:bg-dm-text/10 dark:ring-dm-text/15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-text-main dark:text-dm-text"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl">
          문의
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          블로그에 방문해 주셔서 감사합니다. 글과 정보가 조금이나마 도움이 되고
          유익하게 쓰이기를 바랍니다.
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          질문·협업·제안이 있으시면 아래 이메일로 보내 주세요. 확인 후 가능한
          범위에서 답변드리겠습니다.
        </p>
      </header>

      <section
        aria-label="이메일로 문의"
        className="rounded-2xl border border-border bg-secondary/60 px-5 py-8 shadow-sm dark:border-dm-border dark:bg-dm-bg sm:px-8 sm:py-10"
      >
        <h2 className="text-base font-semibold uppercase tracking-wider text-primary sm:text-lg dark:text-blue-400">
          이메일로 문의하기
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
          제목과 본문을 적어 보내 주시면 됩니다. 회신이 필요하시면 보내시는
          주소를 꼭 확인해 주세요.
        </p>
        <p className="mt-6 text-lg font-medium text-text-main dark:text-dm-text">
          <MaskedEmailLink
            localPart={CONTACT_MAIL_LOCAL}
            domain={CONTACT_MAIL_DOMAIN}
            className="text-lg"
          />
        </p>
      </section>

      <section
        aria-label="문의 안내"
        className="mt-12 border-t border-text-main/10 pt-8 dark:border-dm-text/10 sm:mt-14"
      >
        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-semibold text-text-main dark:text-dm-text">
              응답 시간
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
              영업일 기준 평균 1–3일 이내 회신드리고 있습니다.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-text-main dark:text-dm-text">
              환영하는 문의
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
              콘텐츠 관련 질문, 오탈자 제보, 협업·광고 제안 등을 받고 있습니다.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-text-main dark:text-dm-text">
              개인정보 처리
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
              보내 주신 메일 내용은 답변 목적 외에는 사용되지 않습니다.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
