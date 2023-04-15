<template>
  <ion-page>
    <the-footer title="Settings"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="settings-grid">
        <div class="delete-workouts-div">
          <ion-button @click="deleteWorkouts">Reset custom workouts</ion-button>
        </div>
        <div class="delete-custom-plans-div">
          <ion-button @click="deletePlans">Reset custom plans</ion-button>
        </div>
        <div class="delete-plans-div">
          <ion-button @click="resetPlans">Reset pre plans</ion-button>
        </div>
        <div class="delete-statistics-div">
          <ion-button>Reset statistics</ion-button>
        </div>
      </div>
    </ion-content></ion-page
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";
import planStorage from "../storage/myPlanStorage";
import { useMyPlanStore } from "../store/myPlans";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import myWorkoutStorage from "../storage/myWorkoutStorage";
import defaultPlans from "../storage/defaultPlanStorage";

export default defineComponent({
  name: "SettingsPage",
  components: { IonContent, IonPage, TheFooter, IonButton },
  setup() {
    const planStore = useMyPlanStore();
    const workoutStore = useMyWorkoutsStore();

    function deletePlans() {
      planStorage.clear();
      planStore.loadPlansFromStore();
    }

    function deleteWorkouts() {
      myWorkoutStorage.clear();
      workoutStore.loadWorkoutsFromStore();
    }

    function resetPlans() {
      defaultPlans.clear();
    }

    return {
      deletePlans,
      deleteWorkouts,
      resetPlans,
    };
  },
});
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 20% [row2-start] 20% [row2-end] 20% [row3-start];
  height: 100%;
}

.delete-workouts-div {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
}

.delete-custom-plans-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

.delete-plans-div {
  grid-row: row2-start / row2-end;
  align-self: center;
  justify-self: center;
}

.delete-statistics-div {
  grid-row: row2-end / row3-start;
  align-self: center;
  justify-self: center;
}
</style>
