import httpsWithToken from "./httpsWithToken";
import { Plan } from "@/models/Plan";
import { getPlanList } from "@/composables/getMyPlanList";
import { useMyPlanStore } from "../store/myPlans";
import PlanStorage from "@/storage/myPlanStorage";


export const addPlan = async (plan: Plan) => {
  return await httpsWithToken.post("/api/plans/add", plan);
};
export const updatePlanInDB = async (plan: Plan) => {
  return await httpsWithToken.put("/api/plans/update", plan);
};
export const deletePlanFromDB = async (planId: string) => {
  return await httpsWithToken.delete("/api/plans/delete?planId=" + planId);
};
export const getPlans = async (userid: string) => {
  return await httpsWithToken.get("/api/plans/get?userid=" + userid);
};
export const synchronizePlans = async (plans: Plan[], userId: string) => {
  await httpsWithToken.post("/api/plans/synchronize?userid=" + userId, plans);
  const planStore = useMyPlanStore();

  const plansFromDB = await getPlans(userId);
  console.log("plansFromDB");
  console.log(plansFromDB.data);
  const localPlans = planStore.planList;
  console.log("localPlans");
  console.log(localPlans);

  // gehe durch alle newPlans durch und schaue ob es lokal pläne gibt die nicht in der DB sind und lösche diese dann
  for (let i = 0; i < localPlans.length; i++) {
    let found = false;
    for (let j = 0; j < plansFromDB.data.length; j++) {
      if (plansFromDB.data[j]) {
        if (localPlans[i].id === plansFromDB.data[j].id) {
          found = true;
          break;
        }
      } else {
        console.log("newPlans.data[j] is undefined at index: ", j);
      }
    }
    if (!found) {
      await deletePlanFromDB(localPlans[i].id as string);
      await PlanStorage.removeItem(localPlans[i].id as string);
    }
    planStore.loadPlansFromStore();
    return plansFromDB.data;
  }



};
