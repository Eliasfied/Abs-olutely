<template>
  <ion-page>
    <the-footer title="Statistics"></the-footer>

    <ion-content color="danger" :fullscreen="true">
    <div><span>Statistics</span></div>
    </ion-content></ion-page
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import TheFooter from "./reusable/TheFooter.vue";

export default defineComponent({
  name: "CalendarPage",
  components: { IonContent, IonPage, TheFooter  },
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