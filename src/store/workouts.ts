import { defineStore } from "pinia";
import { getWorkout } from "../composables/getWorkoutStorage";

export const useWorkoutsStore = defineStore("workouts", {
  state: () => ({
    workoutList: [] as any[],
  }),

  actions: {
    async loadWorkoutsFromStore() {
      this.workoutList = [];
      const beginner = await getWorkout("HsOB8HzB57hbQeHtwn31");
      this.workoutList.push(beginner);
      const advanced = await getWorkout("HsOB8HzB57hbQeHtwn32");
      this.workoutList.push(advanced);
      const professional = await getWorkout("HsOB8HzB57hbQeHtwn33");
      this.workoutList.push(professional);
      const champ = await getWorkout("HsOB8HzB57hbQeHtwn34");
      this.workoutList.push(champ);
    },
  },
});
