import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:4200
  },
  build:{
    outDir:'./dist/demo'
  },
  resolve:{
    alias:{
      src:path.resolve('src/')
    }
  }
})
