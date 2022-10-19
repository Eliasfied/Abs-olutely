import { defineStore } from "pinia";

export const useWorkoutsStore = defineStore("workouts", () => {
  const workoutList = [
    {
      name: "beginner",
      breakTime: 30,
      exerciseTime: 30,
      exercises: [
        "plank",
        "russian",
        "crunch",
        "reverse-crunch",
        "mountain",
        "hold",
        "stretch",
        "side-plank",
      ],
    },
    {
      name: "advanced",
      breakTime: 20,
      exerciseTime: 30,
      exercises: [
        "grab-toe",
        "liegestütze",
        "plank",
        "russian",
        "crunch",
        "reverse-crunch",
        "mountain",
        "hold",
        "stretch",
        "side-plank",
      ],
    },
    {
      name: "champ",
      breakTime: 10,
      exerciseTime: 30,
      exercises: [
        "plank",
        "russian",
        "crunch",
        "reverse-crunch",
        "mountain",
        "hold",
        "stretch",
        "side-plank",
      ],
    },
  ];

  return { workoutList };
});
