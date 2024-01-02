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
import myPlans from "../components/myPlans.vue";
import planDecision from "../components/planDecision.vue";
import prePlans from "../components/prePlans.vue";
import preWorkouts from "../components/preWorkouts.vue";
import ProfileLink from "@/components/ProfileLink.vue";
import { loginStore } from "@/store/loginStore";
import RegisterPage from "@/components/RegisterPage.vue";
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
    path: "/workoutList",
    name: "workoutList",
    component: WorkoutList,
  },
  {
    path: "/myPlans",
    name: "myPlans",
    component: myPlans,
  },
  {
    path: "/planPreview/:plan",
    name: "PlanPreview",
    component: PlanPreview,
  },
  {
    path: "/planDecision",
    name: "planDecision",
    component: planDecision,
  },
  {
    path: "/prePlans",
    name: "prePlans",
    component: prePlans,
  },
  {
    path: "/preWorkouts",
    name: "preWorkouts",
    component: preWorkouts,
  },
  {
    path: "/workoutplan/:id/createPlanName",
    name: "createPlanName",
    component: createPlanName,
  },
  {
    path: "/workoutplan/:id/createPlanWeeks",
    name: "createPlanWeeks",
    component: createPlanWeeks,
  },
  {
    path: "/workoutplan/:id/createPlanDays",
    name: "createPlanDays",
    component: createPlanDays,
  },
  {
    path: "/workoutplan/:id/createPlanCustomize",
    name: "createPlanCustomize",
    component: createPlanCustomize,
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
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "SettingsPage",
    component: SettingsPage,
  },
  {
    path: "/profile",
    name: "ProfileLink",
    component: ProfileLink,
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
    next({ name: "ProfileLink" });
  } else {
    next();
  }
});

export default router;
