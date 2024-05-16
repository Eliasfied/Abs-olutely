import localForage from "localforage";
import { defaultPlans as plans } from "@/data/defaultPlans";
const defaultPlans = localForage.createInstance({ name: "defaultPlans" });

async function loadAll() {
  //defaultPlans.clear();

  for (const plan of plans) {
    await defaultPlans.getItem(plan.id).then(function (value) {
      if (value === null) {
        defaultPlans.setItem(plan.id, {
          ...plan,
        });
      } else {
        console.log("Item ist bereits gesetzt");
      }
    });
  }
}
loadAll();

export default defaultPlans;
