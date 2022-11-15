import { defineStore } from "pinia";
import { getWorkoutList } from "../composables/getMyWorkoutList";

export const useMyWorkoutsStore = defineStore("myWorkouts", {
  state: () => ({
    workoutList: [] as any[],
  }),

  actions: {
    async loadWorkoutsFromStore() {



      this.workoutList = await getWorkoutList();
     
    },
  },
});
