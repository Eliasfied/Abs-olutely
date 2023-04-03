m
<template>
  <ion-page>
    <the-footer title="customize"> </the-footer>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>

        <div class="icon-div"><ion-icon :icon="constructSharp"></ion-icon></div>
        <div class="text-div"><p>Customize</p></div>
        <div class="label-div">
          <ion-label position="floating"
            >Assign Workouts to {{ name }}
          </ion-label>
        </div>
        <div class="list-div">
          <ul>
            <li v-for="(week, index) in weekArray" :key="index">
              <ion-card class="list-card" @click="addWorkout(index)">
                <ion-label class="card-label" color="secondary">{{ week.weekInt + ")" }}</ion-label>
                <ion-label class="card-label" color="secondary">{{ week.weekWorkout }}</ion-label>
              </ion-card>
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
            <ion-label color="secondary">Continue</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="arrowForwardOutline"
            ></ion-icon
          ></ion-button>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { constructSharp, arrowForwardOutline } from "ionicons/icons";
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
    TheFooter,
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
          weekWorkout: "no workout added yet",
          array: JSON.parse(JSON.stringify(dayArrayFirst)),
        });
      } else {
        planStore.pushArray({
          weekInt: i,
          weekWorkout: "no workout added yet",
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
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]5%[row1-end] 30% [row2-start] 10% [row2-end] 5% [row3-start] 50% [row3-end];
}

.icon-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

ion-icon {
  font-size: 256px;
  color: #dbbfdd;

}

.text-div {
  grid-row: row2-start / row2-end;
  justify-self: center;
  align-self: center;
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

.label-div {
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
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
  padding: 5%;
  margin: 0;
  overflow-y: auto;
}

li {
  height: 20%;
}
.list-card {
  height: 100%;
  background-color: skyblue;
  color: black;
  font-weight: bold;
}

.card-label {
  margin: 5px;
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
}
</style>
