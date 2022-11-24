import ExerciseStorage from "../storage/ExerciseStorage";

const data: any[] = [];

export async function getExerciseList() {
  if (data.length === 0) {
    const length = await ExerciseStorage.length();
    for (let i = 0; i < length; i++) {
      const key = await ExerciseStorage.key(i);
      console.log(key);
      await ExerciseStorage.getItem(key).then((result) => {
        data.push(result);
      });
    }

    return data;
  }

  return data;
}
