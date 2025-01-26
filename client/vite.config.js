import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust base if needed
  build: {
    outDir: 'client/dist', // Ensure this matches the static folder served by Vercel
  },
});
