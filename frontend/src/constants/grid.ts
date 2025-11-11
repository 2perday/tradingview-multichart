export const GRID_CONFIG = {
  COLS: 24,
  ROW_HEIGHT: 10,
  DEFAULT_WIDTH: 6,
  DEFAULT_HEIGHT: 20,
  MIN_WIDTH: 6,
  MIN_HEIGHT: 20,
  INITIAL_HEIGHT: 80,
  CONTAINER_PADDING: [2, 2] as [number, number],
  MARGIN: [2, 2] as [number, number],
} as const;

export const STORAGE_KEYS = {
  LAYOUT: 'chart-grid-layout',
  CHART_CONFIGS: 'chart-configs',
  THEME: 'vite-ui-theme',
} as const;
