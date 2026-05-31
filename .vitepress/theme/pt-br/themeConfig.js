export const themeConfig = {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Doe um Monster', link: '/markdown-examples' }
  ],
  sidebar: [
    {
      text: 'Guia Rápido',
      items: [
        { text: 'Primeiros Passos', link: '/guide/first-steps/getting-started' }, // Removido o .md do final (o VitePress prefere rotas limpas)
        { text: 'Explorando a DSL', link: '/guide/first-steps/exploring-dsl' },
        { text: 'Registry: Registrando Inputs', link: '/guide/first-steps/registry' },
      ]
    },
    {
      text: 'Componentes',
      items: [
        {
          text: 'Blocks',
          collapsed: true,
          items: [
            { text: 'FormBlocks', link: '/guide/blocks/form-blocks' },
            { text: 'FormGroupBlocks', link: '/guide/blocks/form-group-blocks' },
            { text: 'FormInputsBlocks', link: '/guide/blocks/form-inputs-blocks' },
            { text: 'FormBlocksRepeater', link: '/guide/blocks/form-blocks-repeater' },
            { text: 'FormInputsRepeaterItem', link: '/guide/blocks/form-blocks-repeater-item' },
          ]
        },
        {
          text: 'Layout',
          collapsed: true,
          items: [
            { text: 'Container', link: '/guide/layout/fb-container' },
            { text: 'Row', link: '/guide/layout/fb-row' },
            { text: 'Col', link: '/guide/layout/fb-col' },
          ]
        },
        {
          text: 'Inputs',
          collapsed: true,
          items: [
            { text: 'Input', link: '/guide/inputs/fb-input' },
            { text: 'Input Block', link: '/guide/inputs/fb-input-block' },
            { text: 'Textarea', link: '/guide/inputs/fb-textarea' },
            { text: 'Checkbox', link: '/guide/inputs/fb-checkbox' },
            { text: 'Radio', link: '/guide/inputs/fb-radio' },
          ]
        },
        {
          text: 'Miscellaneous',
          collapsed: true,
          items: [
            { text: 'Button', link: '/guide/miscellaneous/fb-button' },
          ]
        },
      ]
    },
    {
      text: 'Composables',
      collapsed: true,
      items: [
        {
          text: 'useCore',
          collapsed: true,
          items: [
            {
              text: 'createInternalProps',
              link: '/guide/composables/useCore/createInternalProps.md',
            }
          ]
        },
        {
          text: 'useFormHandle',
          collapsed: true,
          items: [
            {
              text: 'makeGroups',
              link: '/guide/composables/useFormHandle/makeGroups.md',
            }
          ]
        },
        {
          text: 'useCloneDeep',
          collapsed: true,
          items: [
            {
              text: 'cloneDeep',
              link: '/guide/composables/useCloneDeep/cloneDeep.md',
            }
          ]
        },
        // {
        //   text: 'useMaska',
        //   collapsed: true,
        //   items: [
        //     { text: 'configMoney' },
        //     { text: 'docMask' },
        //     { text: 'dateMask' },
        //     { text: 'docCNPJ' },
        //     { text: 'docCPF' },
        //     { text: 'dateMonthMask' },
        //     { text: 'cepMask' },
        //   ]
        // },
        // {
        //   text: 'useParse',
        //   collapsed: true,
        //   items: [
        //     { text: 'parseToEditData' },
        //     { text: 'parseToDatabase' },
        //     { text: 'parseToModel' },
        //     { text: 'parseLimitProps' },
        //     { text: 'parseToDatabaseWithRepeater' },
        //     { text: 'parseToDatabaseComplex' },
        //     { text: 'parseStringShortand' },
        //     { text: 'castPrimitive' },
        //   ]
        // },
        // {
        //   text: 'useSearch',
        //   collapsed: true,
        //   items: [
        //     { text: 'isValidInputType' }
        //   ]
        // },
      ]
    }
  ]
}