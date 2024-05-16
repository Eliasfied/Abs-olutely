<template>
  <ion-page :fullscreen="true">
    <ion-content>
      <div class="grid-style">
        <!-- <the-timer></the-timer> -->
        <div class="progress-div">
          <CircleProgressBar
            class="progress-bar"
            :value="counter"
            :max="maxCounter"
            animationDuration="0.5s"
            :colorUnfilled="colorUnfilled"
            :colorFilled="colorFilled"
            :reversedFilling="true"
          >
            {{ counter }}
          </CircleProgressBar>
        </div>
        <!-- <div class="item-timer">{{ counter }}</div> -->
        <div class="item-exerciseNumber">{{ currentExerciseNumber }}</div>
        <div class="item-exerciseName">{{ currentExercise }}</div>
        <div class="item-nextExercise">{{ nextExercise }}</div>

        <div class="item-arrowLeft">
          <ion-button
            color="light"
            :disabled="disabled"
            @click="backToLastExercise"
          >
            <ion-icon color="secondary" :icon="playBack"></ion-icon
          ></ion-button>
        </div>
        <div class="item-exerciseDisplay">
          <img :src="getImgUrl()" alt="" />
        </div>
        <div class="item-arrowRight">
          <ion-button
            color="light"
            :disabled="disabled"
            @click="forwardToNextExercise"
          >
            <ion-icon color="secondary" :icon="playForward"></ion-icon
          ></ion-button>
        </div>
        <div class="back-button">
          <ion-icon class="back-icon" :icon="arrowBackOutline"></ion-icon>
        </div>
        <div class="item-pauseButton">
          <ion-button color="light" :disabled="disabled" @click="pauseWorkout">
            <ion-icon color="secondary" :icon="togglePauseButton"></ion-icon
          ></ion-button>
        </div>
      </div>
      <div v-show="isFinished" class="align-card">
        <finished-page
          @resetAll="resetAll"
          :page="page"
          :workoutName="workoutName"
          :proptime="proptime"
          :isFinished="isFinished"
        ></finished-page>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { useWorkoutsStore } from "@/store/workouts";
import { ref, onMounted } from "vue";
import { computed } from "vue";
import FinishedPage from "@/components/workout/FinishedPage.vue";
import { useMyWorkoutsStore } from "@/store/myWorkouts";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NativeAudio } from "@ionic-native/native-audio";
import { CircleProgressBar } from "vue3-m-circle-progress-bar";

import {
  playBack,
  playForward,
  pauseOutline,
  playOutline,
  arrowBackOutline,
} from "ionicons/icons";

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
const page = route.params.course as string;

// RESET ALL

function resetAll() {
  console.log("okay lets go");
}

// import store

let store;
let isDefaultWorkout = false;
if (page == "HsOB8HzB57hbQeHtwn31" || page == "HsOB8HzB57hbQeHtwn32" || page == "HsOB8HzB57hbQeHtwn33" || page == "HsOB8HzB57hbQeHtwn34") {
  store = useWorkoutsStore();
  isDefaultWorkout = true;
} else {
  store = useMyWorkoutsStore();
}

let list;
let workoutName = ref("");

if (store) {
  if (isDefaultWorkout == true) {
    list = store.workoutList.find((element) => element.id == page);
    workoutName.value = list.name;
  } else {
    console.log("page");
    console.log(page);
    if (store.workoutList) {
      console.log("bin nach dem if drin");
      console.log(store.myWorkoutList);

      list = store.workoutList.find((element) => element.id == page);
      workoutName.value = list.name;

    }
  }
}

let proptime = Math.round(
  (list.exerciseTime * list.exercises.length +
    (list.breakTime * list.exercises.length - list.breakTime)) /
    60
);

let colorUnfilled = "#80abca";
let colorFilled = "green";

//ALL TIMER RELATED STUFF

let maxCounter = computed(() => {
  if (currentExercise.value == "Pause") {
    return list.breakTime;
  }
  if (isPrepare.value == true) {
    return 5;
  } else {
    return list.exerciseTime;
  }
});

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
    ? //? require("../assets/exercises/Prepare.png")
      require("@/assets/exercises/" + list?.exercises[0].name + ".gif")
    : require("@/assets/exercises/" + currentExercise.value + ".gif");
}

//PREPARE FOR WORKOUT
async function prepareForWorkout() {
  counter.value = 5;
  currentExercise.value = exerciseValuePrepare;

  while (counter.value > 0) {
    if (counter.value < 10) {
      nextExercise.value = "Nächste: " + list?.exercises[0].name;
    } else {
      nextExercise.value = "";
    }

    while (pauseStartToggle.value == true) {
      await asyncTimeout(500);
    }

    await asyncTimeout(1000);
    counter.value = counter.value - 1;
  }
}

const exerciseValuePrepare = computed(() => {
  return "Start in " + counter.value + " Sekunden.";
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
        nextExercise.value = "Nächste: " + list?.exercises[index + 1].name;
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

async function startBreakTimer(index) {
  if (list?.breakTime != undefined) {
    currentExercise.value = "Pause";
    counter.value = list?.breakTime;
    while (counter.value > 0) {
      if (counter.value < 10 && index < list?.exercises.length - 1) {
        nextExercise.value = "Nächste: " + list?.exercises[index + 1].name;
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
</script>

<style scoped>
.grid-style {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 10% [row2-start] 50% [row2-end] 20% [row3];
  grid-template-columns: [line1] 25% [line2] 50% [line3] 25% [line4];
}

ion-button {
  color: #80abca;
}

.progress-div {
  justify-self: center;
  align-self: center;
  grid-column: line1 / line2;
  grid-row: row1-start / row1-end;
}

.progress-bar {
  color: #80abca;
  font-weight: bold;
  font-size: x-large;
  padding: 20%;
}

.item-exerciseNumber {
  justify-self: center;
  align-self: center;
  grid-column: line3 / line4;
  grid-row: row1-start / row1-end;
  color: var(--ion-color-light);
  font-weight: bold;
  font-size: 28px;
}

.item-exerciseName {
  justify-self: center;
  align-self: end;
  grid-column: line2 / line3;
  grid-row: row1-start / row1-end;
  color: var(--ion-color-light);
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

.back-button {
  justify-self: start;
  align-self: center;
  grid-column: line1 / line2;
  grid-row: row1-start / row1-end;
  margin-left: 5%;
}

.back-icon {
  color: var(--ion-color-light);
  font-size: xx-large;
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
