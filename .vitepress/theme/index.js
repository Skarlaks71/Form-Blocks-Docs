import DefaultTheme from 'vitepress/theme'
import './custom.css' // Certifique-se que essa linha existe
import FormBlocks from '@form-blocks/vue'
import '@form-blocks/vue/style.css'
import { h } from 'vue'
import HomeHeroActions from './components/HomeHeroActions.vue'
import SiteTitle from './components/SiteTitle.vue'


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(FormBlocks)
  },

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-actions-after': () => h(HomeHeroActions),
      'nav-bar-title-after': () => h(SiteTitle),
    })
  }
}