import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import ui from '@nuxt/ui/vue-plugin'

import Root from '../ui/Root.vue'
import routes from '../routes/routes'

const app = createApp(Root)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(pinia)
app.use(ui)

app.mount('#root')
