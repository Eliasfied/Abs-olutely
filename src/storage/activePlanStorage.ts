import localForage from "localforage";

const activePlanStorage = localForage.createInstance({ name: "activePlan" });

async function loadAll() {
  //planStorage.clear();
}
loadAll();

//workouts

export default activePlanStorage;
