import localForage from "localforage";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

//Exercises

async function loadAll() {

  await ExerciseStorage.setItem("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.png",
    difficulty: 3,
    description: "Put your elbows on the ground and blablablabla",
    muscleGroup: "core",
  });

  await ExerciseStorage.setItem("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.png",
    difficulty: 3,
    description: "Put your body to your belly lalalala",
    muscleGroup: "upper-abs",
  });

  await ExerciseStorage.setItem("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",

  });

  await ExerciseStorage.setItem("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",
    reorderID: 0,


  });

  await ExerciseStorage.setItem("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Push-Up", {
    name: "Push-Up",
    img: "@/assets/exercises/Push-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs"

  });

  await ExerciseStorage.setItem("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.png",
    difficulty: 3,
    description: ",gspdfkposdkfs-abs",
    muscleGroup: "side-abs",
    reorderID: 0,


  });

  await ExerciseStorage.setItem("Leg Lower", {
    name: "Leg Lower",
    img: "@/assets/exercises/Leg Lower.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs",
    reorderID: 0,


  });

  await ExerciseStorage.setItem("V-Up", {
    name: "V-Up",
    img: "@/assets/exercises/V-Up.png",
    difficulty: 3,
    description: "fmodsfodskfsd",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Reverse Crunch.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs",


  });

  await ExerciseStorage.setItem("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs",
    reorderID: 0,

  });

  await ExerciseStorage.setItem("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs"

  });

  await ExerciseStorage.setItem("Scissors", {
    name: "Scissors",
    img: "@/assets/exercises/Scissors.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs"

  });

  await ExerciseStorage.setItem("Sit-Up", {
    name: "Sit-Up",
    img: "@/assets/exercises/Sit-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "upper-abs"

  });

  await ExerciseStorage.setItem("Cross Crunches", {
    name: "Cross Crunches",
    img: "@/assets/exercises/Cross Crunches.png",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs"

  });



}

loadAll();

//workouts

export default ExerciseStorage;
