<template>
  <ion-page>
    <the-footer title="Planpreview"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="plan-headline-name">
          <p>Plan Name</p>
        </div>
        <div class="plan-name-container">
          <div class="plan-icon"><ion-icon :icon="clipboard"></ion-icon></div>
          <div class="plan-name">
            <ion-label class="plan-name-label" color="secondary">
              {{ weekArray.planName }}
            </ion-label>
          </div>
        </div>

        <div class="weeks-headline">
          <p>Weeks</p>
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
                    <ion-label class="top-label">Week</ion-label>
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
          <p>Workouts this Week</p>
        </div>
        <div class="days-div">
          <ul class="days-ul">
            <li class="days-li" v-for="(day, index) in selectedWeek" :key="day">
              <ion-card class="days-card" @click="goToWorkout(weekIndex)">
                <div class="grid-style-li">
                  <div class="workout-icon">
                    <ion-icon class="add-icon" :icon="bodyOutline"></ion-icon>
                  </div>
                  <div class="label-workoutname">
                    <ion-label color="secondary">
                      {{ weekArray.weeks[weekIndex].weekWorkout }}</ion-label
                    >
                  </div>
                  <div class="day-workout">
                    <ion-label color="light">Day {{ index + 1 }}</ion-label>
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
<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { computed, ref, watch } from "vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { useRoute, useRouter } from "vue-router";

import {
  addCircle,
  clipboardOutline,
  create,
  trash,
  clipboard,
  hourglassOutline,
  barbellOutline,
  timeOutline,
  receiptOutline,
  bodyOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, TheFooter, IonLabel },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const page = route.params.plan;
    let workouts: any = ref([]);
    let isEmpty = ref(true);

    watch(
      workouts.value.length,
      () => {
        console.log("geht in watcher rein");
        if (workouts.value.length > 0) {
          isEmpty.value = false;
        } else {
          isEmpty.value = true;
        }
      },
      { deep: true, immediate: true }
    );

    let planStore = useMyPlanStore();
    planStore.loadPlansFromStore();

    async function loadStore() {
      const store = useMyWorkoutsStore();
      await store.loadWorkoutsFromStore();
      workouts.value = store.workoutList;
    }

    loadStore();

    console.log("workouts final: ");
    console.log(workouts);

    function showWorkoutLength(name) {
      console.log(workouts.value);
      const newArray = workouts.value.filter((element) => element.name == name);
      //   let witzig = Math.round(
      //   (newArray.value[0].exerciseTime *
      //   newArray.value[0].exercises.length +
      //     (newArray.value[0].breakTime *
      //     newArray.value[0].exercises.length -
      //     newArray.value[0].breakTime)) /
      //     60
      // );

      console.log("newArray");
      console.log(newArray);
      //console.log(witzig);
      //return calculateWorkouttime(newArray[0]);
      return newArray;
    }

    //  function calculateWorkouttime(index) {
    //   return Math.round(
    //     (workouts.value[index].exerciseTime *
    //       workouts.value[index].exercises.length +
    //       (workouts.value[index].breakTime *
    //         workouts.value[index].exercises.length -
    //         workouts.value[index].breakTime)) /
    //       60
    //   );
    // }

    console.log(planStore);
    console.log("page " + page);

    let weekArray = planStore.planList.find(
      (element) => element.planName == page
    );

    let selectedDay = ref(0);
    let weekIndex = ref(0);
    let selectedCardIndex = ref(0);

    let selectedWeek = computed(() => {
      console.log("check");
      console.log(weekArray.weeks);
      return weekArray.weeks[selectedDay.value].array;
    });

    function changeWeek(index) {
      selectedCardIndex.value = index;
      weekIndex.value = index;
      selectedDay.value = index;
      console.log("selectedWeek:" + selectedWeek.value);
    }

    function goToWorkout(index) {
      let workoutName = weekArray.weeks[index].weekWorkout;
      router.push("/preview/" + workoutName);
    }

    return {
      weekArray,
      selectedDay,
      selectedWeek,
      changeWeek,
      weekIndex,
      selectedCardIndex,
      goToWorkout,
      addCircle,
      clipboardOutline,
      create,
      trash,
      clipboard,
      hourglassOutline,
      barbellOutline,
      timeOutline,
      receiptOutline,
      bodyOutline,
      showWorkoutLength,
      //calculateWorkouttime,
    };
  },
});
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
  grid-template-rows: [row1-start] 5% [row1-end] 10% [row2-start] 5% [row2-end]15% [row3-start]5% [row3-end]60% [row4-start];
}

.plan-name-container {
  grid-template-rows: row1-end / row2-start;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.plan-headline-name {
  grid-template-rows: row1-start / row1-end;
}

.plan-name {
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 6;
  height: 100%;
}

.plan-icon {
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  height: 100%;
  font-size: 32px;
  color: var(--ion-color-light);
  margin-left: 10%;
}

.plan-name-label {
  font-size: x-large;
  font-weight: bold;
  color: var(--ion-color-light);
}

.weeks-headline {
  grid-template-rows: row2-start / row2-end;
}
.weeks-div {
  grid-template-rows: row2-end / row3-start;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
}

.days-headline {
  grid-template-rows: row3-start / row3-end;
}
.days-div {
  grid-template-rows: row3-end / row4-start;
}

.days-ul {
  height: 90%;
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
}

.week-listitem {
  display: inline-block;
  height: 40%;
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
  border: 2px solid purple;
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
</style>
