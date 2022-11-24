import localForage from "localforage";

const workoutStatisctics = localForage.createInstance({
  name: "workoutStatistics",
});

async function loadAll() {
  console.log("wuhu");
}

loadAll();

export default workoutStatisctics;
