<template>
  <div class="ion-page" id="main-content"></div>
  <ion-header :translucent="true">
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-menu-button color="secondary"></ion-menu-button>
      </ion-buttons>
      <ion-title color="secondary">{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { menuOutline } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheFooter",

  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonMenuButton,
  },
  props: ["title", "closeMenu"],
  setup(props) {
    return { menuOutline, props };
  },
});
</script>

<style scoped>
ion-toolbar {
  border: 2px solid black;
}

ion-icon {
  font-size: 42px;
  color: var(--ion-color-tertiary);
  margin: 12px;
}
</style>
