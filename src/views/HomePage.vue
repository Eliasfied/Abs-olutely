<template>
  <ion-page>
    <the-footer title="EasyAbs"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="quickstart-text-div"><p>Quickstart</p></div>
        <div v-if="showPlanWorkout" class="current-planWorkout-div">
          <ion-card @click="toActivePlan" class="create-plan-card">
            <ion-icon class="add-icon" :icon="arrowForwardCircle"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline">{{
                activePlan
              }}</ion-label>
              <ion-label class="create-plan-label-text"
                >continue your plan</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div v-if="!showPlanWorkout" class="create-plan-div">
          <ion-card @click="toCreatePlans" class="create-plan-card">
            <ion-icon class="add-icon" :icon="bookOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >Start the Journey!</ion-label
              >
              <ion-label class="create-plan-label-text"
                >create your own Plan</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="workouts-text-div"><p>Workouts</p></div>

        <div class="quickstart-div-grid">
          <div class="beginner-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="beginnerWorkoutName"
                :urlprefix="urlprefix"
                imageName="beginner"
                difficulty="1"
              >
              </workout-card
            ></ion-card>
          </div>
          <div class="advanced-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="advancedWorkoutName"
                :urlprefix="urlprefix"
                imageName="advanced"
                difficulty="2"
              >
              </workout-card
            ></ion-card>
          </div>
          <div class="champ-div">
            <ion-card class="quickWorkout-card"
              ><workout-card
                :workoutName="champWorkoutName"
                :urlprefix="urlprefix"
                imageName="champ"
                difficulty="3"
              ></workout-card
            ></ion-card>
          </div>
        </div>
        <div class="more-text-div"><p>More</p></div>
        <div class="myPlans-div">
          <ion-card @click="toMyPlans" class="myPlans-card">
            <ion-icon class="add-icon" :icon="readerOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline">my Plans</ion-label>
              <ion-label class="create-plan-label-text"
                >my custom Plans</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="myWorkouts-div">
          <ion-card @click="toMyWorkouts" class="myWorkouts-card">
            <ion-icon class="add-icon" :icon="barbellOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline"
                >my Workouts</ion-label
              >
              <ion-label class="create-plan-label-text"
                >my custom Workouts</ion-label
              >
            </div>
          </ion-card>
        </div>
        <div class="statistics-div">
          <ion-card @click="toMyWorkouts" class="settings-card">
            <ion-icon class="add-icon" :icon="settingsOutline"></ion-icon>
            <div class="label-flex-div">
              <ion-label class="create-plan-label-headline">Settings</ion-label>
              <ion-label class="create-plan-label-text"
                >check your Settings</ion-label
              >
            </div>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonCard, IonIcon, IonLabel } from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { useWorkoutsStore } from "../store/workouts";
import { useMyPlanStore } from "../store/myPlans";
import TheFooter from "../components/reusable/TheFooter.vue";
import { ref } from "vue";
import { onIonViewWillLeave } from "@ionic/vue";
import WorkoutCard from "../../src/components/reusable/WorkoutCard.vue";
import {
  addSharp,
  bookOutline,
  readerOutline,
  barbellOutline,
  settingsOutline,
  arrowForwardCircle,
} from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    TheFooter,
    IonCard,
    WorkoutCard,
    IonIcon,
    IonLabel,
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
    let planStore;
    const plans: any = ref([]);
    async function loadStore() {
      const store = useWorkoutsStore();
      planStore = useMyPlanStore();
      await planStore.loadPlansFromStore();
      await store.loadWorkoutsFromStore();
      list = store.workoutList;
      plans.value = planStore.planList;

      // beginnerWorkoutName = "beginner";
      beginnerWorkoutName.value = list[0].name;
      // advancedWorkoutName = "advanced";
      advancedWorkoutName.value = list[1].name;
      // champWorkoutName = "champ";
      champWorkoutName.value = list[2].name;
    }

    loadStore();

    let showPlanWorkout = computed(() => {
      if (plans.value.length > 0 && planStore.activePlan != "noPlan") {
        return true;
      } else {
        return false;
      }
    });

    let activePlan = computed(() => {
      return planStore.activePlan;
    });

    function toActivePlan() {
      router.push("/planPreview/" + planStore.activePlan);
    }

    planStore.$subscribe(
      (mutation, state) => {
        console.log("a change happened");
        console.log(mutation, state);
        plans.value = state.planList;
      },
      { detached: true }
    );

    const router = useRouter();

    function toMyPlans() {
      router.push("/myPlans");
    }
    function toMyWorkouts() {
      router.push("/myworkouts");
    }
    let routeID;
    function toCreatePlans() {
      routeID = Math.floor(Math.random() * 1000);

      router.push({
        path: "/workoutplan/" + routeID + "/createPlanName",
      });
    }

    return {
      beginnerWorkoutName,
      advancedWorkoutName,
      champWorkoutName,
      loadStore,
      closeMenu,
      urlprefix,
      showPlanWorkout,
      addSharp,
      bookOutline,
      readerOutline,
      barbellOutline,
      toMyWorkouts,
      toMyPlans,
      toCreatePlans,
      settingsOutline,
      arrowForwardCircle,
      activePlan,
      toActivePlan,
    };
  },
});
</script>

<style scoped>
.grid-page {
  height: 100%;
  display: grid;
  grid-template-rows: [row1-start] 5% [row1-end] 15% [row2-start] 5% [row2-end]20% [row3-start]5% [row3-end]15% [row4-start] 15% [row4-end] 15% [row5-start];
  grid-template-columns: [column1-start] 100% [column1-end];
}

.quickstart-text-div {
  grid-row: row1-start / row1-end;
  grid-column: column1-start / column1-end;
}
.current-planWorkout-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
}

.create-plan-div {
  grid-row: row1-end / row2-start;
  grid-column: column1-start / column1-end;
}

.workouts-text-div {
  grid-row: row2-start / row2-end;
  grid-column: column1-start / column1-end;
}
.quickstart-div-grid {
  grid-row: row2-end / row3-start;
  grid-column: column1-start / column1-end;
  display: grid;
  grid-template-rows: [row1-start] 100% [row1-end];
  grid-template-columns: [column1-start] 33% [column1-end] 33% [column2-start] 33% [column2-end];
}
.beginner-div {
  height: 100%;
  width: 100%;
  grid-row: row1-start / row1-end;
  grid-template: column1-start / column1-end;
  align-self: center;
  justify-self: center;
}
.advanced-div {
  grid-row: row1-start / row1-end;
  grid-template: column1-end / column2-start;
}
.champ-div {
  grid-row: row1-start / row1-end;
  grid-template: column2-start / column2-end;
}
.quickWorkout-card {
  height: 90%;
  width: 90%;
}
.currentWorkout-card {
  height: 90%;
}

.create-plan-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #dbbfdd;
  padding: 5%;
}
.myPlans-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
.myWorkouts-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
.settings-card {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5%;
  background-color: #80abca;
  padding: 5%;
}
p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}
.more-text-div {
  grid-row: row3-start / row3-end;
  grid-column: column1-start / column1-end;
}
.myPlans-div {
  grid-row: row3-end / row4-start;
  grid-column: column1-start / column1-end;
}
.myWorkouts-div {
  grid-row: row4-start / row4-end;
  grid-column: column1-start / column1-end;
}
.statistics-div {
  grid-row: row4-end / row5-start;
  grid-column: column1-start / column1-end;
}

.add-icon {
  font-size: 64px;
  color: white;
}

.label-flex-div {
  display: flex;
  flex-direction: column;
}
.create-plan-label-headline {
  font-size: 18px;
  color: white;
  font-weight: bold;
}
.create-plan-label-text {
  font-size: 12px;
  color: white;
  font-weight: bold;
}
</style>
