<template>
  <ion-page>
    <ion-content color="tertiary" :fullscreen="true">
      <the-footer v-if="!showExerciseList" title="Workout Editor"></the-footer>

      <div
        v-if="showExerciseList && !showTimeSelect"
        class="align-exercise-list"
      >
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
              @click="backToWorkouts"
              class="back-icon"
              slot="start"
              :icon="closeOutline"
            ></ion-icon>
          </div>
          <div class="input-workoutname">
            <ion-item color="medium" lines="none">
              <ion-label class="input-label" position="stacked">Name</ion-label>
              <ion-input
                :maxlength="20"
                v-if="!showExerciseList"
                v-model="workoutName"
                placeholder="My Workout"
              ></ion-input
            ></ion-item>
          </div>
          <div class="exercise-time">
            <ion-icon :icon="barbellOutline"></ion-icon>
            <ion-label>{{ exerciseTime }}s</ion-label>
          </div>
          <div class="break-time">
            <ion-icon :icon="hourglassOutline"></ion-icon>
            <ion-label>{{ breakTime }}s</ion-label>
          </div>
          <div class="edit-time">
            <ion-icon
              @click="openTimeeditor"
              :icon="settingsOutline"
            ></ion-icon>
          </div>

          <div class="safeWorkout">
            <ion-icon
              @click="SafeWorkout"
              slot="start"
              :icon="saveOutline"
              size="large"
            ></ion-icon>
          </div>
        </div>

        <div v-if="showTimeSelect" class="grid-style-editor">
          <div v-if="!showExerciseList" class="select-exercise-length">
            <workout-select
              @updateTime="updateExerciseTime"
              name="ExerciseTime"
              :time="exerciseTime"
              :options="exerciseOptions"
              background-color="medium"
            ></workout-select>
          </div>
          <div class="select-break-length">
            <workout-select
              @updateTime="updateBreakTime"
              name="BreakTime"
              :time="breakTime"
              :options="breakOptions"
              background-color="medium"
            ></workout-select>
          </div>
        </div>

        <div v-if="!showExerciseList" class="grid-style-editor-bottom">
          <div v-if="noExercises" class="nothing-added">
            <ion-icon color="secondary" :icon="clipboardOutline"></ion-icon>
            <p></p>
            <ion-label color="secondary">Nothing added yet...</ion-label>
          </div>
          <div v-else class="list-exercises">
            <ul v-if="!showTimeSelect">
              <ion-reorder-group
                :disabled="false"
                @ionItemReorder="handleReorder($event)"
              >
                <li
                  v-for="(exercise, index) in exerciseArray"
                  :key="exercise.reorderID"
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
                              color="light"
                            ></ion-icon
                          ></ion-reorder>
                        </div>
                        <div class="label-workoutnameCard">
                          <ion-label color="light" class="center-workoutname">{{
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
          <ion-button
            class="add-button"
            shape="round"
            @click="getList"
            color="warning"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="addCircle"
            ></ion-icon
            ><ion-label class="add-label" color="secondary"
              >Add Exercises</ion-label
            ></ion-button
          >
        </div>
        <div class="time-calculate">
          <ion-icon
            class="style-time"
            size="medium"
            :icon="timeOutline"
          ></ion-icon>
          <ion-label class="style-label">{{ timePreview }} Min.</ion-label>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { Ref, computed } from "vue";
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
  alertController,
} from "@ionic/vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref } from "vue";
import {
  addCircle,
  trash,
  saveOutline,
  reorderTwoOutline,
  closeOutline,
  timeOutline,
  clipboardOutline,
  hourglassOutline,
  barbellOutline,
  settingsOutline,
} from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import ExerciseDetail from "../components/reusable/ExerciseDetail.vue";
import ExerciseList from "../components/ExerciseList.vue";
import { getMyWorkout } from "../composables/getMyWorkoutStorage";
import WorkoutStorage from "@/storage/myWorkoutStorage";
import WorkoutSelect from "./reusable/WorkoutSelect.vue";
import { Workout } from "@/models/Workout";
import { Exercise } from "@/models/Exercise";
import { ItemReorderCustomEvent } from "@ionic/vue";
import { addWorkout } from "@/services/workoutsService";
import { updateWorkout } from "@/services/workoutsService";
import { loginStore } from "@/store/authentication/loginStore";

// ...

//route
const route = useRoute();
const router = useRouter();
const page = route.params.course;
console.log("page: ");
console.log(page);

const logStore = loginStore();

//store
const store = useMyWorkoutsStore();
let list = ref();

let exerciseListStorage = ref();
let showExerciseList = ref(false);
let showTimeSelect = ref(false);
let exerciseArray: Ref<Exercise[]> = ref([]);
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
const handleReorder = (event: ItemReorderCustomEvent) => {
  exerciseArray.value = event.detail.complete(exerciseArray.value);
  proplist.value = exerciseArray.value;

  saved.value = false;
};

//GET exerciseList
async function getList() {
  showExerciseList.value = !showExerciseList.value;
  showTimeSelect.value = false;
}

function closeExerciselist() {
  showExerciseList.value = false;
}

//EXERCISE DETAIL

let propIndex = ref(0);

let showModal = ref(false);
function showDetails(index) {
  showModal.value = !showModal.value;
  propIndex.value = index;
}
function closeModal() {
  showModal.value = !showModal.value;
}

// UI
let workoutName = ref("");
let exerciseTime = ref(30);
let breakTime = ref(30);
let saved = ref(true);

let currentWorkout: Workout = {
  id: "55",
  name: workoutName.value,
  userId: logStore.getUserId() as string,
  breakTime: exerciseTime.value,
  exerciseTime: breakTime.value,
  exercises: exerciseArray.value,
  lastUpdated: new Date(),
};
let workout: Workout;

function updateExerciseTime(value) {
  exerciseTime.value = value;
  if (list.value != undefined) {
    list.value.exerciseTime = value;
  }
  saved.value = false;
  console.log(exerciseTime.value);
}

function updateBreakTime(value) {
  breakTime.value = value;
  if (list.value != undefined) {
    list.value.breakTime = value;
  }
  saved.value = false;
}

//DATA

let exerciseOptions = [20, 30, 35, 40];
let breakOptions = [0, 5, 10, 20, 30];

let timePreview = computed(() => {
  return Math.round(
    (exerciseTime.value * exerciseArray.value.length +
      (breakTime.value * exerciseArray.value.length - breakTime.value)) /
      60
  );
});

function updateExercises(exercise) {
  exerciseArray.value.push(exercise);
  proplist.value = JSON.parse(JSON.stringify(exerciseArray.value));
  saved.value = false;
}

async function removeExercise(index) {
  exerciseArray.value.splice(index, 1);
  proplist.value = JSON.parse(JSON.stringify(exerciseArray.value));
  saved.value = false;
}

function openTimeeditor() {
  showTimeSelect.value = !showTimeSelect.value;
}

async function getUIData() {
  const workout = await getMyWorkout(page);
  workoutName.value = workout.name;
  exerciseTime.value = workout.exerciseTime;
  breakTime.value = workout.breakTime;
}

async function backToWorkouts() {
  if (saved.value == false) {
    const alert = await alertController.create({
      header: "Workout speichern?",
      message: "Du hast ungespeicherte Änderungen!",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "Ja",
          cssClass: "alert-button-confirm",
          handler: () => {
            handlerMessage.value = 1;
          },
        },
        {
          text: "Nein",
          cssClass: "alert-button-cancel",
          handler: () => {
            handlerMessage.value = 0;
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();

    if (handlerMessage.value == 0) {
      router.go(-1);
      return;
    }
    SafeWorkout();
  } else {
    router.go(-1);
  }
}

//save workout handling

const handlerMessage = ref();

async function showAlert(header, message) {
  const alert = await alertController.create({
    header: header,
    message: message,
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Ok",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
    ],
  });

  await alert.present();
  await alert.onDidDismiss();
}

async function handleNewWorkout() {
  currentWorkout.exercises = JSON.parse(JSON.stringify(exerciseArray.value));
  currentWorkout.name = workoutName.value;
  currentWorkout.exerciseTime = exerciseTime.value;
  currentWorkout.breakTime = breakTime.value;

  await WorkoutStorage.setItem(workoutName.value, currentWorkout);
  console.log("currentworkout to");
  console.log(currentWorkout);
  store.addToWorkoutlist(currentWorkout);
  try {
    await addWorkout(currentWorkout);
  } catch (error) {
    console.log(error);
  }
  router.go(-1);
}

async function handleExistingWorkout() {
 

  workout = await getMyWorkout(page);
  await WorkoutStorage.removeItem(workout.name);
  workout.exercises = JSON.parse(JSON.stringify(exerciseArray.value));
  workout.name = workoutName.value;
  workout.exerciseTime = exerciseTime.value;
  workout.breakTime = breakTime.value;
  list.value.name = workoutName.value;
  await WorkoutStorage.setItem(workoutName.value, workout);
  try {
    let userid = logStore.getUserId();
    await updateWorkout(workout, userid as string);
  } catch (error) {
    console.log(error);
  }
  router.go(-1);
}

async function SafeWorkout() {
  if (workoutName.value == "") {
    await showAlert("Feher!", "Workout Name darf nicht leer sein!");
    return;
  }
  await WorkoutStorage.keys()
    .then(async function (keys) {
      if (keys.includes(workoutName.value) && found == undefined) {
        await showAlert(
          "Invalider Workout Name",
          "Es gibt bereits ein Workout mit diesem Namen"
        );
        return;
      } else {
        saved.value = true;
        if (found == undefined) {
          await handleNewWorkout();
        } else {
          await handleExistingWorkout();
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<style scoped>
.yolo {
  color: red;
}

.grid-page {
  height: 90%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 85% [row2-start];
}

.grid-top {
  grid-row: row1-start / row1-end;
  display: grid;
  background-color: var(--ion-color-secondary);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-bottom: 0.5px solid lightgray;
  grid-template-rows: [row1-start] 40% [row1-end] 60% [row2-start];
  grid-template-columns: [column1-start] 50% [column1-end] 20% [column2-start] 20% [column2-end] 10% [column3-start];
  border-radius: 0px 0px 20px 20px;
  background-color: #bce3f7;
}

.exercise-time {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: center;
}

.exercise-time ion-icon {
  color: white;
  vertical-align: middle;
  padding: 5px;
}

.exercise-time ion-label {
  color: white;
  vertical-align: text-top;
}

.break-time {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: start;
}

.break-time ion-icon {
  color: white;
  vertical-align: middle;
  padding: 5px;
}

.break-time ion-label {
  color: white;
  vertical-align: text-top;
}

.edit-time {
  grid-row: row1-end / row2-start;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: start;
}

.edit-time ion-icon {
  color: white;
  vertical-align: bottom;
}

.SafeWorkout {
  grid-row: row1-start / row1-end;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: start;
}

.SafeWorkout ion-icon {
  color: white;
  vertical-align: middle;
}

.SafeWorkout ion-icon:active {
  color: var(--ion-color-success);
}

.input-label {
  font-weight: lighter;
  color: white;
  font-weight: bold;
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
  color: white;
  caret-color: white;
}

.back-icon {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: start;
  font-size: 32px;
  padding: 2px;
  color: var(--ion-color-danger);
}

.bottom-div {
  height: 15%;
  background-color: white;
}
.grid-style-editor {
  height: 40%;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 50% [column1-end] 50% [column2-start];
}

.big-card {
  grid-row: row1-end / row2-start;
}

.grid-style-editor-bottom {
  border-radius: 25px;
  grid-row: row1-end / row2-start;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
}

.nothing-added {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
  text-align: center;
}

.nothing-added ion-icon {
  font-size: 64px;
  color: var(--ion-color-secondary);
}

.nothing-added ion-label {
  font-size: 24px;
}

.workoutname-label {
  color: var(--ion-color-primary);
  font-weight: bold;
}
.input-workoutname {
  padding: 3%;
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: start;
  background-color: #bce3f7;
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
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
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

.add-button {
  position: fixed;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
}

.add-label {
  font-weight: bold;
  font-size: 14px;
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
  height: 100%;
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
  height: 100%;
  /* font-weight: bold; */
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
  background-color: white;
  height: 100%;
}

li {
}

ion-alert.custom-alert {
  --backdrop-opacity: 0.7;
}

.custom-alert .alert-button-group {
  padding: 8px;
}

button.alert-button.alert-button-confirm {
  background-color: var(--ion-color-success);
  color: var(--ion-color-success-contrast);
}

.md button.alert-button.alert-button-confirm {
  border-radius: 4px;
}

.ios .custom-alert button.alert-button {
  border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
}

.ios button.alert-button.alert-button-cancel {
  border-right: 0;
  border-bottom-left-radius: 13px;
  border-top-left-radius: 13px;
}

.ios button.alert-button.alert-button-confirm {
  border-bottom-right-radius: 13px;
  border-top-right-radius: 13px;
}
</style>
