<template>
  <ion-card color="secondary">
    <div class="grid-style-finish">
      <div class="finish-text">{{ finishText }}</div>
      <div class="finish-subtext">{{ finishSubtext }}</div>
      <div class="finish-workout">
        <img :src="finishedImage" alt="" />
      </div>
      <div class="finish-buttons">
        ><ion-button @click="navigateBack()" color="primary"
          >Back To Menu</ion-button
        >
      </div>
    </div>
  </ion-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonButton } from "@ionic/vue";
import { computed, watch, ref } from "vue";
import statisticStorage from "../storage/statisticsStorage";
import { useStatisticsStore } from "../store/statisticsStore";
import { useMyPlanStore } from "../store/myPlans";
import planStorage from "../storage/myPlanStorage";
import { useWorkoutPlanData } from "../store/workoutPlanData";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "FinishedPage",
  components: { IonCard, IonButton },
  props: ["page", "proptime", "isFinished"],
  emits: ["resetAll"],
  setup(props, { emit }) {
    let finishText = "Good Job!";
    let finishSubtext = "Workout completed: " + props.page;
    let id = Date.now().toString();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    //routing
    const router = useRouter();

    let store = useStatisticsStore();

    let date = dd + "/" + mm + "/" + yyyy;
    console.log(id);
    console.log("date:");
    console.log(date);

    let myPlan: any = [];

    let weekNumber = 4000;
    let dayNumber = 4000;
    let currentPlanName = "";

    const workoutPlanDataStore = useWorkoutPlanData();
    weekNumber = workoutPlanDataStore.weekNumber;
    dayNumber = workoutPlanDataStore.dayNumber;
    currentPlanName = workoutPlanDataStore.currentPlanName;

    async function loadPlanStore() {
      const planStore = useMyPlanStore();
      await planStore.loadPlansFromStore();
      myPlan = planStore.planList.find(
        (element) => element.planName == currentPlanName
      );
    }
    loadPlanStore();

    async function reloadPlanStore() {
      const planStore = useMyPlanStore();
      await planStore.loadPlansFromStore();
    }

    async function updatePlan() {
      console.log("numbers");
      console.log(weekNumber);
      console.log(dayNumber);
      if (weekNumber == 500 || weekNumber == 4000) {
        return;
      }

      myPlan.weeks[weekNumber].array[dayNumber].state = "done";
      //myPlan.weeks[1+1].array[2+1].state = "today";

      if (myPlan.currentDay < myPlan.weeks[weekNumber].array.length - 1) {
        myPlan.currentDay++;
      } else {
        myPlan.currentWeek++;
        myPlan.currentDay = 0;
      }
      myPlan.weeks[myPlan.currentWeek].array[myPlan.currentDay].state = "today";
      let parseArray = JSON.parse(JSON.stringify(myPlan.weeks));

      let sendArray = {
        planName: myPlan.planName,
        currentDay: myPlan.currentDay,
        currentWeek: myPlan.currentWeek,
        totalDays: myPlan.totalDays,
        weeks: parseArray,
      };

      await planStorage.removeItem(myPlan.planName);
      await planStorage.setItem(sendArray.planName, sendArray);
      await reloadPlanStore();
      //const planStore = useMyPlanStore();
      // await planStore.workoutToArray
    }

    async function workoutToStatistics() {
      statisticStorage.setItem(id, {
        workoutname: props.page,
        date: date,
        calendarDate: today,
        minutes: props.proptime,
      });
      await store.addToStatisticsList({
        workoutname: props.page,
        date: date,
        calendarDate: today,
        minutes: props.proptime,
      });
    }

    watch(
      () => props.isFinished,
      (newValue) => {
        if (newValue == true) {
          updatePlan();
          workoutToStatistics();
        }
      },
      { deep: true }
    );

    const finishedImage = computed(() => {
      return props.page == "beginner" ||
        props.page == "advanced" ||
        props.page == "champ"
        ? require("../assets/HomePageWorkoutImages/" + props.page + ".png")
        : require("../assets/HomePageWorkoutImages/beginner.png");
    });

    function navigateBack() {
      if (weekNumber == 500 || weekNumber == 4000) {
        router.push({ path: "/statistics", replace: true });
        emit("resetAll");
      } else {
        router.push({ path: "/myPlans", replace: true });
        emit("resetAll");
      }
    }

    return {
      props,
      finishText,
      finishSubtext,
      finishedImage,
      date,
      navigateBack,
    };
  },
});
</script>

<style scoped>
.grid-style-finish {
  height: 100%;
  width: 100%;
  background-size: cover;
  display: grid;
  grid-template-rows: [row1-start] 15% [row1-end] 15% [row2-start] 10% [row2-end]35% [row3-start] 25% [row3-end];
  grid-template-columns: [line1] 100% [line2];
}

ion-card {
  height: 100%;
  width: 100%;
  margin: 0;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

img {
  height: 100%;
  width: 100%;
}

.finish-text {
  font-size: 48px;
  justify-self: center;
  align-self: center;
  grid-row: row1-end / row2-start;
  grid-column: line1 / line2;
  color: var(--ion-color-primary);
}

.finish-subtext {
  font-size: 18px;
  justify-self: center;
  align-self: center;
  grid-row: row2-start / row2-end;
  grid-column: line1 / line2;
  color: var(--ion-color-primary);
}

.finish-workout {
  justify-self: center;
  align-self: center;
  grid-row: row2-end / row3-start;
  grid-column: line1 / line2;

  width: 100%;
  height: 100%;
}

.finish-buttons {
  justify-self: center;
  align-self: center;
  grid-row: row3-start / row3-end;
  grid-column: line1 / line2;
  width: 100%;
}

ion-button {
  width: 100%;
}
</style>
