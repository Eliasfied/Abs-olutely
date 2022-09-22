import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ExercisePreview from '../components/ExercisePreview.vue';

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/preview/:course',
    name: 'exercisePreview',
    component: ExercisePreview
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
