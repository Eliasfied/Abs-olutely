import localForage from "localforage";
import { getExercise } from "../composables/getExerciseStorage";
import { h } from "ionicons/dist/types/stencil-public-runtime";
import { defaultWorkouts as workouts } from "@/data/defaultWorkouts";
const defaultWorkouts = localForage.createInstance({ name: "defaultWorkouts" });

async function loadAll() {
  for (const workout of workouts) {
    const exercises = await Promise.all(workout.exercises.map(getExercise));
    console.log("das sind die exercises");
    console.log(exercises);

    await defaultWorkouts.setItem(workout.id, {
      ...workout,
      exercises,
    });
  }
  console.log("das sind die defaultworkouts");
  console.log(workouts);

  //await defaultWorkouts.clear();
}
loadAll();

export default defaultWorkouts;
