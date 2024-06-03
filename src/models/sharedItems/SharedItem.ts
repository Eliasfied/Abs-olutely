export class SharedItem {
  id: string;
  senderName: string;
  receiverId: string;
  workoutId: string;
  workoutName: string;

  constructor(
    id: string,
    senderName: string,
    receiverId: string,
    workoutId: string,
    workoutName: string
  ) {
    this.id = id;
    this.senderName = senderName;
    this.receiverId = receiverId;
    this.workoutId = workoutId;
    this.workoutName = workoutName;
  }
}
