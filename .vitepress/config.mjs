import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { themeConfig } from './theme/pt-br/themeConfig'
import { englishThemeConfig } from './theme/en/themeConfig'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Form-Blocks-Docs/',
  title: "Form Blocks",
  description: "A forma mais simples de escrever formulários complexos para seus projetos!",
  vite: {
    resolve: {
      alias: {
        // Mapeia o '@theme' para a pasta oculta '.vitepress/theme'
        '@theme': fileURLToPath(new URL('./theme', import.meta.url))
      }
    }
  },
  locales: {
    root: {
      label: 'Português',
      lang: 'pt-br',
      themeConfig: themeConfig,
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en',
      themeConfig: englishThemeConfig,
    },
  },
  themeConfig: {
    siteTitle: false,
  }
})
