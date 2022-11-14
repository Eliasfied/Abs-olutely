<template>
  <ion-card>
    <div class="grid-exercise-list">
      <div class="explain-text">
        <span>Add Exercises to your Workout!</span>
      </div>
      <div class="close-icon"><ion-icon @click="$emit('closeExerciselist')" :icon="closeCircleOutline"></ion-icon></div>
      <div class="exercise-list">
        <ul>
          <li
            v-for="(exercise, index) in props.exerciseListStorage"
            :key="exercise"
          >
            <ion-card @click="addExercises(index)">
              <ion-card-content> {{ exercise.name }}</ion-card-content>
            </ion-card>
          </li>
        </ul>
      </div>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonIcon } from "@ionic/vue";
import { useRoute } from "vue-router";
import { closeCircleOutline } from "ionicons/icons";


export default defineComponent({
  name: "ExerciseList",
  props: ["exerciseListStorage", "index", "workoutName", "currentWorkout"],
  emits: ["updateExercises", "closeExerciselist"],
  components: {
    IonCard,
    IonCardContent,
    IonIcon,
  },
  setup(props, { emit }) {
    //ROUTE
    const route = useRoute();
    const page = route.params.course.toString();
    console.log(page);
    let exerciseList;

    let exercise;

    //ADD AND DELETE ITEMS

    function addExercises(index) {
      console.log("addExercises function!");
      exerciseList = JSON.parse(JSON.stringify(props.exerciseListStorage));
      console.log(exerciseList);
      exercise = exerciseList[index];
      emit("updateExercises", exercise);
    }

    

    return { props, addExercises, closeCircleOutline };
  },
});
</script>

<style scoped>


ion-card {
  height: 100%;
  border: 3px solid grey;
}

.grid-exercise-list {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 85% [column1-end] 15% [column2-start];
}

.exercise-list {
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
  font-size: 15px;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  color: var(--ion-color-secondary);
}
</style>
