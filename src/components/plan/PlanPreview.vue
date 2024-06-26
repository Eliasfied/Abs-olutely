<template>
  <ion-page>
    <the-footer title="Planvorschau"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="plan-headline-name">
          <p>Planname</p>
        </div>
        <div class="reset-div">
          <ion-icon
            class="reset-icon"
            :icon="reload"
            @click="resetPlan"
          ></ion-icon>
        </div>
        <div class="plan-name">
          <ion-label class="plan-name-label" color="secondary">
            {{ weekArray.name }}
          </ion-label>
        </div>
        <div class="progress-bar-div">
          <CircleProgressBar
            class="progress-bar"
            :value="workoutsDone"
            :max="totalWorkouts"
            percentage="true"
            animationDuration="1s"
            :colorUnfilled="colorUnfilled"
            :colorFilled="colorFilled"
          />
        </div>
        <div class="weeks-headline">
          <p>Wochen</p>
        </div>
        <div class="weeks-div">
          <ul class="week-list">
            <li
              class="week-listitem"
              v-for="(week, index) in weekArray.weeks"
              :key="week"
            >
              <ion-card
                class="week-card"
                :class="{ 'selected-card': index === selectedCardIndex }"
                @click="changeWeek(index)"
              >
                <div class="container">
                  <div class="label-wrapper">
                    <ion-label class="top-label">Woche</ion-label>
                  </div>
                  <div class="label-wrapper">
                    <ion-label class="bottom-label">{{
                      week.weekInt
                    }}</ion-label>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="days-headline">
          <p>Workouts diese Woche</p>
        </div>
        <div class="days-div" :class="{ fade: disabled }">
          <ul class="days-ul">
            <li
              class="days-li"
              v-for="(day, index) in selectedWeek"
              :key="index"
            >
              <ion-card
                v-if="workouts"
                class="days-card"
                :class="dayState(index)"
                @click="goToWorkout(weekIndex, index)"
              >
                <div class="grid-style-li">
                  <div class="workout-icon">
                    <ion-icon
                      class="add-icon"
                      :icon="barbellOutline"
                    ></ion-icon>
                  </div>
                  <div class="label-workoutname">
                    <ion-label color="secondary">
                      {{
                        weekArray.weeks[weekIndex].weekWorkout.name
                      }}</ion-label
                    >
                  </div>
                  <div class="day-workout">
                    <ion-label color="light">Day {{ index + 1 }}</ion-label>
                  </div>
                  <div class="label-date-done">
                    <ion-label class="label-done">
                      {{ dayDone(index) }}
                    </ion-label>
                    <ion-icon
                      v-show="showFinishedIcon"
                      :class="doneIconShow(index)"
                      :icon="checkmarkDoneOutline"
                    ></ion-icon>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonLabel,
  IonIcon,
  alertController,
} from "@ionic/vue";
import { useMyPlanStore } from "@/store/myPlans";
import { useMyWorkoutsStore } from "@/store/myWorkouts";
import { computed, ref, onMounted } from "vue";
import TheFooter from "@/components/reusable/TheFooter.vue";
import { useRoute, useRouter } from "vue-router";
import { CircleProgressBar } from "vue3-m-circle-progress-bar";
import { useWorkoutPlanData } from "@/store/workoutPlanData";
import planStorage from "@/storage/myPlanStorage";
import defaultPlans from "@/storage/defaultPlanStorage";
import { barbellOutline, checkmarkDoneOutline, reload } from "ionicons/icons";
import { async } from "rxjs/internal/scheduler/async";
import { formatDate } from "@/composables/formatDate";
import { updatePlanInDB } from "@/services/planService";
import { Plan } from "@/models/Plan";

const disabled = ref(false);

const router = useRouter();
const route = useRoute();
const page: any = route.params.plan;
let workouts: any = ref([]);
let isEmpty = ref(true);

//progress-Kreis
let colorUnfilled = "#80abca";
let colorFilled = "green";

let planStore = useMyPlanStore();
planStore.loadPlansFromStore();

const workoutPlanDataStore = useWorkoutPlanData();
let combinedPlans = planStore.planList.concat(planStore.prePlanList);

let weekArray: any = combinedPlans.find(
  (element) => element.id == page || element.name == page
);
let workoutsDone = ref();
async function loadStore() {
  const store = useMyWorkoutsStore();
  await store.loadWorkoutsFromStore();
  workouts.value = store.workoutList;
}
onMounted(() => {
  loadStore();
});

planStore.$subscribe(
  (mutation, state) => {
    weekArray = state.planList
      .concat(state.prePlanList)
      .find((element) => element.id == page || element.name == page);
    if (weekArray != undefined) {
      workoutsDone.value =
        weekArray.currentWeek * weekArray.weeks[0].days.length +
        weekArray.currentDay;
      totalWorkouts.value = weekArray.totalDays;
      selectedCardIndex.value = weekArray.currentWeek;
    } else {
      // bug wenn man ausloggt und einloggt und vorher im planpreview war
      weekArray = { weeks: [{ days: [{ state: "open"}] }] };
    }
  },
  { detached: true }
);

let selectedDay = ref(0);
let weekIndex = ref(weekArray.currentWeek);
let selectedCardIndex = ref(weekArray.currentWeek);

let totalWorkouts = ref(weekArray.totalDays);

const dayState = computed(() => (index) => {
  if (weekArray) {
    return {
      "workout-done":
        weekArray.weeks[selectedCardIndex.value].days[index].state == "done",
      "workout-today":
        weekArray.weeks[selectedCardIndex.value].days[index].state == "today",
      "workout-open":
        weekArray.weeks[selectedCardIndex.value].days[index].state == "open",
    };
  } else {
    return {};
  }
});

const doneIconShow = computed(() => (index) => {
  if (weekArray) {
    return {
      "icon-show":
        weekArray.weeks[selectedCardIndex.value].days[index].doneDate != null,
      "icon-dontshow":
        weekArray.weeks[selectedCardIndex.value].days[index].doneDate ==
          undefined ||
        weekArray.weeks[selectedCardIndex.value].days[index].doneDate == null,
    };
  } else {
    return {};
  }
});

let showFinishedIcon = ref(false);
let dayDone = computed(() => (index) => {
  if (weekArray) {
    if (weekArray.weeks[selectedCardIndex.value].days[index].doneDate != null) {
      showFinishedIcon.value = true;
      return formatDate(
        weekArray.weeks[selectedCardIndex.value].days[index].doneDate
      );
    }
  }
});

let selectedWeek = computed(() => {
  return weekArray.weeks[selectedDay.value].days;
});

function changeWeek(index) {
  selectedCardIndex.value = index;
  weekIndex.value = index;
  selectedDay.value = index;

  disabled.value = true;
  setTimeout(() => {
    disabled.value = false;
  }, 1000);
}

const handlerMessage = ref();
async function resetPlan() {
  const alert = await alertController.create({
    header: "Plan zurücksetzen?",
    message: "Dein Fortschritt geht verloren.",
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Yes",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
      {
        text: "No",
        cssClass: "alert-button-cancel",
        handler: () => {
          handlerMessage.value = 0;
        },
      },
    ],
  });

  await alert.present();
  await alert.onDidDismiss();

  if (handlerMessage.value == 1) {
    weekArray.currentDay = 0;
    weekArray.currentWeek = 0;
    selectedCardIndex.value = 0;
    weekArray.lastWorkout = null;
    weekIndex.value = 0;
    console.log(weekArray.weeks.length);

    for (let i = 0; i < weekArray.weeks.length; i++) {
      for (let y = 0; y < weekArray.weeks[i].days.length; y++) {
        weekArray.weeks[i].days[y].state = "open";
      }
    }

    weekArray.weeks[0].array[0].state = "today";

    let parseArray = JSON.parse(JSON.stringify(weekArray.weeks));

    let sendArray: Plan = {
      id: weekArray.id,
      isDefault: weekArray.isDefault,
      name: weekArray.name,
      currentDay: weekArray.currentDay,
      currentWeek: weekArray.currentWeek,
      totalDays: weekArray.totalDays,
      userId: weekArray.userId,
      lastWorkout: weekArray.lastWorkout,
      lastUpdated: weekArray.lastUpdated,
      weeks: parseArray,
    };

    if (sendArray.isDefault == true) {
      await defaultPlans.removeItem(weekArray.id);
      await defaultPlans.setItem(sendArray.id, sendArray);
      await planStore.loadPlansFromStore();
    } else {
      await planStorage.removeItem(weekArray.id);
      await planStorage.setItem(sendArray.id, sendArray);
      if (navigator.onLine) {
        await updatePlanInDB(sendArray);
      }

      await planStore.loadPlansFromStore();
    }
  }

  if (handlerMessage.value == 0) {
    return;
  }
}

function goToWorkout(index, index2) {
  console.log(weekIndex.value);
  console.log(index2);
  workoutPlanDataStore.weekNumber = selectedCardIndex.value;
  workoutPlanDataStore.dayNumber = index2;
  workoutPlanDataStore.currentPlanName = weekArray.name;
  let workoutId = weekArray.weeks[index].weekWorkout.id;
  console.log("workoutId");
  console.log(workoutId);
  if (weekArray.weeks[selectedCardIndex.value].days[index2].state == "today") {
    router.push("/preview/" + workoutId);
  } else {
    return;
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.label-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
}

.top-label {
  text-align: center;
  margin-top: auto;
  color: var(--ion-color-secondary);
  font-weight: bold;
}

.bottom-label {
  text-align: center;
  margin-bottom: auto;
  color: var(--ion-color-secondary);
  font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
}
p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}
.grid-page {
  display: grid;
  height: 90%;
  grid-template-rows: [row1-start] 7.5% [row1-end] 10% [row2-start] 5% [row2-end]10% [row3-start]5% [row3-end]60% [row4-start];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.plan-headline-name {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column2-start;
  width: 40%;
  align-self: end;
  justify-self: start;
}

.reset-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: end;
  margin-right: 5%;
}

.reset-icon {
  font-size: xx-large;
  color: var(--ion-color-light);
}

.plan-name {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: start;
  width: 60%;
}

.plan-name-label {
  font-size: x-large;
  font-weight: bold;
  color: var(--ion-color-light);
  margin-left: 3%;
}

.progress-bar-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: center;
}
.progress-bar {
  color: #80abca;
  font-weight: bold;
}

.weeks-headline {
  grid-row: row2-start / row2-end;
  grid-column: column1-start / column2-start;
}
.weeks-div {
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column2-start;

  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
}

.days-headline {
  grid-row: row3-start / row3-end;
  grid-column: column1-start / column2-start;
}
.days-div {
  grid-row: row3-end / row4-start;
  grid-column: column1-start / column2-start;
}

.days-ul {
  height: 90%;
}

.fade {
  animation: fade 0.5s ease-in;
  opacity: 1;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(2px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-2px);
  }
}
.days-li {
  height: 20%;
}

.days-card {
  height: 100%;
  background-color: var(--ion-color-medium);
}

.week-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  height: 100%;
  width: 100%;
  margin: 0;
}

.week-listitem {
  display: inline-block;
  height: 60%;
  width: 20%;
  margin: 10px;
}

.week-card {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: var(--ion-color-warning);
}

.selected-card {
  background-color: #ba8cbf;
}

.workout-done {
  background-color: #d3e6f0;
}
.workout-today {
  /* border: 2px solid lightgray; */
}
.workout-open {
  /* background-color: var(--ion-color-medium); */
  background-color: #d3e6f0;
}

.grid-style-li {
  display: grid;
  height: 100%;
  grid-template-rows: [row1-start] 50% [row1-end] 50% [row2-start];
  grid-template-columns: [column1-start] 25% [column1-end] 40% [column2-start] 17.5% [column2-end] 17.5% [column3-start];
}

.workout-icon {
  grid-row: row1-start / row2-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.add-icon {
  font-size: 64px;
  color: white;
}

.label-workoutname {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: end;
  justify-self: start;
  padding: 5%;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 18px;
}

.workout-time {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: start;
  justify-self: center;
  padding: 5%;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: white;
}

.exercise-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.break-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.day-workout {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: start;
  justify-self: start;
  padding: 5%;
}

.label-date-done {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column3-start;
  align-self: center;
  justify-self: center;
}

.label-done {
  color: white;
  opacity: 0.8;
}

.icon-dontshow {
  opacity: 0;
}

.icon-show {
  color: var(--ion-color-success);
  vertical-align: middle;
  margin-left: 5px;
}
</style>
