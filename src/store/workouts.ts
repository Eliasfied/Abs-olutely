import { defineStore } from "pinia";

export const useWorkoutsStore = defineStore("workouts", () => {
  const workoutList = [
    {
      name: "beginner",
      breakTime: 30,
      exerciseTime: 30,
      exercises: [
        "Plank",
        "Russian Twist",
        "Crunch",
        "Hold",
        "Mountain Climber",
        "Hold",
        "Plank",
        "Side-Plank",
      ],
    },
    {
      name: "advanced",
      breakTime: 20,
      exerciseTime: 30,
      exercises: [
        "Grab-toe",
        "Push-Up",
        "Plank",
        "Russian Twist",
        "Crunch",
        "Mountain-Climber",
        "Hold",
        "Push-up",
        "Side-Plank",
      ],
    },
    {
      name: "champ",
      breakTime: 10,
      exerciseTime: 30,
      exercises: [
        "Plank",
        "Russian Twist",
        "Crunch",
        "Push-Up",
        "Mountain Climber",
        "Hold",
        "Russian Twist",
        "Side-Plank",
        "Grab-Toe",
        "Plank"
      ],
    },
  ];

  return { workoutList };
});
