<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="grid-style">
        <div class="item-timer">Timer</div>
        <div class="item-exerciseNumber">ExerciseNumber</div>
        <div class="item-exerciseName">ExerciseName</div>
        <div class="item-arrowLeft">BackArrow</div>
        <div class="item-exerciseDisplay">Display of Exercise</div>
        <div class="item-arrowRight">ForwardArrow</div>
        <div class="item-pauseButton">PauseButton</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useWorkoutsStore } from "../store/workouts";

export default defineComponent({
  name: "WorkoutLive",
  components: {
    IonContent,
    IonPage,
  },

  setup() {
    // only in landscape mode (plugin)
    window.screen.orientation.lock("landscape");

    // route name variable in page (beginner, advanced, champ..)
    const route = useRoute();
    const page = route.params.course;

    // import store
    const store = useWorkoutsStore();
    console.log(store);
    const list = store.workoutList.find((element) => element.name == page);

    return {
      route,
      page,
      store,
      list,
    };
  },
});
</script>

<style scoped>
.grid-style {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 10% [row2-start] 50% [row2-end] 20% [row3];
  grid-template-columns: [line1] 25% [line2] 50% [line3] 25% [line4];
}

.item-timer {
  justify-self: center;
  align-self: center;
  grid-column: line1 / line2;
  grid-row: row1-start / row1-end;
}
.item-exerciseNumber {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row1-start / row1-end;
}

.item-exerciseName {
  justify-self: center;
  align-self: center;
  grid-column: line2 / line3;
  grid-row: row1-end / row2-start;
}

.item-arrowRight {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row2-start / row2-end;
}
.item-exerciseDisplay {
  justify-self: center;
  align-self: center;
  grid-column: line2 / line3;
  grid-row: row2-start / row2-end;
}
.item-arrowLeft {
  justify-self: center;
  align-self: center;
  grid-column: line1 / line2;
  grid-row: row2-start / row2-end;
}
.item-pauseButton {
  justify-self: center;
  align-self: center;
  grid-column: line2 / line3;
  grid-row: row2-end / row3;
}
</style>
