import defaultPlans from "../storage/defaultPlanStorage";

let data: any[] = [];

export async function getPrePlanList() {
  data = [];
  const length = await defaultPlans.length();

  for (let i = 0; i < length; i++) {
    const key = await defaultPlans.key(i);

    await defaultPlans.getItem(key).then((result) => {
      data.push(result);
    });
  }

  console.log("das ist data: ");
  console.log(data);
  return data;
}
