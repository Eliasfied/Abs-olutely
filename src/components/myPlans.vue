<template>
  <ion-page>
    <the-footer title="myPlans"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-style-plans">
        <div class="quickstart-text-div"><p>my Plans</p></div>
        <div class="plan-list">
          <ul>
            <li
              v-for="plan in plans"
              :key="plan"
              @click="goToPlanPreview(plan.planName)"
            >
              <ion-card>
                <div class="grid-style-li">
                  <div class="plan-icon">
                    <ion-icon class="add-icon" :icon="readerOutline"></ion-icon>
                  </div>
                  <div class="label-planname">
                    <ion-label>{{ plan.planName }}</ion-label>
                  </div>

                  <div class="icon-edit"></div>
                  <div class="icon-trash">
                    <ion-icon class="icon-color-trash" :icon="trash"></ion-icon>
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
            ><ion-label color="secondary">Add Plan</ion-label></ion-button
          >
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonCard, IonLabel } from "@ionic/vue";
import {
  addCircle,
  clipboardOutline,
  create,
  trash,
  clipboard,
  hourglassOutline,
  barbellOutline,
  timeOutline,
  receiptOutline,
  bodyOutline,
  readerOutline,
} from "ionicons/icons";
import { ref, watch } from "vue";
import planStorage from "../storage/myPlanStorage";
import { useMyPlanStore } from "../store/myPlans";
import TheFooter from "../components/reusable/TheFooter.vue";

export default defineComponent({
  name: "myPlans",
  components: {
    IonPage,
    IonContent,
    TheFooter,
    IonCard,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const plans: any = ref([]);

    async function loadStore() {
      const store = useMyPlanStore();
      await store.loadPlansFromStore();
      plans.value = store.planList;
    }

    function goToPlanPreview(planName: string) {
      router.push("/planPreview/" + planName);
    }

    function addPlan() {
      router.push("/workoutPlan")
    }

    loadStore();

    return {
      plans,
      goToPlanPreview,
      addCircle,
      clipboardOutline,
      create,
      trash,
      clipboard,
      hourglassOutline,
      barbellOutline,
      timeOutline,
      receiptOutline,
      bodyOutline,
      readerOutline,
      addPlan,
    };
  },
});
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
  height: 90%;
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

.style-time {
  margin-right: 5px;
  vertical-align: middle;
  color: white;
}

.style-label {
  vertical-align: text-top;
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
}

ion-card {
  height: 100%;
  background-color: #bce3f7;
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
}
</style>
