import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

// `vite build --mode preview-single` produces one self-contained HTML file
// (hash routing) for sharing a quick preview. Normal builds are untouched.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview-single' ? [viteSingleFile()] : [])],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: mode === 'preview-single' ? { outDir: 'dist-preview' } : undefined,
}))
