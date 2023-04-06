<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>
        <div class="icon-div"><ion-icon :icon="bookSharp"></ion-icon></div>
        <div class="text-div"><p>Start your journey now</p></div>
        <div class="label-div">
          <ion-label position="floating">give your plan a name</ion-label>
        </div>
        <div class="input-div">
          <ion-input v-model="name" placeholder="my planname"></ion-input>
        </div>
        <div class="point-div"></div>
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
  grid-template-rows: [row1-start]10%[row1-end] 30% [row2-start] 15% [row2-end] 10% [row3-start] 15% [row3-end];
  background-color: #f8f9f9;
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

.label-div {
  grid-row: row2-end / row3-start;
  align-self: start;
  justify-self: center;
}

ion-label {
  font-size: 24px;
  color: #80abca;
}

.input-div {
  grid-row: row3-start / row3-end;
  align-self: end;
  justify-self: center;
  height: 60%;
  width: 80%;
}

ion-input {
  border: 1px solid #bce3f7;
  border-radius: 15px;
  color: white;
  background-color: #bce3f7;
  height: 100%;
  width: 100%;
  font-size: larger;
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
