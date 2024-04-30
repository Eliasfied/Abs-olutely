import { Week } from "./Week";

export class Plan {
  id: string;
  name: string;
  userId: string;
  currentDay: number;
  currentWeek: number;
  isDefault: boolean;
  lastWorkout: Date | string | null;
  lastUpdated: Date;
  totalDays: number;
  weeks: Week[];

  constructor(
    id: string,
    name: string,
    userId: string,
    currentDay: number,
    currentWeek: number,
    isDefault: boolean,
    lastWorkout: Date,
    lastUpdated: Date,
    totalDays: number,
    weeks: Week[]
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.currentDay = currentDay;
    this.currentWeek = currentWeek;
    this.isDefault = isDefault;
    this.lastWorkout = lastWorkout;
    this.lastUpdated = lastUpdated;
    this.totalDays = totalDays;
    this.weeks = weeks;
  }
}
