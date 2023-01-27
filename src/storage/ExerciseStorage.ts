import localForage from "localforage";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

//Exercises

async function loadAll() {

  // await ExerciseStorage.clear();

  await ExerciseStorage.setItem("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.gif",
    difficulty: 3,
    description: "Put your elbows on the ground and blablablabla",
    muscleGroup: "core",
  });

  await ExerciseStorage.setItem("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.gif",
    difficulty: 3,
    description: "Put your body to your belly lalalala",
    muscleGroup: "upper-abs",
  });

  await ExerciseStorage.setItem("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",

  });

  await ExerciseStorage.setItem("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",
    reorderID: 0,


  });

  await ExerciseStorage.setItem("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Puls Ups", {
    name: "Puls Ups",
    img: "@/assets/exercises/Puls-Ups.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs"

  });

  await ExerciseStorage.setItem("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.gif",
    difficulty: 3,
    description: ",gspdfkposdkfs-abs",
    muscleGroup: "side-abs",
    reorderID: 0,


  });

  // await ExerciseStorage.setItem("Leg Lower", {
  //   name: "Leg Lower",
  //   img: "@/assets/exercises/Leg Lower.gif",
  //   difficulty: 3,
  //   description: "blablablablablabla",
  //   muscleGroup: "lower-abs",
  //   reorderID: 0,


  // });

  await ExerciseStorage.setItem("V-Up", {
    name: "V-Up",
    img: "@/assets/exercises/V-Up.gif",
    difficulty: 3,
    description: "fmodsfodskfsd",
    muscleGroup: "core"

  });

  await ExerciseStorage.setItem("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Reverse Crunch.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs",


  });

  await ExerciseStorage.setItem("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs",
    reorderID: 0,

  });

  await ExerciseStorage.setItem("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs"

  });

  await ExerciseStorage.setItem("Scissors", {
    name: "Scissors",
    img: "@/assets/exercises/Scissors.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "lower-abs"

  });

  await ExerciseStorage.setItem("Knee to Abs", {
    name: "Knee to Abs",
    img: "@/assets/exercises/Knee to Abs.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "upper-abs"

  });

  await ExerciseStorage.setItem("Cross Crunches", {
    name: "Cross Crunches",
    img: "@/assets/exercises/Cross Crunches.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs"

  });



}

loadAll();

//workouts

export default ExerciseStorage;
