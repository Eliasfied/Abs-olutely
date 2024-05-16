export class PlanStatistic {
  planId: string;
  planName: string;
  date: Date;

  constructor(planId: string, planName: string, date: Date) {
    this.planId = planId;
    this.planName = planName;
    this.date = date;
  }
}
