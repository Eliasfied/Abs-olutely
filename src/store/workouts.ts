import { defineStore } from "pinia";
import { getExercise } from "../storage/getExerciseStorage";

export const useWorkoutsStore = defineStore("workouts", {
  state: () => ({
    workoutList: [] as any[],
  }),

  actions: {
    async loadWorkoutsFromStore() {



      const beginner = await getExercise("beginner");
      this.workoutList.push(beginner);
      const advanced = await getExercise("advanced");
      this.workoutList.push(advanced);
      const champ = await getExercise("champ");
      this.workoutList.push(champ);
    },
  },
});
