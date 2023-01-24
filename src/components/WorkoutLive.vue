<template>
  <ion-page :fullscreen="true">
    <ion-content>
      <div class="grid-style">
        <the-timer></the-timer>
        <div class="item-timer">{{ counter }}</div>
        <div class="item-exerciseNumber">{{ currentExerciseNumber }}</div>
        <div class="item-exerciseName">{{ currentExercise }}</div>
        <div class="item-nextExercise">{{ nextExercise }}</div>

        <div class="item-arrowLeft">
          <ion-button :disabled="disabled" @click="backToLastExercise">
            <ion-icon color="secondary" :icon="playBack"></ion-icon
          ></ion-button>
        </div>
        <div class="item-exerciseDisplay">
          <img :src="getImgUrl()" alt="" />
        </div>
        <div class="item-arrowRight">
          <ion-button :disabled="disabled" @click="forwardToNextExercise">
            <ion-icon color="secondary" :icon="playForward"></ion-icon
          ></ion-button>
        </div>
        <div class="item-pauseButton">
          <ion-button :disabled="disabled" @click="pauseWorkout">
            <ion-icon color="secondary" :icon="togglePauseButton"></ion-icon
          ></ion-button>
        </div>
      </div>
      <div v-show="isFinished" class="align-card">
        <finished-page
          @resetAll="resetAll"
          :page="page"
          :proptime="proptime"
          :isFinished="isFinished"
        ></finished-page>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWorkoutsStore } from "../store/workouts";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import TheTimer from "../components/reusable/TheTimer.vue";
import FinishedPage from "../components/FinishedPage.vue";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NativeAudio } from "@ionic-native/native-audio";
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
    IonButton,
    IonIcon,
    FinishedPage,
  },

  setup() {
    //onMounted

    onMounted(() => startWorkout());

    //audio
    NativeAudio.preloadSimple(
      "fiveSecondBeep",
      "public/audio/fiveSecondBeep.mp3"
    ).then(
      (data) => {
        console.log("success", data);
      },
      (data) => {
        console.log("error", data);
      }
    );
    // only in landscape mode (plugin)
    window.screen.orientation.lock("landscape");

    // route name variable in page (beginner, advanced, champ..)
    const route = useRoute();
    const $router = useRouter();
    const page = route.params.course;

    // RESET ALL

    function resetAll() {
      // i = 0;
      // counter.value = 30;
      // currentExerciseNumber.value = "";
      // nextExercise.value = "";
      // isPrepare.value = true;
      // isFinished.value = false;
      // disabled.value = false;
      // pauseStartToggle.value = false;

      console.log("okay lets go");
    }

    // import store
    let store;
    if (page == "beginner" || page == "advanced" || page == "champ") {
      store = useWorkoutsStore();
    } else {
      store = useMyWorkoutsStore();
    }

    const list = store.workoutList.find((element) => element.name == page);
    console.log("list: ");
    console.log(list);
    console.log("exercises: ");
    console.log(list?.exercises);
    console.log(list?.exercises.length);
    let proptime = Math.round(
      (list.exerciseTime * list.exercises.length +
        (list.breakTime * list.exercises.length - list.breakTime)) /
        60
    );

    //ALL TIMER RELATED STUFF

    //custom asyncTimeout function
    const asyncTimeout = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    //declare variables that change on screen
    let currentExercise = ref(list?.exercises[0].name);
    let counter = ref(30);
    let currentExerciseNumber = ref("");
    let nextExercise = ref("");
    let isPrepare = ref(true);
    let isFinished = ref(false);
    //exerciseIndex:
    let i = 0;
    //image url
    function getImgUrl() {
      return isPrepare.value
        ? require("../assets/exercises/Prepare.png")
        : require("../assets/exercises/" + currentExercise.value + ".gif");
    }

    //PREPARE FOR WORKOUT
    async function prepareForWorkout() {
      counter.value = 5;
      currentExercise.value = exerciseValuePrepare;

      while (counter.value > 0) {
        if (counter.value < 10) {
          nextExercise.value = "Next: " + list?.exercises[0].name;
        } else {
          nextExercise.value = "";
        }

        while (pauseStartToggle.value == true) {
          await asyncTimeout(500);
        }

        await asyncTimeout(1000);
        counter.value = counter.value - 1;
        console.log(counter.value);
      }
    }

    const exerciseValuePrepare = computed(() => {
      return "Starting in " + counter.value + " seconds.";
    });

    //triggers when page loads
    async function startWorkout() {
      KeepAwake.keepAwake();
      StatusBar.hide();
      await prepareForWorkout();
      isPrepare.value = false;
      if (list?.exercises.length != undefined) {
        while (i < list.exercises.length) {
          await showWorkoutItem(i);
          if (i < list.exercises.length - 1) {
            await startBreakTimer(i);
          }

          i++;
        }
        isFinished.value = true;
        disabled.value = true;
        window.screen.orientation.lock("portrait");
        console.log("is finished");
        console.log(isFinished);
      }
    }

    async function showWorkoutItem(index) {
      await startExercise(index);
    }

    async function startExercise(index) {
      if (list?.exercises != undefined) {
        currentExercise.value = list?.exercises[index].name;
        currentExerciseNumber.value = index + 1 + "/" + list.exercises.length;
        await startExerciseTimer(index);
      }
    }

    async function startExerciseTimer(index) {
      if (list?.exerciseTime != undefined) {
        counter.value = list?.exerciseTime;
        while (counter.value > 0) {
          if (
            counter.value < 10 &&
            list?.breakTime == 0 &&
            index < list?.exercises.length - 1
          ) {
            nextExercise.value = "Next: " + list?.exercises[index + 1].name;
          } else {
            nextExercise.value = "";
          }
          if (counter.value == 5) {
            NativeAudio.play("fiveSecondBeep");
          }
          while (pauseStartToggle.value == true) {
            await asyncTimeout(500);
          }
          await asyncTimeout(1000);
          counter.value = counter.value - 1;
          console.log(counter.value);
        }
      }
    }

    async function startBreakTimer(index) {
      if (list?.breakTime != undefined) {
        currentExercise.value = "Break";
        counter.value = list?.breakTime;
        while (counter.value > 0) {
          if (counter.value < 10 && index < list?.exercises.length - 1) {
            nextExercise.value = "Next: " + list?.exercises[index + 1].name;
          } else {
            nextExercise.value = "";
          }
          if (counter.value == 5) {
            NativeAudio.play("fiveSecondBeep");
          }
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
      if (i != 0) {
        pauseStartToggle.value = false;
        counter.value = 0;
        i = i - 2; //going to be +1 in the next step so its actually -1 only
        disabled.value = true;
        await asyncTimeout(disableDelay);
        disabled.value = false;
      }
    }

    async function forwardToNextExercise() {
      if (list?.exercises.length != undefined) {
        if (i < list?.exercises.length - 1) {
          pauseStartToggle.value = false;
          counter.value = 0;
          disabled.value = true;

          await asyncTimeout(disableDelay);
          disabled.value = false;
        }
      }
      return;
    }

    async function pauseWorkout() {
      pauseStartToggle.value = !pauseStartToggle.value;
      disabled.value = true;
      await asyncTimeout(disableDelay);
      disabled.value = false;
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
      nextExercise,
      prepareForWorkout,
      exerciseValuePrepare,
      $router,
      isFinished,
      resetAll,
      proptime,
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
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 28px;
}

.item-exerciseNumber {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row1-start / row1-end;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 28px;
}

.item-exerciseName {
  justify-self: center;
  align-self: center;
  grid-column: line2 / line3;
  grid-row: row1-end / row2-start;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 28px;
}

.item-nextExercise {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row1-end / row2-start;
  color: var(--ion-color-success);
  font-weight: bold;
  font-size: 20x;
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

.align-card {
  position: fixed;
  height: 80%;
  bottom: 5%;
  top: 5%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
