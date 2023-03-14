<template>
  <ion-page
    ><ion-content>
      <div class="grid-page">
        <div class="weeks-div">
          <ul class="week-list">
            <li
              class="week-listitem"
              v-for="(week, index) in weekArray"
              :key="week"
            >
              <ion-card @click="changeWeek(index)">{{ week.name }}</ion-card>
            </li>
          </ul>
        </div>
        <div class="days-div">
          <ul>
            <li v-for="day in selectedWeek" :key="day">
              <ion-card>{{ day.day }}</ion-card>
            </li>
          </ul>
        </div>
      </div>
    </ion-content></ion-page
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { useMyPlanStore } from "../store/myPlans";
import { computed, ref } from "vue";

export default defineComponent({
  name: "WorkoutPlan",
  components: { IonContent, IonPage },
  setup() {
    let planStore = useMyPlanStore();
    let selectedDay = ref(1);

    let weekArray = planStore.weekArray;
    console.log(weekArray[0]);

    let selectedWeek = computed(() => {
      console.log(weekArray[selectedDay.value].array);
      return weekArray[selectedDay.value].array;
    });

    function changeWeek(index) {
      planStore.setDayInArray();
      selectedDay.value = index;
      console.log(weekArray);
    }

    return { weekArray, selectedDay, selectedWeek, changeWeek };
  },
});
</script>
<style scoped>
.week-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.week-listitem {
  display: inline-block;
}
</style>
