import { useEffect, useRef, memo, useMemo } from 'react';
import { useTheme } from '@/components/theme/theme-provider';

type ChartTheme = 'light' | 'dark';

interface TradingViewWidgetProps {
  chartId: string; // 각 차트의 고유 ID
  symbol: string;
  interval: string;
}

function TradingViewWidget({ chartId: _chartId, symbol, interval }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef(`tradingview_${Math.random().toString(36).substring(2, 15)}`);
  const { theme } = useTheme();

  const resolvedTheme: ChartTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme as ChartTheme;
  }, [theme]);

  const chartConfig = useMemo(() => ({
    container_id: widgetId.current,
    allow_symbol_change: true,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: true,
    hide_volume: false,
    hotlist: false,
    interval,
    locale: 'en',
    save_image: false,
    style: '9',
    symbol,
    theme: resolvedTheme,
    timezone: 'Asia/Seoul',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    autosize: true,
    "gridColor": "rgba(242, 242, 242, 0)",
  }), [symbol, interval, resolvedTheme]);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    let mounted = true;

    currentContainer.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.id = widgetId.current;
    currentContainer.appendChild(widgetDiv);

    requestAnimationFrame(() => {
      if (!mounted || !currentContainer) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      script.textContent = JSON.stringify(chartConfig);

      currentContainer.appendChild(script);
    });

    return () => {
      mounted = false;
      if (currentContainer) {
        const iframe = currentContainer.querySelector('iframe');
        if (iframe) {
          iframe.remove();
        }
        currentContainer.innerHTML = '';
      }
    };
  }, [chartConfig]);

  return (
    <div className="h-full w-full flex flex-col">
      <div
        className="tradingview-widget-copyright text-center text-xs"
        style={{ height: '32px', lineHeight: '32px' }}
      >
        {/* <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          <span>Track all markets on TradingView</span>
        </a> */}
      </div>
      <div
        className="tradingview-widget-container flex-1"
        ref={container}
      />
    </div>
  );
}

export default memo(TradingViewWidget, (prevProps, nextProps) => {
  // symbol, interval이 변경되지 않았으면 리렌더링하지 않음
  return (
    prevProps.chartId === nextProps.chartId &&
    prevProps.symbol === nextProps.symbol &&
    prevProps.interval === nextProps.interval
  );
});
