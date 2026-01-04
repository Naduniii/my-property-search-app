import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',     // Use jsdom environment for DOM testing
    globals: true,            // Provide global expect, describe, it, etc.
    setupFiles: './src/setupTests.js',  // Your jest-dom setup file
  },

})
