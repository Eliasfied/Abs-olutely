<template>
  <ion-page>
    <the-footer title="personalisierte Pläne"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-style-plans">
        <div class="quickstart-text-div"><p>personalisierte Pläne</p></div>
        <div class="plan-list">
          <ul>
            <li v-for="(plan, index) in plans" :key="plan">
              <ion-card @click="goToPlanPreview(plan.id)">
                <div class="grid-style-li">
                  <div class="plan-icon">
                    <ion-icon class="add-icon" :icon="readerOutline"></ion-icon>
                  </div>
                  <div class="label-planname">
                    <ion-label>{{ plan.name }}</ion-label>
                  </div>
                  <div class="label-last-workout">
                    <ion-label>{{ lastWorkout(index) }}</ion-label>
                  </div>
                  <div class="label-planlength">
                    <ion-label class="style-label">
                      {{ planWeeks(index) }}
                    </ion-label>
                    <ion-icon
                      class="icon-color-weeks"
                      :icon="calendarOutline"
                    ></ion-icon>
                  </div>
                  <div class="label-plandone">
                    <ion-label class="style-label">
                      {{ planDone(index) }}
                    </ion-label>
                    <ion-icon class="icon-color-weeks" :icon="flag"></ion-icon>
                  </div>
                  <div class="icon-trash">
                    <ion-icon
                      @click.stop="deletePlan(index)"
                      class="icon-color-trash"
                      :icon="trash"
                    ></ion-icon>
                  </div>
                </div>
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
            @click="addPlan()"
            ><ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="addCircle"
            ></ion-icon
            ><ion-label color="secondary">Neuer Plan</ion-label></ion-button
          >
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonCard,
  IonLabel,
  IonIcon,
  alertController,
} from "@ionic/vue";
import {
  addCircle,
  trash,
  readerOutline,
  calendarOutline,
  flag,
} from "ionicons/icons";
import { ref } from "vue";
import planStorage from "@/storage/myPlanStorage";
import { useMyPlanStore } from "@/store/myPlans";
import TheFooter from "@/components/reusable/TheFooter.vue";
import activePlanStorage from "@/storage/activePlanStorage";
import { deletePlanFromDB } from "@/services/planService";
import { formatDate } from "@/composables/formatDate";

const router = useRouter();
const plans: any = ref([]);
let store;

async function loadStore() {
  store = useMyPlanStore();
  await store.loadPlansFromStore();
  plans.value = store.planList;
}

function goToPlanPreview(id: string) {
  router.push("/planPreview/" + id);
}

let routeID;
function addPlan() {
  routeID = Math.floor(Math.random() * 1000);
  router.push({
    path: "/workoutplan/" + routeID + "/planCreateName",
  });
}

const handlerMessage = ref();

async function deletePlan(index) {
  const alert = await alertController.create({
    header: "Plan löschen?",
    message: "Kann nicht rückgängig gemacht werden!",
    cssClass: "custom-alert",
    buttons: [
      {
        text: "Ja",
        cssClass: "alert-button-confirm",
        handler: () => {
          handlerMessage.value = 1;
        },
      },
      {
        text: "Nein",
        cssClass: "alert-button-cancel",
        handler: () => {
          handlerMessage.value = 0;
        },
      },
    ],
  });

  await alert.present();
  await alert.onDidDismiss();

  if (handlerMessage.value == 1) {
    if (navigator.onLine) {
      try {
        console.log("die id des zu löschenden plans ist: ");
        console.log(plans.value[index].id);
        await deletePlanFromDB(plans.value[index].id);
      } catch (error) {
        console.log(error);
      }
    }
    if (plans.value[index].planName == store.activePlan) {
      await activePlanStorage.removeItem("activePlan");
      await activePlanStorage.setItem("activePlan", {
        activePlan: "noPlan",
      });
      store.activePlan = "noPlan";
    }
    await planStorage.removeItem(plans.value[index].id);
    plans.value.splice(index, 1);
  }

  if (handlerMessage.value == 0) {
    return;
  }
}

let planWeeks = computed(() => (index) => {
  if (plans.value[index].weeks) {
    return plans.value[index].weeks.length;
  } else {
    return;
  }
});

let planDone = computed(() => (index) => {
  if (plans.value[index].currentDay == 0) {
    return "0%";
  } else {
    return (
      Math.round(
        (plans.value[index].currentDay / plans.value[index].totalDays) * 100
      ) + "%"
    );
  }
});

let lastWorkout = computed(() => (index) => {
  if (plans.value[index].lastWorkout != undefined) {
    return "letztes: " + formatDate(plans.value[index].lastWorkout);
  } else {
    return "";
  }
});

loadStore();
store.$subscribe(
  (mutation, state) => {
    plans.value = state.planList;
  },
  { detached: true }
);
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-card {
  width: 90%;
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.plan-card ion-card-content {
  display: flex;
  justify-content: center;
}

.plan-card ion-label {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}

.grid-style-plans {
  display: grid;
  height: 97.5%;
  grid-template-rows: [row1-start] 5% [row1-end] 95% [row2-start];
}

.grid-style-li {
  display: grid;
  height: 100%;
  grid-template-rows: [row1-start] 50% [row1-end] 50% [row2-start];
  grid-template-columns: [column1-start] 25% [column1-end] 40% [column2-start] 17.5% [column2-end] 17.5% [column3-start];
}

.quickstart-text-div {
  width: 100%;
  grid-row: row1-start / row1-end;
}

p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}

.plan-icon {
  grid-row: row1-start / row2-end;
  grid-column: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}

.add-icon {
  font-size: 64px;
  color: white;
}

.label-planname {
  grid-row: row1-start / row1-end;
  grid-column: column1-end / column2-start;
  align-self: end;
  justify-self: start;
  padding: 5%;
  color: var(--ion-color-primary);
  font-weight: bold;
  font-size: 18px;
}

.label-last-workout {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: start;
  justify-self: start;
  padding: 5%;
  color: var(--ion-color-primary);
  font-size: 13px;
  opacity: 0.8;
}

.label-planlength {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
}

.label-plandone {
  grid-row: row1-start / row1-end;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
}

.plan-time {
  grid-row: row1-end / row2-start;
  grid-column: column1-end / column2-start;
  align-self: start;
  justify-self: start;
  padding: 5%;
}

.icon-edit {
  grid-row: row1-end / row2-start;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.icon-trash {
  grid-row: row1-end / row2-start;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.icon-color-trash {
  color: red;
}

.icon-color-weeks {
  color: white;
  vertical-align: middle;
  margin-left: 5px;
}

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: white;
}

.style-label {
  vertical-align: middle;
  color: white;
}

.exercise-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-start / column2-end;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.break-time {
  grid-row: row1-start / row1-end;
  grid-column: column2-end / column3-start;
  align-self: center;
  justify-self: center;
  padding: 5%;
}

.exercise-time ion-icon {
  color: white;
  vertical-align: middle;
  padding: 5px;
}

.exercise-time ion-label {
  color: white;
  vertical-align: text-top;
}

.break-time ion-icon {
  color: white;
  vertical-align: middle;
}

.break-time ion-label {
  color: white;
  vertical-align: middle;
}

ion-button {
  font-weight: bold;
  color: var(--ion-color-primary);
}

ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
  vertical-align: middle;
}

li {
  width: 100%;
  height: 17.5%;
}

ul {
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  overflow-y: auto;
}

ion-card {
  height: 100%;
  background-color: #80abca;
}

ion-label {
  color: white;
}

.add-plan {
  width: 100%;
  grid-row: row1-start / row1-end;
  justify-self: center;
  align-self: center;
  text-align: center;
}

.plan-list {
  width: 100%;
  grid-row: row1-end / row2-start;
}

.no-plans-text {
  grid-row: row1-end / row2-start;
  text-align: center;
}

.ion-card-content {
  color: var(--ion-color-primary);
  font-size: medium;
  font-weight: bold;
}

.routerLink {
  height: 100%;
  text-decoration: none;
}

.icon-clipboard {
  align-self: center;
}

.style-clipboard {
  color: var(--ion-color-primary);
}
ion-footer {
  height: 10%;
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
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  color: #dbbfdd;
  width: 50%;
}
</style>
