import { Exercise } from "./Exercise";

export class Workout {
  id: string | null = null;
  name: string;
  userId: string;
  exerciseTime: number;
  breakTime: number;
  lastUpdated: Date;
  exercises: Exercise[];

  constructor(
    id: string,
    name: string,
    userId: string,
    exerciseTime: number,
    breakTime: number,
    lastUpdated: Date,
    exercises: Exercise[]
  ) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.exerciseTime = exerciseTime;
    this.breakTime = breakTime;
    this.lastUpdated = lastUpdated;
    this.exercises = exercises;
  }
}
