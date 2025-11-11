// import './App.css'
import { ThemeProvider } from "@/components/theme/theme-provider"
import NavBar from "@/components/common/navbar"
import IndexPage from "./pages/common/IndexPage"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar />
      <IndexPage />
    </ThemeProvider>
  )
}

export default App
