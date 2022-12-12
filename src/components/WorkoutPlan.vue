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
                  :pin="true"
                  :ticks="true"
                  :snaps="true"
                  :min="0"
                  :max="4"
                ></ion-range>
              </div>
              <div class="number-text"><p>Number of Workouts per week?</p></div>
              <div class="number-range">
                <ion-range
                  :pin="true"
                  :ticks="true"
                  :snaps="true"
                  :min="0"
                  :max="7"
                ></ion-range>
              </div>
              <div class="select-workouts-text">
                <p>Select your workout:</p>
              </div>
              <div class="select-workouts">
                <ul>
                  <li>workout1</li>
                  <li>workout1</li>
                  <li>workout3</li>
                  <li>workout4</li>
                </ul>
              </div>
            </div>
          </ion-card>
        </div>
        <div class="number-week-picker">
          <ion-card></ion-card>
        </div>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonRange, IonCard } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, TheFooter, IonRange, IonCard },
  setup() {
    return {};
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
