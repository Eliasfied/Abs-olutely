<template>
  <ion-page>
    <the-footer title="Profil"> </the-footer>
    <ion-content color="tertiary">
      <div class="main-grid">
        <div class="welcome-text-div">
          <ion-text color="primary">
            <h1 class="welcome-text">Hallo {{ userName }}!</h1>
          </ion-text>
        </div>
        <div class="premium-div">
          <ion-card class="premium-card">
            <ion-icon class="premium-icon" :icon="ribbonOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="premium-label-headline">PREMIUM</ion-label>
              <ion-label class="premium-label-text"
                >Hol dir jetzt Absolutely Premium</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="settings-div" @click="goToSettings">
          <ion-icon :icon="settingsOutline" color="primary"></ion-icon>
          <ion-text color="primary">Einstellungen</ion-text>
        </div>
        <div class="user-settings-div">
          <ion-icon :icon="idCardOutline" color="primary"></ion-icon>
          <ion-text color="primary">Benutzerdaten ändern</ion-text>
        </div>
        <div class="remove-ads-div">
          <ion-icon :icon="removeCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary">Werbung entfernen</ion-text>
        </div>
        <div class="review-app-div">
          <ion-icon :icon="starOutline" color="primary"></ion-icon>
          <ion-text color="primary">App bewerten</ion-text>
        </div>
        <div class="help-div">
          <ion-icon :icon="helpCircleOutline" color="primary"></ion-icon>
          <ion-text color="primary">Hilfe</ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//imports
import { loginStore } from "@/store/authentication/loginStore";
import { IonCard } from "@ionic/vue";
import {
  settingsOutline,
  removeCircleOutline,
  starOutline,
  helpCircleOutline,
  idCardOutline,
  ribbonOutline,
} from "ionicons/icons";
import TheFooter from "@/components/reusable/TheFooter.vue";
import { useRouter } from "vue-router";

//user
const logStore = loginStore();
const userName = logStore.displayName;
const userEmail = logStore.email;
const userId = logStore.userId;
const router = useRouter();

const goToSettings = () => {
  router.push("/userSettings");
};
</script>

<style scoped>
.main-grid {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 10% [row1-end] 10% [row2-start] 10% [row2-end]10% [row3-start]10% [row3-end]10% [row4-start] 10% [row4-end] 10% [row5-start];
  grid-template-columns: [column1-start] 100% [column1-end];
}

.welcome-text-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: start;
  padding: 5%;
}

.welcome-text {
  font-weight: bold;
}

.premium-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.premium-card {
  height: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5%;
  background-color: var(--ion-color-warning);
  padding: 5%;
  margin: 0;
}
.label-flex-div {
  display: flex;
  flex-direction: column;
}

.premium-icon {
  font-size: 48px;
  color: white;
}

.premium-label-headline {
  font-size: 18px;
  color: white;
  font-weight: bold;
}
.premium-label-text {
  font-size: 12px;
  color: white;
  font-weight: bold;
}

.settings-div,
.user-settings-div,
.remove-ads-div,
.review-app-div,
.help-div {
  grid-column: column1-start / column1-end;
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

.settings-div {
  grid-row: row2-start / row2-end;
}

.user-settings-div {
  grid-row: row2-end / row3-start;
}

.remove-ads-div {
  grid-row: row3-start / row3-end;
}

.review-app-div {
  grid-row: row3-end / row4-start;
}

.help-div {
  grid-row: row4-start / row4-end;
}
</style>
