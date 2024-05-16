import { Plan } from "@/models/Plan";
import myPlanStorage from "../storage/myPlanStorage";
import { loginStore } from "@/store/authentication/loginStore";


let data: any[] = [];

export async function getPlanList() {
  data = [];
  const length = await myPlanStorage.length();
  const logStore = loginStore();
  const userId = logStore.getUserId();

  for (let i = 0; i < length; i++) {
    const key = await myPlanStorage.key(i);

    await myPlanStorage.getItem(key).then((result) => {
      if ((result as Plan).userId === userId) {
        data.push(result as Plan);
      }
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
