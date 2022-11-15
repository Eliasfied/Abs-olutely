import myWorkoutStorage from "../storage/myWorkoutStorage";
let data;
export async function getMyWorkout(workout) {
  await myWorkoutStorage.getItem(workout).then((result) => {
    data = result;
  });

  return data;
}
