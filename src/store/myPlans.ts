import { defineStore } from "pinia";
import { ref } from "vue";
import { getPlanList } from "@/composables/getMyPlanList";
import { getPrePlanList } from "@/composables/getPrePlanList";
import { getActivePlanName } from "../composables/getActivePlan";
import { getActivePlanId } from "../composables/getActivePlan";

export const useMyPlanStore = defineStore("myPlans", {
  state: () => ({
    planList: [] as any[],
    prePlanList: [] as any[],
    planName: "",
    planWeeks: 0,
    planDays: 0,
    weekArray: [] as any[],
    currentIndex: 0,
    activePlanName: "testAktivPlan",
    activePlanId: "testAktivId",
  }),

  actions: {
    async loadPlansFromStore() {
      this.planList = await getPlanList();
      this.activePlanName = await getActivePlanName();
      this.activePlanId = await getActivePlanId();
      this.prePlanList = await getPrePlanList();
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
    async workoutToArray(index, workoutId, workoutName) {
      console.log("der index:");
      console.log(index);
      this.weekArray[index].weekWorkout.id = workoutId;
      this.weekArray[index].weekWorkout.name = workoutName;
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
