import localForage from "localforage";

const activePlanStorage = localForage.createInstance({ name: "activePlanName" });

async function loadAll() {
  //activePlanStorage.clear();
}
loadAll();

//workouts

export default activePlanStorage;
