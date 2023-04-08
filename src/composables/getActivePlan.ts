import activePlanStorage from "../storage/activePlanStorage";

let data: any = "";

export async function getActivePlan() {
  data = await activePlanStorage.getItem("activePlan");
  if (data == null) {
    return "testPlan";
  }
  console.log("das ist der activePlan: ");
  console.log(data.activePlan);
  return data.activePlan;
}
