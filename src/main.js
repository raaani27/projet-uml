import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { registerSW } from './registerSW.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

registerSW()
