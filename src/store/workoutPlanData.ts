import { defineStore } from "pinia";

export const useWorkoutPlanData = defineStore("workoutPlanData", {
    state: () => ({
      weekNumber: 500,
      dayNumber: 500,
    }),
  
    actions: {
      setWeekNumber(week: any) {
        this.weekNumber = week;
      },
      setDayNumber(day: any) {
        this.dayNumber = day;
      },
    },

    // getters: {
    //     weekNumber() {
    //         return this.weekNumber;
    //     },
    //     dayNumber() {
    //         return this.dayNumber;
    //     }
   // }
  });