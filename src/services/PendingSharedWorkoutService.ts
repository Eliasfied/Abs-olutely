import httpsWithToken from "./httpsWithToken";

export const getPendingSharedWorkouts = async (userId: string) => {
  return await httpsWithToken.get(
    "/api/pendingSharedWorkouts/getPendingSharedWorkouts?userId=" + userId
  );
};

export const deletePendingSharedWorkout = async (
  workoutId: string,
  userId: string
) => {
  return await httpsWithToken.delete(
    "/api/pendingSharedWorkouts/deletePendingSharedWorkout?workoutId=" +
      workoutId +
      "&userId=" +
      userId
  );
};
