<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row><ion-col> {{list}} </ion-col></ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonRow, IonCol, IonGrid } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useWorkoutsStore } from "../store/workouts";

export default defineComponent({
  name: "WorkoutLive",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonGrid,
  },

  setup() {
    // only in landscape mode (plugin)
    window.screen.orientation.lock("landscape");

    // route name variable in page (beginner, advanced, champ..)
    const route = useRoute();
    const page = route.params.course;

    // import store
    const store = useWorkoutsStore();
    const list = store.workoutList.find((element) => element.name == page);
    

    return {
      route,
      page,
      store,
      list
    };
  },
});
</script>
