import { UserStatistic } from "@/models/userStatistic/UserStatistic";
import { getUserStatistics } from "@/services/userStatisticsService";

let userStatistic: UserStatistic;

export async function getStatisticsFromDb(userId: string) {
  const response = await getUserStatistics(userId);
  userStatistic = response.data;
  return userStatistic;
}
