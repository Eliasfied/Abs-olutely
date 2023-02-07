m
<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>

        <div class="icon-div" v-if="!showList"><ion-icon :icon="constructSharp"></ion-icon></div>
        <div class="workout-list-div" v-else ><workoutlist @close-workout-list="closeWorkoutList"></workoutlist></div>
        <div class="text-div"><p>Customize</p></div>
        <div class="label-div">
          <ion-label position="floating"
            >Assign Workouts to {{ name }}
          </ion-label>
        </div>
        <div class="list-div">
          <ul>
            <li v-for="week in weekArray" :key="week">
              <ion-card class="list-card" @click="addWorkout">
                {{ week }}
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="button-div"><ion-button>Next</ion-button></div>
        <div class="point-div"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { constructSharp } from "ionicons/icons";
import { IonContent, IonPage, IonLabel, IonIcon, IonCard } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import Workoutlist from "../components/WorkoutList.vue";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, IonLabel, IonIcon, IonCard, Workoutlist },
  setup() {
    let planStore = useMyPlanStore();
    let name = planStore.planName;
    console.log("name plan");
    console.log(name);
    let days = planStore.planDays;
    let weeks = planStore.planWeeks;
    let showList = ref(false);

    let weekArray = [] as any;

    for (let i = 1; i < weeks + 1; i++) {
      weekArray.push("Week" + i);
    }

    function addWorkout() {
      showList.value = true;
    }

    function closeWorkoutList() {
      showList.value = false;
    }

    return {
      name,
      constructSharp,
      days,
      weeks,
      planStore,
      weekArray,
      showList,
      addWorkout,
      closeWorkoutList,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]10%[row1-end] 30% [row2-start] 5% [row2-end] 10% [row3-start] 30% [row3-end] 5% [row4-start] 5% [row4-end];
}

.icon-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

ion-icon {
  font-size: 256px;
  color: skyblue;
}

.text-div {
  grid-row: row2-start / row2-end;
  justify-self: center;
}

p {
  color: black;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.p-duration {
  font-size: 16px;
  grid-row: row2-end / row3-start;
  justify-self: center;
  text-align: center;
}

.label-div {
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
}

ion-label {
  font-size: 24px;
  color: grey;
  text-align: center;
}

.list-div {
  height: 100%;
  width: 100%;
  grid-row: row3-start / row3-end;
  align-self: start;
  justify-self: center;
}

ul {
  height: 100%;
  list-style: none;
  padding: 5%;
  margin: 0;
  overflow-y: auto;
}

li {
  height: 20%;
}
.list-card {
  height: 100%;
  background-color: skyblue;
  color: black;
  font-weight: bold;
}

ion-input {
  border: 2px solid black;
}

.button-div {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
}

ion-button {
}
</style>
