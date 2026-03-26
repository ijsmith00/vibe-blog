import PostCardSkeleton from "@/app/components/PostCardSkeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-16 md:gap-20 lg:gap-24">
      <section
        className="mx-auto w-full rounded-2xl bg-gradient-to-b from-white to-secondary px-5 py-16 text-center dark:from-dm-bg dark:to-dm-card sm:px-7 md:px-10 md:py-20 lg:py-24"
        aria-hidden="true"
      >
        <div className="mx-auto h-10 max-w-md animate-pulse rounded-lg bg-slate-200 dark:bg-dm-border sm:h-12 md:h-14" />
        <div className="mx-auto mt-4 h-5 max-w-xl animate-pulse rounded bg-slate-200 dark:bg-dm-border sm:mt-5 sm:h-6" />
        <div className="mx-auto mt-4 h-5 max-w-lg animate-pulse rounded bg-slate-200 dark:bg-dm-border sm:h-6" />
        <div className="mx-auto mt-8 h-11 w-40 animate-pulse rounded-xl bg-slate-200 dark:bg-dm-border sm:mt-10" />
      </section>

      <section className="mx-auto w-full pb-16 md:pb-20 lg:pb-24 pt-0">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-slate-200 dark:bg-dm-border sm:h-10 md:h-11" />
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="h-9 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-dm-border" />
            <div className="h-9 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-dm-border" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-dm-border" />
          </div>
          <div className="h-5 w-16 animate-pulse rounded bg-slate-200 dark:bg-dm-border sm:ml-auto" />
        </div>
        <div className="mt-8 grid w-full min-w-0 grid-cols-1 justify-items-stretch gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
