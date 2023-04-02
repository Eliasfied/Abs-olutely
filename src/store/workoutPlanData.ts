import { defineStore } from "pinia";

export const useWorkoutPlanData = defineStore("workoutPlanData", {
    state: () => ({
      weekNumber: 500,
      dayNumber: 500,
      currentPlanName: ""
    }),
  
    actions: {
      setWeekNumber(week: any) {
        this.weekNumber = week;
      },
      setDayNumber(day: any) {
        this.dayNumber = day;
      },
      setCurrentPlanName(name: any) {
        this.currentPlanName = name;
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