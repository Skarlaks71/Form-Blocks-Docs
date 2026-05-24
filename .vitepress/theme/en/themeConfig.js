export const englishThemeConfig = {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Buy me a Monster', link: '/markdown-examples' }
  ],
  sidebar: [
    {
      text: 'Quick Start', // Título traduzido
      items: [
        { text: 'Getting Started', link: '/en/guide/first-steps/getting-started' },
        { text: 'Exploring the DSL', link: '/en/guide/first-steps/exploring-dsl' },
        { text: 'Registry: Registering Inputs', link: '/en/guide/first-steps/registry' },
      ]
    },
    {
      text: 'Components', // Título traduzido
      items: [
        {
          text: 'Blocks',
          collapsed: true,
          items: [
            { text: 'FormBlocks', link: '/en/guide/blocks/form-blocks' },
            { text: 'FormGroupBlocks', link: '/en/guide/blocks/form-group-blocks' },
            { text: 'FormInputsBlocks', link: '/en/guide/blocks/form-inputs-blocks' },
            { text: 'FormBlocksRepeater', link: '/en/guide/blocks/form-blocks-repeater' },
            { text: 'FormInputsRepeaterItem', link: '/en/guide/blocks/form-blocks-repeater-item' },
          ]
        },
        {
          text: 'Layout',
          collapsed: true,
          items: [
            { text: 'Container', link: '/en/guide/layout/fb-container' },
            { text: 'Row', link: '/en/guide/layout/fb-row' },
            { text: 'Col', link: '/en/guide/layout/fb-col' },
          ]
        },
        {
          text: 'Inputs',
          collapsed: true,
          items: [
            { text: 'Input', link: '/en/guide/inputs/fb-input' },
            { text: 'Input Block', link: '/en/guide/inputs/fb-input-block' },
            { text: 'Textarea', link: '/en/guide/inputs/fb-textarea' },
            { text: 'Checkbox', link: '/en/guide/inputs/fb-checkbox' },
            { text: 'Radio', link: '/en/guide/inputs/fb-radio' },
          ]
        },
        {
          text: 'Miscellaneous',
          collapsed: true,
          items: [
            { text: 'Button', link: '/en/guide/miscellaneous/fb-button' },
          ]
        },
      ],
    },
  ],
}