import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Определяємо base path залежно від платформи
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/lab_1DP/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
})
