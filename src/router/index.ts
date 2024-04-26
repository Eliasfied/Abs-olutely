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
import createPlanName from "../components/createPlanName.vue";
import createPlanWeeks from "../components/createPlanWeeks.vue";
import createPlanDays from "../components/createPlanDays.vue";
import createPlanCustomize from "../components/createPlanCustomize.vue";
import WorkoutList from "../components/WorkoutList.vue";
import PlanPreview from "../components/PlanPreview.vue";
import myPlans from "../components/myPlans.vue";
import planDecision from "../components/planDecision.vue";
import prePlans from "../components/prePlans.vue";
import preWorkouts from "../components/preWorkouts.vue";
import LoginPage from "@/components/authentication/LoginPage.vue";
import ProfilePage from "@/components/authentication/ProfilePage.vue";
import RegisterPage from "@/components/authentication/RegisterPage.vue";

import { loginStore } from "@/store/authentication/loginStore";
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
    meta: { requiresAuth: true },
  },
  {
    path: "/myworkouts/editor/:new",
    name: "WorkoutEditor",
    component: WorkoutEditor,
    meta: { requiresAuth: true },
  },
  {
    path: "/myworkouts/editor/:course",
    name: "WorkoutEditor",
    component: WorkoutEditor,
    meta: { requiresAuth: true },
  },
  {
    path: "/preview/:course",
    name: "WorkoutPreview",
    component: WorkoutPreview,
    meta: { requiresAuth: true },
  },
  {
    path: "/workout/:course",
    name: "WorkoutLive",
    component: WorkoutLive,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutList",
    name: "workoutList",
    component: WorkoutList,
    meta: { requiresAuth: true },
  },
  {
    path: "/myPlans",
    name: "myPlans",
    component: myPlans,
    meta: { requiresAuth: true },
  },
  {
    path: "/planPreview/:plan",
    name: "PlanPreview",
    component: PlanPreview,
    meta: { requiresAuth: true },
  },
  {
    path: "/planDecision",
    name: "planDecision",
    component: planDecision,
    meta: { requiresAuth: true },
  },
  {
    path: "/prePlans",
    name: "prePlans",
    component: prePlans,
    meta: { requiresAuth: true },
  },
  {
    path: "/preWorkouts",
    name: "preWorkouts",
    component: preWorkouts,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/createPlanName",
    name: "createPlanName",
    component: createPlanName,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/createPlanWeeks",
    name: "createPlanWeeks",
    component: createPlanWeeks,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/createPlanDays",
    name: "createPlanDays",
    component: createPlanDays,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/createPlanCustomize",
    name: "createPlanCustomize",
    component: createPlanCustomize,
    meta: { requiresAuth: true },
  },
  {
    path: "/exerciseList",
    name: "ExerciseListPage",
    component: ExerciseListPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "SettingsPage",
    component: SettingsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = loginStore();
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.isLoggedIn
  ) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
