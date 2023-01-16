<template>
  <div class="grid-exercise-list">
    <div class="explain-text">
      <ion-title>Add Exercises to your Workout!</ion-title>
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
          <ion-card @click="addExercises(index)">
            <ion-card-content> {{ exercise.name }}</ion-card-content>
          </ion-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonIcon, IonSearchbar } from "@ionic/vue";
import { useRoute } from "vue-router";
import { closeCircleOutline } from "ionicons/icons";
import { ref, onBeforeMount } from "vue";
import { getExerciseList } from "../composables/getExerciseList";

export default defineComponent({
  name: "ExerciseList",
  props: ["exerciseListStorage", "index", "workoutName", "currentWorkout"],
  emits: ["updateExercises", "closeExerciselist"],
  components: {
    IonCard,
    IonCardContent,
    IonIcon,
    IonSearchbar,
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
      console.log("result list:")
      console.log(results.value);
      proplist.value = results.value;
    }

    let exercise;

    onBeforeMount(() => init());

    let proplist = ref();

    //ADD AND DELETE ITEMS

    function addExercises(index) {
      console.log("addExercises function!");
      exerciseList = JSON.parse(JSON.stringify(results.value));
      console.log(exerciseList);
      exercise = exerciseList[index];
      exercise.reorderID = Date.now();
      console.log(exercise);
      emit("updateExercises", exercise);
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
    };
  },
});
</script>

<style scoped>
ion-card {
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

ion-card:active {
  background-color: var(--ion-color-success);
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
}

ion-icon {
  font-size: 42px;
  color: var(--ion-color-danger);
}

.explain-text {
  grid-row: row1-start / row1-end;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  justify-self: start;
  color: var(--ion-color-primary);
}
ion-title {
}
</style>
