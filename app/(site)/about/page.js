import Image from "next/image";
import Link from "next/link";

import {
  ABOUT_PROFILE_IMAGE_PATH,
  SITE_NAME,
  absolutePageUrl,
} from "@/lib/site-config";

/** 소개 페이지 히어로에 표시되는 운영자 이름 */
const OPERATOR_DISPLAY_NAME = "바이브 빌더";

export async function generateMetadata() {
  const description =
    "10년 차 테크니컬 에디터가 미국 현지에서 실험하는 AI 개발 방법론과 바이브 코딩(Vibe Coding) 실전 노하우를 공유합니다. " +
    "IT·과학 도서 역서 10권 이상 번역·편집 경험을 바탕으로, 지속 가능한 독립 플랫폼 구축과 디지털 자산의 가치를 제시합니다.";
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

/** 섹션 본문 첫 문장 — E-E-A-T·문맥 신호용 */
const leadFirst =
  "font-medium text-text-main dark:text-dm-text";

const categoryLinkClass =
  "inline-flex items-center gap-1 rounded-lg font-semibold text-primary underline decoration-2 underline-offset-2 transition hover:bg-primary/5 hover:text-primary/90 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300";

const ctaPillClass =
  "ml-1 inline-flex shrink-0 items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary dark:border-blue-500/40 dark:bg-blue-500/15 dark:text-blue-300";

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
              IT·과학 도서 역서 10권 이상을 번역했고, IT 전문 출판사에서 테크니컬
              에디터로 십 년 가까이 일했습니다. 현재는 미국에 거주하며, AI 개발
              방법론과 바이브 코딩 실험 결과를 이 블로그에 기록합니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
        <section className={sectionClass} aria-labelledby="about-vibe-def">
          <h2
            id="about-vibe-def"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            바이브 코딩이란?
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p className={leadFirst}>
              바이브 코딩(Vibe Coding)은 인간이 방향·기준·책임을 설정하고, AI가
              생산 속도와 반복 작업을 맡는 협업 방식으로 정의합니다.
            </p>
            <p>
              코드 한 줄을 모두 외우지 않아도, 아키텍처와 품질 기준을 운영자가
              제시하면 AI가 구현 초안·리팩터링·문서화를 병렬로 밀어 넣을 수 있습니다.
              핵심은 도구에 맡기는 범위와 검증 책임을 어디에 두느냐입니다.
            </p>
            <p>
              이 블로그는 그 경계를 실제 프로덕트 수준에서 시험하고, 성공·실패
              사례를 재현 가능한 절차로 정리합니다. 독자에게는 &apos;무엇을 AI에
              맡기고 무엇을 사람이 지켜야 하는지&apos;를 명료하게 제시하는 것을
              목표로 합니다.
            </p>
            <p>
              결과적으로 바이브 코딩은 단순한 코딩 편의를 넘어,{" "}
              <strong className={emStrong}>
                지속 가능한 독립 플랫폼을 설계·운영하는 방법론
              </strong>
              으로 확장됩니다. 여기에 축적된 기록은 디지털 자산의 가치를 높이는
              한 축이 됩니다.
            </p>
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="about-why">
          <h2
            id="about-why"
            className="text-xl font-bold tracking-tight text-text-main dark:text-dm-text sm:text-2xl"
          >
            이 블로그를 만든 이유
          </h2>
          <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.85] text-text-sub dark:text-dm-muted sm:text-base">
            <p className={leadFirst}>
              생성 AI 이후 기술 격차에 대한 불안에서 출발했습니다. 그 과정에서
              플랫폼 종속 구조와 검색·운영 리스크를 몸으로 겪었고, 그 경험을
              기록으로 남기기로 했습니다.
            </p>
            <p>
              외부 서비스에 콘텐츠를 올려 두면 단기간에 트래픽을 모을 수 있지만,
              규칙 변경 한 번에 디지털 자산의 가치가 흔들릴 수 있습니다. 내 이름으로
              보이는 공간이 실제로는 통제 불가능한 임대지일 수 있다는 사실을
              확인했습니다.
            </p>
            <p>
              ‘그럼 아예 직접 만들면 어떨까?’ 막연하게 생각하던 그 즈음, 바이브 코딩
              붐이 일었습니다. 그리고 문득 이런 질문을 던졌습니다.
            </p>
            <p className="text-lg font-semibold text-primary dark:text-blue-400">
              나도 혹시… 될까?
            </p>
            <p>
              Claude에게{" "}
              {"\u201c"}바이브 코딩으로 지속 가능한 독립 플랫폼을 만들고 싶은데,
              어떻게 하면 돼?{"\u201d"}라고 물었습니다. 260페이지 분량의 가이드가
              돌아왔고, 검증 가능한 단계만 추려 따라가 보았습니다.
            </p>
            <p className="font-semibold text-text-main dark:text-dm-text">
              삼 일 만에 첫 결과물이 나왔습니다.
            </p>
            <p>
              플랫폼에 종속되지 않은 자기 도메인 기반 사이트가 생겼고, 예상보다
              낮은 마찰로 구축이 끝났습니다. 이 경험은 &apos;바이브 코딩이 어디까지
              가능한가&apos;를 증명하는 출발점이 되었습니다.
            </p>
            <p className={leadFirst}>
              그래서 이 블로그는 실험 설계부터 배포·측정까지의 과정을 공개합니다.
            </p>
            <p>
              기술 나열에 머무르지 않고,{" "}
              <strong className={emStrong}>
                비전공자·1인 창업자가 AI를 도구로 삼아 독립 플랫폼을 설계·구축하는
                실전 로드맵
              </strong>
              을 제시합니다. 성공한 시도와 실패한 시도, 되돌아본 원인 분석을 같은
              기준으로 기록합니다. 그 좌충우돌한 기록을 통해{" "}
              <strong className={emStrong}>
                {"\u2018"}누구나 메이커가 될 수 있는 바이브(Vibe){"\u2019"}
              </strong>
              를 공유합니다.
            </p>
            <p className="text-text-main dark:text-dm-text">
              앞으로 올라올 글에서 그 근거를 차례로 제시하겠습니다.
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
          <p className={`mt-4 ${leadFirst}`}>
            아래 카테고리는 동일한 기준으로 업데이트됩니다. 본문·절차·체크리스트를
            한데 모아 두었으니, 필요한 축만 골라 따라오시면 됩니다.
          </p>
          <ul className="mt-6 list-none space-y-5 text-[0.9375rem] leading-relaxed text-text-sub dark:text-dm-muted sm:text-base">
            <li className="rounded-xl border border-border bg-secondary/40 px-4 py-4 dark:border-dm-border dark:bg-dm-bg/80 sm:px-5 sm:py-5">
              <p className={leadFirst}>
                바이브 코딩 (AI 개발) — Next.js와 AI 에이전트를 활용한 구축·배포
                실험
              </p>
              <p className="mt-2 text-text-sub dark:text-dm-muted">
                아키텍처 결정, 에이전트 워크플로, 운영 관측까지 한 흐름으로
                정리합니다.
              </p>
              <p className="mt-3">
                <Link
                  href="/category/vibe-coding-guide"
                  className={categoryLinkClass}
                >
                  <span>바이브 코딩 (AI 개발) — 실전 가이드 보기</span>
                  <span className={ctaPillClass}>이동</span>
                </Link>
              </p>
            </li>
            <li className="rounded-xl border border-border bg-secondary/40 px-4 py-4 dark:border-dm-border dark:bg-dm-bg/80 sm:px-5 sm:py-5">
              <p className={leadFirst}>
                [연재] 바이브 코딩으로 블로그 만들기 — 0부터 SEO·배포까지의 단계별
                기록
              </p>
              <p className="mt-2 text-text-sub dark:text-dm-muted">
                설계·구현·검색 노출까지 실제로 밟은 순서를 그대로 옮겼습니다.
              </p>
              <p className="mt-3">
                <Link
                  href="/category/vibe-coding-blog"
                  className={categoryLinkClass}
                >
                  <span>[연재] 블로그 만들기 — 실전 가이드 보기</span>
                  <span className={ctaPillClass}>이동</span>
                </Link>
              </p>
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
            <p className={leadFirst}>
              AI와 함께 읽고, 쓰고, 검증합니다. 그리고 그 과정을 재현 가능한 글로
              남깁니다.
            </p>
            <p>
              <strong className={emStrong}>
                IT·과학 분야 도서를 열 권 넘게 번역했고, IT 전문 출판사에서
                테크니컬 에디터로 십 년 가까이 일해 왔습니다.
              </strong>{" "}
              <strong className={emStrong}>
                복잡한 내용을 쉬운 문장으로 풀어내고 글의 뼈대를 세우는 일
              </strong>
              이 오랜 직업이었습니다.{" "}
              <strong className={emStrong}>이 블로그의 모든 글</strong>은 그 감각
              위에서 만들어집니다.
            </p>
            <p>
              현재는 <strong className={emStrong}>미국에 거주</strong>합니다.{" "}
              <strong className={emStrong}>
                AI의 흐름이 가장 먼저 도착하는 곳에
              </strong>{" "}
              있다 보니, 한국에 있을 때보다{" "}
              <strong className={emStrong}>기술의 속도를 훨씬 가깝게 체감합니다.</strong>{" "}
              새로운 도구를 먼저 써 보고, 막히는 지점과 풀어내는 방법을
              기록합니다. 여기에 오랜 편집자의 시선을 더해,{" "}
              <strong className={emStrong}>
                누구나 따라올 수 있는 가장 쉬운 언어로 옮기는 것
              </strong>
              이 저의 방식입니다.
            </p>
            <p>
              <strong className={emStrong}>
                AI는 잘 활용하면 우리 삶에 실질적인 유익을 주는 도구
              </strong>
              라고 봅니다.{" "}
              <strong className={emStrong}>
                이 블로그는 그 전제 위에서, AI를 곁에 두고 직접 실험하며 얻은
                결과를 근거와 함께 제시하는 공간입니다.
              </strong>
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
