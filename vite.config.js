import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Use polling to avoid ENOSPC (inotify limit) errors on some systems
      usePolling: true,
      interval: 1000,
    },
  },
})
