<template>
  <ion-page>
    <ion-content :fullscreen="true" color="primary">
      <ion-grid>
        <ion-row>
          <ion-col
            ><router-link
              class="routerLink"
              :to="'/preview/' + beginnerWorkoutName"
            >
              <ion-card class="beginnerCardImage">
                <ion-card-header>
                  <ion-card-title color="tertiary">Beginner</ion-card-title>
                </ion-card-header>
                <ion-card-content> </ion-card-content>
              </ion-card>
            </router-link>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <router-link
              class="routerLink"
              :to="'/preview/' + advancedWorkoutName"
            >
              <ion-card class="advancedCardImage">
                <ion-card-header>
                  <ion-card-title color="tertiary">Advanced</ion-card-title>
                </ion-card-header>

                <ion-card-content> </ion-card-content>
              </ion-card> </router-link
          ></ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <router-link
              class="routerLink"
              :to="'/preview/' + champWorkoutName"
            >
              <ion-card class="champCardImage">
                <ion-card-header>
                  <ion-card-title color="tertiary">Champ</ion-card-title>
                </ion-card-header>
                <ion-card-content> </ion-card-content> </ion-card
            ></router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <the-footer></the-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import TheFooter from "../components/TheFooter.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    TheFooter,
  },

  setup() {
    //get the workouts that are saved in the store
    const store = useWorkoutsStore();
    const list = store.workoutList;

    let beginnerWorkoutName = list[0].name;
    let advancedWorkoutName = list[1].name;
    let champWorkoutName = list[2].name;

    return { beginnerWorkoutName, advancedWorkoutName, champWorkoutName };
  },
});
</script>

<style scoped>

ion-grid {
  height: 100%;
}

ion-row {
  height: 33.33%;
}

ion-card-title {
  font-size: 40px;
}
.beginnerCardImage {
  height: 100%;
  margin: 0;
  background-image: url("../assets/HomePageWorkoutImages/beginner.png");
  background-size: cover;
}
.advancedCardImage {
  height: 100%;
  margin: 0;
  background-image: url("../assets/HomePageWorkoutImages/advanced.png");
  background-size: cover;
}
.champCardImage {
  height: 100%;
  margin: 0;
  background-image: url("../assets/HomePageWorkoutImages/champ.png");
  background-size: cover;
}

.routerLink {
  text-decoration: none;
}
</style>
