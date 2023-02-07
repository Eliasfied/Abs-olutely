import { defineStore } from "pinia";

export const useMyPlanStore = defineStore("myPlans", {
  state: () => ({
    planList: [] as any[],
    planName: "",
    planWeeks: 0,
    planDays: 0,
    
  }),

  actions: {
   
    setPlanName(name: any) {
      this.planName = name;
      console.log("planName in store");
      console.log(this.planName);
    },
    setPlanWeeks(weeks) {
      this.planWeeks = weeks;
    },
    setPlanDays(days) {
      this.planDays = days;
    }
  },

  getters: {
    planName() {
      return this.planName;
    },
    planWeeks() {
      return this.planWeeks;
    },
    planDays() {
      return this.planDays;
    }
  }
});
