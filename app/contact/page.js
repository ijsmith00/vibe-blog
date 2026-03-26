import ContactForm from "@/app/components/ContactForm";
import {
  CONTACT_MAIL_DOMAIN,
  CONTACT_MAIL_LOCAL,
  SITE_NAME,
} from "@/lib/site-config";

export async function generateMetadata() {
  return {
    title: `문의하기 | ${SITE_NAME}`,
    description: `${SITE_NAME}에 대한 문의·광고·오류 신고를 남기실 수 있습니다. 이름과 이메일을 남기시면 확인 후 답변드립니다.`,
  };
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl pb-20 pt-8 sm:pt-10">
      <header className="mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl">
          문의하기
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
          궁금한 점, 제휴·광고 문의, 사이트 오류 제보 등 아래 양식을 작성해 주세요.
          필수 항목을 모두 입력한 뒤 제출해 주시면 확인 후 등록하신 이메일로
          답변드리겠습니다.
        </p>
      </header>

      <ContactForm mailLocal={CONTACT_MAIL_LOCAL} mailDomain={CONTACT_MAIL_DOMAIN} />
    </div>
  );
}
