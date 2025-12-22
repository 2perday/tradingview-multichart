import type { ChartLayout } from '@/types/layout';
import { GRID_CONFIG } from '@/constants/grid';
import LZString from 'lz-string';


export function generateChartId(): string {
  return `chart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}


export function createChartItem(existingLayout: ChartLayout[]): ChartLayout {
  const newId = generateChartId();

  return {
    i: newId,
    x: (existingLayout.length * GRID_CONFIG.DEFAULT_WIDTH) % GRID_CONFIG.COLS,
    y: Infinity,
    w: GRID_CONFIG.DEFAULT_WIDTH,
    h: GRID_CONFIG.DEFAULT_HEIGHT,
    minW: GRID_CONFIG.MIN_WIDTH,
    minH: GRID_CONFIG.MIN_HEIGHT,
    symbol: 'BINANCE:BTCUSDT.P',
    interval: 'D',
  };
}


export function createInitialLayout(): ChartLayout[] {
  return [{
    i: 'init',
    x: 0,
    y: 0,
    w: GRID_CONFIG.DEFAULT_WIDTH,
    h: GRID_CONFIG.INITIAL_HEIGHT,
    minW: GRID_CONFIG.MIN_WIDTH,
    minH: GRID_CONFIG.MIN_HEIGHT,
    symbol: 'BINANCE:BTCUSDT.P',
    interval: 'D',
  }];
}


export function loadLayoutFromStorage(storageKey: string): ChartLayout[] | null {
  try {
    const savedLayout = localStorage.getItem(storageKey);
    if (savedLayout) {
      const parsedLayout = JSON.parse(savedLayout) as ChartLayout[];

      return parsedLayout.map(item => ({
        ...item,
        symbol: item.symbol || 'BINANCE:BTCUSDT.P',
        interval: item.interval || 'D',
      }));
    }
  } catch (error) {
    console.error('Failed to parse saved layout:', error);
  }
  return null;
}


export function saveLayoutToStorage(storageKey: string, layout: ChartLayout[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(layout));
  } catch (error) {
    console.error('Failed to save layout:', error);
  }
}


function compressLayout(layout: ChartLayout[]) {
  return layout.map(item => [
    item.i,
    item.x,
    item.y,
    item.w,
    item.h,
    item.symbol,
    item.interval,
  ]);
}


function decompressLayout(compressed: any[]): ChartLayout[] {
  return compressed.map(item => ({
    i: item[0],
    x: item[1],
    y: item[2],
    w: item[3],
    h: item[4],
    minW: GRID_CONFIG.MIN_WIDTH,
    minH: GRID_CONFIG.MIN_HEIGHT,
    symbol: item[5] || 'BINANCE:BTCUSDT.P',
    interval: item[6] || 'D',
  }));
}


export function loadLayoutFromURL(): ChartLayout[] | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const layoutData = params.get('l');

    if (layoutData) {
      const decompressed = LZString.decompressFromEncodedURIComponent(layoutData);
      if (decompressed) {
        const compressed = JSON.parse(decompressed);
        return decompressLayout(compressed);
      }
    }
  } catch (error) {
    console.error('Failed to parse layout from URL:', error);
  }
  return null;
}


export function saveLayoutToURL(layout: ChartLayout[]): void {
  try {
    const compressed = compressLayout(layout);
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(compressed));

    const params = new URLSearchParams();
    params.set('l', encoded);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  } catch (error) {
    console.error('Failed to save layout to URL:', error);
  }
}
