<template>
  <ion-menu contentId="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="secondary">
      <ion-list>
        <router-link class="routerLink" to="/"
          ><ion-item color="secondary"
            ><ion-icon slot="start" :icon="homeOutline"></ion-icon>
            Homepage</ion-item
          ></router-link
        >
        <router-link class="routerLink" to="/myworkouts">
          <ion-item color="secondary"
            ><ion-icon slot="start" :icon="barbellOutline"></ion-icon>My
            Workouts</ion-item
          ></router-link
        >
        <ion-item href="/myworkouts" color="secondary"
          ><ion-icon slot="start" :icon="listCircleOutline"></ion-icon>Exercise
          List</ion-item
        >
        <ion-item color="secondary"
          ><ion-icon slot="start" :icon="calendarOutline"></ion-icon
          >Calendar</ion-item
        >
        <ion-item color="secondary"
          ><ion-icon slot="start" :icon="settingsOutline"></ion-icon
          >Settings</ion-item
        >
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import {
  homeOutline,
  barbellOutline,
  listCircleOutline,
  calendarOutline,
  settingsOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "SideMenu",
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonContent,
    IonIcon,
  },
  setup() {
    let content = "juhuu";
    let workouts = "myWorkouts";
    let beginnerWorkoutName = "beginner";

    return {
      content,
      homeOutline,
      barbellOutline,
      listCircleOutline,
      calendarOutline,
      settingsOutline,
      workouts,
      beginnerWorkoutName,
    };
  },
});
</script>

<style scoped>
ion-list {
  background-color: var(--ion-color-secondary);
}

.routerLink {
  text-decoration: none;
}
</style>
