<template>
  <ion-page>
    <the-footer title="Settings"></the-footer>

    <ion-content color="primary" :fullscreen="true">
      <div><span>SETTINGS</span></div>
    </ion-content></ion-page
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";

export default defineComponent({
  name: "SettingsPage",
  components: { IonContent, IonPage, TheFooter },
  setup() {
    return {};
  },
});
</script>

<style scoped>
span {
  position: fixed;
  top: 20%;
}
</style>
