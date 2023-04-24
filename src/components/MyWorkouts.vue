<template>
  <ion-page>
    <the-footer title="personalisierte Workouts"></the-footer>
    <ion-content color="tertiary" :fullscreen="true">
      <div class="grid-style-workouts">
        <div class="quickstart-text-div"><p>personalisierte Workouts</p></div>
        <div class="workout-list">
          <div v-if="isEmpty" class="no-workouts-text">
            <p>keine Workouts hinzugefügt...</p>
          </div>
          <ul>
            <li v-for="(workout, index) in workouts" :key="workout.name">
              <router-link class="routerLink" :to="'/preview/' + workout.name">
                <ion-card>
                  <div class="grid-style-li">
                    <div class="workout-icon">
                      <ion-icon
                        class="add-icon"
                        :icon="barbellOutline"
                      ></ion-icon>
                    </div>
                    <div class="label-workoutname">
                      <ion-label>{{ workout.name }}</ion-label>
                    </div>
                    <div class="workout-time">
                      <ion-icon
                        class="style-time"
                        :icon="timeOutline"
                      ></ion-icon>
                      <ion-label class="style-label">
                        {{ getWorkoutLength(index) }} Min.</ion-label
                      >
                    </div>
                    <div class="exercise-time">
                      <ion-icon :icon="barbellOutline"></ion-icon>
                      <ion-label>{{ workout.exerciseTime }}s</ion-label>
                    </div>
                    <div class="break-time">
                      <ion-icon :icon="cafe"></ion-icon>
                      <ion-label>{{ workout.breakTime }}s</ion-label>
                    </div>
                    <div class="icon-edit">
                      <router-link
                        :to="'/myworkouts/editor/' + workouts[index].name"
                        ><ion-icon :icon="create"></ion-icon
                      ></router-link>
                    </div>
                    <div class="icon-trash">
                      <ion-icon
                        @click.prevent="removeWorkout(index)"
                        class="icon-color-trash"
                        :icon="trash"
                      ></ion-icon>
                    </div>
                  </div>
                </ion-card>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            @click="newWorkout"
            class="add-button"
            shape="round"
            color="warning"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="addCircle"
            ></ion-icon
            ><ion-label color="secondary">Add Workout</ion-label></ion-button
          >
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonCard,
  IonIcon,
  IonFooter,
  IonLabel,
  alertController,
} from "@ionic/vue";
import {
  addCircle,
  clipboardOutline,
  create,
  trash,
  clipboard,
  hourglassOutline,
  barbellOutline,
  timeOutline,
  receiptOutline,
  bodyOutline,
  cafeOutline,
  cafe,
} from "ionicons/icons";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { ref, watch } from "vue";
import myWorkoutStorage from "../storage/myWorkoutStorage";
export default defineComponent({
  name: "MyWorkouts",
  components: {
    TheFooter,
    IonPage,
    IonContent,
    IonCard,
    IonIcon,
    IonFooter,
    IonLabel,
  },
  setup() {
    // STORE DATA

    let workouts: any = ref([]);
    let isEmpty = ref(true);
    let timePreview = ref();
    let workoutLength = ref();

    watch(
      workouts.value.length,
      () => {
        console.log("geht in watcher rein");
        if (workouts.value.length > 0) {
          isEmpty.value = false;
        } else {
          isEmpty.value = true;
        }
      },
      { deep: true, immediate: true }
    );
    let store;
    async function loadStore() {
      store = useMyWorkoutsStore();
      await store.loadWorkoutsFromStore();
      workouts.value = store.workoutList;

      if (workouts.value.length > 0) {
        isEmpty.value = false;
      }
    }
    loadStore();
    console.log("workouts final: ");
    console.log(workouts);

    function getWorkoutLength(index) {
      return Math.round(
        (workouts.value[index].exerciseTime *
          workouts.value[index].exercises.length +
          (workouts.value[index].breakTime *
            workouts.value[index].exercises.length -
            workouts.value[index].breakTime)) /
          60
      );
    }

    const handlerMessage = ref();
    async function removeWorkout(index) {
      const alert = await alertController.create({
        header: "delete workout?",
        message: "this cant be undone",
        cssClass: "custom-alert",
        buttons: [
          {
            text: "Yes",
            cssClass: "alert-button-confirm",
            handler: () => {
              handlerMessage.value = 1;
            },
          },
          {
            text: "No",
            cssClass: "alert-button-cancel",
            handler: () => {
              handlerMessage.value = 0;
            },
          },
        ],
      });

      await alert.present();
      await alert.onDidDismiss();

      if (handlerMessage.value == 1) {
        await myWorkoutStorage.removeItem(workouts.value[index].name);
        workouts.value.splice(index, 1);
      }
      if (handlerMessage.value == 0) {
        return;
      }
    }

    //routing
    const router = useRouter();
    let routeID;
    function newWorkout() {
      routeID = Math.floor(Math.random() * 1000);
      router.push("/myworkouts/editor/" + routeID);
    }

    store.$subscribe(
      (mutation, state) => {
        console.log("a change happened in myWorkouts");
        console.log(mutation, state);
        workouts.value = state.workoutList;
      },
      { detached: true }
    );

    return {
      addCircle,
      clipboardOutline,
      create,
      trash,
      clipboard,
      workouts,
      removeWorkout,
      isEmpty,
      newWorkout,
      hourglassOutline,
      barbellOutline,
      timeOutline,
      workoutLength,
      timePreview,
      getWorkoutLength,
      receiptOutline,
      bodyOutline,
      cafeOutline,
      cafe,
    };
  },
});
</script>

<style scoped>
.grid-style-workouts {
  display: grid;
  height: 97.5%;
  grid-template-rows: [row1-start] 5% [row1-end] 95% [row2-start];
}

.grid-style-li {
  display: grid;
  height: 100%;
  grid-template-rows: [row1-start] 50% [row1-end] 50% [row2-start];
  grid-template-columns: [column1-start] 25% [column1-end] 40% [column2-start] 17.5% [column2-end] 17.5% [column3-start];
}

.quickstart-text-div {
  width: 100%;
  grid-row: row1-start / row1-end;
}

p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}

.workout-icon {
  grid-row: row1-start / row2-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.add-icon {
  font-size: 64px;
  color: white;
}

.label-workoutname {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: end;
  justify-self: start;
  padding: 5%;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 18px;
}

.workout-time {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: start;
  justify-self: start;
  padding: 5%;
}

.icon-edit {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.icon-trash {
  grid-row: row1-end / row2-start;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.icon-color-trash {
  color: red;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: white;
}

.style-label {
  vertical-align: text-top;
  color: white;
}

.exercise-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.break-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
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

.break-time ion-icon {
  color: white;
  vertical-align: middle;
}

.break-time ion-label {
  color: white;
  vertical-align: middle;
}

ion-button {
  font-weight: bold;
  color: var(--ion-color-primary);
}

ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
  vertical-align: middle;
}

li {
  width: 100%;
  height: 17.5%;
}

ul {
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
}

ion-card {
  height: 100%;
  background-color: #bce3f7;
}

ion-label {
  color: white;
}

.add-workout {
  width: 100%;
  grid-row: row1-start / row1-end;
  justify-self: center;
  align-self: center;
  text-align: center;
}

.workout-list {
  width: 100%;
  grid-row: row1-end / row2-start;
}

.no-workouts-text {
  grid-row: row1-end / row2-start;
  text-align: center;
}

.ion-card-content {
  color: var(--ion-color-primary);
  font-size: medium;
  font-weight: bold;
}

.routerLink {
  height: 100%;
  text-decoration: none;
}

.icon-clipboard {
  align-self: center;
}

.style-clipboard {
  color: var(--ion-color-primary);
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
  color: #dbbfdd;
  width: 50%;
}
</style>
