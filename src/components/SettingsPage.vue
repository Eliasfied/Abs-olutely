<template>
  <ion-page>
    <the-footer title="Settings"></the-footer>

    <ion-content color="tertiary" :fullscreen="true">
      <div class="settings-grid">
        <div class="delete-workouts-div"><ion-button>Reset Workouts</ion-button></div>
        <div class="delete-statistics-div"><ion-button>Reset Statistics</ion-button></div>
      </div>
    </ion-content></ion-page
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";

export default defineComponent({
  name: "SettingsPage",
  components: { IonContent, IonPage, TheFooter, IonButton },
  setup() {
    return {};
  },
});
</script>

<style scoped>

.settings-grid {
  display:grid;
  grid-template-rows: [row1-start] 20% [row1-end] 20% [row2-start] 60% [row2-end];
  height: 100%; 
}

.delete-workouts-div {
grid-row: row1-start / row1-end;
align-self: center;
justify-self: center;
}

.delete-statistics-div {
  grid-row: row1-end / row2-start;
align-self: center;
justify-self: center;
}

</style>
