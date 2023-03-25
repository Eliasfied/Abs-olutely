import localForage from "localforage";

const planStorage = localForage.createInstance({ name: "myPlans" });

async function loadAll() {
  // await planStorage.setItem("ModelPlan", {
  //   name: "myModelPlan",
  //   weeks: 5,
  //   daysPerWeek: 3,
  //   totalDays: 15,
  //   currentWeeK: 1,
  //   currentDay: 2,
  //   array: [
  //     { week: 1, workout: "myWorkout1" },
  //     { week: 2, workout: "myWorkout2" },
  //     { week: 3, workout: "myWorkout3" },
  //     { week: 4, workout: "myWorkout4" },
  //   ],
  // });
  // planStorage.clear();
}
loadAll();

//workouts

export default planStorage;
