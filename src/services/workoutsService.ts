import { Workout } from "@/models/Workout";
import httpsWithToken from "./httpsWithToken";
import https from "./https";

export const addWorkout = async (workout: Workout) => {
  return await https.post("/api/workouts/add", workout);
};

export const updateWorkout = async (workout: Workout, userid: string) => {
  return await httpsWithToken.post("/api/workouts/update?userid" + userid, workout);
};

export const deleteWorkout = async (workoutId: string, userId: string) => {
  return await httpsWithToken.delete(`/api/workouts/delete/${workoutId}`);
};

export const getWorkouts = async (userid: string) => {
  return await httpsWithToken.get("/api/workouts");
};


export const synchronizeWorkouts = async (workouts: Workout[], userid: string) => {
  return await httpsWithToken.post("/api/workouts/synchronize?userid=" + userid, workouts);
};