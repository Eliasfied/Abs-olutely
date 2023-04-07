<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>
        <div class="icon-div">
          <ion-icon :icon="bookSharp" class="customize-icon"></ion-icon>
        </div>
        <div class="headline-div">
          <div class="week-headline-label">
            <ion-label class="headline-label">Plan name</ion-label>
          </div>
        </div>
        <div class="input-div">
          <ion-input v-model="name" placeholder="my planname"></ion-input>
        </div>
        <div class="explain-text">
          <ion-label class="explain-label">
            give your plan a name
          </ion-label>
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
            @click="goToWeeks()"
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
import { bookOutline, bookSharp, arrowForwardOutline } from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonIcon,
  IonFooter,
} from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import useRouteId from "../composables/getPlanRouteID";

export default defineComponent({
  name: "createPlanName",
  components: { IonContent, IonPage, IonLabel, IonInput, IonIcon, IonFooter },
  setup() {
    let router = useRouter();
    let planStore = useMyPlanStore();
    let name = ref("") as any;

    let routeID = useRouteId();

    function goToWeeks() {
      planStore.setPlanName(name);
      router.push({
        path: "/workoutplan/" + routeID.currentRouteId + "/createPlanWeeks",
      });
    }

    return {
      name,
      bookOutline,
      bookSharp,
      arrowForwardOutline,
      goToWeeks,
      planStore,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]5%[row1-end] 10% [row2-start] 15% [row2-end] 10% [row3-start] 30% [row3-end] 10% [row4-start];
  background-color: #f8f9f9;
}

.icon-div {
  grid-row: row1-end / row2-end;
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

p {
  color: #80abca;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.label-div {
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
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

.week-headline-label {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column2-start;
  align-self: center;
  justify-self: center;
}

.icon-weeks {
  font-size: 40px;
  color: black;
}

.headline-label {
  color: #80abca;
  font-weight: bold;
  font-size: 32px;
}

.input-div {
  grid-row: row3-start / row3-end;
  align-self: center;
  justify-self: center;
  height: 30%;
  width: 60%;
}

ion-input {
  border: 1px solid #bce3f7;
  border-radius: 15px;
  color: white;
  background-color: #bce3f7;
  height: 100%;
  width: 100%;
  font-size: x-large;
}


.explain-text {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
  margin: 10%;
  margin-top: 0;
}

.explain-label {
  font-size: 16px;
  color: grey;
  opacity: 0.7;
  
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
