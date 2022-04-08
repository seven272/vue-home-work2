import { createApp } from 'vue'
import App from './App.vue'
import AppButton from '@/components/AppButton.vue'
import './theme.css'
const app = createApp(App)
// регистрируем компонент с кнопкой глобально
app.component('app-button', AppButton)
app.mount('#app')
