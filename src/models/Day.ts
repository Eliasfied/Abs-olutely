export class Day {
  id: string;
  dayInt: number;
  doneDate: Date | null | string;
  state: string;

  constructor(id: string, dayInt: number, doneDate: Date, state: string) {
    this.id = id;
    this.dayInt = dayInt;
    this.doneDate = doneDate;
    this.state = state;
  }
}
