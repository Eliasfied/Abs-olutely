<template>
  <ion-page>
    <the-footer title="Planpreview"> </the-footer>
    <ion-content :fullscreen="true" color="tertiary">
      <div class="grid-page">
        <div class="plan-name">
          <ion-label color="primary">
            {{ weekArray.planName }}
          </ion-label>
        </div>
        <div class="weeks-div">
          <ul class="week-list">
            <li
              class="week-listitem"
              v-for="(week, index) in weekArray.weeks"
              :key="week"
            >
              <ion-card
                :class="{ 'selected-card': index === selectedCardIndex }"
                @click="changeWeek(index)"
              >
                {{ week.weekInt }}
              </ion-card>
            </li>
          </ul>
        </div>
        <div class="days-div">
          <ul>
            <li v-for="day in selectedWeek" :key="day">
              <ion-card @click="goToWorkout(weekIndex)">
                <!-- {{ weekArray.weeks[weekIndex].array[0].dayInt }} -->
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
      console.log(weekArray);
      return weekArray.weeks[selectedDay.value];
    });

    function changeWeek(index) {
      selectedCardIndex.value = index;
      weekIndex.value = index;
      selectedDay.value = index;
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
.grid-page {
  display: grid;
  height: 90%;
  grid-template-rows: [row1-start] 10% [row1-end] 20% [row2-start] 70% [row2-end];
}

.plan-name {
  grid-template-rows: row1-start / row1-end;
}

.weeks-div {
  grid-template-rows: row1-end / row2-start;
}

.days-div {
  grid-template-rows: row2-start / row2-end;
}

.week-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.week-listitem {
  display: inline-block;
}

.selected-card {
  background-color: green;
}
</style>
