<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="grid-style">
        <div class="base-timer item-timer">
          <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g class="base-timer__circle">
              <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                :class="remainingPathColor"
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
              ></path>
            </g>
          </svg>
        </div>
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

    // SVG TIMER COLOR METHODS/VARIABLES

    // Divides time left by the defined time limit.
    function calculateTimeFraction() {
      if (list?.exerciseTime != undefined) {
        return counter.value / list?.exerciseTime;
      }
    }

    const COLOR_CODES = {
      info: {
        color: "green",
      },
    };

    let remainingPathColor =
      "base-timer__path-remaining " + COLOR_CODES.info.color;

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
      remainingPathColor,
      COLOR_CODES,
      calculateTimeFraction,
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

.base-timer {
  position: relative;
  height: 60px;
  width: 60px;
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__label {
  position: absolute;

  /* Size should match the parent container */
  width: 60px;
  height: 60px;

  /* Keep the label aligned to the top */
  top: 0;

  /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Sort of an arbitrary number; adjust to your liking */
  font-size: 32px;
}

.base-timer__path-remaining {
  /* Just as thick as the original ring */
  stroke-width: 7px;

  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Allows the ring to change color when the color value updates */
  stroke: green;
}

.base-timer__svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}
</style>
