<template>
  <ion-menu menu-id="main" contentId="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="secondary">
      <ion-list>
        <router-link class="routerLink" to="/home">
          <ion-item color="secondary"
            ><ion-icon slot="start" :icon="homeOutline"></ion-icon>
            Homepage</ion-item
          >
        </router-link>
        <router-link class="routerLink" to="/myworkouts">
          <ion-item color="secondary"
            ><ion-icon slot="start" :icon="barbellOutline"></ion-icon>My
            Workouts</ion-item
          >
        </router-link>
        <ion-item color="secondary"
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

import { ref, watch  } from "vue";
import { menuController } from "@ionic/core";
import {  onIonViewWillEnter } from "@ionic/vue";



export default defineComponent({
  name: "SideMenu",
  props: ["closeMenu"],

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
  setup(props) {
    

onIonViewWillEnter( () => {
  console.log("propsOnENTER");
  console.log(props.closeMenu);
})

    watch(props.closeMenu, (newValue) => {
      if (props.closeMenu == true) {
        menuController.close();
      }
      console.log("props: ");
      console.log(props.closeMenu);

    })
    return {
      homeOutline,
      barbellOutline,
      listCircleOutline,
      calendarOutline,
      settingsOutline,
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
