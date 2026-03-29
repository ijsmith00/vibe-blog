"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";

import { ECP_COLORS, getEcpBaseOptions } from "@/lib/ecp-chart-theme";

function merge(base, extra) {
  return Highcharts.merge({}, base, extra);
}

function Section({ title, subtitle, children }) {
  return (
    <section className="mb-12 border-b border-border pb-10 last:mb-0 last:border-0 last:pb-0 dark:border-dm-border">
      <div className="mb-4 border-l-4 border-[#0d2d5c] pl-3 dark:border-[#60a5fa]">
        <h2 className="text-lg font-bold text-text-main dark:text-dm-text">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-text-sub dark:text-dm-muted">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm dark:border-dm-border dark:bg-dm-card">
        {children}
      </div>
    </section>
  );
}

export default function EcpChartsShowcase() {
  const base = useMemo(() => getEcpBaseOptions(), []);

  const lineOptions = useMemo(
    () =>
      merge(base, {
        title: { text: "Динамика объёмов производства промышленной продукции в регионе, %" },
        subtitle: { text: "지역 산업제품 생산량 동향 (예시 데이터)" },
        xAxis: {
          categories: ["2022-03", "2022-04", "2022-05", "2024 г."],
        },
        yAxis: { title: { text: "%" } },
        series: [
          {
            type: "line",
            name: "Гражданская продукция",
            color: ECP_COLORS.blue,
            data: [15, 15.5, 20, 18],
            marker: { symbol: "circle", radius: 4 },
          },
          {
            type: "line",
            name: "Военная продукция на внутренний рынок",
            color: ECP_COLORS.cyan,
            data: [12, 14, 15, 16],
            marker: { symbol: "circle", radius: 4 },
          },
        ],
        plotOptions: {
          line: { lineWidth: 2 },
        },
      }),
    [base],
  );

  const columnDeltaOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "column" },
        title: {
          text: "Темп роста высокотехнологичной продукции…, % (п.п.)",
        },
        subtitle: { text: "고기술 제품 성장률 — 막대·데이터라벨 (PDF 유사)" },
        xAxis: { categories: ["2022 г.", "2023 г."] },
        yAxis: { title: { text: "п.п." } },
        series: [
          {
            name: "Изменение",
            data: [
              { y: 72.5, color: ECP_COLORS.blue },
              { y: -59.1, color: ECP_COLORS.red },
            ],
            dataLabels: {
              enabled: true,
              format: "{y:+.1f} п.п.",
              style: { fontWeight: "700" },
            },
          },
        ],
        plotOptions: {
          column: { borderRadius: 2 },
        },
      }),
    [base],
  );

  const waterfallOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "waterfall" },
        title: { text: "Waterfall: накопление изменения (п.п.)" },
        subtitle: { text: "증감 누적(워터폴) — 스правка 8쪽 유형" },
        xAxis: {
          type: "category",
          categories: ["Старт", "Фактор A", "Фактор B", "Итог"],
        },
        yAxis: { title: { text: "п.п." } },
        series: [
          {
            type: "waterfall",
            name: "Δ",
            data: [
              { name: "Старт", y: 40 },
              { name: "Фактор A", y: 32.5 },
              { name: "Фактор B", y: -20.7 },
              {
                name: "Итог",
                isIntermediateSum: true,
                color: ECP_COLORS.navy,
              },
            ],
            dataLabels: { enabled: true, format: "{y:.1f}" },
            color: ECP_COLORS.blue,
          },
        ],
      }),
    [base],
  );

  const scatterOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "scatter", zoomType: "xy" },
        title: {
          text: "Рентабельность отраслей: выручка × прибыль (условные млн руб.)",
        },
        subtitle: { text: "산점도 — 10쪽 유형(산업별 점)" },
        xAxis: {
          title: { text: "Выручка (млн руб.)" },
          gridLineWidth: 1,
        },
        yAxis: { title: { text: "Прибыль (млн руб.)" } },
        series: [
          {
            type: "scatter",
            name: "Отрасли",
            color: ECP_COLORS.blue,
            data: [
              { x: 50000, y: 4000, name: "РЭП" },
              { x: 12000, y: 1500, name: "Авиация" },
              { x: 4000, y: 500, name: "ПВО" },
            ],
            marker: { radius: 7, symbol: "circle" },
          },
        ],
        tooltip: {
          pointFormat:
            "<b>{point.name}</b><br/>Выручка: {point.x:,.0f}<br/>Прибыль: {point.y:,.0f}",
        },
      }),
    [base],
  );

  const stackedColumnOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "column" },
        title: {
          text: "Структура обязательств / портфеля (млрд руб., пример)",
        },
        subtitle: { text: "누적 막대 — 11쪽 재무 구조 유형" },
        xAxis: { categories: ["2022 г.", "2023 г.", "2024 г."] },
        yAxis: { min: 0, title: { text: "млрд руб." }, stackLabels: { enabled: false } },
        plotOptions: {
          column: { stacking: "normal", borderRadius: 0 },
        },
        series: [
          { name: "Сегмент 1", data: [2, 2, 2.2], color: "#1e5a8a" },
          { name: "Сегмент 2", data: [1, 1.2, 1.4], color: "#0e7490" },
          { name: "Сегмент 3", data: [0.8, 1, 1], color: "#7c3aed" },
        ],
      }),
    [base],
  );

  const stackedAreaOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "area" },
        title: { text: "Динамика выручки / прибыли по годам (пример)" },
        subtitle: { text: "누적 영역 — 13쪽 다중 시계열 유형" },
        xAxis: { categories: ["2022 г.", "2023 г.", "2024 г."] },
        yAxis: { title: { text: "млрд руб." } },
        plotOptions: {
          area: {
            stacking: "normal",
            lineWidth: 1,
            marker: { enabled: false },
            fillOpacity: 0.35,
          },
        },
        series: [
          { name: "Выручка", type: "area", data: [30, 38, 45], color: "#1e5a8a" },
          {
            name: "Прибыль до налогообложения",
            type: "area",
            data: [12, 15, 18],
            color: "#0e7490",
          },
        ],
      }),
    [base],
  );

  const barHorizontalOptions = useMemo(
    () =>
      merge(base, {
        chart: { type: "bar" },
        title: { text: "ТОП организаций по показателю (пример)" },
        subtitle: { text: "가로 막대 — 15~16쪽 ТОП 유형" },
        xAxis: {
          categories: [
            "Предприятие 1",
            "Предприятие 2",
            "Предприятие 3",
            "Предприятие 4",
            "Предприятие 5",
          ],
          title: null,
        },
        yAxis: { title: { text: "чел." }, min: 0 },
        series: [
          {
            name: "Средняя численность",
            data: [5000, 4200, 3800, 3100, 2900],
            color: ECP_COLORS.blue,
            dataLabels: { enabled: true, align: "right" },
          },
        ],
        plotOptions: { bar: { borderRadius: 0, pointPadding: 0.1 } },
      }),
    [base],
  );

  const comboOptions = useMemo(
    () =>
      merge(base, {
        title: { text: "Комбо: столбцы + линия (динамика и темп)" },
        subtitle: { text: "막대+선 혼합 — 대시보드에서 자주 쓰는 조합" },
        xAxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
        yAxis: [
          { title: { text: "Объём" } },
          { title: { text: "%" }, opposite: true, max: 30 },
        ],
        series: [
          { type: "column", name: "Объём", yAxis: 0, data: [12, 14, 15, 16], color: "#93c5fd" },
          {
            type: "line",
            name: "Темп",
            yAxis: 1,
            data: [10, 12, 11, 15],
            color: ECP_COLORS.navy,
            marker: { enabled: true },
          },
        ],
      }),
    [base],
  );

  return (
    <div className="py-8">
      <p className="mb-8 text-sm leading-relaxed text-text-sub dark:text-dm-muted">
        아래 차트는 «ЕЦП·Региональная справка» PDF에 나온{" "}
        <strong className="text-text-main dark:text-dm-text">
          시계열·증감·산점도·누적·TOP
        </strong>{" "}
        유형을 참고한 Highcharts 예시입니다. 플롯 배경은 밝게 유지하고, 제목·축은
        남색 계열로 맞췄습니다. 사이트 본문 배경은 변경하지 않습니다.
      </p>

      <Section
        title="1. Многорядная динамика (линия)"
        subtitle="PDF 7쪽: % 동향, 두 개 이상 시리즈"
      >
        <HighchartsReact highcharts={Highcharts} options={lineOptions} />
      </Section>

      <Section
        title="2. Столбцы с отрицательными значениями (п.п.)"
        subtitle="PDF 8쪽: 증감 포인트(데이터 라벨)"
      >
        <HighchartsReact highcharts={Highcharts} options={columnDeltaOptions} />
      </Section>

      <Section
        title="3. Waterfall (накопление изменений)"
        subtitle="PDF 8쪽: Δ 누적 설명에 가까운 워터폴"
      >
        <HighchartsReact highcharts={Highcharts} options={waterfallOptions} />
      </Section>

      <Section
        title="4. Scatter: выручка × прибыль"
        subtitle="PDF 10쪽: 산업별 위치(산점도)"
      >
        <HighchartsReact highcharts={Highcharts} options={scatterOptions} />
      </Section>

      <Section
        title="5. Stacked column"
        subtitle="PDF 11쪽: 연도별 구성(누적 막대)"
      >
        <HighchartsReact highcharts={Highcharts} options={stackedColumnOptions} />
      </Section>

      <Section
        title="6. Stacked area"
        subtitle="PDF 13쪽: 다중 시계열 영역"
      >
        <HighchartsReact highcharts={Highcharts} options={stackedAreaOptions} />
      </Section>

      <Section
        title="7. Горизонтальные бары (ТОП)"
        subtitle="PDF 15~16쪽: 순위 막대"
      >
        <HighchartsReact highcharts={Highcharts} options={barHorizontalOptions} />
      </Section>

      <Section
        title="8. Combo: column + line"
        subtitle="거시 지표 + 성장률 동시 표시"
      >
        <HighchartsReact highcharts={Highcharts} options={comboOptions} />
      </Section>
    </div>
  );
}
