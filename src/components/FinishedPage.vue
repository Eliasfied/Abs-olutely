<template>
  <ion-card color="medium">
    <div class="grid-style-finish">
      <div class="flag-div">
        <ion-icon class="flag-icon" :icon="ribbon" color="secondary"></ion-icon>
      </div>
      <div class="finish-subtext">
        <ion-label class="finish-subtext-label">
          {{ finishSubtext }}
        </ion-label>
      </div>
      <div v-if="isPlan" class="workout-details">
        <div class="progress-div">
          <p>your progress</p>
        </div>
        <div class="percentage-done-div">
          <ion-label class="percentage-done-label"> </ion-label>
        </div>
      </div>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            class="add-button"
            shape="round"
            color="warning"
            @click="navigateBack()"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="backspace"
            ></ion-icon
            ><ion-label color="secondary">Zurück</ion-label></ion-button
          >
        </div>
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
import defaultPlans from "@/storage/defaultPlanStorage";
import activePlanStorage from "../storage/activePlanStorage";
import { useWorkoutPlanData } from "../store/workoutPlanData";
import { useRoute, useRouter } from "vue-router";
import { flag, ribbon, medal, backspace } from "ionicons/icons";

export default defineComponent({
  name: "FinishedPage",
  components: { IonCard, IonButton },
  props: ["page", "proptime", "isFinished"],
  emits: ["resetAll"],
  setup(props, { emit }) {
    let finishSubtext = props.page + " abgeschlossen!";
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

    let isPlan = ref(false);

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
      let combinedPlans = planStore.planList.concat(planStore.prePlanList);
      myPlan = combinedPlans.find(
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
      await activePlanStorage.removeItem("activePlan");
      await activePlanStorage.setItem("activePlan", {
        activePlan: myPlan.planName,
      });
      myPlan.weeks[weekNumber].array[dayNumber].state = "done";
      myPlan.weeks[weekNumber].array[dayNumber].doneDate = date;

      //myPlan.weeks[1+1].array[2+1].state = "today";
      console.log(myPlan.currentWeek);
      console.log(myPlan.weeks);
      if (
        myPlan.currentWeek == myPlan.weeks.length - 1 &&
        myPlan.currentDay == myPlan.weeks[weekNumber].array.length - 1
      ) {
        console.log("letzte woche erreicht");
        myPlan.currentDay++;
      } else {
        if (myPlan.currentDay < myPlan.weeks[weekNumber].array.length - 1) {
          myPlan.currentDay++;
        } else {
          myPlan.currentWeek++;
          myPlan.currentDay = 0;
        }
        myPlan.weeks[myPlan.currentWeek].array[myPlan.currentDay].state =
          "today";
      }

      let parseArray = JSON.parse(JSON.stringify(myPlan.weeks));
      let lastWorkout = date;

      let sendArray = {
        isDefault: myPlan.isDefault,
        planName: myPlan.planName,
        currentDay: myPlan.currentDay,
        currentWeek: myPlan.currentWeek,
        totalDays: myPlan.totalDays,
        lastWorkout: lastWorkout,
        weeks: parseArray,
      };

      if (sendArray.isDefault == true) {
        await defaultPlans.removeItem(myPlan.planName);
        await defaultPlans.setItem(sendArray.planName, sendArray);
        await reloadPlanStore();
      } else {
        await planStorage.removeItem(myPlan.planName);
        await planStorage.setItem(sendArray.planName, sendArray);
        await reloadPlanStore();
      }
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
        workoutPlanDataStore.weekNumber = 500;
        workoutPlanDataStore.dayNumber = 500;
        router.push({ path: "/planPreview/" + myPlan.planName, replace: true });
        emit("resetAll");
      }
    }

    return {
      props,
      finishSubtext,
      finishedImage,
      date,
      navigateBack,
      flag,
      ribbon,
      medal,
      backspace,
      isPlan,
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

}

.flag-div {
  grid-row: row1-start / row2-start;
  grid-column: line1 / line2;
  align-self: center;
  justify-self: center;
}

.flag-icon {
  font-size: 112px;
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

.finish-subtext-label {
  color: white;
  font-size: larger;
  font-weight: bold;
}

.workout-details {
  grid-row: row2-end / row3-start;
  grid-column: line1 / line2;
}

.progress-div {
}

p {
  color: black;
  font-size: larger;
  font-weight: bold;
  margin-left: 5%;
}

.percentage-done-div {
}
.percentage-done-label {
}

ion-footer {
  height: 10%;
}
.footer-grid {
  grid-row: row3-start / row3-end;
  grid-column: line1 / line2;
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 100% [column1-end];

  height: 100%;
  background-color: var(--ion-color-light);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-top: 0.5px solid lightgray;
}

.addExercise {
  grid-row: row1-start / row1-end;
  width: 100%;
  text-align: center;
}

.add-button {
  position: fixed;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
  width: 60%;
}
</style>
