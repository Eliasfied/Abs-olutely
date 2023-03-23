<template>
  <ion-page>
    <ion-content :fullscreen="true" color="tertiary">
      <div
        class="grid-style-top"
        :style="{ 'background-image': 'url(' + getImgUrl() + ')' }"
      >
      <div class="back-button-div">
        <ion-icon @click="backToMenu" :icon="arrowBackOutline" size="large" ></ion-icon>
      </div>
        <div class="exercise-name-div">
          <ion-label class="exercise-name-label">{{ list.name }}</ion-label>
        </div>
        <div class="selectBreakTimeDiv">
          <workout-select
            @updateTime="updateBreakTime"
            name="BreakTime"
            :time="breakTime"
            :options="breakOptions"
            background-color="dark"
          ></workout-select>
        </div>

        <div class="selectExerciseTimeDiv">
          <workout-select
            @updateTime="updateExerciseTime"
            name="ExerciseTime"
            :time="exerciseTime"
            :options="exerciseOptions"
            background-color="dark"
          ></workout-select>
        </div>
      </div>

      <div class="grid-style-bottom">
        <div class="exerciseListDiv">
          <ul>
            <li v-for="(exercise, index) in list?.exercises" :key="exercise">
              <ion-card
                @click="showDetails(index)"
                class="li-card"
                color="secondary"
              >
                <div class="card-grid">
                  <div class="title-div">
                    <ion-card-header class="card-header"
                      ><ion-card-title class="card-title">
                        {{ exercise.name }}</ion-card-title
                      ></ion-card-header
                    >
                  </div>
                  <div class="img-div">
                    <img
                      class="exercise-img"
                      :src="getExerciseURL(index)"
                      alt=""
                    />
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>

        <div v-show="showModal" class="alignCard">
          <exercise-detail
            @closeModal="closeModal"
            :proplist="proplist"
            :index="propIndex"
            v-show="showModal"
          ></exercise-detail>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            class="add-button"
            shape="round"
            @click="startWorkout"
            color="warning"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="play"
            ></ion-icon
            ><ion-label color="secondary">Start Workout</ion-label></ion-button
          >
        </div>
        <div class="time-calculate">
          <ion-icon
            class="style-time"
            size="large"
            :icon="timeOutline"
          ></ion-icon>
          <ion-label class="style-label">{{ totalTime }} Min.</ion-label>
        </div>
        <div class="exercises-calculate">
          <ion-icon
            class="style-exercise"
            size="large"
            :icon="barbellOutline"
          ></ion-icon>
          <ion-label class="style-label">{{ quantityExercises }} Ex.</ion-label>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonIcon,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
  IonLabel,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { ref } from "vue";
import { play, barbellOutline, timeOutline, arrowBackOutline } from "ionicons/icons";
import ExerciseDetail from "../components/reusable/ExerciseDetail.vue";
import WorkoutSelect from "./reusable/WorkoutSelect.vue";

export default defineComponent({
  name: "WorkoutPreview",
  components: {
    IonContent,
    IonPage,
    IonCard,
    ExerciseDetail,
    IonIcon,
    IonButton,
    WorkoutSelect,
    IonCardHeader,
    IonCardTitle,
    IonFooter,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const page = route.params.course;
    console.log("page");
    console.log(page);
    let store;
    if (page == "beginner" || page == "advanced" || page == "champ") {
      store = useWorkoutsStore();
    } else {
      store = useMyWorkoutsStore();
    }
    console.log(store);

    const list = store.workoutList.find((element) => element.name == page);
    console.log("LIST: ");
    console.log(list);
    let proplist = list.exercises;

    function getImgUrl() {
      if (page == "beginner" || page == "advanced" || page == "champ") {
        return require("../assets/HomePageWorkoutImages/" + page + ".png");
      } else {
        return require("../assets/HomePageWorkoutImages/beginner.png");
      }
    }

    function getExerciseURL(index) {
      return require("../assets/exercises/" +
        list.exercises[index].name +
        ".gif");
    }

    function startWorkout() {
      router.push("/workout/" + page);
    }

    //POPUP EXERCISE DETAIL
    let propIndex = ref(0);
    let showModal = ref(false);
    function showDetails(index) {
      console.log("showdetails!");
      console.log(index);
      showModal.value = !showModal.value;
      propIndex.value = index;
    }
    function closeModal() {
      showModal.value = !showModal.value;
    }

    function backToMenu () {
      router.push("/home");
    }

    //UI DATA

    let exerciseOptions = [20, 30, 35, 40];
    let breakOptions = [0, 5, 10, 20, 30];
    let exerciseTime = ref(list?.exerciseTime);
    let breakTime = ref(list?.breakTime);
    let quantityExercises = ref(list?.exercises?.length);
    let totalTime = computed(() => {
      return breakTime.value != undefined &&
        exerciseTime.value != undefined &&
        quantityExercises.value != undefined
        ? Math.round(
            (exerciseTime.value * quantityExercises.value +
              (breakTime.value * quantityExercises.value - breakTime.value)) /
              60
          )
        : undefined;
    });

    // ion-select break and exerise length options
    const exerciseSelected = ref(1);
    function updateExerciseTime(value) {
      exerciseTime.value = value;
      if (list?.exerciseTime != undefined) {
        list.exerciseTime = exerciseTime.value;
      }
    }
    const breakSelected = ref(1);
    function updateBreakTime(value) {
      breakTime.value = value;
      if (list?.breakTime != undefined) {
        list.breakTime = breakTime.value;
      }
    }

    return {
      route,
      page,
      list,
      exerciseTime,
      breakTime,
      totalTime,
      quantityExercises,
      updateExerciseTime,
      updateBreakTime,
      exerciseSelected,
      breakSelected,
      getImgUrl,
      play,
      showModal,
      showDetails,
      proplist,
      propIndex,
      closeModal,
      exerciseOptions,
      breakOptions,
      getExerciseURL,
      startWorkout,
      barbellOutline,
      timeOutline,
      arrowBackOutline,
      backToMenu
    };
  },
});
</script>

<style scoped>
.grid-style-top {
  height: 40%;
  background-size: cover;
  display: grid;
  grid-template-rows: [row1-start] 30% [row1-end] 30% [row2-start] 40% [row2-end];
  grid-template-columns: [line1] 50% [line2] 50% [line3];
}

.grid-style-bottom {
  height: 60%;
  display: grid;
  grid-template-rows: [row1-start-1] 100% [row1-end-1];
  grid-template-columns: [line1-1] 100% [line2-1];
}

.exerciseListDiv {
  border-top: 2px solid black;
}

.display-card {
  border: 1px solid grey;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.li-card {
  /* border: 1px solid black; */
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 10px 20px, rgba(0, 0, 0, 0.05) 0px 6px 6px;
}

.exercise-name-div {
  grid-row: row1-start / row1-end;
  grid-column: line1 / line3;
  justify-self: center;
  align-self: center;
}

.back-button-div {
  grid-row: row1-start / row1-end;
  grid-column: line1 /line2;
  justify-self: start;
  align-self: center;

}

.exercise-name-label {
  font-size: xx-large;
  font-weight: bold;
}

.selectBreakTimeDiv {
  justify-self: center;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  grid-row: row2-start / row2-end;
  grid-column: line1 / line2;
  width: 125px;
  text-align: center;
}
.selectExerciseTimeDiv {
  justify-self: center;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: var(--ion-color-secondary);
  grid-row: row2-start / row2-end;
  grid-column: line2 / line3;
  width: 125px;
  text-align: center;
}

.timeAndCountDiv {
  margin: 10px;
  text-align: center;
  color: var(--ion-color-secondary);
  width: 100px;
}

.timeAndCountDivTop {
  margin: 0px;
  text-align: center;
  color: var(--ion-color-secondary);
}

p {
  margin: 0px;
}

.bigger-p {
  font-size: 28px;
}

.timeLabel {
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
}

li {
  height: 15%;
}

.card-grid {
  height: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
}

.card-title {
  color: #80abca !important;
}
.exercise-img {
  height: 100%;
  width: 100%;
}


.title-div {
  align-self: center;

}

.card-label {
  height: 100%;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  color: var(--ion-color-primary);
  font-size: 18px;
  font-weight: bold;
}

.alignCard {
  position: fixed;
  height: 40%;
  bottom: 25%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}

ion-footer {
  height: 10%;
}
.footer-grid {
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 40% [column1-end] 20% [column2-start] 40% [column2-end];

  height: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-top: 0.5px solid lightgray;
}

.addExercise {
  grid-row: row1-start / row1-end;
  width: 100%;
  text-align: center;
}

.add-button {
  position: fixed;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
}



.time-calculate {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: end;
}

.exercises-calculate {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: start;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: gray;
}

.style-exercise {
  margin-right: 5px;
  vertical-align: middle;
  color: gray;
}

.style-label {
  vertical-align: text-top;
  color: gray;
  font-size: larger;
}
</style>
