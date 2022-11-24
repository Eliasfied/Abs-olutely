import statisticStorage from "../storage/statisticsStorage";

const data: any[] = [];

export async function getStatisticsList() {
  const length = await statisticStorage.length();

  for (let i = 0; i < length; i++) {
    const key = await statisticStorage.key(i);

    await statisticStorage.getItem(key).then((result) => {
      data.push(result);
    });
  }

  console.log("das ist statisticdata: ");
  console.log(data);
  return data;
}
