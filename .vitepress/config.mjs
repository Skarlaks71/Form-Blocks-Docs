import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Form-Blocks-Docs/',
  title: "Form Blocks",
  description: "A forma mais simples de escrever formulários complexos para seus projetos!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Guia Rápido',
        items: [
          { text: 'Primeiros Passos', link: '/guide/getting-started.md' },
          { text: 'Explorando a DSL', link: '/guide/exploring-dsl.md' },
          { text: 'Registry: Registrando Inputs', link: '/guide/registry.md' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
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
              { text: 'Input' },
              { text: 'Checkbox' },
              { text: 'Radio' },
              { text: 'Select' },
              { text: 'Textarea' },
            ]
          },
          {
            text: 'Miscellaneous',
            collapsed: true,
            items: [
              { text: 'Button' },
            ]
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
