<template>
  <ion-card color="medium">
    <div class="grid-style-finish">
      <div class="flag-div">
        <ion-icon class="flag-icon" :icon="ribbon" color="secondary"></ion-icon>
      </div>
      <div class="finish-subtext">
        <ion-label class="finish-subtext-label">
          {{ finishSubtext }}
        </ion-label>
      </div>
      <div v-if="isPlan" class="workout-details">
        <div class="progress-div">
          <p>your progress</p>
        </div>
        <div class="percentage-done-div">
          <ion-label class="percentage-done-label"> </ion-label>
        </div>
      </div>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            class="add-button"
            shape="round"
            color="warning"
            @click="navigateBack()"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="backspace"
            ></ion-icon
            ><ion-label color="secondary">Zurück</ion-label></ion-button
          >
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonButton } from "@ionic/vue";
import { defineProps, defineEmits, computed, watch, ref } from "vue";
import { useStatisticsStore } from "@/store/statisticsStore";
import { UpdateUserStatistics } from "@/services/userStatisticsService";
import { useMyPlanStore } from "@/store/myPlans";
import planStorage from "@/storage/myPlanStorage";
import defaultPlans from "@/storage/defaultPlanStorage";
import { useWorkoutPlanData } from "@/store/workoutPlanData";
import { useRouter } from "vue-router";
import { ribbon, backspace } from "ionicons/icons";
import { updateActivePlanInStorage } from "@/composables/updateActivePlanInStorage";
import { Plan } from "@/models/Plan";
import { updatePlanInDB } from "@/services/planService";
import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import { WorkoutStatistic } from "@/models/userStatistic/WorkoutStatistic";
import { loginStore } from "@/store/authentication/loginStore";
const props = defineProps({
  page: String,
  proptime: Number,
  isFinished: Boolean,
  workoutName: String,
});

const emit = defineEmits(["resetAll"]);

let finishSubtext = props.workoutName + " abgeschlossen!";
let id = Date.now().toString();

//routing
const router = useRouter();

let statisticStore = useStatisticsStore();
let newDate = new Date();
console.log(id);
console.log("date:");
console.log(newDate);

let myPlan: any = [];

let isPlan = ref(false);

let weekNumber = 4000;
let dayNumber = 4000;
let currentPlanName = "";

const workoutPlanDataStore = useWorkoutPlanData();
weekNumber = workoutPlanDataStore.weekNumber;
dayNumber = workoutPlanDataStore.dayNumber;
currentPlanName = workoutPlanDataStore.currentPlanName;

async function loadPlanStore() {
  const planStore = useMyPlanStore();
  await planStore.loadPlansFromStore();
  console.log("currentPlanName");
  console.log(currentPlanName);
  let combinedPlans = planStore.planList.concat(planStore.prePlanList);
  console.log("combinedPlans");
  console.log(combinedPlans);
  myPlan = combinedPlans.find((element) => element.name == currentPlanName);
  console.log("myPlan");
  console.log(myPlan);
}
loadPlanStore();

async function reloadPlanStore() {
  const planStore = useMyPlanStore();
  await planStore.loadPlansFromStore();
}

async function updatePlanInDBandLocal() {
  await loadPlanStore();

  if (weekNumber == 500 || weekNumber == 4000) {
    return;
  }

  updateActivePlanInStorage(myPlan.name, myPlan.id);
  myPlan.weeks[weekNumber].days[dayNumber].state = "done";
  myPlan.weeks[weekNumber].days[dayNumber].doneDate = newDate;

  if (
    myPlan.currentWeek == myPlan.weeks.length - 1 &&
    myPlan.currentDay == myPlan.weeks[weekNumber].days.length - 1
  ) {
    console.log("letzte woche erreicht");
    myPlan.currentDay++;
  } else {
    if (myPlan.currentDay < myPlan.weeks[weekNumber].days.length - 1) {
      myPlan.currentDay++;
    } else {
      myPlan.currentWeek++;
      myPlan.currentDay = 0;
    }
    myPlan.weeks[myPlan.currentWeek].days[myPlan.currentDay].state = "today";
  }

  let parseArray = JSON.parse(JSON.stringify(myPlan.weeks));
  let lastWorkout = newDate;

  let sendArray: Plan = {
    id: myPlan.id,
    isDefault: myPlan.isDefault,
    name: myPlan.name,
    userId: myPlan.userId,
    currentDay: myPlan.currentDay,
    currentWeek: myPlan.currentWeek,
    totalDays: myPlan.totalDays,
    lastWorkout: lastWorkout,
    lastUpdated: newDate,
    weeks: parseArray,
  };

  if (sendArray.isDefault == true) {
    console.log("es ist ein default plan");
    console.log(myPlan);
    await defaultPlans.removeItem(myPlan.id);
    await defaultPlans.setItem(sendArray.id, sendArray);
    await reloadPlanStore();
  } else {
    await planStorage.removeItem(myPlan.id);
    await planStorage.setItem(sendArray.id, sendArray);
    if (navigator.onLine) {
      sendArray.lastWorkout = newDate;
      //gehe durch alle weeks durch und überall wo doneDate = newDate ist, setze es auf newDate
      for (let i = 0; i < sendArray.weeks.length; i++) {
        for (let j = 0; j < sendArray.weeks[i].days.length; j++) {
          if (sendArray.weeks[i].days[j].doneDate == newDate) {
            sendArray.weeks[i].days[j].doneDate = newDate;
          }
        }
      }
      console.log("myPlan");
      console.log(myPlan);
      console.log("sendArray");
      console.log(sendArray);
      await updatePlanInDB(sendArray);
    }
    await reloadPlanStore();
  }
}

async function workoutToStatistics() {
  const workoutStatistic: WorkoutStatistic = {
    workoutId: props.page as string,
    workoutName: props.workoutName as string,
    date: newDate as Date,
    workoutTime: props.proptime as number,
  };
  console.log("das ist die workoutStatistic die gepushed werden soll");
  console.log(workoutStatistic);
  const logStore = loginStore();
  const userId = logStore.getUserId();
  await statisticStore.loadStatisticsInStoreFromDB(userId as string);
  await statisticStore.addWorkoutToStatisticStore(workoutStatistic);
  const userStatistic: UserStatistic = statisticStore.getUserStatistic;
  await UpdateUserStatistics(userStatistic);
}

watch(
  () => props.isFinished,
  (newValue) => {
    if (newValue == true) {
      updatePlanInDBandLocal();
      workoutToStatistics();
    }
  },
  { deep: true }
);

function navigateBack() {
  if (weekNumber == 500 || weekNumber == 4000) {
    router.push({ path: "/userStatistics", replace: true });
    emit("resetAll");
  } else {
    workoutPlanDataStore.weekNumber = 500;
    workoutPlanDataStore.dayNumber = 500;

    router.push({ path: "/planPreview/" + myPlan.id, replace: true });
    emit("resetAll");
  }
}
</script>

<style scoped>
.grid-style-finish {
  height: 100%;
  width: 100%;
  background-size: cover;
  display: grid;
  grid-template-rows: [row1-start] 15% [row1-end] 15% [row2-start] 10% [row2-end]35% [row3-start] 25% [row3-end];
  grid-template-columns: [line1] 100% [line2];
}

ion-card {
  height: 100%;
  width: 100%;
  margin: 0;
}

.flag-div {
  grid-row: row1-start / row2-start;
  grid-column: line1 / line2;
  align-self: center;
  justify-self: center;
}

.flag-icon {
  font-size: 112px;
}

.finish-text {
  font-size: 48px;
  justify-self: center;
  align-self: center;
  grid-row: row1-end / row2-start;
  grid-column: line1 / line2;
  color: var(--ion-color-primary);
}

.finish-subtext {
  font-size: 18px;
  justify-self: center;
  align-self: center;
  grid-row: row2-start / row2-end;
  grid-column: line1 / line2;
  color: var(--ion-color-primary);
}

.finish-subtext-label {
  color: white;
  font-size: larger;
  font-weight: bold;
}

.workout-details {
  grid-row: row2-end / row3-start;
  grid-column: line1 / line2;
}

.progress-div {
}

p {
  color: black;
  font-size: larger;
  font-weight: bold;
  margin-left: 5%;
}

.percentage-done-div {
}
.percentage-done-label {
}

ion-footer {
  height: 10%;
}
.footer-grid {
  grid-row: row3-start / row3-end;
  grid-column: line1 / line2;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 100% [column1-end];

  height: 100%;
  background-color: var(--ion-color-light);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-top: 0.5px solid lightgray;
}

.addExercise {
  grid-row: row1-start / row1-end;
  width: 100%;
  text-align: center;
}

.add-button {
  position: fixed;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
  width: 60%;
}
</style>
