import localForage from "localforage";
import { defaultExercises } from "@/data/defaultExercises";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

async function loadAll() {
  for (const exercise of defaultExercises) {
    await ExerciseStorage.setItem(exercise.name, exercise);
  }

  //await ExerciseStorage.clear();
}

loadAll();

//workouts

export default ExerciseStorage;
