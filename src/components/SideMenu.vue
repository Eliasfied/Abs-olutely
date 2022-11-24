<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title color="primary">Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="secondary">
      <ion-list>
        <ion-menu-toggle>
          <ion-item router-link="/home" class="list-item" color="secondary"
            ><ion-icon slot="start" :icon="homeOutline"></ion-icon>
            <p>Homepage</p>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item
            router-link="/myworkouts"
            class="list-item"
            color="secondary"
            ><ion-icon slot="start" :icon="barbellOutline"></ion-icon>
            <p>My Workouts</p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/exerciseList" color="secondary"
            ><ion-icon slot="start" :icon="listCircleOutline"></ion-icon>
            <p>Exercises</p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/statistics" color="secondary"
            ><ion-icon slot="start" :icon="analyticsOutline"></ion-icon>
            <p>Statistics</p></ion-item
          >
        </ion-menu-toggle>
        <ion-menu-toggle>
          <ion-item router-link="/settings" color="secondary"
            ><ion-icon slot="start" :icon="settingsOutline"></ion-icon>
            <p>Settings</p></ion-item
          >
        </ion-menu-toggle>
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
  IonMenuToggle,
} from "@ionic/vue";
import {
  homeOutline,
  barbellOutline,
  listCircleOutline,
  calendarOutline,
  settingsOutline,
  analyticsOutline,
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
    IonMenuToggle,
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
      analyticsOutline,
    };
  },
});
</script>

<style scoped>
p {
  color: var(--ion-color-primary);
}

ion-icon {
  color: var(--ion-color-primary);
}

ion-list {
  background-color: var(--ion-color-secondary);
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
