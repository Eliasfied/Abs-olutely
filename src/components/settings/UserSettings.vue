<template>
  <ion-page>
    <the-footer title="Einstellungen"></the-footer>
    <ion-content color="tertiary" :fullscreen="true">
      <div class="settings-grid">
        <div class="general-settings-text">
          <p>Allgemein</p>
        </div>
        <div class="notifications-settings-div">
          <ion-icon
            :icon="notificationsCircleOutline"
            color="primary"
          ></ion-icon>
          <ion-text color="primary">Benachrichtigungen</ion-text>
        </div>
        <div class="remove-ads-div">
          <ion-icon :icon="removeCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary">Werbung entfernen</ion-text>
        </div>
        <div class="reset-all-div">
          <ion-icon :icon="refreshCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary">App zurücksetzen</ion-text>
        </div>
        <div class="workouts-settings-text">
          <p>Workout</p>
        </div>
        <div class="reset-custom-workouts-div" @click="resetCustomWorkouts">
          <ion-icon :icon="refreshCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary"
            >Benutzerdefinierte Workouts zurücksetzen</ion-text
          >
        </div>
        <div class="plans-settings-text">
          <p>Pläne</p>
        </div>
        <div class="reset-custom-plans-div" @click="resetCustomPlans">
          <ion-icon :icon="refreshCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary"
            >Benutzerdefinierte Pläne zurücksetzen</ion-text
          >
        </div>
        <div class="reset-pre-plans-div" @click="resetPrePlans">
          <ion-icon :icon="refreshCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary">Vordefinierte Pläne zurücksetzen</ion-text>
        </div>
      </div>
    </ion-content></ion-page
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonContent, IonPage, IonButton, alertController } from "@ionic/vue";
import TheFooter from "@/components/reusable/TheFooter.vue";
import planStorage from "@/storage/myPlanStorage";
import { useMyPlanStore } from "@/store/myPlans";
import { useMyWorkoutsStore } from "@/store/myWorkouts";
import myWorkoutStorage from "@/storage/myWorkoutStorage";
import defaultPlans from "@/storage/defaultPlanStorage";
import {
  notificationsCircleOutline,
  removeCircleOutline,
  removeCircleSharp,
  refreshCircleOutline,
} from "ionicons/icons";

const planStore = useMyPlanStore();
const workoutStore = useMyWorkoutsStore();
const handlerMessage = ref();

async function resetCustomPlans() {
  const alert = await alertController.create({
    header: "Lösche alle benutzerdefinierte Pläne?",
    message: "Dies kann nicht rückgängig gemacht werden",
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Ja",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
      {
        text: "Nein",
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

async function resetCustomWorkouts() {
  const alert = await alertController.create({
    header: "Lösche alle benutzerdefinierten Workouts?",
    message: "Dies kann nicht rückgängig gemacht werden",
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Ja",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
      {
        text: "Nein",
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

async function resetPrePlans() {
  const alert = await alertController.create({
    header: "Lösche alle vorgefertigten Pläne?",
    message: "Dies kann nicht rückgängig gemacht werden",
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Ja",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
      {
        text: "Nein",
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
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-rows: [row1-start] 5% [row1-end] 10% [row2-start] 10% [row2-end] 10% [row3-start] 5% [row3-end] 10% [row4-start] 10% [row4-end] 5% [row5-start] 10% [row5-end] 10% [row6-start] 5% [row6-end] 10% [row7-start] 10% [row7-end];
  height: 100%;
}

.workouts-settings-text,
.plans-settings-text,
.general-settings-text {
  align-self: center;
  justify-self: start;
  padding-left: 5%;
  background-color: var(--ion-color-light);
  width: 100%;
}

.general-settings-text {
  grid-row: row1-start / row1-end;
}

.workouts-settings-text {
  grid-row: row3-start / row3-end;
}

.plans-settings-text {
  grid-row: row4-end / row5-start;
}

p {
  font-weight: bold;
}

.reset-pre-plans-div,
.reset-custom-plans-div,
.reset-custom-workouts-div,
.reset-pre-workouts-div,
.notifications-settings-div,
.remove-ads-div,
.reset-all-div {
  align-self: center;
  justify-self: start;

  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding-left: 5%;

  --ionicon-stroke-width: 32px;
  font-size: 24px;
}

.notifications-settings-div {
  grid-row: row1-end / row2-start;
}

.remove-ads-div {
  grid-row: row2-start / row2-end;
}

.reset-all-div {
  grid-row: row2-end / row3-start;
}

.reset-custom-workouts-div {
  grid-row: row3-end / row4-start;
}

.reset-pre-workouts-div {
  grid-row: row4-start / row4-end;
}

.reset-custom-plans-div {
  grid-row: row5-start / row5-end;
}

.reset-pre-plans-div {
  grid-row: row5-end / row6-start;
}
</style>
