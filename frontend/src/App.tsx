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
  const [layout, setLayout] = useState<ChartLayout[]>(() => {
    const urlLayout = loadLayoutFromURL();
    if (urlLayout && urlLayout.length > 0) {
      return urlLayout;
    }
    return loadLayoutFromStorage(STORAGE_KEYS.LAYOUT) ?? createInitialLayout();
  });

  useEffect(() => {
    saveLayoutToStorage(STORAGE_KEYS.LAYOUT, layout);
    saveLayoutToURL(layout);
  }, [layout]);

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
