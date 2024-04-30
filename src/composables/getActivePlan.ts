import activePlanStorage from "../storage/activePlanStorage";
import activePlanIdStorage from "../storage/activePlanIdStorage";

let name: any = "";
let id: any = "";

export async function getActivePlanName() {
  name = await activePlanStorage.getItem("activePlanName");
  console.log("name in getActivePlanName");
  console.log(name);
  if (name == null) {
    return "testPlan";
  }

  return name;
}

export async function getActivePlanId() {
  id = await activePlanIdStorage.getItem("activePlanId");
  console.log("id in getActivePlanId");
  console.log(id);
  if (id == null) {
    return "testId";
  }

  return id;
}
