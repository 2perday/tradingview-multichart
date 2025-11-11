import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function IndexPage() {
  const layout = [
    { i: "b", x: 0, y: 0, w: 4, h: 8, minW: 2, minH: 6 },
  ];

  return (
    <div className="min-h-screen">
      <main className="">
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <div key="b" className="border bg-card">b</div>
        </GridLayout>
      </main>
    </div>
  );
}