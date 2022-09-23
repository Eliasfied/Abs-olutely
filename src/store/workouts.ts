import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkoutsStore = defineStore("workouts", () => {
  const workoutList = ref([
    {
      name: "beginner",
      breakTime: 30,
      exerciseTime: 30,
      exercises: [
        "beginner",
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
        "advanced",
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
        "champ",
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
  ]);

  return { workoutList };
});
