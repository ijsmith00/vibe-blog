import EcpChartsShowcase from "@/app/components/ecp/EcpChartsShowcase";
import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: "ЕЦП 스타일 차트 예시",
  description:
    "«Региональная справка» PDF에 가까운 Highcharts 유형(선·막대·워터폴·산점도·누적·콤보) 데모입니다.",
};

export default function EcpChartsPage() {
  return (
    <div className="pb-16 pt-10">
      <header className="mb-2">
        <p className="text-sm font-medium text-primary">Reference</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-main dark:text-dm-text">
          ЕЦП·지역 스правка 스타일 차트
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-text-sub dark:text-dm-muted">
          {SITE_NAME}에서 PDF «Единая цифровая платформа / Региональная справка»에
          보이는 대시보드형 그래프를 참고해, 같은 시각 언어(밝은 플롯·남색 제목·은은한
          그리드)로 Highcharts 예시를 모았습니다. 페이지 배경은 사이트 기본값을
          유지합니다.
        </p>
      </header>
      <EcpChartsShowcase />
    </div>
  );
}
