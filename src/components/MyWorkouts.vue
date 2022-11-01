<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <the-footer title="My Workouts"></the-footer>
      <div class="grid-style-myWorkouts">rofl</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheFooter from "../components/TheFooter.vue";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "MyWorkouts",
  components: TheFooter,
  IonPage,
  IonContent,
  setup() {
    return {};
  },
});
</script>
