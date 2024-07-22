import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import httpsWithToken from "./httpsWithToken";

export const UpdateUserStatistics = async (UserStatistic: UserStatistic) => {
  return await httpsWithToken.put("/UserStatistics", UserStatistic);
};

export const getUserStatistics = async (userId: string) => {
  return await httpsWithToken.get("/userStatistics?userId=" + userId);
};

