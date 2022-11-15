<template>
  <ion-menu menu-id="main" contentId="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="primary">
      <ion-list>
        <router-link class="routerLink" to="/home">
          <ion-item class="list-item" color="primary"
            ><ion-icon slot="start" :icon="homeOutline"></ion-icon>
            <p>Homepage</p>
          </ion-item>
        </router-link>
        <router-link class="routerLink" to="/myworkouts">
          <ion-item color="primary"
            ><ion-icon slot="start" :icon="barbellOutline"></ion-icon>
            <p>My Workouts</p></ion-item
          >
        </router-link>
        <ion-item color="primary"
          ><ion-icon slot="start" :icon="listCircleOutline"></ion-icon>
          <p>Exercise List</p></ion-item
        >
        <ion-item color="primary"
          ><ion-icon slot="start" :icon="calendarOutline"></ion-icon>
          <p>Calendar</p>
        </ion-item>
        <ion-item color="primary"
          ><ion-icon slot="start" :icon="settingsOutline"></ion-icon>
          <p>Settings</p></ion-item
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

import { ref, watch } from "vue";
import { menuController } from "@ionic/core";
import { onIonViewWillEnter } from "@ionic/vue";

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
    onIonViewWillEnter(() => {
      console.log("propsOnENTER");
      console.log(props.closeMenu);
    });

    watch(props.closeMenu, (newValue) => {
      if (props.closeMenu == true) {
        menuController.close();
      }
      console.log("props: ");
      console.log(props.closeMenu);
    });
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
p {
  color: var(--ion-color-secondary);
}

ion-icon {
  color: var(--ion-color-secondary);
}

ion-list {
  background-color: var(--ion-color-primary);
}

/* ion-item {
  --border-style: dashed;

 
} */

.routerLink {
  text-decoration: none;
}

ion-toolbar {
  border-bottom: 2px solid black;
}
</style>