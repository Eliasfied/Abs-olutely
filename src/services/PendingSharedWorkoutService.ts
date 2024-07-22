import httpsWithToken from "./httpsWithToken";

export const getPendingSharedWorkouts = async (userId: string) => {
  return await httpsWithToken.get(
    "/pendingSharedWorkouts?userId=" + userId
  );
};

export const deletePendingSharedWorkout = async (
  workoutId: string,
  userId: string
) => {
  return await httpsWithToken.delete(
    "/pendingSharedWorkouts?workoutId=" +
      workoutId +
      "&userId=" +
      userId
  );
};
