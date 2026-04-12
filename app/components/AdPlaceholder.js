/**
 * 실제 광고 대신 자리 표시용 블록.
 * @param {{ className?: string }} props
 */
export default function AdPlaceholder({ className = "" }) {
  return (
    <div
      className={`flex min-h-[120px] items-center justify-center rounded-xl border border-border bg-secondary text-sm font-medium text-text-sub not-prose dark:border-dm-border dark:bg-dm-card dark:text-dm-muted ${className}`}
      aria-hidden="true"
    >
      광고 영역
    </div>
  );
}
