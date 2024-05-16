<template>
  <ion-page>
    <the-footer title="Startseite"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="quickstart-text-div"><p>Schnellstart</p></div>
        <div v-if="showPlanWorkout" class="current-planWorkout-div">
          <ion-card @click="toActivePlan" class="create-plan-card">
            <ion-icon class="add-icon" :icon="arrowForwardCircle"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline">{{
                activePlan
              }}</ion-label>
              <ion-label class="create-plan-label-text"
                >weiter mit dem Plan</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div v-if="!showPlanWorkout" class="create-plan-div">
          <ion-card @click="toPlanDecision" class="create-plan-card">
            <ion-icon class="add-icon" :icon="bookOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >Starte jetzt durch</ion-label
              >
              <ion-label class="create-plan-label-text"
                >beginne deinen Plan</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="workouts-text-div"><p>Workouts</p></div>

        <div class="quickstart-div-grid">
          <div class="beginner-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="beginnerWorkoutName"
                :workoutId="beginnerWorkoutId"
                :urlprefix="urlprefix"
                imageName="beginner"
                difficulty="1"
              >
              </workout-card
            ></ion-card>
          </div>
          <div class="advanced-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="advancedWorkoutName"
                :workoutId="advancedWorkoutId"
                :urlprefix="urlprefix"
                imageName="advanced"
                difficulty="2"
              >
              </workout-card
            ></ion-card>
          </div>
          <div class="champ-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="champWorkoutName"
                :workoutId="champWorkoutId"
                :urlprefix="urlprefix"
                imageName="champ"
                difficulty="3"
              ></workout-card
            ></ion-card>
          </div>
        </div>
        <div class="more-text-div"><p>Mehr</p></div>
        <div class="myPlans-div">
          <ion-card @click="toMyPlans" class="myPlans-card">
            <ion-icon class="add-icon" :icon="readerOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >meine Pläne</ion-label
              >
              <ion-label class="create-plan-label-text"
                >benutzerdefinierte Pläne</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="myWorkouts-div">
          <ion-card @click="toMyWorkouts" class="myWorkouts-card">
            <ion-icon class="add-icon" :icon="barbellOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >meine Workouts</ion-label
              >
              <ion-label class="create-plan-label-text"
                >benutzerdefinierte Workouts</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="statistics-div">
          <ion-card @click="toSettings" class="settings-card">
            <ion-icon class="add-icon" :icon="settingsOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >Einstellungen</ion-label
              >
              <ion-label class="create-plan-label-text"
                >nehme Einstellungen vor</ion-label
              >
            </div>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonCard, IonIcon, IonLabel } from "@ionic/vue";
import { computed, onMounted } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import { useMyPlanStore } from "../store/myPlans";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref } from "vue";
import { onIonViewWillLeave } from "@ionic/vue";
import WorkoutCard from "../../src/components/reusable/WorkoutCard.vue";
import {
  bookOutline,
  readerOutline,
  barbellOutline,
  settingsOutline,
  arrowForwardCircle,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { getWorkoutList } from "@/composables/getMyWorkoutList";
import { loginStore } from "@/store/authentication/loginStore";
import { Workout } from "@/models/Workout";
import { getPlanList } from "@/composables/getMyPlanList";
import { Plan } from "@/models/Plan";
import { synchronizePlans } from "@/services/planService";
import { synchronizeWorkouts } from "@/services/workoutsService";
import getDefaultWorkoutIds from "@/composables/getDefaultWorkoutIds";

let closeMenu = ref(false);
onIonViewWillLeave(() => {
  console.log("Home page did leave");

  // BIS AN SIDEMENU WEITERGEBEN UND DORT WATCHEN UND DANN DAS HIER TRIGGERN
  closeMenu.value = true;
});
//const store = loginStore();
onMounted(async () => {
  const logStore = loginStore();
  var userId = logStore.getUserId();
  let workouts: Workout[] = await getWorkoutList();
  let plans: Plan[] = await getPlanList();
  if (navigator.onLine && userId != null) {
    await synchronizePlans(plans, userId as string);
    await synchronizeWorkouts(workouts, userId as string);
  }
  console.log("workouts");
  console.log(workouts);
});

//sideMENÜ LOGIC

//get the workouts that are saved in the store
let list;
let beginnerWorkoutName = ref("");
let advancedWorkoutName = ref("");
let champWorkoutName = ref("");
let beginnerWorkoutId = ref("");
let advancedWorkoutId = ref("");
let champWorkoutId = ref("");
let urlprefix = "/preview/";
let planStore;
const plans: any = ref([]);
async function loadStore() {
  const store = useWorkoutsStore();
  planStore = useMyPlanStore();
  await planStore.loadPlansFromStore();
  await store.loadWorkoutsFromStore();
  list = store.workoutList;
  plans.value = planStore.planList;

  let defaultWorkouts = await getDefaultWorkoutIds();

  beginnerWorkoutName.value = defaultWorkouts[0].name;
  advancedWorkoutName.value = defaultWorkouts[1].name;
  champWorkoutName.value = defaultWorkouts[3].name;
  beginnerWorkoutId.value = defaultWorkouts[0].id;
  advancedWorkoutId.value = defaultWorkouts[1].id;
  champWorkoutId.value = defaultWorkouts[3].id;
}

loadStore();

let showPlanWorkout = computed(() => {
  if (plans.value.length >= 0 && planStore.activePlan != "noPlan") {
    return true;
  } else {
    return false;
  }
});

let activePlan = computed(() => {
  return planStore.activePlanName;
});

function toActivePlan() {
  console.log("planStore in homepage");
  console.log(planStore);
  router.push("/planPreview/" + planStore.activePlanId);
}

planStore.$subscribe(
  (mutation, state) => {
    console.log("a change happened");
    console.log(mutation, state);
    plans.value = state.planList;
  },
  { detached: true }
);

const router = useRouter();

function toMyPlans() {
  router.push("/myPlans");
}
function toMyWorkouts() {
  router.push("/myworkouts");
}
let routeID;
function toCreatePlans() {
  routeID = Math.floor(Math.random() * 1000);

  router.push({
    path: "/workoutplan/" + routeID + "/createPlanName",
  });
}

function toPlanDecision() {
  router.push("/planDecision");
}

function toSettings() {
  router.push("/userSettings");
}
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 5% [row1-end] 15% [row2-start] 5% [row2-end]20% [row3-start]5% [row3-end]15% [row4-start] 15% [row4-end] 15% [row5-start];
  grid-template-columns: [column1-start] 100% [column1-end];
}

.quickstart-text-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
}
.current-planWorkout-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
}

.create-plan-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
}

.workouts-text-div {
  grid-row: row2-start / row2-end;
  grid-column: column1-start / column1-end;
}
.quickstart-div-grid {
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column1-end;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 33% [column1-end] 33% [column2-start] 33% [column2-end];
}
.beginner-div {
  height: 100%;
  width: 100%;
  grid-row: row1-start / row1-end;
  grid-template: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}
.advanced-div {
  grid-row: row1-start / row1-end;
  grid-template: column1-end / column2-start;
}
.champ-div {
  grid-row: row1-start / row1-end;
  grid-template: column2-start / column2-end;
}
.quickWorkout-card {
  height: 90%;
  width: 90%;
}
.currentWorkout-card {
  height: 90%;
}

.create-plan-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #dbbfdd;
  padding: 5%;
}
.myPlans-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
.myWorkouts-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
.settings-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}
.more-text-div {
  grid-row: row3-start / row3-end;
  grid-column: column1-start / column1-end;
}
.myPlans-div {
  grid-row: row3-end / row4-start;
  grid-column: column1-start / column1-end;
}
.myWorkouts-div {
  grid-row: row4-start / row4-end;
  grid-column: column1-start / column1-end;
}
.statistics-div {
  grid-row: row4-end / row5-start;
  grid-column: column1-start / column1-end;
}

.add-icon {
  font-size: 64px;
  color: white;
}

.label-flex-div {
  display: flex;
  flex-direction: column;
}
.create-plan-label-headline {
  font-size: 18px;
  color: white;
  font-weight: bold;
}
.create-plan-label-text {
  font-size: 12px;
  color: white;
  font-weight: bold;
}
</style>
