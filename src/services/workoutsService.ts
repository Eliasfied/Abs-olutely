import { Workout } from "@/models/Workout";
import httpsWithToken from "./httpsWithToken";
import { getWorkoutList } from "@/composables/getMyWorkoutList";
import WorkoutStorage from "@/storage/myWorkoutStorage";
import  {useMyWorkoutsStore} from "@/store/myWorkouts";
export const addWorkout = async (workout: Workout) => {
  return await httpsWithToken.post("/api/workouts/add", workout);
};

export const updateWorkout = async (workout: Workout, userid: string) => {
  return await httpsWithToken.put("/api/workouts/update?userid=" + userid, workout);
};

export const deleteWorkout = async (workoutId: string) => {
  return await httpsWithToken.delete("/api/workouts/delete?workoutId=" + workoutId);
};

export const getWorkouts = async (userid: string) => {
  return await httpsWithToken.get("/api/workouts/get?userid=" + userid);
};


export const synchronizeWorkouts = async (workouts: Workout[], userid: string) => {
  await httpsWithToken.post("/api/workouts/synchronize?userid=" + userid, workouts);
  const newWorkouts = await getWorkouts(userid);
  const lokalWorkouts = await getWorkoutList();

  console.log("newWorkouts: ", newWorkouts.data)
  console.log("lokalWorkouts: ", lokalWorkouts)

  // gehe durch alle newWorkouts durch und schaue ob es lokal workouts gibt die nicht in der DB sind und lösche diese dann
  for (let i = 0; i < lokalWorkouts.length; i++) {
    let found = false;
    for (let j = 0; j < newWorkouts.data.length; j++) {
      console.log("lokalWorkouts[i].id: ", lokalWorkouts[i].id);
      console.log("newWorkouts[j].id: ", newWorkouts.data[j].id);
      if (newWorkouts.data[j]) {
        console.log("newWorkouts[j].id: ", newWorkouts.data[j].id);
        if (lokalWorkouts[i].id === newWorkouts.data[j].id) {
          found = true;
          break;
        }
      } else {
        console.log("newWorkouts.data[j] is undefined at index: ", j);
      }
    }
    if (!found) {
      await deleteWorkout(lokalWorkouts[i].id as string);
      await WorkoutStorage.removeItem(lokalWorkouts[i].id as string);
    }
  }
  const store = useMyWorkoutsStore();
  await store.loadWorkoutsFromStore();
  return newWorkouts.data;
};