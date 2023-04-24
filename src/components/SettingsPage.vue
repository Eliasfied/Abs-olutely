<template>
  <ion-page>
    <the-footer title="Einstellungen"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="settings-grid">
        <div class="delete-workouts-div">
          <p class="explain-p">
            falls es zu Problemen mit der App kommt kannst du hier den Storage resetten was eventuell das Problem lösen kann
          </p>
          <ion-button
            class="reset-button"
            color="warning"
            @click="deleteWorkouts"
          >
            <ion-label> Reset personalisierte Workouts</ion-label>
          </ion-button>
        </div>
        <div class="delete-custom-plans-div">
          <ion-button class="reset-button" color="warning" @click="deletePlans">
            <ion-label> Reset personalisierte Pläne</ion-label>
          </ion-button>
        </div>
        <div class="delete-plans-div">
          <ion-button class="reset-button" color="warning" @click="resetPlans">
            <ion-label> Reset vordefinierte Pläne</ion-label>
          </ion-button>
        </div>
        <div class="delete-statistics-div"></div>
      </div> </ion-content
  ></ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { IonContent, IonPage, IonButton, alertController } from "@ionic/vue";
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
    const handlerMessage = ref();

    async function deletePlans() {
      const alert = await alertController.create({
        header: "delete all custom plans?",
        message: "this cant be undone",
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
        planStorage.clear();
        planStore.loadPlansFromStore();
      }

      if (handlerMessage.value == 0) {
        return;
      }
    }

    async function deleteWorkouts() {
      const alert = await alertController.create({
        header: "delete all custom workouts?",
        message: "this cant be undone",
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
        myWorkoutStorage.clear();
        workoutStore.loadWorkoutsFromStore();
      }

      if (handlerMessage.value == 0) {
        return;
      }
    }

    async function resetPlans() {
      const alert = await alertController.create({
        header: "reset all premade plans?",
        message: "this cant be undone",
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
        defaultPlans.clear();
      }

      if (handlerMessage.value == 0) {
        return;
      }
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

.explain-p {
  padding: 5%;
  color: var(--ion-color-light);
  opacity: 0.6;
}

.reset-button {
  width: 100%;
}

ion-label {
  color: white;
}

.delete-workouts-div {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
  width: 100%;
}

.delete-custom-plans-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
  width: 100%;
}

.delete-plans-div {
  grid-row: row2-start / row2-end;
  align-self: start;
  justify-self: center;
  width: 100%;
}

.delete-statistics-div {
  grid-row: row2-end / row3-start;
  align-self: center;
  justify-self: center;
  width: 100%;
}
</style>
