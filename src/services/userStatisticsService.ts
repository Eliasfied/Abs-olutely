import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import httpsWithToken from "./httpsWithToken";

export const UpdateUserStatistics = async (UserStatistic: UserStatistic) => {
  return await httpsWithToken.put("/api/UserStatistics/updateUserStatistic", UserStatistic);
};

export const getUserStatistics = async (userId: string) => {
  return await httpsWithToken.get("/api/userStatistics/get?userId=" + userId);
};

