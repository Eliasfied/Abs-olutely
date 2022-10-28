import ExerciseStorage from "./ExerciseStorage";
let data = "";
export async function getWorkout(workout) {
  await ExerciseStorage.get(workout).then((result) => {
    data = result;
  });

  console.log("okayletsgo");
  console.log(data);

  return data;
}
