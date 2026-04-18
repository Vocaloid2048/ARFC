import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr"
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
    viteBasicSslPlugin(),
  ],
  resolve: {
    alias: {
      html2canvas: 'html2canvas-pro'
    }
  },
  server: {
    https: true,
    host: true,
    port: 5173,
  }
})
