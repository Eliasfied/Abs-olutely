<template>
  <ion-page>
    <ion-content color="tertiary" :fullscreen="true">
      <the-footer v-if="!showExerciseList" title="Workout Editor"></the-footer>
      <div v-if="showExerciseList" class="align-exercise-list">
        <exercise-list
          @update-exercises="updateExercises"
          @close-exerciselist="closeExerciselist"
          :exerciseListStorage="exerciseListStorage"
          :workoutName="workoutName"
          :currentWorkout="currentWorkout"
        ></exercise-list>
      </div>
      <div class="grid-page">
        <div v-if="!showExerciseList" class="grid-top">
          <div class="back-icon">
            <ion-icon
              class="back-icon"
              slot="start"
              :icon="closeOutline"
            ></ion-icon>
          </div>
          <div class="input-workoutname">
            <ion-item>
              <ion-label class="input-label" position="stacked">Name</ion-label>
              <ion-input
                :maxlength="20"
                v-if="!showExerciseList"
                v-model="workoutName"
                placeholder="My Workout"
              ></ion-input
            ></ion-item>
          </div>
          <div class="safeExercise">
            <ion-icon
              @click="safeExercise"
              slot="start"
              class="safe-icon"
              :icon="saveOutline"
            ></ion-icon>
          </div>
        </div>

        <div class="big-card">
          <div v-if="!showExerciseList" class="grid-style-editor">
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
          </div>
        </div>

        <div v-if="!showExerciseList" class="grid-style-editor-bottom">
          <div v-if="noExercises" class="nothing-added">
            <ion-icon
              color="secondary"
              :icon="clipboardOutline"
              size="large"
            ></ion-icon>
            <p></p>
            <ion-label color="secondary">Nothing added yet...</ion-label>
          </div>
          <div v-else class="list-exercises">
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
                    color="secondary"
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
                          <ion-label class="center-workoutname">{{
                            exercise.name
                          }}</ion-label>
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
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button shape="round" @click="getList" color="success"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="addCircle"
            ></ion-icon
            ><ion-label color="secondary">Add Exercises</ion-label></ion-button
          >
        </div>
        <div class="time-calculate">
          <ion-icon
            class="style-time"
            size="medium"
            :icon="timeOutline"
          ></ion-icon>
          <ion-label class="style-label">5 min</ion-label>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { computed } from "vue";
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
  IonFooter,
} from "@ionic/vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref, watch } from "vue";
import {
  addCircle,
  trash,
  barbell,
  saveOutline,
  reorderTwoOutline,
  arrowBackOutline,
  closeOutline,
  timeOutline,
  clipboardOutline,
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
    IonIcon,
    WorkoutSelect,
    IonReorderGroup,
    IonReorder,
    IonItem,
    IonFooter,
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

    let noExercises = computed(() => {
      return exerciseArray.value.length > 0 ? false : true;
    });

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
      arrowBackOutline,
      closeOutline,
      timeOutline,
      clipboardOutline,
      noExercises,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 90%;
  display: grid;
  grid-template-rows: [row1-start] 15% [row1-end] 15% [row2-start] 80% [row2-end];
}

.grid-top {
  grid-row: row1-start / row1-end;
  display: grid;
  background-color: var(--ion-color-secondary);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  grid-template-rows: [row1-start] 30% [row1-end] 70% [row2-start];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.input-label {
  font-weight: lighter;
  color: grey;
}
ion-item {
  border: none;
  outline: none;
}

.item-has-focus ion-label {
  color: black !important;
}
ion-input {
  font-weight: bold;
  color: black;
  caret-color: black;
}

.back-icon {
  font-size: 32px;
  padding: 2px;
}

.bottom-div {
  height: 15%;
  background-color: white;
}
.grid-style-editor {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.big-card {
  grid-row: row1-end / row2-start;
}

.grid-style-editor-bottom {
  grid-row: row2-start / row2-end;
  display: grid;

  grid-template-rows: [row1-start] 100% [row1-end];
}

.nothing-added {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
  text-align: center;
}

.workoutname-label {
  color: var(--ion-color-primary);
  font-weight: bold;
}
.input-workoutname {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: start;
}

.select-exercise-length {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  text-align: center;
  width: 125px;
}

.select-break-length {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  font-size: 16px;
  color: transparent;
  text-align: center;
  width: 125px;
}

ion-footer {
  height: 10%;
}

.footer-grid {
  display: grid;
  grid-template-rows: [row1-start] 50% [row1-end] 50% [row2-start];
  grid-template-columns: [column1-start] 100% [column1-end];

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

.time-calculate {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: gray;
}

.style-label {
  vertical-align: text-top;
  color: gray;
}

.safeExercise {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: end;
  padding: 3px;
  margin-top: 10px;
}

.safe-icon {
  font-size: 40px;
  color: var(--ion-color-danger);
}

ion-button {
  width: 70%;
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
}

ion-card {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
  height: 90%;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.li-card {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>
