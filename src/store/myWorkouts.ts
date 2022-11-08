import { defineStore } from "pinia";
import { getWorkoutList } from "../storage/getMyWorkoutList";

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
