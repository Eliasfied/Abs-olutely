import ExerciseStorage from "./ExerciseStorage";
let data = "";

export async function getExercise(exercise) {
  await ExerciseStorage.get(exercise).then((result) => {
    data = result;
  });

  return data;
}
