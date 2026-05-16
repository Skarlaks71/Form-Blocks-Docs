import DefaultTheme from 'vitepress/theme'
import './custom.css' // Certifique-se que essa linha existe
import FormBlocks from '@form-blocks/vue'
import '@form-blocks/vue/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(FormBlocks)
  }
}