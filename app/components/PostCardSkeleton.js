/** PostCard와 동일한 레이아웃의 스켈레톤 (로딩용) */
export default function PostCardSkeleton() {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-main shadow-sm animate-pulse dark:border-dm-border dark:bg-dm-card"
      aria-hidden="true"
    >
      <div className="relative aspect-[16/10] w-full min-h-[140px] shrink-0 bg-slate-200 dark:bg-dm-bg" />
      <div className="flex flex-1 flex-col p-4">
        <div className="h-5 w-16 shrink-0 rounded-full bg-slate-200 dark:bg-dm-border" />
        <div className="mt-3 space-y-2">
          <div className="h-5 w-full rounded bg-slate-200 dark:bg-dm-border" />
          <div className="h-5 w-[85%] rounded bg-slate-200 dark:bg-dm-border" />
        </div>
        <div className="mt-2 flex-1 space-y-2">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-dm-border" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-dm-border" />
          <div className="h-4 w-[75%] rounded bg-slate-200 dark:bg-dm-border" />
        </div>
        <div className="mt-4 h-3 w-24 rounded bg-slate-200 dark:bg-dm-border" />
      </div>
    </article>
  );
}
