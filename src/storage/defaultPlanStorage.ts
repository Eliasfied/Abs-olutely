import localForage from "localforage";
const defaultPlans = localForage.createInstance({ name: "defaultPlans" });

async function loadAll() {
  await defaultPlans
    .getItem("BeginnerPlan")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("BeginnerPlan", {
          planName: "BeginnerPlan",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 12,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: "beginner",
              array: [
                { dayInt: 1, state: "today", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: "beginner",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
          ],
        });
      } else {
        console.log("Item ist bereits gesetzt");
      }
    })
    .catch(function (err) {
      console.log(err);
    });


    await defaultPlans
    .getItem("roadToShredded")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("roadToShredded", {
          planName: "roadToShredded",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 12,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "today", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: "professional",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: "champ",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
          ],
        });
      } else {
        console.log("Item ist bereits gesetzt");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
//defaultPlans.clear();
loadAll();

export default defaultPlans;
