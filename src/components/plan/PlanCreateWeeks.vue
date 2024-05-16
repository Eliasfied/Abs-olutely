<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div>
          <back-button></back-button>
        </div>
        <div class="icon-div">
          <ion-icon :icon="calendarSharp" class="customize-icon"></ion-icon>
        </div>
        <div class="headline-div">
          <div class="week-headline-label">
            <ion-label class="headline-label">Plandauer</ion-label>
          </div>
        </div>
        <div class="range-div">
          <p class="p-duration">{{ planDuration }}</p>
          <ion-range
            v-model="planDuration"
            :pin="true"
            :ticks="true"
            :snaps="true"
            :min="1"
            :max="7"
            :value="3"
          ></ion-range>
        </div>
        <div class="explain-text">
          <ion-label class="explain-label">
            wie viele Wochen möchtest du trainieren?
          </ion-label>
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
            @click="goToDays()"
          >
            <ion-label class="add-label" color="secondary">Weiter</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="arrowForwardOutline"
            ></ion-icon
          ></ion-button>
        </div>
        <div class="navigation">
          <ul>
            <li></li>
            <li class="active"></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { calendarSharp, arrowForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonRange,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { useMyPlanStore } from "@/store/myPlans";
import useRouteId from "@/composables/getPlanRouteID";
import BackButton from "@/components/reusable/BackButton.vue";

let planStore = useMyPlanStore();
let name = ref("");
let planDuration = ref(4);
let routeID = useRouteId();

let router = useRouter();
function goToDays() {
  planStore.setPlanWeeks(planDuration);
  router.push({
    path: "/workoutplan/" + routeID.currentRouteId + "/planCreateDays",
  });
}
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]5%[row1-end] 10% [row2-start] 15% [row2-end] 10% [row3-start] 30% [row3-end] 10% [row4-start];
}

.back-div {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: start;
}

.icon-div {
  grid-row: row1-end / row2-end;
  align-self: center;
  justify-self: center;
}

.customize-icon {
  font-size: 120px;
  color: #dbbfdd;
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
  font-size: 24px;
  grid-row: row2-end / row3-start;
  justify-self: center;
  text-align: center;
  margin-bottom: 5%;
  margin-top: 5%;
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

.headline-div {
  height: 100%;
  width: 100%;
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 15% [column1-end] 85% [column2-start];
}

.week-headline-label {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
}

.icon-weeks {
  font-size: 40px;
  color: black;
}

.headline-label {
  color: #80abca;
  font-weight: bold;
  font-size: 32px;
}
.range-div {
  width: 100%;
  grid-row: row3-start / row3-end;
  align-self: start;
  justify-self: center;
}

ion-range::part(bar) {
  background: #dbbfdd;
}
ion-range::part(bar-active) {
  background: #80abca;
}

.explain-text {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
  margin: 10%;
  margin-top: 0;
}

.explain-label {
  font-size: 16px;
  color: grey;
  opacity: 0.7;
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
  width: 50%;
}

.add-label {
  font-weight: bold;
  font-size: 14px;
}

.navigation {
  background-color: white;
  padding: 10px;
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  justify-self: center;
  align-self: center;
}

.navigation ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.navigation li {
  background-color: #e5e5e5;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.navigation li.active {
  background-color: #333;
}
</style>
