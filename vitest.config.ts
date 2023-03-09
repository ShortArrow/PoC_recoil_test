import viteConfig from './vite.config'
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

export default mergeConfig(viteConfig, defineConfig(
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts'
    }
  }
)) 
