import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import httpsWithToken from "./httpsWithToken";

export const UpdateUserStatistics = async (UserStatistic: UserStatistic) => {
  return await httpsWithToken.put("/api/UserStatistics", UserStatistic);
};

export const getUserStatistics = async (userId: string) => {
  return await httpsWithToken.get("/api/userStatistics?userId=" + userId);
};

