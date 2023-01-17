<template>
  <div class="grid-exercise-list">
    <div class="searchbar-div">
      <ion-searchbar
        :debounce="500"
        @ionChange="handleChange($event)"
      ></ion-searchbar>
    </div>
    <div class="close-icon">
      <ion-icon
        @click="$emit('closeExerciselist')"
        :icon="closeCircleOutline"
      ></ion-icon>
    </div>
    <div class="exercise-list">
      <ul>
        <li v-for="(exercise, index) in results" :key="exercise">
          <ion-card>
            <div class="card-grid">
              <div class="info-div">
                <ion-icon
                  @click="showDetails(index)"
                  :icon="informationCircleOutline"
                ></ion-icon>
              </div>
              <div class="add-div">
                <ion-icon
                  @click="addExercises(index)"
                  :icon="addOutline"
                ></ion-icon>
              </div>
              <div class="title-div">
                <ion-label>{{ exercise.name }}</ion-label>
              </div>
              <div class="img-div">
                <img class="exercise-img" :src="getExerciseURL(index)" alt="" />
              </div>
            </div>
          </ion-card>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonIcon, IonSearchbar } from "@ionic/vue";
import { useRoute } from "vue-router";
import {
  closeCircleOutline,
  informationCircleOutline,
  addOutline,
} from "ionicons/icons";
import { ref, onBeforeMount } from "vue";
import { getExerciseList } from "../composables/getExerciseList";
import ExerciseDetail from "./reusable/ExerciseDetail.vue";

export default defineComponent({
  name: "ExerciseList",
  props: ["exerciseListStorage", "index", "workoutName", "currentWorkout"],
  emits: ["updateExercises", "closeExerciselist"],
  components: {
    IonCard,
    IonIcon,
    IonSearchbar,
    ExerciseDetail,
  },
  setup(props, { emit }) {
    //ROUTE
    const route = useRoute();
    const page = route.params.course.toString();
    console.log(page);
    let exerciseList: any[] = [];
    let results = ref();
    async function init() {
      exerciseList = await getExerciseList();
      console.log("exerciseList:");
      console.log(exerciseList);
      results.value = exerciseList;
      console.log("result list:");
      console.log(results.value);
      proplist.value = results.value;
    }

    let exercise;

    onBeforeMount(() => init());

    let proplist = ref();
    let propIndex = ref(0);
    let showModal = ref(false);
    //ADD AND DELETE ITEMS

    function showDetails(index) {
      console.log("showdetails!");
      console.log(index);
      showModal.value = !showModal.value;
      propIndex.value = index;
    }
    function closeModal() {
      showModal.value = !showModal.value;
    }

    function addExercises(index) {
      console.log("addExercises function!");
      exerciseList = JSON.parse(JSON.stringify(results.value));
      console.log(exerciseList);
      exercise = exerciseList[index];
      exercise.reorderID = Date.now();
      console.log(exercise);
      emit("updateExercises", exercise);
    }

    function getExerciseURL(index) {
      return require("../assets/exercises/" +
        results.value[index].name +
        ".png");
    }

    function handleChange(event) {
      const query = event.target.value.toLowerCase();
      results.value = exerciseList.filter(
        (d) => d.name.toLowerCase().indexOf(query) > -1
      );
      proplist.value = results.value;
    }

    return {
      props,
      addExercises,
      closeCircleOutline,
      handleChange,
      results,
      proplist,
      propIndex,
      showModal,
      getExerciseURL,
      informationCircleOutline,
      showDetails,
      closeModal,
      addOutline,
    };
  },
});
</script>

<style scoped>
ion-card {
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
  justify-self: center;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
  margin-top: 0px;
}

ion-icon {
  font-size: 42px;
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
}

.title-div {
  color: black !important;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: start;
  font-size: large;
}

.info-div {
  grid-column: column0-start / column1-start;
  align-self: center;
  justify-self: start;
}

.add-div {
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: end;
}

.add-div:active {
  color: var(--ion-color-success);
}

.img-div {
  grid-column: column1-end / column2-start;
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
</style>
