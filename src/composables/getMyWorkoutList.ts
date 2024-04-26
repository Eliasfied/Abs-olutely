import { Workout } from "@/models/Workout";
import myWorkoutStorage from "../storage/myWorkoutStorage";
import { loginStore } from "@/store/authentication/loginStore";

let data: Workout[] = [];

export async function getWorkoutList() {
  data = [];
  const length = await myWorkoutStorage.length();
  const logStore = loginStore();
  const userId = logStore.getUserId();

  for (let i = 0; i < length; i++) {
    const key = await myWorkoutStorage.key(i);

    await myWorkoutStorage.getItem(key).then((result) => {
      if ((result as Workout).userId === userId) {
        data.push(result as Workout);
      }
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
