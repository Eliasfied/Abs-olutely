import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import WorkoutLive from "../components/WorkoutLive.vue";
import WorkoutPreview from "../components/WorkoutPreview.vue";
import MyWorkouts from "../components/MyWorkouts.vue";
import WorkoutEditor from "../components/WorkoutEditor.vue";
import ExerciseListPage from "../components/ExerciseListPage.vue";
import Statistics from "../components/Statistics.vue";
import SettingsPage from "../components/SettingsPage.vue";
import WorkoutPlan from "../components/WorkoutPlan.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/myworkouts",
    name: "MyWorkouts",
    component: MyWorkouts,
  },
  {
    path: "/myworkouts/editor/:new",
    name: "WorkoutEditor",
    component: WorkoutEditor,
  },
  {
    path: "/myworkouts/editor/:course",
    name: "WorkoutEditor",
    component: WorkoutEditor,
  },
  {
    path: "/preview/:course",
    name: "WorkoutPreview",
    component: WorkoutPreview,
  },
  {
    path: "/workout/:course",
    name: "WorkoutLive",
    component: WorkoutLive,
  },
  {
    path: "/workoutplan",
    name: "WorkoutPlan",
    component: WorkoutPlan,
  },
  {
    path: "/exerciseList",
    name: "ExerciseListPage",
    component: ExerciseListPage,
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
  },

  {
    path: "/settings",
    name: "SettingsPage",
    component: SettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
