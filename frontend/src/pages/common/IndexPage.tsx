import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { X } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(GridLayout);

interface IndexPageProps {
  layout: Array<{
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    minH: number;
  }>;
  setLayout: (layout: any) => void;
}

export default function IndexPage({ layout, setLayout }: IndexPageProps) {
  const removeItem = (itemId: string) => {
    setLayout(layout.filter((item) => item.i !== itemId));
  };

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <ResponsiveGridLayout
        className="layout"
        containerPadding={[2, 2]}
        margin={[2, 2]}
        layout={layout}
        cols={24}
        rowHeight={10}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
          <div key={item.i} className="border bg-card relative">
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeItem(item.i);
              }}
              className="absolute top-1 right-1 p-1 hover:bg-destructive/10 rounded z-50 cursor-pointer"
            >
              <X className="size-4" />
            </button>
            <div className="p-2">Chart {item.i}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}