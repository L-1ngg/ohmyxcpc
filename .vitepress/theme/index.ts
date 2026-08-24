import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ExportCenter from './ExportCenter.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ExportCenter', ExportCenter)
  }
}
