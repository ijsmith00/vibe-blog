import Image from "next/image";

import { ABOUT_PROFILE_IMAGE_PATH, SITE_NAME } from "@/lib/site-config";

/** 소개 페이지 히어로에 표시되는 운영자 이름 */
const OPERATOR_DISPLAY_NAME = "바이브 빌더";

export async function generateMetadata() {
  return {
    title: `소개 | ${SITE_NAME}`,
    description: `${SITE_NAME}는 바이브 코딩으로 다양한 실험을 해보고 그 노하우를 나누는 공간입니다.`,
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
              에이전틱 AI와 바이브 코딩으로 이것저것 만들어 보면서 배운 노하우와 결과물을 나누고, 꾸준히 성장하는
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
            <p className="font-medium text-text-main dark:text-dm-text">
              솔직히 말씀드리면, 불안함에서 시작했습니다.
            </p>
            <p>
              생성 AI가 등장한 이후 그 발전 속도가 너무 빨라서 따라가지 못하는
              느낌이 점점 커졌습니다. 그러던 중 블로그로 뭔가 해보겠다고 100만
              원이 넘는 돈을 쏟아부었는데, 결말은 허무했습니다. 플랫폼 종속의 한계
              + 다음 저품질 콤보에 조용히 손을 들고 말았거든요. 내 공간인 줄
              알았는데, 알고 보니 내 공간이 아니었던 겁니다.
            </p>
            <p>
              ‘그럼 아예 직접 만들면 어떨까?’ 막연하게 생각하던 그 즈음, 바이브 코딩
              붐이 일었습니다. 그리고 문득 이런 생각이 들었습니다.
            </p>
            <p className="text-lg font-semibold text-primary dark:text-blue-400">
              나도 혹시… 될까?
            </p>
            <p>
              일단 Claude한테 물어봤습니다. &quot;바이브 코딩으로 수익형 블로그
              만들고 싶은데, 어떻게 하면 돼?&quot;라고요. 그랬더니 260페이지짜리
              가이드를 써주더군요. 반신반의하면서 일단 따라 해봤습니다.
            </p>
            <p className="font-semibold text-text-main dark:text-dm-text">
              딱 3일이었습니다.
            </p>
            <p>
              3일 만에 플랫폼에 종속되지 않은 진짜 내 블로그가 생겼습니다. 더
              놀라웠던 건 생각보다 훨씬 할 만했다는 점입니다. 겁먹었던 것에 비하면,
              제가 직접 해야 할 일이 그렇게 많지 않았거든요.
            </p>
            <p className="font-medium text-text-main dark:text-dm-text">
              그 경험을 하고 나니 이런 생각이 들었습니다.
            </p>
            <p>
              이건 블로그만의 이야기가 아니구나. 바이브 코딩, 대체 어디까지 되는
              거지?
            </p>
            <p>
              그래서 이 블로그에서는 바이브 코딩으로 이것저것 실험해볼 생각입니다.
              잘 된 것도, 안 된 것도, 제대로 삽질한 것도 — 그 좌충우돌 경험담과
              거기서 배운 것들을 있는 그대로 공유해 보겠습니다.
            </p>
            <p className="text-text-main dark:text-dm-text">
              기대하셔도 좋습니다. 😄
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
              — Next.js 등으로 블로그를 구축하고 배포·운영하는 실전 노하우, 에이전틱 AI와 함께 실험하는 과정
            </li>
            <li>
              <strong className="font-semibold text-text-main dark:text-dm-text">
                수익화 블로그 운영
              </strong>
              — 애드센스, 키워드, SEO·콘텐츠 전략 등 수익과 운영에 필요한 정보
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
              블로그 운영과 콘텐츠 제작, 글쓰기에 관심이 많고, 직접 만들고 배우는 과정을
              즐기는 편입니다. 새로운 도구와 트렌드는 빠르게 익히되, 글에서는 가능한
              쉽게 풀어 독자분들이 바로 적용해 보실 수 있도록 노력하고 있습니다.
            </p>
            <p>
              관심사로는 테크니컬 라이팅, 독서와 글쓰기, 그리고 장기적으로 블로그
              한 줄기로 꾸준한 수익 구조를 만드는 일에 큰 흥미가 있습니다.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="about-contact">
          <h2
            id="about-contact"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            문의
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p>
              질문·협업·제안이 있으시면 아래 메일로 편하게 보내 주세요. 가능한 빨리
              확인해 답변드리겠습니다.
            </p>
            <p>
              <a
                href="mailto:howtovibecoding@gmail.com"
                className="break-all text-base font-semibold text-primary underline decoration-1 underline-offset-2 transition hover:text-primary/90 dark:text-blue-400 dark:hover:text-blue-300 sm:text-lg"
              >
                howtovibecoding@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
