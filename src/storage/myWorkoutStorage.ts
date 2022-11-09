import localForage from "localforage";
import { getExercise } from "./getExerciseStorage";
const WorkoutStorage = localForage.createInstance({ name: "myWorkouts" });
let plank;
let hold;
let crunch;
let grabToe;
let mountainClimber;
let pushUp;
let russianTwist;
let sidePlank;
let legLower;
let VUp;
let reverseCrunch;
let heelTaps;
let bicycle;

async function loadAll() {
  plank = await getExercise("Plank");
  hold = await getExercise("Hold");
  crunch = await getExercise("Crunch");
  grabToe = await getExercise("Grab-Toe");
  mountainClimber = await getExercise("Mountain Climber");
  pushUp = await getExercise("Push-Up");
  russianTwist = await getExercise("Russian Twist");
  sidePlank = await getExercise("Side-Plank");
  legLower = await getExercise("Leg Lower");
  VUp = await getExercise("V-Up");
  reverseCrunch = await getExercise("Reverse Crunch");
  heelTaps = await getExercise("Heel Taps");
  bicycle = await getExercise("Bicycle");

  //  await WorkoutStorage.clear();
  // await WorkoutStorage.setItem("test1", {
  //   name: "test1",
  //   breakTime: 30,
  //   exerciseTime: 30,
  //   exercises: [
  //     hold,
  //     crunch,
  //     hold,
  //     sidePlank,
  //     sidePlank,
  //     grabToe,
  //     russianTwist,
  //     crunch,
  //     hold,
  //     grabToe,
  //     russianTwist,
  //     plank,
  //   ],
  // });
  // await WorkoutStorage.setItem("test2", {
  //   name: "test2",
  //   breakTime: 20,
  //   exerciseTime: 40,
  //   exercises: [sidePlank, sidePlank, hold, plank, crunch, crunch],
  // });
}
loadAll();

//workouts

export default WorkoutStorage;
