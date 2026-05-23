import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Some legacy libraries check for global or process.env
    'process.env': {},
  },
  resolve: {
    alias: {
      // Direct aliases for browser-safe versions
      'crypto': 'crypto-browserify',
      'stream': 'stream-browserify',
      'buffer': 'buffer',
    }
  }
})
