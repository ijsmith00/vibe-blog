import Image from "next/image";
import Link from "next/link";

import {
  ABOUT_PROFILE_IMAGE_PATH,
  SITE_NAME,
  absolutePageUrl,
} from "@/lib/site-config";

/** 소개 페이지 히어로에 표시되는 이름 */
const OPERATOR_DISPLAY_NAME = "아이다호 편집자";

export async function generateMetadata() {
  const description =
    "미국 북부 아이다호 작은 마을에서 쓰는 글입니다. 시골 적응기와 리모트로 IT 도서를 편집하며 AI·코딩을 익혀 가는 기록을 담습니다.";
  return {
    title: `소개 | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: absolutePageUrl("/about"),
    },
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

const emStrong =
  "font-semibold text-text-main dark:text-dm-text";

/** 섹션 본문 첫 문장 */
const leadFirst =
  "font-medium text-text-main dark:text-dm-text";

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
              소개 · 운영 철학
            </p>
            <h1
              id="about-hero-heading"
              className="mt-1 text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl"
            >
              {OPERATOR_DISPLAY_NAME}
            </h1>
            <p className="mt-3 text-base font-medium leading-relaxed text-text-main dark:text-dm-text sm:text-lg">
              미국 북부 아이다호의 작은 마을에서 글을 씁니다. 시골 적응기와
              리모트 편집 일, 그리고 AI 도구를 천천히 익혀 가는 과정을 이곳에
              남깁니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
        <section className={sectionClass} aria-labelledby="about-opening">
          <h2
            id="about-opening"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            이 글을 쓰는 곳
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p className={leadFirst}>
              안녕하세요. 미국 북부 아이다호의 작은 마을에서 이 글을 씁니다.
            </p>
            <p>
              여기 도착한 날짜가 2026년 1월 1일이니까 이제 막 4개월 됐네요.
              한국식당도 없고 아시안 마켓도 하나 없는 그야말로 깡촌인데, 창밖
              풍경 하나는 진짜 매일 봐도 질리지 않습니다. 타운에서 조금만
              벗어나면 핸드폰 신호가 끊겨서 강제로 디지털 디톡스를 하게 되는
              곳이에요. 미국 와서 유튜브나 한번 해볼까 싶었는데, 카페에서도
              길에서도 폰을 들여다보는 사람이 거의 없어서 카메라 들 엄두가 안
              나더라고요. 그래서 결국 시작한 게 이 블로그입니다.
            </p>
            <p>
              30대 중반 직장 생활에 회의가 들어 내 평생 진로를 진지하게
              고민했습니다. 그때 기준이 좀 단순했어요. &apos;뭘 해야 돈을 많이
              버나&apos;가 아니라, &apos;내가 24시간 해도 안 질릴 만한 일이
              뭐냐, 그러면서 혼자 먹고살 정도는 벌 수 있느냐&apos;. 그렇게
              골라낸 답이 번역가였습니다. 시간과 장소에 매이지 않고, 언어로 하는
              일이고, 무엇보다 내 이름 찍힌 책이 나오니까 허영도 채워주고요.
              고민의 과정은 좀 길었지만, 결정하고 난 후에는 모든 게 신속하게
              진행됐습니다. 다니던 직장에 사직 의사를 전하고 국내에서 제일
              빡세다는 번역 아카데미에 등록했습니다. 그때 밤낮없이 과제 매달리던
              기억이 아직도 생생합니다.
            </p>
            <p>
              데뷔한 후 번역가로서 받은 일은 사실 제 원래 취향(심리학, 문학)과는
              좀 달랐어요. 물리학 전공이라는 배경 때문에 과학, 사회과학,
              프로그래밍 책이 주로 들어왔거든요. (번역 수주할 때는 이 배경이라는
              게 꽤 크게 작용합니다.) 그러다 일하면서 인연이 닿은 분에게
              스카우트를 받아 한 IT 회사의 출판·번역 책임자로 일하게 됐고,
              거기서 저자 섭외부터 인쇄, 배포까지 출판 전 과정을 처음부터 끝까지
              배웠습니다.
            </p>
            <p>
              결혼하면서 잠시 일을 쉬다가, 회사에서 일할 때 알게 된 분 추천으로
              작은 IT 도서 출판사에 교정자로 들어갔습니다. 그게 벌써 10년 전
              일이에요. 처음 들어갔을 때 대표님 포함 정규 직원이 4명, 저까지
              5명. 완전 재택에 자율성이 어찌나 높은지, 주변에 회사 얘기할 때
              농담 반 진담 반으로 &apos;한국의 구글 다닌다&apos;고 했습니다. 그
              인연이 지금까지 이어져서 10년 차 편집자로 일하고 있어요. 직원은 한
              명 늘어 6명이 됐고, 다들 전국 각지(그리고 이제는 세계 각지, 그러니까
              저)에 흩어져 일합니다.
            </p>
            <p>
              저희 출판사는 DeepL이 한국에 정식 서비스를 하기도 전부터 그걸
              써보던 회사입니다. AI 관련 신간을 국내에서 가장 빠르게 내는 축에
              들고요. 저는 원래 신문물에 좀 느린 편인데, 회사 책 리뷰를 맡다
              보니 어쩔 수 없이 이런저런 AI 도구와 배경 이론을 접하게 됐습니다.
              최근엔 커서(Cursor) 같은 AI 코딩 도구로 직접 만들어 보면서 개인 블로그도
              직접 만들고, 게임도 하나 만들어봤어요. 진짜로 작동하는 게
              신기했고, 동시에 이걸 모르면 앞으로 정말 뒤처지겠다는 위기감이 꽤
              절실하게 들었습니다.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="about-direction">
          <h2
            id="about-direction"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            이 블로그가 나아가는 방향
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p className={leadFirst}>
              이 블로그는 그래서 두 갈래로 굴러갑니다.
            </p>
            <p>
              하나는{" "}
              <strong className={emStrong}>미국 시골 적응기</strong>입니다. 아이는
              한 교실에 5학년부터 8학년이 같이 앉아 있는 작은 학교를 다니고,
              한국 식당이 없으니 살기 위해 요리를 해야 해서 요리 실력이 나날이
              느는, 그런 시시콜콜한 일상 이야기와 아이 학교 이야기, 요리
              이야기.
            </p>
            <p>
              또 하나는{" "}
              <strong className={emStrong}>
                리모트로 IT 도서를 편집하면서 AI 코딩을 익혀 가는 이야기
              </strong>
              입니다. (이 부분은 앞으로 서서히 내용을 채워 가겠습니다.) 코딩
              경험 전무한 제가 새 도구를 붙드는 게 어떻게 가능했는지, 어디서
              막히고 어디서 뚫리는지를 가감 없이 적어보려고 합니다.
            </p>
            <p className={leadFirst}>천천히 둘러봐 주세요.</p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="about-author">
          <h2
            id="about-author"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            운영자 소개
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p className={leadFirst}>
              <strong className={emStrong}>아이다호 편집자</strong>라는 이름으로
              글을 씁니다. 번역 아카데미를 거쳐 과학·프로그래밍 등 비문학
              번역으로 데뷔했고, IT 출판사에서 출판·번역 업무를 거친 뒤 작은 IT
              도서 출판사에서 교정·편집을 맡아 온 지 10년이 넘었습니다.
            </p>
            <p>
              지금은{" "}
              <strong className={emStrong}>
                미국 아이다호의 작은 마을에 거주하며 같은 출판사 일을 리모트로
              </strong>
              이어 가고 있습니다. 회사 일로 AI 도구와 이론을 일찍 접했고, 그
              연장선에서 블로그와 작은 프로젝트를 직접 만들어 보기도 했습니다.
              다만 이 공간에서는 우선{" "}
              <strong className={emStrong}>
                시골 생활과 편집자로서의 시선
              </strong>
              을 중심에 두고, 기술 이야기는 천천히 차곡차곡 쌓아 가려 합니다.
            </p>
            <p>
              <strong className={emStrong}>
                복잡한 것을 읽기 쉬운 문장으로 옮기고, 글의 뼈대를 세우는 일
              </strong>
              이 오랜 직업이었습니다. 이 블로그의 글도 그 습관을 따라, 제가 겪고
              배운 것을 가능한 한 솔직하게 적어 보려 합니다.
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
            <p className={leadFirst}>
              협업·콘텐츠 관련 제안은 문의 페이지의 양식으로 접수합니다.
            </p>
            <p>
              <Link
                href="/contact"
                className="font-semibold text-primary underline decoration-1 underline-offset-2 transition hover:text-primary/90 dark:text-blue-400 dark:hover:text-blue-300"
              >
                문의 페이지로 이동
              </Link>
              하여 내용을 남겨 주시면, 확인 후 가능한 범위에서 답변드립니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
