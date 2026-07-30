import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目站点的子路径：https://olddream.github.io/ai-guide-web/
  base: '/ai-guide-web/',
  plugins: [react()],
})
