import localForage from "localforage";
const defaultPlans = localForage.createInstance({ name: "defaultPlans" });

async function loadAll() {
  await defaultPlans
    .getItem("BeginnerPlan 4x3")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("BeginnerPlan 4x3", {
          planName: "BeginnerPlan 4x3",
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
    .getItem("Advanced 4x3")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("Advanced 4x3", {
          planName: "Advanced 4x3",
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

  await defaultPlans
    .getItem("SixPack Deluxe 5x3")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("SixPack Deluxe 5x3", {
          planName: "SixPack Deluxe 5x3",
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
              weekWorkout: "advanced",
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
              weekWorkout: "professional",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
                { dayInt: 3, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 5,
              weekWorkout: "professional",
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
    .getItem("BASIC 2x per Week")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("BASIC 2x per Week", {
          planName: "BASIC 8x2",
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
              ],
            },
            {
              weekInt: 2,
              weekWorkout: "beginner",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 5,
              weekWorkout: "advanced",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 6,
              weekWorkout: "professional",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 7,
              weekWorkout: "professional",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
              ],
            },
            {
              weekInt: 8,
              weekWorkout: "professional",
              array: [
                { dayInt: 1, state: "open", doneDate: "" },
                { dayInt: 2, state: "open", doneDate: "" },
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
