import { useEffect, useRef } from 'react';
import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  HistogramSeries,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts';
import { CHART_COLORS } from '../../lib/chart-theme';
import { generateCandles, type Timeframe } from '../../lib/series';

type PriceChartProps = {
  symbol: string;
  timeframe: Timeframe;
  basePrice: number;
  height?: number;
};

export function PriceChart({ symbol, timeframe, basePrice, height = 420 }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      width: el.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: CHART_COLORS.bg },
        textColor: CHART_COLORS.text,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: CHART_COLORS.grid },
        horzLines: { color: CHART_COLORS.grid },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: true, secondsVisible: false },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: CHART_COLORS.crosshair, labelBackgroundColor: '#121B2B' },
        horzLine: { color: CHART_COLORS.crosshair, labelBackgroundColor: '#121B2B' },
      },
    });
    chartRef.current = chart;

    candleRef.current = chart.addSeries(CandlestickSeries, {
      upColor: CHART_COLORS.profit,
      downColor: CHART_COLORS.loss,
      wickUpColor: 'rgba(34,197,94,0.7)',
      wickDownColor: 'rgba(239,68,68,0.7)',
      borderVisible: false,
    });
    volRef.current = chart.addSeries(HistogramSeries, {
      priceScaleId: '',
      priceFormat: { type: 'volume' },
      color: 'rgba(148,163,184,0.3)',
    });
    volRef.current.priceScale().applyOptions({ scaleMargins: { top: 0.84, bottom: 0 } });

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && chartRef.current === chart) chart.applyOptions({ width });
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleRef.current = null;
      volRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    const candles = generateCandles(symbol, timeframe, basePrice);
    const upColor = 'rgba(34,197,94,0.45)';
    const downColor = 'rgba(239,68,68,0.45)';

    candleRef.current?.setData(
      candles.map<CandlestickData<UTCTimestamp>>((c) => ({
        time: c.time as UTCTimestamp,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    );
    volRef.current?.setData(
      candles.map((c) => ({
        time: c.time as UTCTimestamp,
        value: Math.round(c.volume),
        color: c.close >= c.open ? upColor : downColor,
      })),
    );
    chartRef.current?.timeScale().fitContent();
  }, [symbol, timeframe, basePrice]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height }}
      role="img"
      aria-label={`${symbol} price chart`}
    />
  );
}

export function EquityCurve({
  points,
  height = 300,
}: {
  points: { time: number; value: number }[];
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      width: el.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: CHART_COLORS.bg },
        textColor: CHART_COLORS.text,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: CHART_COLORS.grid },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: false },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: CHART_COLORS.crosshair, labelBackgroundColor: '#121B2B' },
        horzLine: { color: CHART_COLORS.crosshair, labelBackgroundColor: '#121B2B' },
      },
    });
    chartRef.current = chart;

    seriesRef.current = chart.addSeries(AreaSeries, {
      lineColor: CHART_COLORS.accent,
      lineWidth: 2,
      topColor: CHART_COLORS.areaTop,
      bottomColor: CHART_COLORS.areaBottom,
      priceLineVisible: false,
    });

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && chartRef.current === chart) chart.applyOptions({ width });
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    seriesRef.current?.setData(
      points.map((p) => ({ time: p.time as UTCTimestamp, value: p.value })),
    );
    chartRef.current?.timeScale().fitContent();
  }, [points]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height }}
      role="img"
      aria-label="Portfolio equity curve"
    />
  );
}

export default PriceChart;
