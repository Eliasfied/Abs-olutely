import myWorkoutStorage from "./myWorkoutStorage";

const data: any[] = [];

export async function getWorkoutList() {
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
