import { Storage } from "@ionic/storage";
import { getExercise } from "./getExerciseStorage";
const ExerciseStorage = new Storage();
ExerciseStorage.create();

//Exercises

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
let breakExercise;

async function loadAll() {
  await ExerciseStorage.set("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.png",
    difficulty: 3,
    description: "Put your elbows on the ground and blablablabla",
  });
  plank = await getExercise("Plank");

  await ExerciseStorage.set("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.png",
    difficulty: 3,
    description: "Put your body to your belly lalalala",
  });
  crunch = await getExercise("Crunch");

  await ExerciseStorage.set("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  grabToe = await getExercise("Grab-Toe");

  await ExerciseStorage.set("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  hold = await getExercise("Hold");

  await ExerciseStorage.set("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  mountainClimber = await getExercise("Mountain Climber");

  await ExerciseStorage.set("Push-Up", {
    name: "Push-Up",
    img: "@/assets/exercises/Push-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  pushUp = await getExercise("Push-Up");

  await ExerciseStorage.set("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  russianTwist = await getExercise("Russian Twist");

  await ExerciseStorage.set("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  sidePlank = await getExercise("Side-Plank");

  await ExerciseStorage.set("Leg Lower", {
    name: "Leg Lower",
    img: "@/assets/exercises/Leg Lower.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  legLower = await getExercise("Leg Lower");

  await ExerciseStorage.set("V-Up", {
    name: "V-Up",
    img: "@/assets/exercises/V-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  VUp = await getExercise("V-Up");

  await ExerciseStorage.set("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Leg Lower.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  reverseCrunch = await getExercise("Reverse Crunch");

  await ExerciseStorage.set("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  heelTaps = await getExercise("Heel Taps");

  await ExerciseStorage.set("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.png",
    difficulty: 3,
    description: "blablablablablabla",
  });
  bicycle = await getExercise("Bicycle");

  await ExerciseStorage.set("Break", {
    name: "Break",
    img: "@/assets/exercises/Break.png",
    difficulty: 3,
    description: "Just relax a little bit :)",
  });
  breakExercise = await getExercise("Break");

  ExerciseStorage.set("beginner", {name: "beginner", breakTime: 30, exerciseTime: 30,exercises: [
    plank,
    russianTwist,
    crunch,
    hold,
    mountainClimber,
    hold,
    plank,
    sidePlank,
  ],});
  ExerciseStorage.set("advanced", {name: "advanced", breakTime: 20, exerciseTime: 30,exercises: [
    sidePlank,
    russianTwist,
    crunch,
    hold,
    mountainClimber,
    hold,
    plank,
    sidePlank,
    hold,
    crunch,
  ],});
  ExerciseStorage.set("champ", {name: "champ", breakTime: 10, exerciseTime: 40,exercises: [
    pushUp,
    russianTwist,
    crunch,
    hold,
    mountainClimber,
    hold,
    plank,
    sidePlank,
    crunch,
    mountainClimber,
    plank,
    sidePlank
  ],});


}

loadAll();

//workouts

export default ExerciseStorage;
