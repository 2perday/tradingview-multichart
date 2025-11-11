import { useEffect, useRef, memo } from 'react';
import { useTheme } from '@/components/theme/theme-provider';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // 실제 적용할 테마 결정 (system일 경우 시스템 테마 확인)
  const resolvedTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme;

  useEffect(() => {
    if (!container.current) return;

    // 기존 스크립트 제거
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "allow_symbol_change": true,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": false,
        "hide_legend": true,
        "hide_volume": false,
        "hotlist": false,
        "interval": "D",
        "locale": "en",
        "save_image": false,
        "style": "9",
        "symbol": "BINANCE:BTCUSDT.P",
        "theme": "${resolvedTheme}",
        "timezone": "Etc/UTC",
        "backgroundColor": "${resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff'}",
        "gridColor": "rgba(46, 46, 46, 0)",
        "watchlist": [],
        "withdateranges": false,
        "compareSymbols": [],
        "studies": [],
        "autosize": true
      }`;
    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <div className="tradingview-widget-copyright" style={{ height: "32px", lineHeight: "32px", textAlign: "center", fontSize: "12px" }}>
        <a href="https://www.tradingview.com/symbols/BTCUSDT.P/?exchange=BINANCE" rel="noopener nofollow" target="_blank">
          <span className="blue-text">BTCUSDT.P chart</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
      <div className="tradingview-widget-container" ref={container} style={{ height: "calc(100% - 32px)", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
