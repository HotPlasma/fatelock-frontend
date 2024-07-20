import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  process.env.NODE_ENV == "production" ? vitePluginFaviconsInject('src/assets/images/logo.png') : false
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})