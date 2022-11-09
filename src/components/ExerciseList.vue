<template>
  <ion-card>
    <ul>
      <li
        v-for="(exercise, index) in props.exerciseListStorage"
        :key="exercise"
      >
        <ion-card @click="addExercise(index)">
          <ion-card-content> {{ exercise.name }}</ion-card-content>
        </ion-card>
      </li>
    </ul>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonCardContent } from "@ionic/vue";
import { useRoute } from "vue-router";
import WorkoutStorage from "@/storage/myWorkoutStorage";
import { getMyWorkout } from "../storage/getMyWorkoutStorage";
import { ref } from "vue";

export default defineComponent({
  name: "ExerciseList",
  props: ["exerciseListStorage", "index", "workoutName", "currentWorkout"],
  emits: ["updateExercises"],
  components: {
    IonCard,
    IonCardContent,
  },
  setup(props, { emit }) {
    //ROUTE
    const route = useRoute();
    const page = route.params.course.toString();
    console.log(page);
    let workout;
    let exerciseList;
    let workoutName;

    //ADD AND DELETE ITEMS
    async function addExercise(index) {
      // console.log("props.workoutname: ");
      // console.log(props.workoutName);
      // console.log("props.currentWorkout: ");
      // console.log(props.currentWorkout);
      console.log(page);
      if (page != "new") {
        workout = await getMyWorkout(page);
        workoutName = page;
        console.log(workout);
      } else {
        workoutName = JSON.parse(JSON.stringify(props.currentWorkout.name));
        console.log("test1");
        console.log(workoutName);
        workout = JSON.parse(JSON.stringify(props.currentWorkout));
        console.log("test2");
        console.log(workout);
      }
      exerciseList = JSON.parse(JSON.stringify(props.exerciseListStorage));
      workout.exercises.push(exerciseList[index]);
      console.log("test3");
      console.log(workout);
      await WorkoutStorage.setItem(workoutName, workout);
      emit("updateExercises", workout.exercises);
    }

    return { props, addExercise };
  },
});
</script>

<style scoped>
ion-card {
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  height: 95%;
  margin-bottom: 0px;
}
</style>
