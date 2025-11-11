import type { ChartLayout } from '@/types/layout';
import { GRID_CONFIG } from '@/constants/grid';
import LZString from 'lz-string';

/**
 * 고유한 차트 ID 생성
 */
export function generateChartId(): string {
  return `chart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 새로운 차트 아이템 생성
 */
export function createChartItem(existingLayout: ChartLayout[]): ChartLayout {
  const newId = generateChartId();

  return {
    i: newId,
    x: (existingLayout.length * GRID_CONFIG.DEFAULT_WIDTH) % GRID_CONFIG.COLS,
    y: Infinity, // 항상 맨 아래에 추가
    w: GRID_CONFIG.DEFAULT_WIDTH,
    h: GRID_CONFIG.DEFAULT_HEIGHT,
    minW: GRID_CONFIG.MIN_WIDTH,
    minH: GRID_CONFIG.MIN_HEIGHT,
    symbol: 'BINANCE:BTCUSDT.P',
    interval: 'D',
  };
}

/**
 * 초기 레이아웃 생성
 */
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

/**
 * localStorage에서 레이아웃 로드
 */
export function loadLayoutFromStorage(storageKey: string): ChartLayout[] | null {
  try {
    const savedLayout = localStorage.getItem(storageKey);
    if (savedLayout) {
      const parsedLayout = JSON.parse(savedLayout) as ChartLayout[];

      // 기존 데이터에 symbol, interval이 없으면 기본값 추가 (마이그레이션)
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

/**
 * localStorage에 레이아웃 저장
 */
export function saveLayoutToStorage(storageKey: string, layout: ChartLayout[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(layout));
  } catch (error) {
    console.error('Failed to save layout:', error);
  }
}

/**
 * 레이아웃을 배열 형태로 변환 (최대 압축)
 * 형식: [id, x, y, w, h, symbol, interval]
 */
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

/**
 * 배열 형태를 레이아웃으로 복원
 */
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

/**
 * URL에서 레이아웃 로드
 */
export function loadLayoutFromURL(): ChartLayout[] | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const layoutData = params.get('l'); // 'layout' → 'l'

    if (layoutData) {
      // LZString으로 압축 해제
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

/**
 * URL에 레이아웃 저장
 */
export function saveLayoutToURL(layout: ChartLayout[]): void {
  try {
    // 필드명 단축
    const compressed = compressLayout(layout);

    // LZString으로 압축 (Base64 URL-safe)
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(compressed));

    const params = new URLSearchParams();
    params.set('l', encoded); // 'layout' → 'l'

    // URL 업데이트 (히스토리에 추가하지 않음)
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  } catch (error) {
    console.error('Failed to save layout to URL:', error);
  }
}
