m
<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>
        <div class="icon-div"><ion-icon :icon="todaySharp"></ion-icon></div>
        <div class="text-div"><p>Weekly Workouts</p></div>
        <div class="label-div">
          <ion-label position="floating">Amount of Workouts per Week?</ion-label>
        </div>
        <div class="range-div">
          <p class="p-duration">{{ workoutsWeek }}</p>
          <ion-range
            v-model="workoutsWeek"
            :pin="true"
            :ticks="true"
            :snaps="true"
            :min="1"
            :max="7"
            :value="3"
          ></ion-range>
        </div>
        <div class="button-div"><ion-button @click="goToCustomize">Next</ion-button></div>
        <div class="point-div"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { todaySharp } from "ionicons/icons";
import { useRouter } from "vue-router";
import { IonContent, IonPage, IonLabel, IonRange, IonIcon } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";


export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, IonLabel, IonRange, IonIcon },
  setup() {
    let planStore = useMyPlanStore();
    let name = ref("");
    let workoutsWeek = ref(3);

    let router = useRouter();
    function goToCustomize() {
      planStore.setPlanDays(workoutsWeek);
      router.push("/createPlanCustomize");
    }

    return {
      name,
      todaySharp,
      workoutsWeek,
      goToCustomize
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]10%[row1-end] 30% [row2-start] 10% [row2-end] 5% [row3-start] 10% [row3-end] 5% [row4-start] 5% [row4-end];
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

.range-div {
  width: 100%;
  grid-row: row3-start / row3-end;
  align-self: center;
  justify-self: center;
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
