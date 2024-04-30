import { Day } from "./Day";

export class Week {
  id: string;
  weekInt: number;
  doneDate: Date;
  days: Day[];

  constructor(id: string, weekInt: number, doneDate: Date, days: Day[]) {
    this.id = id;
    this.weekInt = weekInt;
    this.doneDate = doneDate;
    this.days = days;
  }
}
