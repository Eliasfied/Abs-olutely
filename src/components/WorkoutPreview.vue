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
          <workout-select
              @updateTime="updateBreakTime"
              name="BreakTime"
              :time="breakTime"
              :options="breakOptions"
            ></workout-select>
        </div>

        <div class="selectExerciseTimeDiv">
          <workout-select
              @updateTime="updateExerciseTime"
              name="ExerciseTime"
              :time="exerciseTime"
              :options="exerciseOptions"
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
                color="tertiary"
              >
                <ion-card-content class="card-content"> {{ exercise.name }} </ion-card-content>
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
  
  IonIcon,
  IonButton,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { ref } from "vue";
import { play } from "ionicons/icons";
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
    IonCardContent,
    WorkoutSelect,
  },
  setup() {
    const route = useRoute();
    const page = route.params.course;
    let store;
    if (page == "beginner" || page == "advanced" || page == "champ") {
      store = useWorkoutsStore();
    } else {
      store = useMyWorkoutsStore();
    }

    const list = store.workoutList.find((element) => element.name == page);
    console.log("LIST: ");
    console.log(list);
    let proplist = list.exercises;

  

    function getImgUrl() {
      if (page == "beginner" || page == "advanced" || page == "champ") {
        return require("../assets/HomePageWorkoutImages/" + page + ".png");
      }
      else {
        return require("../assets/HomePageWorkoutImages/beginner.png");
      }
      
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
  width: 125px;
  text-align: center;


}
.selectExerciseTimeDiv {
  justify-self: center;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: var(--ion-color-tertiary);
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

.card-content {
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

.routerLink {
  position: fixed;
  bottom: 1%;
  text-decoration: none;
  width: 100%;
  text-align: center;
}
</style>
