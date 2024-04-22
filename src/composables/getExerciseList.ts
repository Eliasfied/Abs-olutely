import { Exercise } from "@/models/Exercise";
import ExerciseStorage from "../storage/ExerciseStorage";
import { StoredExercise } from "@/interfaces/StoredExercises";

const data: Exercise[] = [];

export async function getExerciseList() {
  console.log("datalength:");
  console.log(data.length);
  if (data.length === 0) {
    console.log("geht rein");
    const length = await ExerciseStorage.length();
    console.log("length:")
    console.log(length);
    for (let i = 0; i < length; i++) {
      const key = await ExerciseStorage.key(i);
      console.log(key);
      await ExerciseStorage.getItem(key).then((result : unknown) => {
        const exercise = new Exercise(
          (result as Exercise).name,
          (result as Exercise).description,
          (result as Exercise).img,
          (result as Exercise).number,
          (result as Exercise).reorderID,
          (result as Exercise).difficulty
        );
        data.push(exercise);
      });
    }

    return data;
  }

  return data;
}
