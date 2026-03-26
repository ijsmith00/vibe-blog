import Image from "next/image";
import Link from "next/link";

import { ABOUT_PROFILE_IMAGE_PATH, SITE_NAME } from "@/lib/site-config";

/** 소개 페이지 히어로에 표시되는 운영자 이름 */
const OPERATOR_DISPLAY_NAME = "바이브 빌더";

export async function generateMetadata() {
  return {
    title: `소개 | ${SITE_NAME}`,
    description: `${SITE_NAME}는 바이브 코딩과 수익형 블로그 운영 노하우를 나누는 공간입니다. 운영자의 목표와 다루는 주제, 문의 방법을 안내합니다.`,
  };
}

/**
 * @param {string} name
 */
function getInitials(name) {
  const t = (name || "").trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = [...parts[0]][0] ?? "";
    const b = [...parts[1]][0] ?? "";
    return (a + b).slice(0, 2);
  }
  return [...t].slice(0, 2).join("");
}

const sectionClass =
  "scroll-mt-24 rounded-2xl border border-border bg-bg-main px-5 py-8 shadow-sm dark:border-dm-border dark:bg-dm-card sm:px-8 sm:py-10";

export default function AboutPage() {
  const profileSrc = (ABOUT_PROFILE_IMAGE_PATH || "").trim();
  const hasProfileImage = profileSrc.length > 0;
  const initials = getInitials(OPERATOR_DISPLAY_NAME);

  return (
    <div className="mx-auto w-full max-w-3xl pb-20 pt-8 sm:pt-10">
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-secondary/80 to-bg-main px-5 py-10 text-center dark:from-dm-card/80 dark:to-dm-bg sm:px-8 sm:py-12 sm:text-left"
        aria-labelledby="about-hero-heading"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
          <div className="relative shrink-0">
            {hasProfileImage ? (
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-primary/20 dark:border-dm-bg dark:ring-blue-500/30 sm:h-32 sm:w-32">
                <Image
                  src={profileSrc}
                  alt={`${OPERATOR_DISPLAY_NAME} 프로필 사진`}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            ) : (
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary text-2xl font-bold text-white shadow-md ring-2 ring-primary/25 dark:border-dm-bg dark:bg-blue-600 dark:ring-blue-500/40 sm:h-32 sm:w-32 sm:text-3xl"
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary dark:text-blue-400">
              소개
            </p>
            <h1
              id="about-hero-heading"
              className="mt-1 text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl"
            >
              {OPERATOR_DISPLAY_NAME}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-text-sub dark:text-dm-muted sm:text-lg">
              코딩이 낯설어도 괜찮아요—짧은 기간 안에 블로그를 만들고, 꾸준히 성장하는
              여정을 함께합니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
        <section className={sectionClass} aria-labelledby="about-why">
          <h2
            id="about-why"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            이 블로그를 만든 이유
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p>
              처음 블로그를 시작하려는 분들은 정보는 많은데 무엇부터 해야 할지 막막할 때가
              많습니다. 도메인, 호스팅, 글쓰기, 수익화까지 검색만 하다 보면 시간만
              흘러가고 실행은 늦어지기 쉽습니다. 저 역시 비슷한 시행착오를 겪으며
              &quot;짧은 기간에 최소한의 기능으로 시작하고, 익숙해지면서 조금씩
              확장한다&quot;는 방식이 가장 현실적이라는 걸 느꼈습니다.
            </p>
            <p>
              그래서 이 블로그는 거창한 이론보다는 바이브 코딩처럼 빠르게 만들고
              고치며 배우는 과정을 솔직하게 기록하려고 합니다. 혼자 삽질하며 얻은 팁과
              실수를 공유해, 같은 길을 걷는 분들이 조금이라도 덜 헤매고 자신만의 속도로
              성장할 수 있기를 바랍니다. 작은 한 걸음이 쌓이면 결국 수익형 블로그로
              이어질 수 있다는 믿음으로 글을 이어가겠습니다.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="about-topics">
          <h2
            id="about-topics"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            블로그에서 다루는 주제
          </h2>
          <ul className="mt-5 list-inside list-disc space-y-2.5 text-[0.9375rem] leading-relaxed text-text-sub marker:text-primary dark:text-dm-muted dark:marker:text-blue-400 sm:text-base">
            <li>
              <strong className="font-semibold text-text-main dark:text-dm-text">
                바이브 코딩
              </strong>
              — Next.js 등으로 블로그를 구축하고 배포·운영하는 실전 노하우
            </li>
            <li>
              <strong className="font-semibold text-text-main dark:text-dm-text">
                수익화 블로그 운영
              </strong>
              — 애드센스, 키워드, SEO·콘텐츠 전략 등 수익과 운영에 필요한 정보
            </li>
            <li>
              <strong className="font-semibold text-text-main dark:text-dm-text">
                IT 정보
              </strong>
              — 도구, 보안, 생산성 등 블로거에게 유용한 IT 소식과 팁
            </li>
          </ul>
        </section>

        <section className={sectionClass} aria-labelledby="about-author">
          <h2
            id="about-author"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            운영자 소개
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p>
              블로그 운영과 콘텐츠 제작, 글쓰기기에 관심이 많고, 직접 만들고 배우는 과정을
              즐기는 편입니다. 새로운 도구와 트렌드는 빠르게 익히되, 글에서는 가능한
              쉽게 풀어 독자분들이 바로 적용해 보실 수 있도록 노력하고 있습니다.
            </p>
            <p>
              관심사로는 테크니컬 라이팅, 독서와 글쓰기, 그리고 장기적으로 블로그
              한 줄기로 꾸준한 수익 구조를 만드는 일에 큰 흥미를 둡니다. 질문이나
              제안이 있으시면 아래 버튼으로 편하게 연락 주세요.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 sm:mt-14">
        <Link
          href="/contact"
          className="inline-flex min-h-11 w-full max-w-sm items-center justify-center rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto sm:min-w-[12rem] sm:text-base"
        >
          문의하기
        </Link>
        <p className="text-center text-xs text-text-sub dark:text-dm-muted">
          문의 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
}
