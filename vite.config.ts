import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：部署到任意子目录（GitHub Pages /ai-guide-web/、内网 /ems/app/temp/ 等）
  // 都能正常加载资源，无需为每个部署位置单独构建
  base: './',
  plugins: [react()],
  server: {
    // 监听所有网卡（0.0.0.0），局域网设备可通过本机 IP 访问；
    // Vite 启动时会自动把每块网卡的 Network 地址打印出来
    host: true,
  },
})
