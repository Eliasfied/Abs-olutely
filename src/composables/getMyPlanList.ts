import myPlanStorage from "../storage/myPlanStorage";

let data: any[] = [];

export async function getPlanList() {
  data = [];
  const length = await myPlanStorage.length();

  for (let i = 0; i < length; i++) {
    const key = await myPlanStorage.key(i);

    await myPlanStorage.getItem(key).then((result) => {
      data.push(result);
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
