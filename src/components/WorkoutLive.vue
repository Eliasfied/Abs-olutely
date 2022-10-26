<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="grid-style">
        <the-timer></the-timer>
        <div class="item-timer">{{ counter }}</div>
        <div class="item-exerciseNumber">{{ currentExerciseNumber }}</div>
        <div class="item-exerciseName">{{ currentExercise }}</div>
        <div class="item-arrowLeft">
          <ion-button :disabled="disabled" @click="backToLastExercise">
            <ion-icon color="tertiary" :icon="playBack"></ion-icon
          ></ion-button>
        </div>
        <div class="item-exerciseDisplay">
          <img :src="getImgUrl()" alt="" />
        </div>
        <div class="item-arrowRight">
          <ion-button :disabled="disabled" @click="forwardToNextExercise">
            <ion-icon color="tertiary" :icon="playForward"></ion-icon
          ></ion-button>
        </div>
        <div class="item-pauseButton">
          <ion-button :disabled="disabled" @click="pauseWorkout">
            <ion-icon color="tertiary" :icon="togglePauseButton"></ion-icon
          ></ion-button>
        </div>
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
import { computed } from "vue";
import TheTimer from "../components/TheTimer.vue";
import {
  playBack,
  playForward,
  pauseCircleOutline,
  pauseOutline,
  playOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "WorkoutLive",
  components: {
    IonContent,
    IonPage,
    TheTimer,
  },

  setup() {
    //onMounted

    onMounted(() => startWorkout());

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
    let currentExercise = ref(list?.exercises[0]);
    let counter = ref(30);
    let currentExerciseNumber = ref("");
    //exerciseIndex:
    let i = 0;
    //image url
    function getImgUrl() {
      return require("../assets/exercises/" + currentExercise.value + ".png");
    }

    //triggers when page loads
    async function startWorkout() {
      console.log("funktion gestartet!");

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
          while (pauseStartToggle.value == true) {
            await asyncTimeout(500);
          }
          await asyncTimeout(1000);
          counter.value = counter.value - 1;
          console.log(counter.value);
        }
      }
    }

    async function startBreakTimer() {
      console.log("startBreakTimer erreicht");
      if (list?.breakTime != undefined) {
        currentExercise.value = "Break";
        counter.value = list?.breakTime;
        while (counter.value > 0) {
          while (pauseStartToggle.value == true) {
            await asyncTimeout(500);
          }
          await asyncTimeout(1000);
          counter.value = counter.value - 1;
        }
      }
    }

    //Buttons

    //jump to last/next exercise (BACK)

    let disabled = ref(false);
    let pauseStartToggle = ref(false);
    let disableDelay = 1000;

    const togglePauseButton = computed(() => {
      return pauseStartToggle.value == true ? playOutline : pauseOutline;
    });

    async function backToLastExercise() {
      console.log("BackButton clicked");
      if (i != 0) {
        pauseStartToggle.value = false;
        counter.value = 0;
        i = i - 2; //going to be +1 in the next step so its actually -1 only
        disabled.value = true;
        console.log("diable anfang" + disabled.value);
        await asyncTimeout(disableDelay);
        console.log("disable vorbei" + disabled.value);
        disabled.value = false;
      }
    }

    async function forwardToNextExercise() {
      console.log("ForwardButton clicked");
      if (list?.exercises.length != undefined) {
        if (i < list?.exercises.length - 1) {
          pauseStartToggle.value = false;
          counter.value = 0;
          disabled.value = true;
          console.log("diable anfang" + disabled.value);
          await asyncTimeout(disableDelay);
          disabled.value = false;
          console.log("disable vorbei" + disabled.value);
        }
      }
      return;
    }

    async function pauseWorkout() {
      console.log("Pause clicked");
      pauseStartToggle.value = !pauseStartToggle.value;
      disabled.value = true;
      console.log("diable anfang" + disabled.value);
      await asyncTimeout(disableDelay);
      disabled.value = false;
      console.log("disable vorbei" + disabled.value);
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
      playBack,
      playForward,
      pauseCircleOutline,
      pauseOutline,
      playOutline,
      getImgUrl,
      backToLastExercise,
      forwardToNextExercise,
      pauseWorkout,
      disabled,
      pauseStartToggle,
      disableDelay,
      togglePauseButton,
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
  color: var(--ion-color-secondary);
  font-weight: bold;
  font-size: 28px;
}

.item-exerciseNumber {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row1-start / row1-end;
  color: var(--ion-color-secondary);
  font-weight: bold;
  font-size: 28px;
}

.item-exerciseName {
  justify-self: center;
  align-self: center;
  grid-column: line2 / line3;
  grid-row: row1-end / row2-start;
  color: var(--ion-color-secondary);
  font-weight: bold;
  font-size: 28px;
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
