import { defineStore } from "pinia";
import { getWorkout } from "../composables/getWorkoutStorage";

export const useWorkoutsStore = defineStore("workouts", {
  state: () => ({
    workoutList: [] as any[],
  }),

  actions: {
    async loadWorkoutsFromStore() {
      this.workoutList = [];
      const beginner = await getWorkout("beginner");
      this.workoutList.push(beginner);
      const advanced = await getWorkout("advanced");
      this.workoutList.push(advanced);
      const professional = await getWorkout("professional");
      this.workoutList.push(professional);
      const champ = await getWorkout("champ");
      this.workoutList.push(champ);
    },
  },
});
