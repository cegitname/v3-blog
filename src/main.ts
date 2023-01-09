import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const app = createApp(App)
app.use(router).use(store).mount('#app')
