import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 청크 크기 경고 임계값 증가 (TradingView 위젯 때문에)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 코드 스플리팅 최적화
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'grid-layout': ['react-grid-layout'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    // 기본 minify 사용 (esbuild)
    minify: true,
  },
})
