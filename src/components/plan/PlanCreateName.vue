<template>
  <ion-page>
    <ion-content color="tertiary">
      <div class="grid-page">
        <div>
          <BackButton></BackButton>
        </div>
        <div class="icon-div">
          <ion-icon :icon="bookSharp" class="customize-icon"></ion-icon>
        </div>
        <div class="headline-div">
          <div class="week-headline-label">
            <ion-label class="headline-label">Planname</ion-label>
          </div>
        </div>
        <div class="input-div">
          <ion-input v-model="name" placeholder="mein Plan 2023"></ion-input>
        </div>
        <div class="explain-text">
          <ion-label class="explain-label">
            Gib deinem Plan einen Namen
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
            <ion-label class="add-label" color="secondary">Weiter</ion-label>
            <ion-icon
              size="large"
              slot="start"
              color="secondary"
              :icon="arrowForwardOutline"
            ></ion-icon
          ></ion-button>
        </div>
        <div class="navigation">
          <ul>
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bookSharp, arrowForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonIcon,
  IonFooter,
  alertController,
} from "@ionic/vue";
import { useMyPlanStore } from "@/store/myPlans";
import useRouteId from "@/composables/getPlanRouteID";
import planStorage from "@/storage/myPlanStorage";
import BackButton from "@/components/reusable/BackButton.vue";

let router = useRouter();
let planStore = useMyPlanStore();
let name = ref("") as any;

let routeID = useRouteId();
const handlerMessage = ref();

async function goToWeeks() {
  if (name.value == "") {
    const alert = await alertController.create({
      header: "Invalid Plan Name",
      message: "Plan Name darf nicht leer sein",
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

  planStorage
    .keys()
    .then(async function (keys) {
      if (keys.includes(name.value)) {
        const alert = await alertController.create({
          header: "Invalider Plan Name",
          message: "Ein Plan mit diesem Namen existiert bereits",
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
      } else {
        planStore.setPlanName(name);
        router.push({
          path: "/workoutplan/" + routeID.currentRouteId + "/planCreateWeeks",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start]5%[row1-end] 10% [row2-start] 15% [row2-end] 10% [row3-start] 30% [row3-end] 10% [row4-start];
  background-color: #f8f9f9;
}

.back-div {
  grid-row: row1-start / row1-end;
  align-self: center;
  justify-self: start;
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
  align-self: end;
  justify-self: center;
  height: 30%;
  width: 60%;
  margin-bottom: 5%;
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
