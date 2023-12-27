<template>
  <div class="ion-page" id="main-content"></div>
  <ion-header :translucent="true">
    <ion-toolbar color="secondary">
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title color="primary">{{ props.title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { menuOutline, person } from "ionicons/icons";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

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
    return { menuOutline, person, props };
  },
});
</script>

<style scoped>
ion-toolbar {
  border-bottom: 0.5px solid black;
}

ion-title {
  font-weight: bold;
}

ion-icon {
  font-size: 42px;
  color: var(--ion-color-tertiary);
  margin: 12px;
}
</style>
