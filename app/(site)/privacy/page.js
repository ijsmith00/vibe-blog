import { SITE_NAME } from "@/lib/site-config";
import { getPrivacyPolicy } from "@/lib/privacy-policy";

export async function generateMetadata() {
  return {
    title: `개인정보처리방침 | ${SITE_NAME}`,
    description: `${SITE_NAME} 개인정보처리방침`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PrivacyPage() {
  const { html, updatedLabel } = await getPrivacyPolicy();

  return (
    <div className="mx-auto w-full max-w-3xl pb-16 pt-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl">
        개인정보처리방침
      </h1>
      {updatedLabel ? (
        <p className="mt-3 text-sm text-text-sub dark:text-dm-muted">
          최종 업데이트: {updatedLabel}
        </p>
      ) : null}

      {html ? (
        <article
          className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-a:text-primary dark:prose-a:text-blue-400"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="mt-8 text-text-sub dark:text-dm-muted">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm dark:bg-dm-card">
            content/privacy.md
          </code>{" "}
          파일을 추가한 뒤 본문을 작성해 주세요.
        </p>
      )}
    </div>
  );
}
