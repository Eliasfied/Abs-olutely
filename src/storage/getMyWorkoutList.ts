import myWorkoutStorage from "./myWorkoutStorage";

const data:any[] = []

export async function getWorkoutList() {
  const length = await myWorkoutStorage.length();
  console.log(length);
  for (let i = 0; i < length; i++) {
    const key = await myWorkoutStorage.key(i);
    console.log(key);
    await myWorkoutStorage.getItem(key).then((result) => {

      console.log("result: ");
      console.log(result);
      data.push(result);
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
