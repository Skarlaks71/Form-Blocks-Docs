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
    // https://vitepress.dev/reference/default-theme-config

    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Me ajude com um Monster', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Guia Rápido',
        items: [
          { text: 'Primeiros Passos', link: '/guide/first-steps/getting-started.md' },
          { text: 'Explorando a DSL', link: '/guide/first-steps/exploring-dsl.md' },
          { text: 'Registry: Registrando Inputs', link: '/guide/first-steps/registry.md' },
        ]
      },
      {
        text: 'Componentes',
        items: [
          {
            text: 'Blocks',
            collapsed: true,
            items: [
              { text: 'FormBlocks', link: '/components/blocks/form-blocks.md' },
              { text: 'FormGroupBlocks', link: '/components/blocks/form-group-blocks.md' },
              { text: 'FormInputsBlocks', link: '/components/blocks/form-inputs-blocks.md' },
              { text: 'FormBlocksRepeater', link: '/components/blocks/form-blocks-repeater.md' },
              { text: 'FormInputsRepeaterItem', link: '/components/blocks/form-blocks-repeater-item.md' },
            ]
          },
          {
            text: 'Layout',
            collapsed: true,
            items: [
              { text: 'Container', link: '/components/layout/fb-container.md' },
              { text: 'Row', link: '/components/layout/fb-row.md' },
              { text: 'Col', link: '/components/layout/fb-col.md' },
            ]
          },
          {
            text: 'Inputs',
            collapsed: true,
            items: [
              { text: 'Input', link: '/components/inputs/fb-input.md' },
              { text: 'Input Block', link: '/components/inputs/fb-input-block.md' },
              { text: 'Textarea', link: '/components/inputs/fb-textarea.md' },
              { text: 'Checkbox', link: '/components/inputs/fb-checkbox.md' },
              { text: 'Radio', link: '/components/inputs/fb-radio.md' },
            ]
          },
          {
            text: 'Miscellaneous',
            collapsed: true,
            items: [
              { text: 'Button', link: '/components/miscellaneous/fb-button.md' },
            ]
          },
        ]
      },
      {
        text: 'Composables',
        items: [],
      },
      {
        text: 'Em produção',
        items: [],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
