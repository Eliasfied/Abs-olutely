import localForage from "localforage";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

//Exercises

async function loadAll() {
  // await ExerciseStorage.clear();

  await ExerciseStorage.setItem("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.gif",
    difficulty: 3,
    description: "Start in a push-up position, with your hands placed slightly wider than shoulder-width apart. Put your elbows on the ground. Hold this position.",
    muscleGroup: "core",
    number: "9.",
  });

  await ExerciseStorage.setItem("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.gif",
    difficulty: 3,
    description: "Lie flat on your back with your knees bent and feet flat on the floor. Place your hands behind your head, with your fingers interlaced or gently supporting your head. Lift your head, neck, and shoulders off the floor, contracting your abs. Lower your head, neck, and shoulders back down to the starting position.",
    muscleGroup: "upper-abs",
    number: "3.",
  });

  await ExerciseStorage.setItem("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.gif",
    difficulty: 3,
    description: "Lie flat on your back with your arms extended straight overhead, legs extended straight. In one movement, use your abs to lift your torso off the floor, reaching your hands towards your toes. Lower your torso back down to the starting position. ",
    muscleGroup: "core",
    number: "4.",
  });

  await ExerciseStorage.setItem("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",
    reorderID: 0,
    number: "6.",
  });

  await ExerciseStorage.setItem("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.gif",
    difficulty: 3,
    description: "Start in a push-up position, with your hands placed slightly wider than shoulder-width apart. Bring your right knee towards your chest, keeping your abs engaged and your back straight. Quickly switch legs, bringing your left knee towards your chest.",
    muscleGroup: "core",
    number: "8.",
  });

  await ExerciseStorage.setItem("Puls Ups", {
    name: "Puls Ups",
    img: "@/assets/exercises/Puls-Ups.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "core",
    number: "10.",
  });

  await ExerciseStorage.setItem("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "side-abs",
    number: "12.",
  });

  await ExerciseStorage.setItem("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.gif",
    difficulty: 3,
    description: "Lie on your right side with your legs extended, stacked on top of each other. Prop yourself up on your right elbow, with your elbow directly under your shoulder. Raise your hips off the floor, forming a straight line from your head to your feet. Hold this position!",
    muscleGroup: "side-abs",
    reorderID: 0,
    number: "14.",
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
    description: "Lie flat on your back with your arms extended straight overhead, legs extended straight. In one movement, use your abs to lift your torso and legs off the floor, reaching your hands towards your feet. Lower your torso and legs back down to the starting position.",
    muscleGroup: "core",
    number: "15.",
  });

  await ExerciseStorage.setItem("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Reverse Crunch.gif",
    difficulty: 3,
    description: "Lie flat on your back with your hands by your sides, palms down. Bend your knees, lifting your feet off the floor, keeping your legs at a 90-degree angle. Use your lower abs to lift your hips off the floor, towards your chest. Lower your hips back down, towards the floor, keeping your legs bent.",
    muscleGroup: "lower-abs",
    number: "11.",
  });

  await ExerciseStorage.setItem("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.gif",
    difficulty: 3,
    description: "Lie flat on your back with your knees bent and feet flat on the floor. Keeping your lower back on the floor, lift your shoulders and upper back off the floor. Tap your right heel with your left hand, then tap your left heel with your right hand.",
    muscleGroup: "side-abs",
    reorderID: 0,
    number: "5.",
  });

  await ExerciseStorage.setItem("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.gif",
    difficulty: 3,
    description:
      "Lay flat on your back and place your hands behind your back. Keep your legs extended with a small space between your feet. Lift both legs off the ground, keeping them bent at a 90-degree angle. Alternately bring each knee towards your elbow while extending the other leg. Exhale as you bring each knee towards your elbow and inhale as you extend the leg.",
    muscleGroup: "lower-abs",
    number: "1.",
  });

  await ExerciseStorage.setItem("Scissors", {
    name: "Scissors",
    img: "@/assets/exercises/Scissors.gif",
    difficulty: 3,
    description: "Lie flat on your back with your legs extended straight up in the air, about a foot apart. Place your hands under your lower back for support. Lower your left leg towards the floor, keeping it straight, while raising your right leg up towards the ceiling. Switch legs, lowering your right leg and raising your left leg.",
    muscleGroup: "lower-abs",
    number: "13.",
  });

  await ExerciseStorage.setItem("Knee to Abs", {
    name: "Knee to Abs",
    img: "@/assets/exercises/Knee to Abs.gif",
    difficulty: 3,
    description: "blablablablablabla",
    muscleGroup: "upper-abs",
    number: "7.",
  });

  await ExerciseStorage.setItem("Cross Crunches", {
    name: "Cross Crunches",
    img: "@/assets/exercises/Cross Crunches.gif",
    difficulty: 3,
    description: "Lie flat on your back with your knees bent and feet flat on the floor. Place your hands behind your head. Keeping your lower back on the floor, lift your shoulders and upper back off the floor. Cross your right elbow to your left knee, then your left elbow to your right knee.",
    muscleGroup: "side-abs",
    number: "2.",
  });
}

loadAll();

//workouts

export default ExerciseStorage;
