<template>
  <ion-page>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-exercise-list">
        <div class="create-workout-div">
          <ion-button @click="goToWorkout()" class="create-workout-button" color="warning" shape="round">
            <ion-icon color="secondary" :icon="build"></ion-icon>
            <ion-label color="secondary">add workout</ion-label>
          </ion-button>
        </div>
        <div class="close-icon">
          <ion-icon
            class="icon-cancel"
            @click="closeList"
            :icon="closeCircleOutline"
          ></ion-icon>
        </div>
        <div class="my-workouts-text">
          <p>my Workouts</p>
        </div>
        <div class="exercise-list">
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
      </div>
    </ion-content>
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

export default defineComponent({
  name: "WorkoutList",
  emits: ["closeWorkoutList"],
  components: {
    IonCard,
    IonIcon,
    IonLabel,
    IonPage,
    IonContent,
    IonButton
  },
  setup(props, { emit }) {
    //ROUTE
    let planStore = useMyPlanStore();
    let currentIndex = planStore.currentIndex;

    let workoutList: any[] = [];
    let results = ref();
    async function init() {
      workoutList = [];
      workoutList = await getWorkoutList();
      results.value = workoutList;
      proplist.value = results.value;
    }

    onBeforeMount(() => init());


    // planStore.$subscribe(
    //   (mutation, state) => {
    //     console.log("a change happened");
    //     console.log(mutation, state);
    //     plans.value = state.planList;
    //   },
    //   { detached: true }
    // );

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
      proplist,
      propIndex,
      showModal,
      informationCircleOutline,
      closeList,
      addOutline,
      addWorkout,
      barbellOutline,
      build,
      goToWorkout
    };
  },
});
</script>

<style scoped>
ion-card {
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
  grid-template-rows: [row1-start] 5% [row1-end] 5% [row2-start] 85% [row2-end];
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

.exercise-list {
  background-color: var(--ion-color-tertiary);
  grid-row: row2-start / row2-end;
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
  font-size: xx-large;
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
</style>
