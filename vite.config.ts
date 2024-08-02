import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  process.env.NODE_ENV == "production" ? vitePluginFaviconsInject('src/assets/images/logo.png') : false,
  VitePluginRadar({
    // Google Analytics tag injection
    analytics: {
      id: 'G-67ECDV25M9',
    },
  })
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})