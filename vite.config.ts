import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project page on GitHub Pages → assets are served from /my-portfolio/.
// In dev (mode === 'development'), keep base as '/' so the local server works normally.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/my-portfolio/' : '/',
  plugins: [react()],
}))
