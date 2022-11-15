import ExerciseStorage from "../storage/ExerciseStorage";

const data:any[] = []

export async function getExerciseList() {
  if (data.length === 0) {
    const length = await ExerciseStorage.length();
    console.log(length);
    for (let i = 0; i < length; i++) {
      const key = await ExerciseStorage.key(i);
      console.log(key);
      await ExerciseStorage.getItem(key).then((result) => {
  
        console.log("result: ");
        console.log(result);
        data.push(result);
      });
    }
  
    console.log("das ist data: ");
    console.log(data);
    return data;
  }

  return data;
 
}
