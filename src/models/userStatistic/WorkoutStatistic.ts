export class WorkoutStatistic {
    workoutId: string;
    workoutName: string;
    date: Date;
    workoutTime: number;

    constructor(workoutId: string, workoutName: string, date: Date, workoutTime: number) {
        this.workoutId = workoutId;
        this.workoutName = workoutName;
        this.date = date;
        this.workoutTime = workoutTime;
    }
}