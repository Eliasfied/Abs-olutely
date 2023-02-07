import myWorkoutStorage from "../storage/myWorkoutStorage";

let data: any[] = [];

export async function getWorkoutList() {
  data = [];
  const length = await myWorkoutStorage.length();

  for (let i = 0; i < length; i++) {
    const key = await myWorkoutStorage.key(i);

    await myWorkoutStorage.getItem(key).then((result) => {
      data.push(result);
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
