export type ChartTheme = 'light' | 'dark';

export type ChartInterval = '1' | '5' | '15' | '30' | '60' | '240' | 'D' | 'W' | 'M';

export type ChartStyle = '0' | '1' | '2' | '3' | '8' | '9';

export interface ChartConfig {
  id: string;
  symbol: string;
  interval: ChartInterval;
  style: ChartStyle;
  hideVolume: boolean;
}

export interface ChartConfigMap {
  [chartId: string]: ChartConfig;
}

export const CHART_INTERVALS: Record<ChartInterval, string> = {
  '1': '1분',
  '5': '5분',
  '15': '15분',
  '30': '30분',
  '60': '1시간',
  '240': '4시간',
  'D': '일봉',
  'W': '주봉',
  'M': '월봉',
};

export const CHART_STYLES: Record<ChartStyle, string> = {
  '0': '바',
  '1': '캔들',
  '2': '속이 빈 캔들',
  '3': '라인',
  '8': '영역',
  '9': '베이스라인',
};

export const DEFAULT_CHART_CONFIG: Omit<ChartConfig, 'id'> = {
  symbol: 'BINANCE:BTCUSDT.P',
  interval: 'D',
  style: '1',
  hideVolume: false,
};
