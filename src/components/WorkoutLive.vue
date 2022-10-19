<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="grid-style">
        <div class="item-timer">{{ counter }}</div>
        <div class="item-exerciseNumber">{{ currentExerciseNumber }}</div>
        <div class="item-exerciseName">{{ currentExercise }}</div>
        <div class="item-arrowLeft">BackArrow</div>
        <div class="item-exerciseDisplay"></div>
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
import { ref, onMounted } from "vue";

export default defineComponent({
  name: "WorkoutLive",
  components: {
    IonContent,
    IonPage,
  },

  setup() {
//onMounted

onMounted( () => startWorkout());


    // only in landscape mode (plugin)
    window.screen.orientation.lock("landscape");

    // route name variable in page (beginner, advanced, champ..)
    const route = useRoute();
    const page = route.params.course;

    // import store
    const store = useWorkoutsStore();
    console.log(store);
    const list = store.workoutList.find((element) => element.name == page);

    //ALL TIMER RELATED STUFF

    //custom asyncTimeout function
    const asyncTimeout = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    //declare variables that change on screen
    let currentExercise = ref("");
    let counter = ref(30);
    let currentExerciseNumber = ref("");

    //triggers when page loads
    async function startWorkout() {
      console.log("funktion gestartet!");
      let i = 0;
      if (list?.exercises.length != undefined) {
        while (i < list.exercises.length) {
          await showWorkoutItem(i);
          await startBreakTimer();
          i++;
        }
      }
    }

    async function showWorkoutItem(index) {
      console.log("showWorkoutItem erreicht!");
      console.log("index: " + index);
      await startExercise(index);
    }

    async function startExercise(index) {
      console.log("startExercise erreicht!");
      if (list?.exercises != undefined) {
        currentExercise.value = list?.exercises[index];
        currentExerciseNumber.value = index + 1 + "/" + list.exercises.length;
        await startExerciseTimer();
      }
    }

    async function startExerciseTimer() {
      console.log("statExerciseTimer erreicht");
      if (list?.exerciseTime != undefined) {
        counter.value = list?.exerciseTime;
        console.log("counter before loop: " + counter.value);
        while (counter.value > 0) {
          await asyncTimeout(1000);
          counter.value = counter.value - 1;
          console.log(counter.value);
        }
      }
    }

    async function startBreakTimer() {
      console.log("startBreakTimer erreicht");
      if (list?.breakTime != undefined) {
        currentExercise.value = "PAUSE";
        counter.value = list?.breakTime;
        while (counter.value > 0) {
          await asyncTimeout(1000);
          counter.value = counter.value - 1;
        }
      }
    }

    return {
      route,
      page,
      store,
      list,
      startWorkout,
      showWorkoutItem,
      startExerciseTimer,
      startBreakTimer,
      startExercise,
      counter,
      currentExercise,
      currentExerciseNumber,
      asyncTimeout,
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
