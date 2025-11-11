import { useCallback, useMemo, useState, memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { X, Settings } from "lucide-react";
import TradingViewWidget from "@/components/common/TradingViewWidget";
import type { ChartLayout } from "@/types/layout";
import { GRID_CONFIG } from "@/constants/grid";

const ResponsiveGridLayout = WidthProvider(GridLayout);

interface IndexPageProps {
  layout: ChartLayout[];
  setLayout: Dispatch<SetStateAction<ChartLayout[]>>;
}

interface ChartItemProps {
  item: ChartLayout;
  onRemove: (id: string) => void;
  onUpdateSettings: (id: string, symbol: string, interval: string) => void;
}

const ChartItem = memo(({ item, onRemove, onUpdateSettings }: ChartItemProps) => {
  const [editingChart, setEditingChart] = useState(false);

  const handleApply = useCallback(() => {
    const symbolInput = document.getElementById(`symbol-${item.i}`) as HTMLInputElement;
    const intervalInput = document.getElementById(`interval-${item.i}`) as HTMLSelectElement;
    onUpdateSettings(item.i, symbolInput.value, intervalInput.value);
    setEditingChart(false);
  }, [item.i, onUpdateSettings]);

  const handleRemove = useCallback(() => {
    onRemove(item.i);
  }, [item.i, onRemove]);

  return (
    <div className="border rounded bg-card relative overflow-hidden h-full w-full p-0 m-0">
      <div className="absolute top-1 right-1 z-50 flex gap-1">
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setEditingChart(!editingChart);
          }}
          className="p-1 hover:bg-accent rounded cursor-pointer"
          aria-label="Chart settings"
          title="Chart Settings"
        >
          <Settings className="size-4" />
        </button>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemove();
          }}
          className="p-1 hover:bg-destructive/10 rounded cursor-pointer"
          aria-label={`Remove ${item.i} chart`}
        >
          <X className="size-4" />
        </button>
      </div>

      {editingChart && (
        <div
          className="absolute top-10 right-1 bg-card border rounded p-3 z-50 shadow-lg min-w-[250px]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Chart Settings</h3>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Symbol</label>
              <input
                type="text"
                defaultValue={item.symbol}
                placeholder="BINANCE:BTCUSDT.P"
                className="w-full px-2 py-1 text-sm border rounded bg-background"
                id={`symbol-${item.i}`}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Interval</label>
              <select
                defaultValue={item.interval}
                className="w-full px-2 py-1 text-sm border rounded bg-background"
                id={`interval-${item.i}`}
              >
                <option value="1">1 min</option>
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="60">1 hour</option>
                <option value="240">4 hour</option>
                <option value="D">1 day</option>
                <option value="W">1 week</option>
                <option value="M">1 month</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApply}
                className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 font-medium"
              >
                Apply
              </button>
              <button
                onClick={() => setEditingChart(false)}
                className="px-3 py-1.5 border rounded text-sm hover:bg-accent"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <TradingViewWidget
        chartId={item.i}
        symbol={item.symbol}
        interval={item.interval}
      />
    </div>
  );
});

export default function IndexPage({ layout, setLayout }: IndexPageProps) {
  // 차트 삭제 함수 - useCallback으로 메모이제이션
  const removeItem = useCallback((itemId: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== itemId));
  }, [setLayout]);

  // 차트 설정 변경 함수 - useCallback으로 메모이제이션
  const updateChartSettings = useCallback((itemId: string, symbol: string, interval: string) => {
    setLayout((prevLayout) =>
      prevLayout.map(item =>
        item.i === itemId
          ? { ...item, symbol, interval }
          : item
      )
    );
  }, [setLayout]);

  // 레이아웃 변경 핸들러 - useCallback으로 메모이제이션
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout((prevLayout) => {
      // 기존 차트 설정(symbol, interval)을 보존하면서 위치/크기만 업데이트
      return newLayout.map((layoutItem) => {
        const existingItem = prevLayout.find(item => item.i === layoutItem.i);
        return {
          ...layoutItem,
          symbol: existingItem?.symbol || 'BINANCE:BTCUSDT.P',
          interval: existingItem?.interval || 'D',
        } as ChartLayout;
      });
    });
  }, [setLayout]);

  // 레이아웃 설정 - useMemo로 메모이제이션
  const gridConfig = useMemo(() => ({
    containerPadding: GRID_CONFIG.CONTAINER_PADDING,
    margin: GRID_CONFIG.MARGIN,
    cols: GRID_CONFIG.COLS,
    rowHeight: GRID_CONFIG.ROW_HEIGHT,
  }), []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <ResponsiveGridLayout
        className="layout"
        containerPadding={gridConfig.containerPadding}
        margin={gridConfig.margin}
        layout={layout}
        cols={gridConfig.cols}
        rowHeight={gridConfig.rowHeight}
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => (
          <div key={item.i}>
            <ChartItem
              item={item}
              onRemove={removeItem}
              onUpdateSettings={updateChartSettings}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}