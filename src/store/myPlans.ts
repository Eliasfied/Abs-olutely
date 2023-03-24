import { defineStore } from "pinia";
import { ref } from "vue";
import { getPlanList } from "@/composables/getMyPlanList";

export const useMyPlanStore = defineStore("myPlans", {
  state: () => ({
    planList: [] as any[],
    planName: "",
    planWeeks: 0,
    planDays: 0,
    weekArray: [] as any[],
    currentIndex: 0,
    

  }),

  actions: {

    async loadPlansFromStore() {
      this.planList = await getPlanList();
    },
    setDayInArray() {
      console.log(this.weekArray[2].array[1].day);
      this.weekArray[2].array[1].day = "test";
    },

    setPlanName(name: any) {
      console.log("planName before in store");
      console.log(name);
      this.planName = name;
      console.log("planName in store");
      console.log(this.planName);
    },
    setPlanWeeks(weeks) {
      this.planWeeks = weeks;
    },
    setPlanDays(days) {
      console.log("days number?:");
      console.log(days);
      this.planDays = days;
      console.log("days after?:");
      console.log(this.planDays);
    },
    setArray(array) {
      this.weekArray = array;
    },
    pushArray(week) {
      this.weekArray.push(week);
    },
    async workoutToArray(index, workoutname) {
      console.log("der index:");
      console.log(index);
      this.weekArray[index].weekWorkout = workoutname;
      console.log("this is the array:");
      console.log(this.weekArray);
    },
    setCurrentIndex(index: any) {
      console.log("index number");
      console.log(index);
      this.currentIndex = index;
      console.log("currentIndex in myPlans");
      console.log(this.currentIndex);
    },
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
    },
    weekArray() {
      return this.weekArray;
    },
    currentIndex() {
      return this.currentIndex;
    },
  },
});
