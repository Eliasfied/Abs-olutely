import localForage from "localforage";

const workoutStatisctics = localForage.createInstance({
  name: "workoutStatistics",
});

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

const newDate = new Date(year, month, 14);
const newDate1 = new Date(year, month, 20);
const newDate2 = new Date(year, month, 1);
console.log("newdate in data");
console.log(newDate);

async function loadAll() {
  console.log("wuhu");
  // workoutStatisctics.clear();
  // workoutStatisctics.setItem("tester", {
  //   workoutname: "starkesWorkout",
  //   date: "14/11/2022",
  //   calendarDate: newDate,
  //   minutes: 9,
  // });
  // workoutStatisctics.setItem("tester1", {
  //   workoutname: "Bauch",
  //   date: "20/11/2022",
  //   calendarDate: newDate1,
  //   minutes: 7,
  // });
  // workoutStatisctics.setItem("tester2", {
  //   workoutname: "Week1ELI",
  //   date: "01/11/2022",
  //   calendarDate: newDate2,
  //   minutes: 5,
  // });
}

loadAll();

export default workoutStatisctics;
