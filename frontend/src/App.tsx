// import './App.css'
import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import NavBar from "@/components/common/navbar"
import IndexPage from "./pages/common/IndexPage"

const STORAGE_KEY = "chart-grid-layout";

function App() {
  // localStorage에서 초기 레이아웃 불러오기
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    if (savedLayout) {
      try {
        return JSON.parse(savedLayout);
      } catch (e) {
        console.error("Failed to parse saved layout:", e);
      }
    }
    return [{ i: "init", x: 0, y: 0, w: 6, h: 80, minW: 6, minH: 20 }];
  });

  // layout이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }, [layout]);

  const addItem = () => {
    const newId = `chart-${Date.now()}`;
    const newItem = {
      i: newId,
      x: (layout.length * 6) % 24,
      y: Infinity,
      w: 6,
      h: 20,
      minW: 6,
      minH: 20,
    };
    setLayout([...layout, newItem]);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col">
        <NavBar onAddItem={addItem} />
        <IndexPage layout={layout} setLayout={setLayout} />
      </div>
    </ThemeProvider>
  )
}

export default App
