import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import WorkoutLive from "@/components/workout/WorkoutLive.vue";
import WorkoutPreview from "@/components/workout/WorkoutPreview.vue";
import MyWorkouts from "@/components/workout/MyWorkouts.vue";
import PreWorkouts from "@/components/workout/PreWorkouts.vue";
import WorkoutEditor from "@/components/workout/WorkoutEditor.vue";
import PlanCreateName from "@/components/plan/PlanCreateName.vue";
import PlanCreateWeeks from "@/components/plan/PlanCreateWeeks.vue";
import PlanCreateDays from "@/components/plan/PlanCreateDays.vue";
import PlanCreateCustomize from "@/components/plan/PlanCreateCustomize.vue";
import MyPlans from "@/components/plan/MyPlans.vue";
import PrePlans from "@/components/plan/PrePlans.vue";
import PlanPreview from "@/components/plan/PlanPreview.vue";
import PlanDecision from "@/components/plan/PlanDecision.vue";
import PlanAddWorkoutsList from "@/components/plan/PlanAddWorkoutsList.vue";
import ExerciseListPage from "@/components/exercise/ExerciseListPage.vue";
import UserStatistics from "@/components/statistics/UserStatistics.vue";
import UserSettings from "@/components/settings/UserSettings.vue";
import LoginPage from "@/components/authentication/LoginPage.vue";
import ProfilePage from "@/components/authentication/ProfilePage.vue";
import RegisterPage from "@/components/authentication/RegisterPage.vue";
import NotificationsIncomingPage from "@/components/notifications/NotificationsIncomingPage.vue";
import SharedItemsPage from "@/components/sharedItems/SharedItemsPage.vue";

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
    path: "/planAddWorkoutsList",
    name: "PlanAddWorkoutsList",
    component: PlanAddWorkoutsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/myPlans",
    name: "MyPlans",
    component: MyPlans,
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
    name: "PlanDecision",
    component: PlanDecision,
    meta: { requiresAuth: true },
  },
  {
    path: "/prePlans",
    name: "PrePlans",
    component: PrePlans,
    meta: { requiresAuth: true },
  },
  {
    path: "/PreWorkouts",
    name: "PreWorkouts",
    component: PreWorkouts,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/planCreateName",
    name: "PlanCreateName",
    component: PlanCreateName,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/planCreateWeeks",
    name: "PlanCreateWeeks",
    component: PlanCreateWeeks,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/planCreateDays",
    name: "PlanCreateDays",
    component: PlanCreateDays,
    meta: { requiresAuth: true },
  },
  {
    path: "/workoutplan/:id/PlanCreateCustomize",
    name: "PlanCreateCustomize",
    component: PlanCreateCustomize,
    meta: { requiresAuth: true },
  },
  {
    path: "/exerciseList",
    name: "ExerciseListPage",
    component: ExerciseListPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/userStatistics",
    name: "UserStatistics",
    component: UserStatistics,
    meta: { requiresAuth: true },
  },
  {
    path: "/userSettings",
    name: "UserSettings",
    component: UserSettings,
    meta: { requiresAuth: true },
  },
  {
    path: "/notificationsIncoming",
    name: "notificationsIncoming",
    component: NotificationsIncomingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/sharedItems",
    name: "sharedItemsPage",
    component: SharedItemsPage,
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
  },
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
