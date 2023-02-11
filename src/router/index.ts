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
import createPlanName from "../components/createPlanName.vue";
import createPlanWeeks from "../components/createPlanWeeks.vue";
import createPlanDays from "../components/createPlanDays.vue";
import createPlanCustomize from "../components/createPlanCustomize.vue";
import WorkoutList from "../components/WorkoutList.vue";
import PlanPreview from "../components/PlanPreview.vue";
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
    component: createPlanName,
  },
  {
    path: "/createPlanWeeks",
    name: "createPlanWeeks",
    component: createPlanWeeks,
  },
  {
    path: "/createPlanDays",
    name: "createPlanDays",
    component: createPlanDays,
  },
  {
    path: "/createPlanCustomize",
    name: "createPlanCustomize",
    component: createPlanCustomize,
  },
  {
    path: "/workoutList",
    name: "workoutList",
    component: WorkoutList,
  },
  {
    path: "/planPreview/:plan",
    name: "PlanPreview",
    component: PlanPreview,
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
