// import './App.css'
import { useState } from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import NavBar from "@/components/common/navbar"
import IndexPage from "./pages/common/IndexPage"

function App() {
  const [layout, setLayout] = useState([
    { i: "init", x: 0, y: 0, w: 6, h: 20, minW: 6, minH: 20 },
  ]);

  const addItem = () => {
    const newId = `chart-${Date.now()}`;
    const newItem = {
      i: newId,
      x: (layout.length * 6) % 24,
      y: Infinity,
      w: 6,
      h: 20,
      minW: 4,
      minH: 10,
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
