import { defineStore } from "pinia";
import { getStatisticsFromDb } from "../composables/getStatisticsFromDb";
import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import { WorkoutStatistic } from "@/models/userStatistic/WorkoutStatistic";

export const useStatisticsStore = defineStore("statisticsStore", {
  state: () => ({
    userStatistic: {
      statisticId: "",
      userId: "",
      planStatistics: [],
      workoutStatistics: [],
    } as UserStatistic,
  }),

  actions: {
    async loadStatisticsInStoreFromDB(userId: string) {
      this.userStatistic = (await getStatisticsFromDb(userId)) as UserStatistic;
      if (this.userStatistic === undefined) {
        this.userStatistic = {
          statisticId: "",
          userId: userId,
          planStatistics: [],
          workoutStatistics: [],
        } as UserStatistic;
      }
    },
    async addWorkoutToStatisticStore(WorkoutStatistic: WorkoutStatistic) {
      this.userStatistic.workoutStatistics.push(WorkoutStatistic);
    },
  },
  getters: {
    getUserStatistic(): UserStatistic {
      return this.userStatistic as UserStatistic;
    },
  },
});
