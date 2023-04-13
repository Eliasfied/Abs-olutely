import localForage from "localforage";
import { getExercise } from "../composables/getExerciseStorage";
import { h } from "ionicons/dist/types/stencil-public-runtime";
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
let pulsUps;
let scissors;
let KneeToAbs;
let crossCrunches;
async function loadAll() {

 // await defaultWorkouts.clear();
  

  plank = await getExercise("Plank");
  crunch = await getExercise("Crunch");
  grabToe = await getExercise("Grab-Toe");
  hold = await getExercise("Hold");
  mountainClimber = await getExercise("Mountain Climber");
  pulsUps = await getExercise("Puls Ups");
  russianTwist = await getExercise("Russian Twist");
  sidePlank = await getExercise("Side-Plank");
  VUp = await getExercise("V-Up");
  reverseCrunch = await getExercise("Reverse Crunch");
  heelTaps = await getExercise("Heel Taps");
  bicycle = await getExercise("Bicycle");
  scissors = await getExercise("Scissors");
  KneeToAbs = await getExercise("Knee to Abs");
  crossCrunches = await getExercise("Cross Crunches");

  await defaultWorkouts.setItem("beginner", {
    name: "beginner",
    breakTime: 30,
    exerciseTime: 20,
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
    breakTime: 30,
    exerciseTime: 30,
    exercises: [
      crunch,
      sidePlank,
      sidePlank,
      scissors,
      crunch,
      heelTaps,
      scissors,
      crunch,
      heelTaps,
      plank,
    ],
  });
  await defaultWorkouts.setItem("professional", {
    name: "professional",
    breakTime: 20,
    exerciseTime: 30,
    exercises: [
      crunch,
      sidePlank,
      sidePlank,
      scissors,
      crunch,
      russianTwist,
      scissors,
      crossCrunches,
      russianTwist,
      plank,
      KneeToAbs,
      VUp,
    ],
  });
  await defaultWorkouts.setItem("champ", {
    name: "champ",
    breakTime: 10,
    exerciseTime: 40,
    exercises: [
      crunch,
      russianTwist,
      KneeToAbs,
      hold,
      crunch,
      russianTwist,
      KneeToAbs,
      scissors,
      crunch,
      russianTwist,
      KneeToAbs,
      VUp,
    ],
  });
}
loadAll();

//workouts

export default defaultWorkouts;
