/** 포스트가 하나도 없을 때 메인 섹션용 */
export default function EmptyPostsState() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-bg-sub px-6 py-16 text-center dark:border-dm-border dark:bg-dm-bg sm:mt-10 sm:py-20">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary dark:bg-dm-card dark:text-blue-400"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-9 w-9"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="12" y2="17" />
        </svg>
      </div>
      <p className="max-w-sm text-base font-medium leading-relaxed text-text-sub dark:text-dm-muted sm:text-lg">
        아직 작성된 글이 없습니다.
        <br />
        곧 좋은 글로 찾아올게요!
      </p>
    </div>
  );
}
