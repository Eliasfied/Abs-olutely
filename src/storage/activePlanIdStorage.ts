import localForage from "localforage";

const activePlanIdStorage = localForage.createInstance({ name: "activePlanId" });

async function loadAll() {
  //activePlanStorage.clear();
}
loadAll();

//workouts

export default activePlanIdStorage;
