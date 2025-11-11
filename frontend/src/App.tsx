// import './App.css'
import { ThemeProvider } from "@/components/theme/theme-provider"
import NavBar from "@/components/common/navbar"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar />
    </ThemeProvider>
  )
}

export default App
