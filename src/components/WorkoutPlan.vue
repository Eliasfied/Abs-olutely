<template>
  <ion-page>
    <the-footer title="Plans"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="grid-style-page">
        <div class="top-items">
          <ion-card>
            <div class="top-grid">
              <div class="duration-text">
                <p>Plan Duration in weeks:</p>
              </div>
              <div class="duration-range">
                <ion-range
                  v-model="planDuration"
                  :pin="true"
                  :ticks="true"
                  :snaps="true"
                  :min="0"
                  :max="12"
                  :value="4"
                ></ion-range>
              </div>
              <div class="number-text"><p>Number of Workouts per week?</p></div>
              <div class="number-range">
                <ion-range
                  v-model="workoutsWeek"
                  :pin="true"
                  :ticks="true"
                  :snaps="true"
                  :min="0"
                  :max="7"
                  :value="3"
                ></ion-range>
              </div>
              <div class="select-workouts-text">
                <p>workouts week: {{ workoutsWeek }}</p>
                <p>plan Duration: {{ planDuration }}</p>
                <p>Select your workout:</p>
              </div>
              <div class="select-workouts">
                <ul>
                  <li><ion-card>week1</ion-card></li>
                  <li><ion-card>week2</ion-card></li>
                  <li><ion-card>week3</ion-card></li>
                  <li><ion-card>week4</ion-card></li>
                </ul>
              </div>
            </div>
          </ion-card>
        </div>
        <div class="calendar-div"></div>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonRange, IonCard } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";
import { ref } from "vue";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, TheFooter, IonRange, IonCard },
  setup() {
    let planDuration = ref(4);
    let workoutsWeek = ref(3);

    return {
      planDuration,
      workoutsWeek,
    };
  },
});
</script>

<style scoped>
.grid-style-page {
  height: 100%;
  display: grid;
}

.top-grid {
  height: 100%;
  display: grid;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

ion-range::part(tick) {
  background: black;
}

ion-range::part(tick-active) {
  background: white;
}

ion-range::part(pin) {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: var(--ion-color-primary);
  color: var(--ion-color-secondary);

  border-radius: 50%;
  transform: scale(1.01);

  top: -20px;

  min-width: 28px;
  height: 28px;
  transition: transform 120ms ease, background 120ms ease;
}

ion-range::part(pin)::before {
  content: none;
}

ion-range::part(knob) {
  background: var(--ion-color-primary);
}

ion-range::part(bar) {
  background: var(--ion-color-tertiary);
}

ion-range::part(bar-active) {
  background: black;
}
</style>
