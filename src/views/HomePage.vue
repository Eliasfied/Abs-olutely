<template>
  <ion-page>
    <the-footer title="EasyAbs"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <ion-grid>
        <ion-row>
          <ion-col>
            <workout-card
              :workoutName="beginnerWorkoutName"
              :urlprefix="urlprefix"
              imageName="beginner"
            
            >
            </workout-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <workout-card
              :workoutName="advancedWorkoutName"
              :urlprefix="urlprefix"
              imageName="advanced"
            >
            </workout-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <workout-card
              :workoutName="champWorkoutName"
              :urlprefix="urlprefix"
              imageName="champ"
            >
            </workout-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonCol, IonRow } from "@ionic/vue";
import { defineComponent } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref } from "vue";
import { onIonViewWillLeave } from "@ionic/vue";
import WorkoutCard from "@/components/reusable/WorkoutCard.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    TheFooter,
    WorkoutCard,
  },

  setup() {
    let closeMenu = ref(false);
    onIonViewWillLeave(() => {
      console.log("Home page did leave");

      // BIS AN SIDEMENU WEITERGEBEN UND DORT WATCHEN UND DANN DAS HIER TRIGGERN
      closeMenu.value = true;
    });

    //sideMENÜ LOGIC

    //get the workouts that are saved in the store
    let list;
    let beginnerWorkoutName = ref("");
    let advancedWorkoutName = ref("");
    let champWorkoutName = ref("");
    let urlprefix = "/preview/";
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
      closeMenu,
      urlprefix,
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
</style>
