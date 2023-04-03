m
<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>
        <div class="icon-div"><ion-icon :icon="todaySharp"></ion-icon></div>
        <div class="text-div"><p>Weekly Workouts</p></div>
        <div class="label-div">
          <ion-label position="floating"
            >Amount of Workouts per Week?</ion-label
          >
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
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            class="add-button"
            shape="round"
            color="warning"
            @click="goToCustomize()"
          >
            <ion-label color="secondary">Continue</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="arrowForwardOutline"
            ></ion-icon
          ></ion-button>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { todaySharp, arrowForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonRange,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import useRouteId from "../composables/getPlanRouteID";

export default defineComponent({
  name: "createPlanDays",
  components: { IonContent, IonPage, IonLabel, IonRange, IonIcon, IonFooter },
  setup() {
    let planStore = useMyPlanStore();
    let name = ref("");
    let workoutsWeek = ref(3);
    let routeID = useRouteId();

    let router = useRouter();
    function goToCustomize() {
      planStore.setPlanDays(workoutsWeek);
      router.push({
        path: "/workoutplan/" + routeID.currentRouteId + "/createPlanCustomize",
      });
    }

    return {
      name,
      todaySharp,
      workoutsWeek,
      goToCustomize,
      arrowForwardOutline,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]10%[row1-end] 30% [row2-start] 15% [row2-end] 10% [row3-start] 15% [row3-end];
}

.icon-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

ion-icon {
  font-size: 256px;
  color: #dbbfdd;
}

.text-div {
  grid-row: row2-start / row2-end;
  justify-self: center;
  align-self: center;
}

p {
  color: #80abca;
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
  color: #80abca;
  text-align: center;
}

.range-div {
  width: 100%;
  grid-row: row3-start / row3-end;
  align-self: center;
  justify-self: center;
}

ion-range::part(bar) {
  background: #dbbfdd;
}
ion-range::part(bar-active) {
  background: #80abca;
}

.button-div {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
}

ion-footer {
  height: 20%;
}
.footer-grid {
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 100% [column1-end];

  height: 100%;
  background-color: white;
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
  bottom: 17.5%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
}
</style>
