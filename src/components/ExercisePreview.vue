<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col
            ><div class="courseNameDiv">{{ page }}</div>
          </ion-col>
        </ion-row>
        <ion-row class="lineNoRow">
          <ion-col> <div class="timeAndCountDiv">6 Minuten</div></ion-col>
          <ion-col> <div class="timeAndCountDiv">8 Übungen</div> </ion-col>
        </ion-row>
        <ion-row class="lineRow">
          <ion-col
            ><div class="timeAndCountDiv">
              <ion-select placeholder="Break Time:">
                <ion-select-option value="0">0 sec</ion-select-option>
                <ion-select-option value="5">5 sec</ion-select-option>
                <ion-select-option value="10">10 sec</ion-select-option>
              </ion-select>
            </div></ion-col
          >
          <ion-col
            ><div class="timeAndCountDiv">
              <ion-select placeholder="Exercise Time:">
                <ion-select-option value="20">20 sec</ion-select-option>
                <ion-select-option value="30">30 sec</ion-select-option>
                <ion-select-option value="49">40 sec</ion-select-option>
              </ion-select>
            </div></ion-col
          >
        </ion-row>
        <ion-row>
          <ion-col>
            <ul>
              <li v-for="exercise in list" :key="exercise">
                <ion-card>
                  <ion-card-content> {{ exercise }} </ion-card-content>
                </ion-card>
              </li>
            </ul>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col
            ><div class="startWorkoutDiv">
              <ion-button>Start Workout</ion-button>
            </div></ion-col
          >
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import {useWorkoutsStore} from '../store/workouts';
export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
  },

  setup() {
    // const router = useRouter();
    const route = useRoute();

    const store = useWorkoutsStore();
    console.log(store.workoutList);

    const list = store.workoutList.exercises;

   const exercises = [
      "plank",
      "russian",
      "crunch",
      "reverse-crunch",
      "mountain",
      "hold",
    ];


    const page = route.params.course;
    console.log(route.params.course);

    return { page, exercises, list };
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
  height: 275px;
}

.courseNameDiv {
  height: 140px;
  text-align: center;
  border-bottom: 2px solid black;
  margin: 0 0 0 0;
  padding: 0;
}

.timeAndCountDiv {
  margin: 10px;
  text-align: center;
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
</style>
