<template>
  <ion-page>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-exercise-list">
        <div class="close-icon">
          <ion-icon
            class="icon-cancel"
            @click="closeList"
            :icon="closeCircleOutline"
          ></ion-icon>
        </div>
        <div class="my-workouts-text">
          <p>custom workouts</p>
        </div>
        <div class="my-workouts-list">
          <ul>
            <li v-for="(workout, index) in results" :key="workout">
              <ion-card>
                <div class="card-grid">
                  <div class="workout-icon-div">
                    <ion-icon
                      class="workout-icon"
                      :icon="barbellOutline"
                    ></ion-icon>
                  </div>
                  <div class="workoutname-div">
                    <ion-label class="workoutname-label">{{
                      workout.name
                    }}</ion-label>
                  </div>
                  <div class="add-div">
                    <ion-icon
                      class="icon-add"
                      :icon="addOutline"
                      @click="addWorkout(index, workout.name)"
                    ></ion-icon>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="workouts-text">
          <p>workouts</p>
        </div>
        <div class="workouts-list">
          <ul>
            <li v-for="(workout, index) in results2" :key="workout">
              <ion-card>
                <div class="card-grid">
                  <div class="workout-icon-div">
                    <ion-icon
                      class="workout-icon"
                      :icon="barbellOutline"
                    ></ion-icon>
                  </div>
                  <div class="workoutname-div">
                    <ion-label class="workoutname-label">{{
                      workout.name
                    }}</ion-label>
                  </div>
                  <div class="add-div">
                    <ion-icon
                      class="icon-add"
                      :icon="addOutline"
                      @click="addWorkout(index, workout.name)"
                    ></ion-icon>
                  </div>
                </div>
              </ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            @click="goToWorkout"
            class="add-button"
            shape="round"
            color="warning"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="build"
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
import {
  IonCard,
  IonIcon,
  IonLabel,
  IonPage,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import {
  closeCircleOutline,
  informationCircleOutline,
  addOutline,
  barbellOutline,
  build,
} from "ionicons/icons";
import { ref, onBeforeMount } from "vue";
import { getWorkoutList } from "@/composables/getMyWorkoutList";
import { useMyPlanStore } from "../store/myPlans";
import { useRouter } from "vue-router";
import { useMyWorkoutsStore } from "@/store/myWorkouts";
import { async } from "rxjs/internal/scheduler/async";
import { useWorkoutsStore } from "@/store/workouts";

export default defineComponent({
  name: "WorkoutList",
  emits: ["closeWorkoutList"],
  components: {
    IonCard,
    IonIcon,
    IonLabel,
    IonPage,
    IonContent,
    IonButton,
  },
  setup(props, { emit }) {
    //ROUTE
    let planStore = useMyPlanStore();
    let workoutStore = useMyWorkoutsStore();
    let preWorkoutStore = useWorkoutsStore();
    let currentIndex = planStore.currentIndex;

    let workoutList: any = ref([]);
    let preWorkoutList: any = ref([]);
    let results = ref();
    let results2 = ref();
    async function init() {
      workoutList.value = [];
      workoutList.value = await getWorkoutList();
      results.value = workoutList.value;
      await preWorkoutStore.loadWorkoutsFromStore();
      console.log("workoutlist normal");
      console.log(preWorkoutStore.workoutList);
      preWorkoutList.value = preWorkoutStore.workoutList;
      results2.value = preWorkoutList.value;
      console.log(results2);

      proplist.value = results.value;
    }

    onBeforeMount(() => init());

    workoutStore.$subscribe(
      (mutation, state) => {
        console.log("a change happened in workoutstore");
        console.log(mutation, state);
        workoutList.value = state.workoutList;
        results.value = workoutList.value;
        proplist.value = results.value;
      },
      { detached: true }
    );

    let proplist = ref();
    let propIndex = ref(0);
    let showModal = ref(false);
    //ADD AND DELETE ITEMS
    let router = useRouter();

    function closeList() {
      router.go(-1);
    }

    async function addWorkout(index, workoutname) {
      await planStore.workoutToArray(currentIndex, workoutname);
      router.go(-1);
    }
    let routeID;
    function goToWorkout() {
      routeID = Math.floor(Math.random() * 1000);
      router.push("/myworkouts/editor/" + routeID);
    }

    //value for CSS animation

    return {
      props,
      closeCircleOutline,
      results,
      results2,
      proplist,
      propIndex,
      showModal,
      informationCircleOutline,
      closeList,
      addOutline,
      addWorkout,
      barbellOutline,
      build,
      goToWorkout,
    };
  },
});
</script>

<style scoped>
ion-card {
  height: 100%;
}

ion-label {
  font-weight: bold;
}

p {
  font-weight: bold;
  color: black;
  margin-left: 2.5%;
}

.grid-exercise-list {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 5% [row1-end] 5% [row2-start] 42.5% [row2-end] 5% [row3-start] 42.5% [row3-end];
  grid-template-columns: [column1-start] 85% [column1-end] 15% [column2-start];
}

.create-workout-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.create-workout-button {
}

.my-workouts-text {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column2-start;
}

.my-workouts-list {
  background-color: var(--ion-color-tertiary);
  grid-row: row2-start / row2-end;
  grid-column: column1-start / column2-start;
}

.workouts-text {
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column2-start;
}

.workouts-list {
  grid-row: row3-start / row3-end;
  grid-column: column1-start / column2-start;
}

.close-icon {
  grid-row: row1-start / row2-start;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: start;
}

.explain-label-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.explain-label {
  color: var(--ion-color-light);
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
  margin-top: 0px;
  animation: list-in 0.5s ease-out forwards;
}

li {
  height: 15%;
}

@keyframes list-in {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

ion-card {
  background-color: #bce3f7;
}

.icon-add {
  font-size: 36px;
  vertical-align: text-bottom;
  color: white;
}

.addAnimation:active {
  border: 3px solid var(--ion-color-success);
}

.icon-cancel {
  font-size: 36px;
  color: var(--ion-color-danger);
  vertical-align: text-bottom;
}

.explain-text {
  grid-row: row1-start / row1-end;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  justify-self: start;
  color: var(--ion-color-primary);
}

.card-grid {
  height: 100%;
  display: grid;
  grid-template-columns: [column1-start] 30% [column1-end]50% [column2-start] 20% [column2-end];
  grid-template-rows: [row1-start] 100% [row1-end];
}

.workout-icon-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.workout-icon {
  color: white;
  font-size: 48px;
}

.workoutname-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: start;
}

.workoutname-label {
  color: white;
  font-size: larger;
}

.add-div {
  grid-column: column2-start / column2-end;
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: start;
}

.add-div:active {
  color: var(--ion-color-success);
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
