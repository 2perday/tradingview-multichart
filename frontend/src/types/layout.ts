export interface ChartLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
  symbol: string;
  interval: string;
}

export type LayoutChangeCallback = (layout: ChartLayout[]) => void;
