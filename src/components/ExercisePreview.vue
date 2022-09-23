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
          <ion-col>
            <div class="timeAndCountDiv">{{ totalTime }}</div></ion-col
          >
          <ion-col> <div class="timeAndCountDiv">{{quantityExercises + ' Exercises'}}</div> </ion-col>
        </ion-row>
        <ion-row class="lineRow">
          <ion-col
            ><div class="timeAndCountDiv">
              <ion-select v-model="selectedValue" :placeholder="'' + breakTime" @ionChange="updateExerciseTime">
                <ion-select-option value="0">0 sec</ion-select-option>
                <ion-select-option value="5">5 sec</ion-select-option>
                <ion-select-option value="10">10 sec</ion-select-option>
              </ion-select>
            </div></ion-col
          >
          <ion-col
            ><div class="timeAndCountDiv">
              <ion-select v-model="selectedValue" :placeholder="'' + breakTime" @ionChange="updateExerciseTime">
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
              <li v-for="exercise in list?.exercises" :key="exercise">
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
import { useWorkoutsStore } from "../store/workouts";
import { computed } from "vue";
import { ref } from "vue";
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
    //Router
    // const router = useRouter();
    const route = useRoute();
    const page = route.params.course;

    //Store from /store/workouts.ts
    const store = useWorkoutsStore();
    const list = store.workoutList.find((element) => element.name == page);

    //UI DATA
    let exerciseTime = ref(list?.exerciseTime);
    let breakTime = ref(list?.breakTime);
    let quantityExercises = ref(list?.exercises?.length);
    let totalTime = computed(() => {
      return breakTime.value != undefined &&
        exerciseTime.value != undefined &&
        quantityExercises.value != undefined
        ? Math.round((exerciseTime.value * quantityExercises.value +
            (breakTime.value * quantityExercises.value - breakTime.value)) / 60) + ' Minutes'
        : undefined;
    });


    const selectedValue = ref(1);


    function updateExerciseTime() {
      exerciseTime.value = selectedValue.value;
    }

    return {
      page,
      list,
      exerciseTime,
      breakTime,
      totalTime,
      quantityExercises,
      updateExerciseTime,
      selectedValue,
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
