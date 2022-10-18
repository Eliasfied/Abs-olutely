<template>
  <ion-page>
    <ion-content :fullscreen="true" color="primary">
      <ion-grid>
        <div
          color="primary"
          class="courseNameDiv"
          :style="{ 'background-image': 'url(' + getImgUrl() + ')' }"
        >
          <div class="displayDiv">
          <ion-row>
            <ion-col>
              <div class="timeAndCountDiv">
                <p>{{ totalTime }}</p>
                <p>Minutes</p>
              </div></ion-col
            >
            <ion-col>
              <div class="timeAndCountDiv">
                <p>{{ quantityExercises }}</p>
                <p>Exercises</p>
              </div>
            </ion-col>
          </ion-row>
        </div>
        </div>

        <ion-row class="lineRow">
          <ion-col>
            <ion-card color="secondary">
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
              </div>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card color="secondary">
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
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ul>
              <li v-for="exercise in list?.exercises" :key="exercise">
                <ion-card color="secondary">
                  <ion-card-content> {{ exercise }} </ion-card-content>
                </ion-card>
              </li>
            </ul>
          </ion-col>
          <router-link class="routerLink" :to="'/workout/' + page">
            <ion-button shape="round" color="danger"
              ><ion-icon slot="start" color="tertiary" :icon="play"></ion-icon
              >Start Workout</ion-button
            >
          </router-link>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useWorkoutsStore } from "../store/workouts";
import { computed } from "vue";
import { ref } from "vue";
import { play } from "ionicons/icons";

export default defineComponent({
  name: "ExercisePreview",
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonIcon,
  },

  setup() {
    //Router
    // const router = useRouter();
    const route = useRoute();
    const page = route.params.course;

    //Store from /store/workouts.ts
    const store = useWorkoutsStore();
    const list = store.workoutList.find((element) => element.name == page);
    console.log(list);

    //onMounted (image workout show)
    function getImgUrl() {
      console.log("klicki");
      return require("../assets/HomePageWorkoutImages/" + page + ".png");
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
    };
  },
});
</script>

<style scoped>
ion-grid {
  margin: 0;
  padding: 0;
}

ion-col {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 400px;
}

img {
  height: 100%;
  width: 100%;
  background-size: cover;
}

.courseNameDiv {
  height: 200px;
  position: relative;
  text-align: center;
  margin: 0 0 0 0;
  padding: 0;
  background-size: cover;
}

.courseNameDiv p {
  margin: 0;
  font-size: 20px;
  color: var(--ion-color-primary);
}

.timeAndCountDiv {
  margin: 10px;
  text-align: center;
  color: var(--ion-color-primary);
}

.displayDiv {
  position: absolute;
  width: 100%;
  bottom: 0px;
}


.timeLabel {
  margin: 0;
}

.lineRow {
  padding: 10px;
  border-bottom: 2px solid black;
}

.lineNoRow {
  padding: 10px;
}

.exerciseListDiv {
  height: 150px;
}

.addExercisesDiv {
  text-align: center;
}

.startWorkoutDiv {
  height: 90px;
  margin: 10px 0 0 0;
  border-top: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.routerLink {
  position: fixed;
  bottom: 1%;
  left: 20%;
  right: 20%;
  text-decoration: none;
}
</style>
