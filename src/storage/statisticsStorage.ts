import localForage from "localforage";

const workoutStatisctics = localForage.createInstance({
  name: "workoutStatistics",
});

async function loadAll() {
  await workoutStatisctics.setItem("examplename", {
    workoutname: "beginner",
    date: "20.11.2022",
    minutes: 9,
  });
  await workoutStatisctics.setItem("exampleworkout", {
    workoutname: "champ",
    date: "27.11.2022",
    minutes: 11,
  });
}

loadAll();

export default workoutStatisctics;
