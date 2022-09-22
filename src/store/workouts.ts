import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkoutsStore = defineStore("workouts", () => {
  const workoutList = ref({
    name: "beginner",
    exercises: [
      "plank",
      "russian",
      "crunch",
      "reverse-crunch",
      "mountain",
      "hold",
      "stretch",
      "side-plank"
    ],
  });

  return { workoutList };
});
