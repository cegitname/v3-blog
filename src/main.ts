import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'highlight.js/styles/stackoverflow-light.css'
import preCode from '@/components/preCode'
const app = createApp(App)
app.component('preCode', preCode)
app.use(router).use(store).mount('#app')
