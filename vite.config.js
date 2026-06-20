import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isGhPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isGhPages ? '/EcoStack-cto.new/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
})