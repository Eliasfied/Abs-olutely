import httpsWithToken from "./httpsWithToken";
import { Plan } from "@/models/Plan";
import { getPlanList } from "@/composables/getMyPlanList";
import { useMyPlanStore } from "../store/myPlans";
import PlanStorage from "@/storage/myPlanStorage";
import { get } from "@ionic-native/core/decorators/common";

export const addPlan = async (plan: Plan) => {
  return await httpsWithToken.post("/api/plans", plan);
};
export const updatePlanInDB = async (plan: Plan) => {
  return await httpsWithToken.put("/api/plans/update", plan);
};
export const deletePlanFromDB = async (planId: string) => {
  return await httpsWithToken.delete("/api/plans?planId=" + planId);
};
export const getPlans = async (userid: string) => {
  return await httpsWithToken.get("/api/plans?userid=" + userid);
};
export const synchronizePlans = async (plans: Plan[], userId: string) => {
  const plansToUpdateLocally = await httpsWithToken.post(
    "/api/plans/synchronize?userid=" + userId,
    plans
  );
  const planStore = useMyPlanStore();
  const planList = await getPlanList();
  console.log("plansToUpdateLocally und planlist");
  console.log(plansToUpdateLocally.data);
  console.log(planList);

  for (let i = 0; i < plansToUpdateLocally.data.length; i++) {
    let found = false;
    for (let j = 0; j < planList.length; j++) {
      if (planList[j]) {
        if (plansToUpdateLocally.data[i].name === planList[j].name) {
          found = true;
          PlanStorage.removeItem(planList[j].id as string);
          PlanStorage.setItem(
            plansToUpdateLocally.data[i].id as string,
            plansToUpdateLocally.data[i] as Plan
          );
          break;
        }
      }
    }
    if (!found) {
      PlanStorage.setItem(
        plansToUpdateLocally.data[i].id as string,
        plansToUpdateLocally.data[i] as Plan
      );
    }
  }
  planStore.loadPlansFromStore();
};
