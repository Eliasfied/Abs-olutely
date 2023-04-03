<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div></div>
        <div class="icon-div"><ion-icon :icon="bookSharp"></ion-icon></div>
        <div class="text-div"><p>Start your Journey now</p></div>
        <div class="label-div">
          <ion-label position="floating">Enter a Name for your Plan:</ion-label>
        </div>
        <div class="input-div">
          <ion-input v-model="name" placeholder="my First Plan"></ion-input>
        </div>
        <div class="button-div">
          <ion-button @click="goToWeeks">Next</ion-button>
        </div>
        <div class="point-div"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { bookOutline, bookSharp } from "ionicons/icons";
import { useRouter, useRoute } from "vue-router";
import { IonContent, IonPage, IonLabel, IonInput, IonIcon } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import useRouteId from "../composables/getPlanRouteID";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, IonLabel, IonInput, IonIcon },
  setup() {
    let router = useRouter();
    let planStore = useMyPlanStore();
    let name = ref("") as any;

    let routeID = useRouteId();

    function goToWeeks() {
      planStore.setPlanName(name);
      router.push({
        path: "/workoutplan/" + routeID.currentRouteId + "/createPlanWeeks",
        replace: true,
      });
    }

    return {
      name,
      bookOutline,
      bookSharp,
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
  grid-template-rows: [row1-start]10%[row1-end] 30% [row2-start] 10% [row2-end] 5% [row3-start] 10% [row3-end] 5% [row4-start] 5% [row4-end];
}

.icon-div {
  grid-row: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

ion-icon {
  font-size: 256px;
  color: skyblue;
}

.text-div {
  grid-row: row2-start / row2-end;
  justify-self: center;
}

p {
  color: black;
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
  color: grey;
}

.input-div {
  grid-row: row3-start / row3-end;
  align-self: center;
  justify-self: center;
}

ion-input {
  border: 2px solid black;
  color: black;
}

.button-div {
  grid-row: row3-end / row4-start;
  align-self: start;
  justify-self: center;
}

ion-button {
}
</style>
