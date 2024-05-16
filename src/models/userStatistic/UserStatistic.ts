import { WorkoutStatistic } from "./WorkoutStatistic";
import { PlanStatistic } from "./PlanStatistic";

export class UserStatistic {
  statisticId: string;
  userId: string;
  workoutStatistics: WorkoutStatistic [];
  planStatistics: PlanStatistic [];

  constructor(
    statisticId: string,
    userId: string,
    workoutStatistics: WorkoutStatistic [],
    planStatistics: PlanStatistic []
  ) {
    this.statisticId = statisticId;
    this.userId = userId;
    this.workoutStatistics = workoutStatistics;
    this.planStatistics = planStatistics;
  }
}
