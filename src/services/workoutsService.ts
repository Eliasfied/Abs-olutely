import { Workout } from "@/models/Workout";
import httpsWithToken from "./httpsWithToken";
import { getWorkoutList } from "@/composables/getMyWorkoutList";
import WorkoutStorage from "@/storage/myWorkoutStorage";
import { useMyWorkoutsStore } from "@/store/myWorkouts";

export const addWorkout = async (workout: Workout) => {
  return await httpsWithToken.post("/api/workouts/add", workout);
};

export const getWorkoutById = async (workoutId: string) => {
  return await httpsWithToken.get(
    "/api/workouts?workoutId=" + workoutId
  );
};

export const updateWorkout = async (workout: Workout, userid: string) => {
  return await httpsWithToken.put(
    "/api/workouts?userid=" + userid,
    workout
  );
};

export const deleteWorkout = async (workoutId: string) => {
  return await httpsWithToken.delete(
    "/api/workouts?workoutId=" + workoutId
  );
};

export const getWorkouts = async (userid: string) => {
  return await httpsWithToken.get("/api/workouts?userid=" + userid);
};

export const synchronizeWorkouts = async (
  workouts: Workout[],
  userId: string
) => {
  const workoutsToUpdateLocally = await httpsWithToken.post(
    "/api/workouts/synchronize?userid=" + userId,
    workouts
  );
  const workoutStore = useMyWorkoutsStore();
  const workoutList = await getWorkoutList();
  console.log("workoutsToUpdateLocally");
  console.log(workoutsToUpdateLocally.data);
  console.log("workoutList");
  console.log(workoutList);

  for (let i = 0; i < workoutsToUpdateLocally.data.length; i++) {
    let found = false;
    for (let j = 0; j < workoutList.length; j++) {
      if (workoutList[j]) {
        if (workoutsToUpdateLocally.data[i].name === workoutList[j].name) {
          found = true;
          WorkoutStorage.removeItem(workoutList[j].id as string);
          WorkoutStorage.setItem(
            workoutsToUpdateLocally.data[i].id as string,
            workoutsToUpdateLocally.data[i] as Workout
          );
          break;
        }
      }
    }
    if (!found) {
      WorkoutStorage.setItem(
        workoutsToUpdateLocally.data[i].id as string,
        workoutsToUpdateLocally.data[i] as Workout
      );
    }
  }
  workoutStore.loadWorkoutsFromStore();
};

export const shareWorkout = async (
  SenderName: string,
  ReceiverEmail: string,
  workoutId: string,
  workoutName: string
) => {
  return await httpsWithToken.post("/api/workouts/share", {
    SenderName,
    ReceiverEmail,
    workoutId,
    workoutName,
  });
};
