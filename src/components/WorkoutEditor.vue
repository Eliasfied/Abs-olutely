<template>
  <ion-page>
    <ion-content color="primary" :fullscreen="true">
      <the-footer title="Workout Editor"></the-footer>

      <ion-card color="primary" class="big-card">
        <div class="grid-style-editor">
          <div class="label-workoutname">
            <ion-label class="workoutname-label">{{ workoutName }}</ion-label>
          </div>
          <div class="input-workoutname">
            <ion-item v-if="!showExerciseList" color="primary">
              <ion-input
                :maxlength="20"
                v-if="!showExerciseList"
                v-model="workoutName"
                placeholder="Enter a name"
              ></ion-input>
            </ion-item>
          </div>
          <div v-if="!showExerciseList" class="select-break-length">
            <workout-select
              @updateTime="updateBreakTime"
              name="BreakTime"
              :time="breakTime"
              :options="breakOptions"
            ></workout-select>
          </div>
          <div v-if="!showExerciseList" class="select-exercise-length">
            <workout-select
              @updateTime="updateExerciseTime"
              name="ExerciseTime"
              :time="exerciseTime"
              :options="exerciseOptions"
            ></workout-select>
          </div>

          <div class="addExercise">
            <ion-button @click="getList" color="secondary"
              ><ion-icon
                size="large"
                slot="start"
                color="tertiary"
                :icon="addCircle"
              ></ion-icon
              >Add Exercises</ion-button
            >
          </div>
          <div class="safeExercise">
            <ion-icon
              @click="safeExercise"
              slot="start"
              class="safe-icon"
              :icon="saveOutline"
            ></ion-icon>
          </div>
          <div v-if="showExerciseList" class="align-exercise-list">
            <exercise-list
              @update-exercises="updateExercises"
              @close-exerciselist="closeExerciselist"
              :exerciseListStorage="exerciseListStorage"
              :workoutName="workoutName"
              :currentWorkout="currentWorkout"
            ></exercise-list>
          </div>
        </div>
      </ion-card>
      <div class="grid-style-editor-bottom">
        <div class="list-exercises">
          <ul>
            <ion-reorder-group
              :disabled="false"
              @ionItemReorder="handleReorder($event)"
            >
              <li
                v-for="(exercise, index) in exerciseArray"
                :key="exercise.name"
              >
                <ion-card
                  @click="showDetails(index)"
                  class="li-card"
                  color="tertiary"
                  ><ion-card-content class="ion-card-content">
                    <div class="grid-style-li">
                      <div class="reorder-div">
                        <ion-reorder
                          ><ion-icon
                            class="reorder-icon"
                            :icon="reorderTwoOutline"
                          ></ion-icon
                        ></ion-reorder>
                      </div>
                      <div class="label-workoutnameCard">
                        <ion-label class="center-workoutname">{{ exercise.name }}</ion-label>
                      </div>

                      <div class="icon-trash">
                        <ion-icon
                          @click.stop="removeExercise(index)"
                          class="icon-color-trash"
                          :icon="trash"
                        ></ion-icon>
                      </div>
                    </div> </ion-card-content
                ></ion-card>
              </li>
            </ion-reorder-group>
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
import {
  IonPage,
  IonContent,
  IonInput,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonIcon,
  IonReorderGroup,
  IonReorder,
} from "@ionic/vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref } from "vue";
import {
  addCircle,
  trash,
  barbell,
  saveOutline,
  reorderTwoOutline,
} from "ionicons/icons";
import { useRoute } from "vue-router";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import ExerciseDetail from "../components/reusable/ExerciseDetail.vue";
import ExerciseList from "../components/ExerciseList.vue";
import { getExerciseList } from "../composables/getExerciseList";
import { getMyWorkout } from "../composables/getMyWorkoutStorage";
import WorkoutStorage from "@/storage/myWorkoutStorage";
import WorkoutSelect from "./reusable/WorkoutSelect.vue";



export default defineComponent({
  name: "CreateWorkout",
  components: {
    IonPage,
    IonContent,
    TheFooter,
    ExerciseDetail,
    ExerciseList,
    IonInput,
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonIcon,
    WorkoutSelect,
    IonReorderGroup,
    IonReorder,
  },
  setup() {
    //route
    const route = useRoute();
    const page = route.params.course;
    console.log("page: ");
    console.log(page);

    //store
    const store = useMyWorkoutsStore();
    let list = ref();

    let exerciseListStorage = ref();
    let showExerciseList = ref(false);
    let exerciseArray: any = ref([]);
    let proplist = ref(exerciseArray.value);



    const found = store.workoutList.find((element) => element.name == page);

    
  

    if (found != undefined) {
      list.value = store.workoutList.find((element) => element.name == page);
      proplist.value = list.value.exercises;
      exerciseArray.value = list.value.exercises;
      getUIData();
    }

    //REORDER HANDLER
    const handleReorder = (event: CustomEvent) => {
      // Before complete is called with the items they will remain in the
      // order before the drag
      console.log("Before complete", exerciseArray.value);

      // Finish the reorder and position the item in the DOM based on
      // where the gesture ended. Update the items variable to the
      // new order of items
      exerciseArray.value = event.detail.complete(exerciseArray.value);
      proplist.value = exerciseArray.value;

      // After complete is called the items will be in the new order
      console.log("After complete", exerciseArray.value);
    };

    //exerciseList
    async function getList() {
      showExerciseList.value = !showExerciseList.value;
      exerciseListStorage.value = await getExerciseList();
    }

    function closeExerciselist() {
      showExerciseList.value = false;
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
    let workoutName = ref("");
    let exerciseSelected = ref(1);
    let breakSelected = ref(1);
    let exerciseTime = ref(30);
    let breakTime = ref(30);
    let inputPlaceholder = "Give your Workout a Name:";

    let currentWorkout = {
      name: workoutName.value,
      breakTime: exerciseTime.value,
      exerciseTime: breakTime.value,
      exercises: exerciseArray.value,
    };
    let workout;

    function updateExerciseTime(value) {
      console.log("jo");
      exerciseTime.value = value;
      console.log(exerciseTime.value);
    }

    function updateBreakTime(value) {
      console.log("ko");
      breakTime.value = value;
      console.log(breakTime.value);
    }

    //DATA

    let exerciseOptions = [20, 30, 35, 40];
    let breakOptions = [0, 5, 10, 20, 30];

    function updateExercises(exercise) {
      exerciseArray.value.push(exercise);
      proplist.value = JSON.parse(JSON.stringify(exerciseArray.value));
    }

    async function safeExercise() {
      if (found == undefined) {
        currentWorkout.exercises = JSON.parse(
          JSON.stringify(exerciseArray.value)
        );
        currentWorkout.name = workoutName.value;
        currentWorkout.exerciseTime = exerciseTime.value;
        currentWorkout.breakTime = breakTime.value;
        await WorkoutStorage.setItem(workoutName.value, currentWorkout);
        console.log("bin im safeexercise method");
        store.addToWorkoutlist(currentWorkout);
        console.log(store.workoutList);
      } else {
        workout = await getMyWorkout(page);
        workout.exercises = JSON.parse(JSON.stringify(exerciseArray.value));
        workout.name = workoutName.value;
        workout.exerciseTime = exerciseTime.value;
        workout.breakTime = breakTime.value;
        await WorkoutStorage.setItem(workoutName.value, workout);
     
        
      }
    }

    async function removeExercise(index) {
      console.log("removed");
      console.log(index);
      exerciseArray.value.splice(index, 1);
      proplist.value = JSON.parse(JSON.stringify(exerciseArray.value));
    }

    async function getUIData() {
      const workout = await getMyWorkout(page);
      workoutName.value = workout.name;
      exerciseTime.value = workout.exerciseTime;
      breakTime.value = workout.breakTime;
    }

    return {
      workoutName,
      exerciseSelected,
      breakSelected,
      updateExerciseTime,
      updateBreakTime,
      addCircle,
      trash,
      barbell,
      saveOutline,
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
      exerciseArray,
      safeExercise,
      removeExercise,
      exerciseTime,
      breakTime,
      inputPlaceholder,
      closeExerciselist,
      exerciseOptions,
      breakOptions,
      handleReorder,
      reorderTwoOutline,
    };
  },
});
</script>

<style scoped>
.grid-style-editor {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 20% [row2-start] 40% [row2-end]20% [row3-start];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.big-card {
  height: 40%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  border: 3px solid black;
}

.grid-style-editor-bottom {
  display: grid;
  height: 50%;
  grid-template-rows: [row1-start] 100% [row1-end];
}

.label-workoutname {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column2-start;
  font-weight: bold;
  justify-self: center;
  align-self: center;
  margin-left: 16px;
}

.workoutname-label {
  color: var(--ion-color-secondary);
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
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  text-align: center;
  width: 125px;
}

.select-break-length {
  grid-row: row2-start / row2-end;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  text-align: center;
  width: 125px;
}

.addExercise {
  width: 100%;
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
  text-align: center;
}

.safeExercise {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: end;
  margin-right: 10px;
}

.safe-icon {
  font-size: 40px;
  color: var(--ion-color-danger);
}

ion-input {
  text-align: center;
}

ion-button {
  width: 90%;
  font-weight: bold;
}
ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
}

ion-label {
  color: var(--ion-color-primary);
  font-size: 18px;
  font-weight: bold;
}

ul {
  width: 100%;
  height: 95%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
  margin-top: 5px;
  border-top: 2px solid var(--ion-color-secondary);
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
  /* height: 100%; */
  display: grid;
  grid-template-rows: [row1] 100% [row2];
  grid-template-columns: [colmumn1-start] 10% [column1-end] 70% [column2-start] 20% [column2-end];
}

.icon-clipboard {
  /* align-self: center; */
  /* grid-row: row1 / row2;
  grid-column: column1-start / column1-end; */
}

.reorder-div {
  grid-row: row1 / row2;
  align-self: center;
  justify-self: start;
}

.reorder-icon {
  vertical-align: middle;
}

.barbell-icon {
  vertical-align: middle;
}

.label-workoutnameCard {
  align-self: center;
  justify-self: start;
  grid-row: row1 / row2;
  grid-column: column1-end / column2-start;
}

.center-workoutname {
  vertical-align: middle;
}
.ion-card-content {
  /* color: var(--ion-color-primary); */
  font-size: medium;
  font-weight: bold;
}

.icon-trash {
  grid-column: column2-start / column2-end;
  grid-row: row1 / row2;
  justify-self: end;
}

.icon-color-trash {
  color: red;
  vertical-align: middle;
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

.li-card {
  border: 3px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
