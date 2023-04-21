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
            <ion-label class="add-label" color="secondary">Save</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="saveOutline"
            ></ion-icon
          ></ion-button>
        </div>
        <div class="navigation">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li class="active"></li>
          </ul>
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
  build,
} from "ionicons/icons";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonIcon,
  IonCard,
  IonFooter,
  alertController,
} from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { useRouter } from "vue-router";
import planStorage from "../storage/myPlanStorage";
import TheFooter from "../components/reusable/TheFooter.vue";
import activePlanStorage from "../storage/activePlanStorage";

export default defineComponent({
  name: "createPlanCustomize",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonIcon,
    IonCard,
    IonFooter,
  },
  setup() {
    let planStore;
    planStore = useMyPlanStore();
    async function loadStore() {
      await planStore.loadPlansFromStore();
    }

    let name = planStore.planName;
    let days = planStore.planDays;
    let weeks = planStore.planWeeks;
    let router = useRouter();
    let weekArray = ref([]) as any;
    let dayArray = [] as any;
    planStore.setArray(weekArray);
    let index1 = ref(0) as any;

    let dayArrayFirst = [] as any;

    for (let i = 1; i < days + 1; i++) {
      dayArray.push({ dayInt: i, state: "open", doneDate: "" });
    }

    for (let i = 1; i < days + 1; i++) {
      if (i == 1) {
        dayArrayFirst.push({ dayInt: i, state: "today", doneDate: "" });
      } else {
        dayArrayFirst.push({ dayInt: i, state: "open", doneDate: "" });
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
      index1.value = index;

      planStore.setCurrentIndex(index1);
      router.push("/workoutList");
    }
    const handlerMessage = ref();
    async function goToPreview() {
      for (let i = 0; i < weekArray.value.length; i++) {
        if (weekArray.value[i].weekWorkout == "empty") {
          console.log("ist empty man");
          const alert = await alertController.create({
            header: "save plan not possible",
            message: "add a workout to every week",
            cssClass: "custom-alert",
            buttons: [
              {
                text: "Ok",
                cssClass: "alert-button-confirm",
                handler: () => {
                  handlerMessage.value = 1;
                },
              },
            ],
          });

          await alert.present();
          await alert.onDidDismiss();
          return;
        }
      }
      await activePlanStorage.removeItem("activePlan");
      await activePlanStorage.setItem("activePlan", { activePlan: name });
      let parseArray = JSON.parse(JSON.stringify(weekArray.value));
      let sendArray = {
        isDefault: false,
        planName: name,
        currentDay: 0,
        currentWeek: 0,
        totalDays: weeks * days,
        weeks: parseArray,
      };
      console.log("das ist sendArray" + sendArray);
      await planStorage.setItem(name, sendArray);
      await loadStore();
      router.push("/planPreview/" + name);
    }

    let cardIcon = computed(() => (index) => {
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
  grid-template-columns: [column1-start] 15% [column1-end] 70% [column2-start] 15% [column2-end];
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

.create-workouts-div {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column2-end;
  align-self: end;
  justify-self: center;
}

.icon-build {
  font-size: 40px;
  color: black;
}

.icon-weeks {
  font-size: 40px;
  color: var(--ion-color-light);

}

.headline-label {
  color: var(--ion-color-light);
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
  position: fixed;
  bottom: 17.5%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
  width: 50%;
}

.add-label {
  font-weight: bold;
  font-size: 14px;
}

.navigation {
  background-color: white;
  padding: 10px;
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
  justify-self: center;
  align-self: center;
}

.navigation ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.navigation li {
  background-color: #e5e5e5;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.navigation li.active {
  background-color: #333;
}
</style>
