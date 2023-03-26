<template>
  <ion-page>
    <the-footer title="Planpreview"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="plan-headline-name">
         <p>Plan Name</p>
        </div>
        <div class="plan-name">
          <ion-label class="plan-name-label" color="primary">
            {{ weekArray.planName }}
          </ion-label>
        </div>
        <div class="weeks-headline">
          <p>Weeks</p>
        </div>
        <div class="weeks-div">
          <ul class="week-list">
            <li
              class="week-listitem"
              v-for="(week, index) in weekArray.weeks"
              :key="week"
            >
              <ion-card
                class="week-card"
                :class="{ 'selected-card': index === selectedCardIndex }"
                @click="changeWeek(index)"
              >
                Week {{ week.weekInt }}
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="days-headline">
          <p>Workouts this Week</p>
        </div>
        <div class="days-div">
          <ul class="days-ul">
            <li class="days-li" v-for="day in selectedWeek" :key="day">
              <ion-card class="days-card" @click="goToWorkout(weekIndex)">
                {{ weekArray.weeks[weekIndex].weekWorkout }}
              </ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { useMyWorkoutsStore } from "../store/myWorkouts";
import { computed, ref } from "vue";
import TheFooter from "../components/reusable/TheFooter.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage, TheFooter, IonLabel },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const page = route.params.plan;
    const store = useMyWorkoutsStore();
    store.loadWorkoutsFromStore();
    let planStore = useMyPlanStore();
    planStore.loadPlansFromStore();

    console.log(planStore);
    console.log("page " + page);

    let weekArray = planStore.planList.find(
      (element) => element.planName == page
    );

    let selectedDay = ref(0);
    let weekIndex = ref(0);
    let selectedCardIndex = ref(0);

    let selectedWeek = computed(() => {
      console.log("check");
      console.log(weekArray.weeks);
      return weekArray.weeks[selectedDay.value].array;
    });

    function changeWeek(index) {
      selectedCardIndex.value = index;
      weekIndex.value = index;
      selectedDay.value = index;
      console.log("selectedWeek:" + selectedWeek.value);

    }

    function goToWorkout(index) {
      let workoutName = weekArray.weeks[index].weekWorkout;
      router.push("/preview/" + workoutName);
    }

    return {
      weekArray,
      selectedDay,
      selectedWeek,
      changeWeek,
      weekIndex,
      selectedCardIndex,
      goToWorkout,
    };
  },
});
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
p {
  color: black;
  font-weight: bold;
  margin-left: 3%;
}
.grid-page {
  display: grid;
  height: 90%;
  grid-template-rows: [row1-start] 5% [row1-end] 10% [row2-start] 5% [row2-end]15% [row3-start]5% [row3-end]60% [row4-start];

}

.plan-headline-name {
  grid-template-rows: row1-start / row1-end;

}

.plan-name {
  grid-template-rows: row1-end / row2-start;
  align-self: center;
  justify-self: center;
}

.plan-name-label {
  font-size: x-large;
  font-weight: bold;
}
.weeks-headline {
  grid-template-rows: row2-start / row2-end;
  
}
.weeks-div {
  grid-template-rows: row2-end / row3-start;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
  
}

.days-headline {
  grid-template-rows: row3-start / row3-end;

}
.days-div {
  grid-template-rows: row3-end / row4-start;
}

.days-ul{
height: 90%;
}

.days-li {
height: 20%;
}

.days-card {
height: 100%;
background-color: var(--ion-color-medium);
}

.week-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  height: 100%;
  width: 100%;
  
}

.week-listitem {
  display: inline-block;
  height: 40%;
  width: 20%;
  margin: 10px;  
}

.week-card {
  height: 100%;
  width: 100%;
  margin: 0;
background-color: var(--ion-color-warning);

  

}

.selected-card {
  border: 2px solid black;
}
</style>
