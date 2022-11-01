<template>
  <ion-page>
    <the-footer title="EasyAbs" @openSideMenu="openSideMenu"> </the-footer>
    <ion-content :fullscreen="true" color="primary">
      <ion-grid>
        <ion-row>
          <ion-col>
            <router-link
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
import { ref } from "vue";

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
    //sideMENÜ LOGIC

    function openSideMenu() {
      console.log("opensidemenu");
    }

    //get the workouts that are saved in the store
    let list;
    let beginnerWorkoutName = ref("");
    let advancedWorkoutName = ref("");
    let champWorkoutName = ref("");
    async function loadStore() {
      const store = useWorkoutsStore();
      await store.loadWorkoutsFromStore();
      list = store.workoutList;
      console.log("STORE: ");
      console.log(store);
      console.log(list);

      // beginnerWorkoutName = "beginner";
      beginnerWorkoutName.value = list[0].name;
      // advancedWorkoutName = "advanced";
      advancedWorkoutName.value = list[1].name;
      // champWorkoutName = "champ";
      champWorkoutName.value = list[2].name;
    }

    loadStore();

    console.log("zweite list");
    console.log(list);

    return {
      beginnerWorkoutName,
      advancedWorkoutName,
      champWorkoutName,
      loadStore,
      openSideMenu,
    };
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
