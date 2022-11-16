<template>
  <ion-app>
    <side-menu></side-menu>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import SideMenu from "./components/SideMenu.vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    SideMenu,
  },
});
</script>
