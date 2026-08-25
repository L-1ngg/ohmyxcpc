import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ExportCenter from './ExportCenter.vue'
import './custom.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ExportCenter', ExportCenter)
  }
}
