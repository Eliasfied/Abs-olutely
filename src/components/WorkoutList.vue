<template>
  <ion-page>
    <ion-content>
      <div class="grid-exercise-list">
        <div class="close-icon">
          <ion-icon
            class="icon-cancel"
            @click="closeList"
            :icon="closeCircleOutline"
          ></ion-icon>
        </div>
        <div class="exercise-list">
          <ul>
            <li v-for="(workout, index) in results" :key="workout">
              <ion-card>
                <div class="card-grid">
                  <div class="info-div">
                    <ion-icon
                      class="icon-info"
                      :icon="informationCircleOutline"
                    ></ion-icon>
                  </div>
                  <div class="add-div">
                    <ion-icon
                      class="icon-add"
                      :icon="addOutline"
                      @click="addWorkout(index, workout.name)"
                    ></ion-icon>
                  </div>
                  <div class="title-div">
                    <ion-label> {{ workout.name }}</ion-label>
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
  IonSearchbar,
  IonLabel,
  IonPage,
  IonContent,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import {
  closeCircleOutline,
  informationCircleOutline,
  addOutline,
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
      console.log("exerciseList:");
      console.log(workoutList);
      results.value = workoutList;
      console.log("result list:");
      console.log(results.value);
      proplist.value = results.value;
    }

    onBeforeMount(() => init());

    let proplist = ref();
    let propIndex = ref(0);
    let showModal = ref(false);
    //ADD AND DELETE ITEMS
    let router = useRouter();

    function closeList() {
      router.go(-1);
    }

    async function addWorkout(index, workoutname) {
      console.log("in addWorkout");
      await planStore.workoutToArray(currentIndex, workoutname);
      router.go(-1);
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

.grid-exercise-list {
  height: 100%;
  display: grid;
  background-color: white;
  grid-template-rows: [row1-start] 10% [row1-end] 90% [row2-start];
  grid-template-columns: [column1-start] 85% [column1-end] 15% [column2-start];
}

.exercise-list {
  background-color: var(--ion-color-tertiary);
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column2-start;
}

.searchbar-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.close-icon {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: center;
  justify-self: start;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
  margin-top: 0px;
  border-top: 1px solid grey;
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

.icon-info {
  font-size: 28px;
  vertical-align: text-bottom;
  color: orange;
}

.icon-add {
  font-size: 36px;
  vertical-align: text-bottom;
  color: lightskyblue;
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
  grid-template-columns: [column0-start] 10% [column1-start]60% [column1-end] 30% [column2-start];
  grid-template-rows: [row1-start] 100% [row1-end];
}

.title-div {
  color: black !important;
  grid-column: column1-start / column1-end;
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: start;
  font-size: large;
}

.info-div {
  grid-column: column0-start / column1-start;
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: center;
}

.add-div {
  grid-column: column1-start / column1-end;
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: end;
}

.add-div:active {
  color: var(--ion-color-success);
}

.img-div {
  grid-column: column1-end / column2-start;
  grid-row: row1-start / row1-end;
}
.exercise-img {
  height: 100%;
  width: 100%;
}

.alignCard {
  position: fixed;
  height: 40%;
  bottom: 25%;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}

ion-searchbar {
}

/* .v-enter-from {
    opacity: 0;
    transform: translateY(-150px);
  }
  
  .v-enter-active {
    transition: all 1.3s ease-out;
  }
  
  .v-enter-to {
    opacity: 1;
    transform: translateY(0);
  } */
</style>
