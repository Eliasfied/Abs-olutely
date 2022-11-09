<template>
  <ion-page>
    <ion-content color="secondary" :fullscreen="true">
      <the-footer title="Workout Editor"></the-footer>
      <div class="grid-style-editor">
        <div class="label-workoutname">{{ workoutName }}</div>
        <div class="input-workoutname">
          <ion-input v-model="workoutName" placeholder="Enter Workout Name"></ion-input>
        </div>
        <div class="select-break-length">
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
        <div class="select-exercise-length">
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

        <div class="addExercise">
          <ion-button @click="getList" color="danger"
            ><ion-icon
              slot="start"
              color="tertiary"
              :icon="addCircle"
            ></ion-icon
            >Add Exercise</ion-button
          >
        </div>
        <div v-if="showExerciseList" class="align-exercise-list">
          <exercise-list
            @update-exercises="updateExercises"
            :exerciseListStorage="exerciseListStorage"
            :workoutName="workoutName"
            :currentWorkout="currentWorkout"
          ></exercise-list>
        </div>
      </div>
      <div class="grid-style-editor-bottom">
        <div class="list-exercises">
          <ul>
            <li v-for="(exercise, index) in list?.exercises" :key="exercise">
              <ion-card @click="showDetails(index)"
                ><ion-card-content class="ion-card-content">
                  <div class="grid-style-li">
                    <div class="icon-clipboard">
                      <ion-icon :icon="barbell"></ion-icon>
                    </div>
                    <div class="label-workoutnameCard">
                      <ion-label>{{ exercise.name }}</ion-label>
                    </div>
                    <div class="icon-trash">
                      <ion-icon
                        class="icon-color-trash"
                        :icon="trash"
                      ></ion-icon>
                    </div>
                  </div> </ion-card-content
              ></ion-card>
            </li>
          </ul>
        </div>
        <div v-if="showModal" class="alignCard">
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
import { defineComponent } from "vue";
import { IonPage, IonContent, IonInput } from "@ionic/vue";
import TheFooter from "../components/TheFooter.vue";
import { ref } from "vue";
import { addCircle, trash, barbell } from "ionicons/icons";
import { useRoute } from "vue-router";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import ExerciseDetail from "../components/ExerciseDetail.vue";
import ExerciseList from "../components/ExerciseList.vue";
import { getExerciseList } from "../storage/getExerciseList";

export default defineComponent({
  name: "CreateWorkout",
  components: { IonPage, IonContent, TheFooter, ExerciseDetail, ExerciseList, IonInput },
  setup() {
    //route
    const route = useRoute();
    const page = route.params.course;
    console.log("page: ");
    console.log(page);

    //store
    const store = useMyWorkoutsStore();
    let list;
    let proplist;
    let exerciseListStorage = ref();
    let showExerciseList = ref(false);

    if (route.params.course != "new") {
      list = store.workoutList.find((element) => element.name == page);
      proplist = list.exercises;
    }

    //exerciseList
    async function getList() {
      showExerciseList.value = !showExerciseList.value;
      exerciseListStorage.value = await getExerciseList();
    }

    //EXERCISE DETAIL

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

    // UI
    let workoutName = ref("ExampleName");
    let exerciseSelected = ref(1);
    let breakSelected = ref(1);
    let breakTime = 30;
    let exerciseTime = 30;

    function updateExerciseTime() {
      console.log("");
    }

    function updateBreakTime() {
      console.log("");
    }

    //DATA

    let currentWorkout = ref({
      name: workoutName.value,
      breakTime: breakTime,
      exerciseTime: exerciseTime,
      exercises: [],
    });

    function updateExercises() {
      console.log("es klappt oder so");
    }

    return {
      workoutName,
      exerciseSelected,
      breakSelected,
      exerciseTime,
      updateExerciseTime,
      breakTime,
      updateBreakTime,
      addCircle,
      trash,
      barbell,
      list,
      proplist,
      propIndex,
      showModal,
      showDetails,
      closeModal,
      exerciseListStorage,
      getList,
      showExerciseList,
      updateExercises,
      currentWorkout,
    };
  },
});
</script>

<style scoped>
.grid-style-editor {
  height: 40%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 20% [row2-start] 40% [row2-end]20% [row3-start];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.grid-style-editor-bottom {
  display: grid;
  height: 50%;
  grid-template-rows: [row1-start] 100% [row1-end];
}

.label-workoutname {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
  font-weight: bold;
}

.input-workoutname {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
}

.select-exercise-length {
  grid-row: row2-start / row2-end;
  align-self: center;
  justify-self: center;
}

.select-break-length {
  grid-row: row2-start / row2-end;
  align-self: center;
  justify-self: center;
}

.addExercise {
  width: 100%;
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
}

ion-button {
  width: 100%;
}
ion-icon {
  font-size: 20px;
}

ul {
  width: 100%;
  height: 95%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
}

ion-card {
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.list-exercises {
  width: 100%;
  grid-row: row1-start / row1-end;
}

.grid-style-li {
  height: 100%;
  display: grid;
  grid-template-rows: [row1] 100% [row2];
  grid-template-columns: [colmumn1-start] 10% [column1-end] 70% [column2-start] 20% [column2-end];
}

.icon-clipboard {
  align-self: center;
}
.label-workoutname {
  align-self: center;
  justify-self: center;
  grid-column: column1-start / column2-start;
}

.label-workoutnameCard {
  align-self: center;
  justify-self: start;
  grid-row: row1 / row2;
  grid-column: column1-end / column2-start;
}
.ion-card-content {
  color: var(--ion-color-primary);
  font-size: medium;
  font-weight: bold;
}

.icon-trash {
  grid-column: column2-start / column2-end;
  justify-self: end;
  align-self: center;
}

.icon-color-trash {
  color: red;
}

.alignCard {
  position: fixed;
  height: 40%;
  bottom: 25%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}

.align-exercise-list {
  position: fixed;
  height: 30%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
