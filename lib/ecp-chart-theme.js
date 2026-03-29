/**
 * ЕЦП·지역 스프авка류 대시보드에 가까운 차트 스타일(플롯은 밝게, 축·제목은 남색 계열).
 * 페이지 배경(bg-main)은 건드리지 않고, 차트 옵션에만 적용한다.
 */

/** @type {import("highcharts").Options} */
export const ECP_COLORS = {
  navy: "#0d2d5c",
  axis: "#374151",
  grid: "#e8ecf0",
  plotBg: "#ffffff",
  blue: "#1e5a8a",
  cyan: "#0e7490",
  teal: "#0f766e",
  amber: "#b45309",
  red: "#b91c1c",
  violet: "#5b21b6",
};

/**
 * Highcharts.merge(기본, 개별)에 넘길 공통 베이스.
 * @returns {import("highcharts").Options}
 */
export function getEcpBaseOptions() {
  return {
    chart: {
      backgroundColor: ECP_COLORS.plotBg,
      plotBackgroundColor: ECP_COLORS.plotBg,
      style: {
        fontFamily:
          'var(--font-noto-sans-kr), system-ui, "Segoe UI", Roboto, sans-serif',
      },
      spacing: [12, 16, 12, 12],
    },
    title: {
      align: "left",
      margin: 12,
      style: {
        color: ECP_COLORS.navy,
        fontSize: "15px",
        fontWeight: "700",
      },
    },
    subtitle: {
      align: "left",
      style: { color: "#4b5563", fontSize: "12px" },
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: ECP_COLORS.grid,
      lineColor: "#c5ccd6",
      tickColor: "#c5ccd6",
      labels: { style: { color: ECP_COLORS.axis, fontSize: "11px" } },
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: ECP_COLORS.grid,
      lineColor: "#c5ccd6",
      labels: { style: { color: ECP_COLORS.axis, fontSize: "11px" } },
      title: {
        style: { color: ECP_COLORS.navy, fontSize: "12px", fontWeight: "600" },
      },
    },
    legend: {
      align: "center",
      itemStyle: { color: ECP_COLORS.axis, fontWeight: "500", fontSize: "11px" },
      itemHoverStyle: { color: ECP_COLORS.navy },
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.96)",
      borderColor: "#c5ccd6",
      borderRadius: 4,
      shadow: true,
      style: { fontSize: "12px", color: "#111827" },
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        states: { hover: { brightness: 0.08 } },
      },
    },
    credits: { enabled: false },
  };
}
