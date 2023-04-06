<template>
  <ion-page>
    <!-- <the-footer title="customize"> </the-footer> -->
    <ion-content color="tertiary">
      <div class="grid-page">
        <div class="icon-div">
          <ion-icon class="customize-icon" :icon="constructSharp"></ion-icon>
        </div>
        <div class="headline-div">
          <div class="week-headline-icon">
            <ion-icon class="icon-weeks" :icon="calendarSharp"></ion-icon>
          </div>
          <div class="week-headline-label">
            <ion-label class="headline-label">workouts</ion-label>
          </div>
        </div>

        <div class="list-div">
          <ul>
            <li class="li-grid" v-for="(week, index) in weekArray" :key="index">
              <div class="day-div">
                <ion-label class="day-label">{{ index + 1 }}</ion-label>
              </div>
              <div class="">
                <ion-card class="list-card" @click="addWorkout(index)">
                  <div class="card-div">
                    <ion-label :class="labelStyle(index)" color="secondary">{{
                      week.weekWorkout
                    }}</ion-label>

                    <ion-icon
                      class="card-icon"
                      :icon="cardIcon(index)"
                    ></ion-icon>
                  </div>
                </ion-card>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer-grid">
        <div class="addExercise">
          <ion-button
            class="add-button"
            shape="round"
            color="warning"
            @click="goToPreview()"
          >
            <ion-label color="secondary">Save</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="saveOutline"
            ></ion-icon
          ></ion-button>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { ref } from "vue";
import {
  constructSharp,
  arrowForwardOutline,
  calendarSharp,
  saveOutline,
  helpOutline,
  barChartOutline,
  barbellOutline,
} from "ionicons/icons";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonIcon,
  IonCard,
  IonFooter,
} from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { useRouter } from "vue-router";
import planStorage from "../storage/myPlanStorage";
import TheFooter from "../components/reusable/TheFooter.vue";

export default defineComponent({
  name: "createPlanCustomize",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonIcon,
    IonCard,
    // TheFooter,
    IonFooter,
  },
  setup() {
    let planStore;
    planStore = useMyPlanStore();
    async function loadStore() {
      await planStore.loadPlansFromStore();
    }

    let name = planStore.planName;
    console.log("name plan");
    console.log(name);
    let days = planStore.planDays;
    let weeks = planStore.planWeeks;
    let router = useRouter();
    let weekArray = ref([]) as any;
    let dayArray = [] as any;
    planStore.setArray(weekArray);
    console.log("this is weekarray:" + weekArray);
    let index1 = ref(0) as any;

    let dayArrayFirst = [] as any;

    for (let i = 1; i < days + 1; i++) {
      dayArray.push({ dayInt: i, state: "open" });
    }

    for (let i = 1; i < days + 1; i++) {
      if (i == 1) {
        dayArrayFirst.push({ dayInt: i, state: "today" });
      } else {
        dayArrayFirst.push({ dayInt: i, state: "open" });
      }
    }

    for (let i = 1; i < weeks + 1; i++) {
      if (i == 1) {
        planStore.pushArray({
          weekInt: i,
          weekWorkout: "empty",
          array: JSON.parse(JSON.stringify(dayArrayFirst)),
        });
      } else {
        planStore.pushArray({
          weekInt: i,
          weekWorkout: "empty",
          array: JSON.parse(JSON.stringify(dayArray)),
        });
      }
    }

    function addWorkout(index) {
      console.log("kommt noch");
      index1.value = index;
      console.log("index:");
      console.log(index);
      console.log("index1:");
      console.log(index1);
      planStore.setCurrentIndex(index1);
      router.push("/workoutList");
    }

    async function goToPreview() {
      console.log("go to" + name);
      let parseArray = JSON.parse(JSON.stringify(weekArray.value));
      let sendArray = {
        planName: name,
        currentDay: 0,
        currentWeek: 0,
        totalDays: weeks * days,
        weeks: parseArray,
      };
      console.log("das ist sendArray" + sendArray);
      //sendArray.name = name;
      await planStorage.setItem(name, sendArray);
      await loadStore();
      router.push("/planPreview/" + name);
    }

    let cardIcon = computed(() => (index) => {
      console.log(weekArray);
      console.log(index);
      console.log(weekArray.value[index].weekWorkout);
      if (weekArray.value[index].weekWorkout == "empty") {
        return helpOutline;
      } else {
        return barbellOutline;
      }
    });

    let labelStyle = computed(() => (index) => {
      if (weekArray.value[index].weekWorkout == "empty") {
        return "card-label";
      } else {
        return "card-label-filled";
      }
    });

    return {
      name,
      constructSharp,
      arrowForwardOutline,
      days,
      weeks,
      planStore,
      weekArray,
      addWorkout,
      router,
      index1,
      goToPreview,
      calendarSharp,
      saveOutline,
      helpOutline,
      barChartOutline,
      cardIcon,
      labelStyle,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]5%[row1-end] 10% [row2-start] 15% [row2-end] 10% [row3-start] 60% [row3-end];
}

.icon-div {
  grid-row: row1-end / row2-end;
  align-self: center;
  justify-self: center;
  align-self: center;
  justify-self: center;
}

.customize-icon {
  font-size: 120px;
  color: #dbbfdd;
}

.text-div {
  grid-row: row2-start / row2-end;
  justify-self: center;
  align-self: center;
}

.headline-div {
  height: 100%;
  width: 100%;
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 15% [column1-end] 85% [column2-start];
}

p {
  color: #80abca;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.p-duration {
  font-size: 16px;
  grid-row: row2-end / row3-start;
  justify-self: center;
  text-align: center;
}

.week-headline-icon {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  align-self: end;
  justify-self: center;
}

.week-headline-label {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: end;
  justify-self: start;
}

.icon-weeks {
  font-size: 40px;
  color: black;
}

.headline-label {
  color: black;
  font-weight: bold;
}

ion-label {
  font-size: 24px;
  color: #80abca;
  text-align: center;
}

.list-div {
  height: 100%;
  width: 100%;
  grid-row: row3-start / row3-end;
  align-self: start;
  justify-self: center;
}

ul {
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.li-grid {
  height: 15%;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 15% [column1-end] 85% [column2-start];
  margin: 5%;
  margin-left: 0;
}

.day-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
  display: flex;
  justify-content: center;
  align-items: center;
}
.day-label {
  display: block;
  text-align: center;
}

.card-div {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-icon {
  display: block;
  text-align: center;
  color: white;
  font-size: 32px;
  margin-right: 5%;
}

.list-card {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  height: 100%;
  background-color: skyblue;
  color: black;
  font-weight: bold;
  margin: 0px;
}

.card-label {
  display: block;
  text-align: center;
  color: white;
  margin-left: 5%;
  opacity: 0.5;
}

.card-label-filled {
  display: block;
  text-align: center;
  color: white;
  margin-left: 5%;
  opacity: 1;
}

ion-input {
  border: 2px solid black;
}

.button-div {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
}

ion-footer {
  height: 20%;
}
.footer-grid {
  display: grid;
  grid-template-rows: [row1-start] 20% [row1-end] 80% [row2-start];
  grid-template-columns: [column1-start] 100% [column1-end];

  height: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-top: 0.5px solid lightgray;
}

.addExercise {
  grid-row: row1-start / row1-end;
  width: 100%;
  text-align: center;
}

.add-button {
  width: 60%;
  position: fixed;
  bottom: 17.5%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
}
</style>
