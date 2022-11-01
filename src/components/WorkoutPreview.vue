<template>
  <ion-page>
    <ion-content :fullscreen="true" color="primary">
      <div class="alignCard">
        <exercise-detail
          :proplist="proplist"
          :index="propIndex"
          class="detail"
          v-show="showModal"
        ></exercise-detail>
      </div>
      <!-- <p>{{ test }}</p> -->

      <div
        class="grid-style-top"
        :style="{ 'background-image': 'url(' + getImgUrl() + ')' }"
      >
        <div class="timeDiv">
          <div class="timeAndCountDivTop">
            <p class="bigger-p">{{ totalTime }}</p>
            <p>Minutes</p>
          </div>
        </div>
        <div class="countDiv">
          <div class="timeAndCountDivTop">
            <p class="bigger-p">{{ quantityExercises }}</p>
            <p>Exercises</p>
          </div>
        </div>
        <div class="selectBreakTimeDiv">
          <ion-card class="display-card" color="dark">
            <div class="timeAndCountDiv">
              <p class="timeLabel">Break Time:</p>
              <ion-select
                v-model="breakSelected"
                :placeholder="'' + breakTime"
                @ionChange="updateBreakTime"
              >
                <ion-select-option value="0">0 sec</ion-select-option>
                <ion-select-option value="10">10 sec</ion-select-option>
                <ion-select-option value="20">20 sec</ion-select-option>
                <ion-select-option value="30">30 sec</ion-select-option>
              </ion-select>
            </div></ion-card
          >
        </div>

        <div class="selectExerciseTimeDiv">
          <ion-card class="display-card" color="dark">
            <div class="timeAndCountDiv">
              <p class="timeLabel">Exercise Time:</p>
              <ion-select
                v-model="exerciseSelected"
                :placeholder="'' + exerciseTime"
                @ionChange="updateExerciseTime"
              >
                <ion-select-option value="20">20 sec</ion-select-option>
                <ion-select-option value="30">30 sec</ion-select-option>
                <ion-select-option value="40">40 sec</ion-select-option>
              </ion-select>
            </div></ion-card
          >
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
                <ion-card-content> {{ exercise.name }} </ion-card-content>
              </ion-card>
            </li>
          </ul>
        </div>
        <div>
          <router-link class="routerLink" :to="'/workout/' + page">
            <ion-button shape="round" color="danger"
              ><ion-icon slot="start" color="tertiary" :icon="play"></ion-icon
              >Start Workout</ion-button
            >
          </router-link>
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
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButton,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import { ref } from "vue";
import { play } from "ionicons/icons";
import ExerciseStorage from "../storage/ExerciseStorage";
import { getExercise } from "@/storage/getExerciseStorage";
import ExerciseDetail from "../components/ExerciseDetail.vue";

export default defineComponent({
  name: "WorkoutPreview",
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonSelect,
    IonSelectOption,
    ExerciseDetail,
    IonIcon,
    IonButton,
    IonCardContent,
  },
  setup() {
    const route = useRoute();
    const page = route.params.course;

    const store = useWorkoutsStore();
    const list = store.workoutList.find((element) => element.name == page);
    console.log(list);
    let proplist = list.exercises;

    // let test = ref("");
    // async function zwei() {
    //   test.value = await getExercise("Plank");
    //   console.log("hier:");
    //   console.log(test);
    //   console.log(list?.exercises);

    // }
    // zwei();

    function getImgUrl() {
      return require("../assets/HomePageWorkoutImages/" + page + ".png");
    }

    //POPUP EXERCISE DETAIL
    let propIndex = ref(0);
    let showModal = ref(false);
    function showDetails(index) {
      console.log("showdetails!");
      showModal.value = !showModal.value;
      propIndex.value = index;
    }
    function closeModal() {
      showModal.value = !showModal.value;
    }

    //UI DATA
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
    function updateExerciseTime() {
      exerciseTime.value = exerciseSelected.value;
      if (list?.exerciseTime != undefined) {
        list.exerciseTime = exerciseTime.value;
      }
    }
    const breakSelected = ref(1);
    function updateBreakTime() {
      breakTime.value = breakSelected.value;
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
      // test,
      showModal,
      showDetails,
      proplist,
      propIndex,
      closeModal,
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.li-card {
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.timeDiv {
  justify-self: center;
  align-self: center;
  font-weight: bold;
  font-size: 24px;
  color: var(--ion-color-tertiary);

  grid-row: row1-start / row1-end;
  grid-column: line1 / line2;
}
.countDiv {
  justify-self: center;
  align-self: center;
  font-weight: bold;
  font-size: 24px;
  color: var(--ion-color-tertiary);
  grid-row: row1-start / row1-end;
  grid-column: line2 / line3;
}
.selectBreakTimeDiv {
  justify-self: center;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  grid-row: row2-start / row2-end;
  grid-column: line1 / line2;
}
.selectExerciseTimeDiv {
  justify-self: center;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: var(--ion-color-tertiary);
  grid-row: row2-start / row2-end;
  grid-column: line2 / line3;
}

.timeAndCountDiv {
  margin: 10px;
  text-align: center;
  color: var(--ion-color-tertiary);
  width: 100px;
}

.timeAndCountDivTop {
  margin: 0px;
  text-align: center;
  color: var(--ion-color-tertiary);
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

.alignCard {
  position: fixed;
  height: 40%;
  bottom: 25%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}

.routerLink {
  position: fixed;
  bottom: 1%;
  text-decoration: none;
  width: 100%;
  text-align: center;
}
</style>
