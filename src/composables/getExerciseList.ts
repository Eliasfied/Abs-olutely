import ExerciseStorage from "../storage/ExerciseStorage";

const data: any[] = [];

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
      await ExerciseStorage.getItem(key).then((result) => {
        data.push(result);
      });
    }

    return data;
  }

  return data;
}
