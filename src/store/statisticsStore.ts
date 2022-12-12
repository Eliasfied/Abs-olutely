import { defineStore } from "pinia";
import { getStatisticsList } from "../composables/getStatisticsList";

export const useStatisticsStore = defineStore("statisticsStore", {
  state: () => ({
    statisticsList: [] as any[],
  }),

  actions: {
    async loadStatisticsFromStore() {
      this.statisticsList = await getStatisticsList();
    },
    addToStatisticsList(workout) {
      console.log("bin im STATISTICS store");
      this.statisticsList.unshift(workout);

    },
  },
});
