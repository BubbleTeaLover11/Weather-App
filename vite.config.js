import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/info': `http://localhost:8000/`,
      '/aqiData': `http://localhost:3001`,
      '/humidityData': `http://localhost:3002`,
      '/pressureData': `http://localhost:3003`,
      '/data': `http://localhost:5001`
    }
  },
  plugins: [react()],
})
