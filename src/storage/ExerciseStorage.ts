import localForage from "localforage";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

//Exercises

async function loadAll() {

  await ExerciseStorage.setItem("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.png",
    difficulty: 3,
    description: "Put your elbows on the ground and blablablabla",
  });

  await ExerciseStorage.setItem("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.png",
    difficulty: 3,
    description: "Put your body to your belly lalalala",
  });

  await ExerciseStorage.setItem("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Push-Up", {
    name: "Push-Up",
    img: "@/assets/exercises/Push-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Leg Lower", {
    name: "Leg Lower",
    img: "@/assets/exercises/Leg Lower.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("V-Up", {
    name: "V-Up",
    img: "@/assets/exercises/V-Up.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Leg Lower.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

  await ExerciseStorage.setItem("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.png",
    difficulty: 3,
    description: "blablablablablabla",
  });

}

loadAll();

//workouts

export default ExerciseStorage;
