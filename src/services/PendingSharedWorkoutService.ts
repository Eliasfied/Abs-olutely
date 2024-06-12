import httpsWithToken from "./httpsWithToken";

export const getPendingSharedWorkouts = async (userId: string) => {
  return await httpsWithToken.get(
    "/api/pendingSharedWorkouts?userId=" + userId
  );
};

export const deletePendingSharedWorkout = async (
  workoutId: string,
  userId: string
) => {
  return await httpsWithToken.delete(
    "/api/pendingSharedWorkouts?workoutId=" +
      workoutId +
      "&userId=" +
      userId
  );
};
