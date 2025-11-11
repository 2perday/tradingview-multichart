import { useState, useEffect, useCallback } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import NavBar from "@/components/common/navbar"
import IndexPage from "./pages/common/IndexPage"
import type { ChartLayout } from "@/types/layout"
import { STORAGE_KEYS } from "@/constants/grid"
import {
  loadLayoutFromStorage,
  saveLayoutToStorage,
  createInitialLayout,
  createChartItem,
  loadLayoutFromURL,
  saveLayoutToURL,
} from "@/utils/layout"

function App() {
  // URL 또는 localStorage에서 초기 레이아웃 불러오기
  const [layout, setLayout] = useState<ChartLayout[]>(() => {
    // 1순위: URL에서 로드
    const urlLayout = loadLayoutFromURL();
    if (urlLayout && urlLayout.length > 0) {
      return urlLayout;
    }
    // 2순위: localStorage에서 로드
    return loadLayoutFromStorage(STORAGE_KEYS.LAYOUT) ?? createInitialLayout();
  });

  // layout이 변경될 때마다 localStorage와 URL에 저장
  useEffect(() => {
    saveLayoutToStorage(STORAGE_KEYS.LAYOUT, layout);
    saveLayoutToURL(layout);
  }, [layout]);

  // 차트 추가 함수 - useCallback으로 메모이제이션
  const addItem = useCallback(() => {
    setLayout((prevLayout) => {
      const newItem = createChartItem(prevLayout);
      return [...prevLayout, newItem];
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey={STORAGE_KEYS.THEME}>
      <div className="h-screen flex flex-col">
        <NavBar onAddItem={addItem} />
        <IndexPage layout={layout} setLayout={setLayout} />
      </div>
    </ThemeProvider>
  )
}

export default App
