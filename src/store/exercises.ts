import { defineStore } from "pinia";

export const useExercisesStore = defineStore("exercises", () => {
  const exerciseList = [];

  return { exerciseList };
});
