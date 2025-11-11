export interface ChartLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
  // TradingView 차트 설정 (우리가 직접 관리)
  symbol: string;
  interval: string;
}

export type LayoutChangeCallback = (layout: ChartLayout[]) => void;
