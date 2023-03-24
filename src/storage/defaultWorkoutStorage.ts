import localForage from "localforage";
import { getExercise } from "../composables/getExerciseStorage";
const defaultWorkouts = localForage.createInstance({ name: "defaultWorkouts" });
let plank;
let hold;
let crunch;
let grabToe;
let mountainClimber;
let russianTwist;
let sidePlank;
let VUp;
let reverseCrunch;
let heelTaps;
let bicycle;
let breakExercise;
async function loadAll() {

 // await defaultWorkouts.clear();
  

  plank = await getExercise("Plank");
  hold = await getExercise("Hold");
  crunch = await getExercise("Crunch");
  grabToe = await getExercise("Grab-Toe");
  mountainClimber = await getExercise("Mountain Climber");
  russianTwist = await getExercise("Russian Twist");
  sidePlank = await getExercise("Side-Plank");
  VUp = await getExercise("V-Up");
  reverseCrunch = await getExercise("Reverse Crunch");
  heelTaps = await getExercise("Heel Taps");
  bicycle = await getExercise("Bicycle");
  breakExercise = await getExercise("Break");


  await defaultWorkouts.setItem("beginner", {
    name: "beginner",
    breakTime: 30,
    exerciseTime: 30,
    exercises: [
      crunch,
      hold,
      grabToe,
      sidePlank,
      sidePlank,
      plank,
      crunch,
      grabToe,
    ],
  });
  await defaultWorkouts.setItem("advanced", {
    name: "advanced",
    breakTime: 20,
    exerciseTime: 30,
    exercises: [
      crunch,
      hold,
      grabToe,
      russianTwist,
      crunch,
      hold,
      grabToe,
      russianTwist,
      sidePlank,
      sidePlank,
      plank,
    ],
  });
  await defaultWorkouts.setItem("champ", {
    name: "champ",
    breakTime: 10,
    exerciseTime: 40,
    exercises: [
      crunch,
      heelTaps,
      hold,
      bicycle,
      plank,
      crunch,
      heelTaps,
      hold,
      bicycle,
      plank,
      sidePlank,
      sidePlank,
      russianTwist,
      hold,
    ],
  });
}
loadAll();

//workouts

export default defaultWorkouts;
