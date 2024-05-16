import localForage from "localforage";
const defaultPlans = localForage.createInstance({ name: "defaultPlans" });

async function loadAll() {
  //defaultPlans.clear();

  await defaultPlans
    .getItem("yS0qXtofbcUfcXDNBhLJdA7gzVo1")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("yS0qXtofbcUfcXDNBhLJdA7gzVo1", {
          id: "yS0qXtofbcUfcXDNBhLJdA7gzVo1",
          name: "BeginnerPlanx",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 12,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "today", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},

              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
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
    .getItem("ByS0qXtofbcUfcXDNBhLJdA7gzVo2")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("yS0qXtofbcUfcXDNBhLJdA7gzVo2", {
          id: "yS0qXtofbcUfcXDNBhLJdA7gzVo2",
          name: "BeginnerPlan 4x3",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 12,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "today", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
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
    .getItem("yS0qXtofbcUfcXDNBhLJdA7gzVo3")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("yS0qXtofbcUfcXDNBhLJdA7gzVo3", {
          id: "yS0qXtofbcUfcXDNBhLJdA7gzVo3",
          name: "Advanced 4x3",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 12,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "today", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn34", name: "Champ"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
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
    .getItem("yS0qXtofbcUfcXDNBhLJdA7gzVo4")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("yS0qXtofbcUfcXDNBhLJdA7gzVo4", {
          id: "yS0qXtofbcUfcXDNBhLJdA7gzVo4",
          name: "SixPack Deluxe 5x3",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 15,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "today", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 5,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
                { dayInt: 3, state: "open", doneDate: null },
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
    .getItem("yS0qXtofbcUfcXDNBhLJdA7gzVo5")
    .then(function (value) {
      if (value === null) {
        defaultPlans.setItem("yS0qXtofbcUfcXDNBhLJdA7gzVo5", {
          id: "yS0qXtofbcUfcXDNBhLJdA7gzVo5",
          name: "BASIC 8x2",
          currentDay: 0,
          currentWeek: 0,
          totalDays: 16,
          isDefault: true,
          weeks: [
            {
              weekInt: 1,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "today", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 2,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn31", name: "Beginner"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 3,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 4,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 5,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn32", name: "Advanced"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 6,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 7,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
              ],
            },
            {
              weekInt: 8,
              weekWorkout: {id: "HsOB8HzB57hbQeHtwn33", name: "Professional"},
              days: [
                { dayInt: 1, state: "open", doneDate: null },
                { dayInt: 2, state: "open", doneDate: null },
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
loadAll();

export default defaultPlans;
